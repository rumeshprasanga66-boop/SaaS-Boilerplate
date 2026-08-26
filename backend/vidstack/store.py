"""SQLite-backed job store — survives backend restarts.

Drop-in replacement for the previous in-memory dict. Jobs are serialized as
JSON rows; reads/writes are small and single-process, so SQLite is plenty.
"""

from __future__ import annotations

import json
import os
import sqlite3
import threading
from typing import Dict, Iterator, List, Optional

from .data_models import VideoGenerationJob

_DB_PATH = os.environ.get("VIDSTACK_DB", "/workspace/project/backend/data/jobs.db")
os.makedirs(os.path.dirname(_DB_PATH), exist_ok=True)

_lock = threading.Lock()


def _conn() -> sqlite3.Connection:
    c = sqlite3.connect(_DB_PATH, check_same_thread=False)
    c.execute(
        "CREATE TABLE IF NOT EXISTS jobs ("
        " job_id TEXT PRIMARY KEY,"
        " status TEXT,"
        " progress INTEGER,"
        " current_step TEXT,"
        " payload TEXT NOT NULL"
        ")"
    )
    return c


_CONN = _conn()


def _write(job: VideoGenerationJob) -> None:
    with _lock:
        _CONN.execute(
            "INSERT OR REPLACE INTO jobs (job_id, status, progress, current_step, payload) VALUES (?,?,?,?,?)",
            (job.job_id, job.status, job.progress, job.current_step, job.model_dump_json()),
        )
        _CONN.commit()


def _read(job_id: str) -> Optional[VideoGenerationJob]:
    row = _CONN.execute("SELECT payload FROM jobs WHERE job_id=?", (job_id,)).fetchone()
    if not row:
        return None
    return VideoGenerationJob(**json.loads(row[0]))


def _all() -> List[VideoGenerationJob]:
    rows = _CONN.execute("SELECT payload FROM jobs").fetchall()
    return [VideoGenerationJob(**json.loads(r[0])) for r in rows]


class JobStore:
    """Dict-like wrapper so `jobs[id] = job`, `jobs[id]`, `jobs.get(id)`, `.values()` work."""

    def __setitem__(self, job_id: str, job: VideoGenerationJob) -> None:
        _write(job)

    def __getitem__(self, job_id: str) -> VideoGenerationJob:
        job = _read(job_id)
        if job is None:
            raise KeyError(job_id)
        return job

    def get(self, job_id: str) -> Optional[VideoGenerationJob]:
        return _read(job_id)

    def __contains__(self, job_id: str) -> bool:
        return _read(job_id) is not None

    def values(self) -> List[VideoGenerationJob]:
        return _all()

    def items(self) -> Iterator[tuple]:
        for j in _all():
            yield (j.job_id, j)

    def __len__(self) -> int:
        return _CONN.execute("SELECT COUNT(*) FROM jobs").fetchone()[0]


jobs: Dict[str, VideoGenerationJob] = JobStore()  # type: ignore[assignment]
