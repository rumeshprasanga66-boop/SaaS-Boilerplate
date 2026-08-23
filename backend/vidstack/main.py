import asyncio
import uuid
from typing import Dict, List

from dotenv import load_dotenv

load_dotenv()

from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from .data_models import PRICING_TIERS, JobResponse, PublishRequest, VideoGenerationJob
from .engine import VidStackEngine
from .foundation import capabilities
from . import config


class BrollRequest(BaseModel):
    keywords: List[str]
    aspect: str = "9:16"


class VoiceoverRequest(BaseModel):
    text: str
    voice: str = "en-US-AriaNeural"
    rate: float = 1.0


class HighlightRequest(BaseModel):
    transcript_text: str
    num_clips: int = 3


class AvatarRequest(BaseModel):
    script_text: str
    avatar: str = "default"
    language: str = "en"


FEATURE_MATRIX = {
    "long_video_to_shorts": {"openshorts": True, "moneyprinterturbo": False, "ai_youtube_shorts_generator": True, "vidstack": True},
    "script_to_video": {"openshorts": True, "moneyprinterturbo": True, "ai_youtube_shorts_generator": False, "vidstack": True},
    "youtube_extraction": {"openshorts": True, "moneyprinterturbo": True, "ai_youtube_shorts_generator": True, "vidstack": True},
    "ai_avatars": {"openshorts": True, "moneyprinterturbo": False, "ai_youtube_shorts_generator": False, "vidstack": True},
    "auto_publish": {"openshorts": True, "moneyprinterturbo": False, "ai_youtube_shorts_generator": False, "vidstack": True},
    "multiple_llms": {"openshorts": True, "moneyprinterturbo": True, "ai_youtube_shorts_generator": True, "vidstack": True},
    "broll_generation": {"openshorts": True, "moneyprinterturbo": True, "ai_youtube_shorts_generator": True, "vidstack": True},
    "voiceover": {"openshorts": True, "moneyprinterturbo": True, "ai_youtube_shorts_generator": True, "vidstack": True},
    "word_level_subtitles": {"openshorts": True, "moneyprinterturbo": True, "ai_youtube_shorts_generator": True, "vidstack": True},
    "face_tracking_crop": {"openshorts": True, "moneyprinterturbo": False, "ai_youtube_shorts_generator": True, "vidstack": True},
    "auto_scheduling": {"openshorts": True, "moneyprinterturbo": False, "ai_youtube_shorts_generator": False, "vidstack": True},
    "multi_format_output": {"openshorts": "9:16", "moneyprinterturbo": "9:16", "ai_youtube_shorts_generator": "9:16", "vidstack": "9:16, 16:9, 4:5"},
    "free_tier": {"openshorts": "20min", "moneyprinterturbo": "Unlimited", "ai_youtube_shorts_generator": "Unlimited", "vidstack": "30 clips/mo"},
    "watermark": {"openshorts": "Optional", "moneyprinterturbo": "None", "ai_youtube_shorts_generator": "None", "vidstack": "None"},
}

app = FastAPI(
    title="VidStack API",
    description="All-in-One AI Video Automation Platform — From Script to Short, to YouTube to Shorts, All in One Place.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = VidStackEngine()

# In-memory job store (swap for Redis/Postgres in production)
jobs: Dict[str, VideoGenerationJob] = {}
published: Dict[str, dict] = {}


async def _run_job(job_id: str) -> None:
    job = jobs[job_id]
    # Simulate pipeline latency, then run the engine
    await asyncio.sleep(1)
    jobs[job_id] = engine.generate_video(job)


@app.get("/")
async def root() -> dict:
    return {
        "name": "VidStack",
        "tagline": "From Script to Short, to YouTube to Shorts, All in One Place.",
        "docs": "/docs",
    }


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.get("/files/{job_dir}/{filename}")
async def serve_file(job_dir: str, filename: str) -> FileResponse:
    """Serve a rendered video file."""
    from pathlib import Path

    # Prevent path traversal
    if ".." in job_dir or ".." in filename:
        raise HTTPException(status_code=400, detail="Invalid path")
    path = Path("/tmp/vidstack/render") / job_dir / filename
    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(str(path), media_type="video/mp4", filename=filename)


@app.post("/generate", status_code=202)
async def generate_video(job: VideoGenerationJob, background_tasks: BackgroundTasks) -> dict:
    """
    Generate video from script, YouTube URL, or video file.
    Returns job_id for async processing.
    """
    # Task queue bound (MoneyPrinterTurbo-style): reject when too many active jobs
    active = sum(1 for j in jobs.values() if j.status in ("queued", "processing"))
    if active >= config.MAX_PENDING_TASKS:
        raise HTTPException(status_code=429, detail=f"Too many active jobs (max {config.MAX_PENDING_TASKS}). Try again shortly.")

    job_id = str(uuid.uuid4())
    job.status = "queued"
    job.progress = 0
    job.current_step = "queued"
    jobs[job_id] = job
    background_tasks.add_task(_run_job, job_id)
    return {"job_id": job_id, "status": "queued"}


@app.get("/jobs/{job_id}", response_model=JobResponse)
async def get_job_status(job_id: str) -> JobResponse:
    """Get job status and results."""
    job = jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse(
        job_id=job_id,
        status=job.status,
        progress=job.progress,
        current_step=job.current_step,
        video_url=job.video_url,
        thumbnail_url=job.thumbnail_url,
        error_message=job.error_message,
        generated_script=job.generated_script,
        cost_cents=job.cost_cents,
    )


@app.get("/tasks")
async def list_tasks() -> dict:
    """List all jobs with status (MoneyPrinterTurbo /tasks pattern)."""
    return {
        "total": len(jobs),
        "active": sum(1 for j in jobs.values() if j.status in ("queued", "processing")),
        "tasks": [
            {
                "job_id": jid,
                "status": j.status,
                "progress": j.progress,
                "current_step": j.current_step,
            }
            for jid, j in jobs.items()
        ],
    }


@app.post("/publish/{job_id}")
async def publish_video(job_id: str, request: PublishRequest) -> dict:
    """Publish to TikTok, YouTube, Instagram."""
    job = jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status != "completed" or not job.video_url:
        raise HTTPException(status_code=400, detail="Job has not completed yet")

    result = engine.publishing_engine.publish(
        video_url=job.video_url,
        channels=request.channels,
        schedule_time=request.schedule_time,
    )
    published[job_id] = result
    return {"job_id": job_id, "published_to": [c.value for c in request.channels], "details": result}


@app.get("/pricing")
async def pricing() -> dict:
    """VidStack pricing tiers."""
    return {"tiers": [t.model_dump() for t in PRICING_TIERS]}


@app.get("/features")
async def features() -> dict:
    """Unified feature matrix vs the three open-source foundations."""
    return {
        "foundations": ["openshorts", "moneyprinterturbo", "ai_youtube_shorts_generator", "vidstack"],
        "matrix": FEATURE_MATRIX,
    }


@app.get("/formats")
async def formats() -> dict:
    """Supported output aspect ratios."""
    return {"formats": capabilities.ASPECT_DIMENSIONS}


@app.post("/broll")
async def broll_search(request: BrollRequest) -> dict:
    """Search stock B-roll (MoneyPrinterTurbo material pipeline)."""
    return {"results": capabilities.search_broll(request.keywords, aspect=request.aspect)}


@app.post("/voiceover")
async def voiceover(request: VoiceoverRequest) -> dict:
    """Generate TTS voiceover (edge-tts / ElevenLabs)."""
    return capabilities.generate_voiceover(request.text, voice=request.voice, rate=request.rate)


@app.post("/highlights")
async def highlights(request: HighlightRequest) -> dict:
    """Extract strongest moments from a transcript (AI-YSG pipeline)."""
    return {"highlights": capabilities.extract_highlights(request.transcript_text, request.num_clips)}


@app.post("/avatar")
async def avatar(request: AvatarRequest) -> dict:
    """Generate an AI avatar presenter video."""
    return capabilities.generate_avatar_video(request.script_text, avatar=request.avatar, language=request.language)
