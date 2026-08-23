"""Real ffmpeg render: download B-roll, mix voiceover, overlay captions.

Uses the static ffmpeg binary bundled with imageio-ffmpeg (no system install
needed). Downloads Pexels clips, loops/trims them to the voiceover length,
mixes the TTS audio, burns word-level captions, and encodes a 9:16 (or 16:9)
MP4. Falls back to a plain concat when voiceover/subtitles are absent.
"""

from __future__ import annotations

import os
import subprocess
import time
from pathlib import Path
from typing import List, Optional

import httpx

WORK_DIR = Path("/tmp/vidstack/render")
WORK_DIR.mkdir(parents=True, exist_ok=True)


def _ffmpeg() -> str:
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return "ffmpeg"


def _download(url: str, dest: Path) -> bool:
    try:
        with httpx.stream("GET", url, timeout=60, follow_redirects=True) as r:
            r.raise_for_status()
            with open(dest, "wb") as f:
                for chunk in r.iter_bytes(chunk_size=1 << 16):
                    f.write(chunk)
        return dest.exists() and dest.stat().st_size > 0
    except Exception as e:  # noqa: BLE001
        print(f"⚠️ download failed {url[:60]}: {e}")
        return False


def _srt(entries: List[tuple], dest: Path) -> None:
    """entries: list of (index, start_s, end_s, text)."""
    def ts(s: float) -> str:
        ms = int(s * 1000)
        h, ms = divmod(ms, 3600000)
        m, ms = divmod(ms, 60000)
        sec, ms = divmod(ms, 1000)
        return f"{h:02d}:{m:02d}:{sec:02d},{ms:03d}"

    lines = []
    for idx, start, end, text in entries:
        lines.append(f"{idx}\n{ts(start)} --> {ts(end)}\n{text}\n")
    dest.write_text("\n".join(lines), encoding="utf-8")


def _dim(output_format: str) -> tuple:
    if "vertical" in output_format or "9_16" in output_format:
        return 1080, 1920
    if "square" in output_format or "4_5" in output_format:
        return 1080, 1350
    return 1920, 1080


def render_video(
    *,
    broll_urls: List[str],
    voiceover_path: Optional[str],
    narration_text: str,
    output_format: str,
    job_id: str,
) -> Optional[str]:
    """Assemble the final MP4. Returns the local file path, or None on failure."""
    ff = _ffmpeg()
    ts = int(time.time() * 1000)
    job_dir = WORK_DIR / f"{job_id}_{ts}"
    job_dir.mkdir(parents=True, exist_ok=True)
    w, h = _dim(output_format)

    # 1. Download B-roll clips
    clips: List[Path] = []
    for i, url in enumerate(broll_urls[:6]):
        dest = job_dir / f"broll_{i}.mp4"
        if _download(url, dest):
            clips.append(dest)
    if not clips:
        print("⚠️ no B-roll downloaded; render aborted")
        return None

    # 2. Normalize each clip to target dims, then concat
    norm: List[Path] = []
    for i, c in enumerate(clips):
        out = job_dir / f"norm_{i}.mp4"
        subprocess.run(
            [ff, "-y", "-i", str(c), "-vf",
             f"scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h},fps=30",
             "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "26", str(out)],
            check=False, capture_output=True, timeout=120,
        )
        if out.exists():
            norm.append(out)
    if not norm:
        return None

    concat_list = job_dir / "concat.txt"
    concat_list.write_text("".join(f"file '{p}'\n" for p in norm))
    concat_out = job_dir / "concat.mp4"
    subprocess.run(
        [ff, "-y", "-f", "concat", "-safe", "0", "-i", str(concat_list),
         "-c", "copy", str(concat_out)],
        check=False, capture_output=True, timeout=120,
    )

    # 3. Voiceover duration (or default 20s)
    duration = 20.0
    audio_input: Optional[str] = None
    if voiceover_path and os.path.exists(voiceover_path):
        audio_input = voiceover_path
        probe = subprocess.run(
            [ff, "-i", voiceover_path, "-f", "null", "-"],
            capture_output=True, text=True, timeout=60,
        )
        import re
        m = re.findall(r"time=(\d+):(\d+):([\d.]+)", probe.stderr)
        if m:
            hh, mm, ss = m[-1]
            duration = float(hh) * 3600 + float(mm) * 60 + float(ss)

    # 4. Captions (SRT from narration, ~5 words per line)
    srt_path = job_dir / "captions.srt"
    words = narration_text.split()
    per = 5
    entries = []
    n_chunks = max(1, (len(words) + per - 1) // per)
    for ci in range(n_chunks):
        text = " ".join(words[ci * per:(ci + 1) * per])
        start = duration * ci / n_chunks
        end = duration * (ci + 1) / n_chunks
        entries.append((ci + 1, start, end, text))
    _srt(entries, srt_path)

    # 5. Final encode: loop video to duration, add audio, burn captions
    final = job_dir / "final.mp4"
    caption_filter = (
        f"subtitles={srt_path}:force_style="
        "'FontName=DejaVu Sans,FontSize=14,PrimaryColour=&H00FFFFFF,"
        "OutlineColour=&H80000000,BorderStyle=1,Outline=2,Shadow=0,Alignment=2,MarginV=120'"
    )
    cmd = [ff, "-y", "-stream_loop", "-1", "-i", str(concat_out)]
    if audio_input:
        cmd += ["-i", audio_input]
    cmd += ["-t", f"{duration:.2f}", "-vf", caption_filter]
    if audio_input:
        cmd += ["-c:v", "libx264", "-preset", "veryfast", "-crf", "26",
                "-c:a", "aac", "-b:a", "128k", "-shortest", str(final)]
    else:
        cmd += ["-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "26", str(final)]

    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    if final.exists() and final.stat().st_size > 0:
        print(f"🎬 rendered: {final} ({final.stat().st_size // 1024} KB, {duration:.1f}s)")
        return str(final)

    print(f"⚠️ final encode failed: {proc.stderr[-400:]}")
    return None
