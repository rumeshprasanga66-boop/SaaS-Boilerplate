'use client';

import { useEffect, useRef, useState } from 'react';

type Segment = {
  id: string;
  start_sec: number;
  end_sec: number;
  text: string;
};

type Clip = {
  id: string;
  title: string;
  hook_text: string;
  duration_sec: number;
  virality_score: number;
  status: string;
  video_url: string | null;
  caption_style: string;
  aspect_ratio: string;
  segments: Segment[];
  score_breakdown: {
    hook: number;
    flow: number;
    value: number;
    trend: number;
  };
};

const fmt = (t: number) => {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const f = Math.floor((t % 1) * 30);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
};

export const EditorStudio = ({ clipId }: { clipId: string }) => {
  const [clip, setClip] = useState<Clip | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let alive = true;
    fetch(`/api/clips/${clipId}`, { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) {
          throw new Error(`clip load failed (${r.status})`);
        }
        return r.json();
      })
      .then((c: Clip) => {
        if (alive) {
          setClip(c);
        }
      })
      .catch((e: unknown) => {
        if (alive) {
          setError(e instanceof Error ? e.message : 'load failed');
        }
      });
    return () => {
      alive = false;
    };
  }, [clipId]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) {
      return;
    }
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (v) {
      setPlayhead(v.currentTime);
    }
  };

  const seek = (t: number) => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = t;
      setPlayhead(t);
    }
  };

  if (error) {
    return <div className="p-8 text-sm text-rose-400">{error}</div>;
  }
  if (!clip) {
    return <div className="p-8 text-sm text-gray-500">Loading editor…</div>;
  }

  const segs = clip.segments ?? [];
  const maxT = Math.max(clip.duration_sec || 0, ...segs.map(s => s.end_sec), 1);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-[#0a0c10] text-gray-200">
      {/* top toolbar */}
      <div className="flex h-11 items-center justify-between border-b border-white/10 px-4">
        <div className="text-xs font-medium text-gray-400">
          <span className="text-white">{clip.title}</span>
          <span className="mx-2 opacity-40">·</span>
          {clip.id}
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            virality
            {' '}
            {clip.virality_score}
          </span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold text-gray-300">
            {clip.aspect_ratio}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* left: project bin */}
        <aside className="hidden w-56 shrink-0 border-r border-white/10 p-3 md:block">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">Clip properties</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">hook</span>
              <span>{clip.hook_text || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">duration</span>
              <span>
                {Math.round(clip.duration_sec)}
                s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">captions</span>
              <span>{clip.caption_style}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">status</span>
              <span>{clip.status}</span>
            </div>
          </div>
          <div className="mb-2 mt-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Score breakdown</div>
          {(['hook', 'flow', 'value', 'trend'] as const).map(k => (
            <div key={k} className="mb-1">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span className="uppercase">{k}</span>
                <span>{clip.score_breakdown[k]}</span>
              </div>
              <div className="h-1 rounded bg-white/10">
                <div className="h-1 rounded bg-gradient-to-r from-indigo-400 to-emerald-400" style={{ width: `${clip.score_breakdown[k]}%` }} />
              </div>
            </div>
          ))}
        </aside>

        {/* center: preview */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
            {clip.video_url
              ? (
                  <video
                    ref={videoRef}
                    src={clip.video_url}
                    className="max-h-full max-w-full rounded-lg border border-white/10 bg-black"
                    onTimeUpdate={onTimeUpdate}
                    onEnded={() => setPlaying(false)}
                  >
                    <track kind="captions" label="captions" />
                  </video>
                )
              : <div className="flex size-48 items-center justify-center rounded-lg border border-dashed border-white/20 text-xs text-gray-600">no render</div>}
          </div>
          {/* transport */}
          <div className="flex h-14 items-center gap-4 border-t border-white/10 px-4">
            <button
              type="button"
              onClick={toggle}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing
                ? <svg viewBox="0 0 24 24" className="size-4 fill-white"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                : <svg viewBox="0 0 24 24" className="size-4 fill-white"><path d="M8 5v14l11-7z" /></svg>}
            </button>
            <div className="font-mono text-xs text-gray-400">
              {fmt(playhead)}
              <span className="mx-1 opacity-40">/</span>
              {fmt(maxT)}
            </div>
            <div className="ml-auto text-[10px] uppercase tracking-wider text-gray-600">preview</div>
          </div>
        </main>
      </div>

      {/* timeline */}
      <div className="h-44 shrink-0 overflow-x-auto border-t border-white/10 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Timeline</span>
          <span className="font-mono text-[10px] text-gray-600">
            {segs.length}
            {' '}
            caption blocks
          </span>
        </div>
        <div className="relative" style={{ minWidth: '600px' }}>
          {/* playhead */}
          <div
            className="absolute inset-y-0 w-px bg-rose-400"
            style={{ left: `${(playhead / maxT) * 100}%` }}
          />
          {/* captions track */}
          <div className="mb-1 flex h-8 items-center rounded bg-white/5 px-2 text-[10px] font-bold uppercase text-gray-400">T1 · captions</div>
          <div className="relative h-10 rounded bg-white/5">
            {segs.map((s) => {
              const left = (s.start_sec / maxT) * 100;
              const width = Math.max(((s.end_sec - s.start_sec) / maxT) * 100, 0.8);
              const active = playhead >= s.start_sec && playhead < s.end_sec;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => seek(s.start_sec)}
                  className={`absolute inset-y-1 overflow-hidden rounded px-1 text-[10px] transition ${
                    active ? 'bg-indigo-500/60 text-white' : 'bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40'
                  }`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${s.text} — ${s.start_sec.toFixed(1)}s`}
                >
                  {s.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
