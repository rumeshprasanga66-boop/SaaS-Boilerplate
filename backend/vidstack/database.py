"""Rich relational schema for the VidStack workflow (OpusClip-style, extended).

Single SQLite file shared with the job store. Tables:

    users ──┐
            ├── workspace_members ── workspaces ──┬── projects ──┬── clips ──┬── transcript_segments
            │                                     │              │           ├── publish_jobs ── social_accounts
            │                                     │              │           └── analytics_events
            │                                     ├── credit_ledger
            │                                     ├── brand_kits
            │                                     └── api_keys

A demo user/workspace is seeded on first run so every endpoint works
without auth. When real auth lands, swap `demo_identity()`.
"""

from __future__ import annotations

import json
import os
import secrets
import sqlite3
import threading
import time
from typing import Any, Dict, List, Optional

_DB_PATH = os.environ.get("VIDSTACK_DB", "/workspace/project/backend/data/jobs.db")
os.makedirs(os.path.dirname(_DB_PATH), exist_ok=True)

_lock = threading.Lock()

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    name        TEXT NOT NULL,
    avatar_url  TEXT,
    plan        TEXT NOT NULL DEFAULT 'free',
    created_at  REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS workspaces (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    slug        TEXT UNIQUE NOT NULL,
    owner_id    TEXT NOT NULL REFERENCES users(id),
    plan        TEXT NOT NULL DEFAULT 'free',
    seats       INTEGER NOT NULL DEFAULT 1,
    created_at  REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS workspace_members (
    workspace_id TEXT NOT NULL REFERENCES workspaces(id),
    user_id      TEXT NOT NULL REFERENCES users(id),
    role         TEXT NOT NULL DEFAULT 'editor',  -- owner | editor | viewer
    joined_at    REAL NOT NULL,
    PRIMARY KEY (workspace_id, user_id)
);

CREATE TABLE IF NOT EXISTS projects (
    id            TEXT PRIMARY KEY,
    workspace_id  TEXT NOT NULL REFERENCES workspaces(id),
    user_id       TEXT NOT NULL REFERENCES users(id),
    job_id        TEXT,                       -- links to the jobs table
    title         TEXT NOT NULL DEFAULT '',
    input_type    TEXT NOT NULL,
    input_data    TEXT NOT NULL,
    status        TEXT NOT NULL DEFAULT 'queued',  -- queued|processing|completed|failed
    progress      INTEGER NOT NULL DEFAULT 0,
    current_step  TEXT NOT NULL DEFAULT '',
    language      TEXT NOT NULL DEFAULT 'en',
    output_format TEXT NOT NULL DEFAULT 'vertical_9_16',
    error         TEXT,
    created_at    REAL NOT NULL,
    completed_at  REAL
);
CREATE INDEX IF NOT EXISTS idx_projects_workspace ON projects(workspace_id, created_at DESC);

CREATE TABLE IF NOT EXISTS clips (
    id               TEXT PRIMARY KEY,
    project_id       TEXT NOT NULL REFERENCES projects(id),
    title            TEXT NOT NULL DEFAULT '',
    hook_text        TEXT NOT NULL DEFAULT '',
    transcript       TEXT NOT NULL DEFAULT '',
    duration_sec     REAL NOT NULL DEFAULT 0,
    virality_score   INTEGER NOT NULL DEFAULT 0,   -- 0-100 composite
    score_breakdown  TEXT NOT NULL DEFAULT '{}',   -- JSON: hook/flow/value/trend
    status           TEXT NOT NULL DEFAULT 'ready', -- ready|edited|scheduled|published
    video_url        TEXT,
    thumbnail_url    TEXT,
    aspect_ratio     TEXT NOT NULL DEFAULT '9:16',
    caption_style    TEXT NOT NULL DEFAULT 'karaoke',
    created_at       REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_clips_project ON clips(project_id);

CREATE TABLE IF NOT EXISTS transcript_segments (
    id          TEXT PRIMARY KEY,
    clip_id     TEXT NOT NULL REFERENCES clips(id),
    start_sec   REAL NOT NULL,
    end_sec     REAL NOT NULL,
    text        TEXT NOT NULL,
    confidence  REAL NOT NULL DEFAULT 1.0
);
CREATE INDEX IF NOT EXISTS idx_segments_clip ON transcript_segments(clip_id);

CREATE TABLE IF NOT EXISTS credit_ledger (
    id            TEXT PRIMARY KEY,
    workspace_id  TEXT NOT NULL REFERENCES workspaces(id),
    user_id       TEXT NOT NULL REFERENCES users(id),
    delta         INTEGER NOT NULL,             -- negative = spend
    reason        TEXT NOT NULL,                -- monthly_grant|render|export|publish|adjustment
    ref_type      TEXT,                         -- project|clip|system
    ref_id        TEXT,
    balance_after INTEGER NOT NULL,
    created_at    REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ledger_workspace ON credit_ledger(workspace_id, created_at DESC);

CREATE TABLE IF NOT EXISTS social_accounts (
    id           TEXT PRIMARY KEY,
    workspace_id TEXT NOT NULL REFERENCES workspaces(id),
    platform     TEXT NOT NULL,                 -- tiktok|instagram|youtube_shorts|youtube_long
    handle       TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'connected',
    connected_at REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS publish_jobs (
    id                TEXT PRIMARY KEY,
    clip_id           TEXT NOT NULL REFERENCES clips(id),
    social_account_id TEXT NOT NULL REFERENCES social_accounts(id),
    scheduled_at      REAL,
    published_at      REAL,
    status            TEXT NOT NULL DEFAULT 'queued',  -- queued|scheduled|published|failed
    platform_post_id  TEXT,
    error             TEXT,
    created_at        REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_publish_clip ON publish_jobs(clip_id);

CREATE TABLE IF NOT EXISTS analytics_events (
    id           TEXT PRIMARY KEY,
    workspace_id TEXT NOT NULL REFERENCES workspaces(id),
    project_id   TEXT,
    clip_id      TEXT,
    event_type   TEXT NOT NULL,                 -- project_created|clip_rendered|clip_published|credit_spent|...
    metadata     TEXT NOT NULL DEFAULT '{}',
    created_at   REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_workspace ON analytics_events(workspace_id, created_at DESC);

CREATE TABLE IF NOT EXISTS brand_kits (
    id           TEXT PRIMARY KEY,
    workspace_id TEXT NOT NULL REFERENCES workspaces(id),
    name         TEXT NOT NULL,
    colors       TEXT NOT NULL DEFAULT '[]',    -- JSON array of hex
    fonts        TEXT NOT NULL DEFAULT '[]',    -- JSON array
    logo_url     TEXT,
    watermark    TEXT,
    intro_url    TEXT,
    outro_url    TEXT,
    created_at   REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS api_keys (
    id           TEXT PRIMARY KEY,
    workspace_id TEXT NOT NULL REFERENCES workspaces(id),
    key_hash     TEXT NOT NULL,
    label        TEXT NOT NULL DEFAULT '',
    scopes       TEXT NOT NULL DEFAULT '["read"]',
    last_used_at REAL,
    revoked      INTEGER NOT NULL DEFAULT 0,
    created_at   REAL NOT NULL
);
"""

_conn: Optional[sqlite3.Connection] = None


def db() -> sqlite3.Connection:
    global _conn
    if _conn is None:
        _conn = sqlite3.connect(_DB_PATH, check_same_thread=False)
        _conn.row_factory = sqlite3.Row
        _conn.execute("PRAGMA foreign_keys = ON")
        with _lock:
            _conn.executescript(SCHEMA)
            _conn.commit()
        _seed()
    return _conn


def _uid(prefix: str) -> str:
    return f"{prefix}_{secrets.token_hex(6)}"


def _seed() -> None:
    assert _conn is not None
    c = _conn
    if c.execute("SELECT 1 FROM users LIMIT 1").fetchone():
        return
    now = time.time()
    with _lock:
        c.execute(
            "INSERT INTO users VALUES (?,?,?,?,?,?)",
            ("usr_demo", "demo@vidstack.app", "Demo Creator",
             "https://i.pravatar.cc/150?img=12", "pro", now),
        )
        c.execute(
            "INSERT INTO workspaces VALUES (?,?,?,?,?,?,?)",
            ("wsp_demo", "Demo Studio", "demo-studio", "usr_demo", "pro", 4, now),
        )
        c.execute(
            "INSERT INTO workspace_members VALUES (?,?,?,?)",
            ("wsp_demo", "usr_demo", "owner", now),
        )
        for platform, handle in [
            ("tiktok", "@demostudio"),
            ("instagram", "@demo.studio"),
            ("youtube_shorts", "@DemoStudio"),
        ]:
            c.execute(
                "INSERT INTO social_accounts VALUES (?,?,?,?,?,?)",
                (_uid("sac"), "wsp_demo", platform, handle, "connected", now),
            )
        c.execute(
            "INSERT INTO brand_kits VALUES (?,?,?,?,?,?,?,?,?,?)",
            (_uid("kit"), "wsp_demo", "Default Kit",
             json.dumps(["#6366f1", "#10b981", "#0ea5e9"]),
             json.dumps(["Inter", "Montserrat"]),
             None, "VidStack", None, None, now),
        )
        # Monthly credit grant — Pro plan = 900 credits
        c.execute(
            "INSERT INTO credit_ledger VALUES (?,?,?,?,?,?,?,?,?)",
            (_uid("led"), "wsp_demo", "usr_demo", 900, "monthly_grant",
             "system", None, 900, now),
        )
        c.execute(
            "INSERT INTO api_keys VALUES (?,?,?,?,?,?,?,?)",
            (_uid("key"), "wsp_demo", secrets.token_hex(32), "Default",
             json.dumps(["read", "write"]), None, 0, now),
        )
        c.commit()


def demo_identity() -> Dict[str, str]:
    """Until real auth exists, everything runs under the demo workspace."""
    db()
    return {"user_id": "usr_demo", "workspace_id": "wsp_demo"}


# --- Projects ---------------------------------------------------------------

def create_project(job: Any) -> str:
    ident = demo_identity()
    pid = _uid("prj")
    with _lock:
        db().execute(
            "INSERT INTO projects (id, workspace_id, user_id, job_id, title,"
            " input_type, input_data, status, progress, current_step,"
            " language, output_format, created_at)"
            " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            (pid, ident["workspace_id"], ident["user_id"], job.job_id,
             (job.title or "")[:120], job.input_type.value,
             job.input_data[:500], "queued", 0, "queued",
             job.language, job.output_format.value, time.time()),
        )
        db().commit()
    record_event("project_created", project_id=pid,
                 metadata={"input_type": job.input_type.value})
    return pid


def sync_project(project_id: str, job: Any) -> None:
    completed = time.time() if job.status == "completed" else None
    with _lock:
        db().execute(
            "UPDATE projects SET status=?, progress=?, current_step=?,"
            " error=?, completed_at=COALESCE(?, completed_at) WHERE id=?",
            (job.status, job.progress, job.current_step,
             job.error_message, completed, project_id),
        )
        db().commit()


def list_projects(limit: int = 50) -> List[Dict[str, Any]]:
    ident = demo_identity()
    rows = db().execute(
        "SELECT p.*, (SELECT COUNT(*) FROM clips c WHERE c.project_id = p.id)"
        " AS clip_count FROM projects p WHERE p.workspace_id=?"
        " ORDER BY p.created_at DESC LIMIT ?",
        (ident["workspace_id"], limit),
    ).fetchall()
    return [dict(r) for r in rows]


def get_project(project_id: str) -> Optional[Dict[str, Any]]:
    row = db().execute("SELECT * FROM projects WHERE id=?", (project_id,)).fetchone()
    if not row:
        return None
    project = dict(row)
    project["clips"] = [
        dict(r) for r in db().execute(
            "SELECT * FROM clips WHERE project_id=? ORDER BY created_at",
            (project_id,),
        ).fetchall()
    ]
    for clip in project["clips"]:
        clip["score_breakdown"] = json.loads(clip["score_breakdown"])
    return project


# --- Clips -------------------------------------------------------------------

def create_clip(project_id: str, job: Any) -> str:
    cid = _uid("clp")
    script = job.generated_script
    hook = script.hook_text if script else ""
    body = script.body_text if script else ""
    transcript = f"{hook} {body} {script.cta_text if script else ''}".strip()
    duration = float(script.estimated_duration_seconds) if script else 30.0
    score, breakdown = _virality(hook, body)
    with _lock:
        db().execute(
            "INSERT INTO clips (id, project_id, title, hook_text, transcript,"
            " duration_sec, virality_score, score_breakdown, status,"
            " video_url, thumbnail_url, aspect_ratio, created_at)"
            " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            (cid, project_id, (job.title or hook[:60] or "Untitled clip"),
             hook, transcript, duration, score, json.dumps(breakdown),
             "ready", job.video_url, job.thumbnail_url,
             "9:16" if "vertical" in job.output_format.value else "16:9",
             time.time()),
        )
        # Word-level-ish segments: split transcript into ~3s chunks
        words = transcript.split()
        chunk, start = [], 0.0
        per_chunk = max(1, int(len(words) / max(1, duration / 3)))
        for i in range(0, len(words), per_chunk):
            chunk_words = words[i:i + per_chunk]
            end = min(duration, start + 3.0)
            db().execute(
                "INSERT INTO transcript_segments VALUES (?,?,?,?,?,?)",
                (_uid("seg"), cid, round(start, 2), round(end, 2),
                 " ".join(chunk_words), 0.95),
            )
            start = end
        db().commit()
    record_event("clip_rendered", project_id=project_id, clip_id=cid,
                 metadata={"virality_score": score})
    return cid


def _virality(hook: str, body: str) -> tuple[int, Dict[str, int]]:
    """Deterministic heuristic score (0-100) with per-dimension breakdown."""
    text = f"{hook} {body}".lower()
    hook_score = min(100, 55 + len(hook) // 2 + (12 if "?" in hook else 0))
    flow = min(100, 60 + len(text.split()) // 4)
    value = min(100, 58 + sum(8 for w in ("how", "why", "secret", "mistake", "free") if w in text))
    trend = min(100, 50 + sum(10 for w in ("ai", "2026", "viral", "shorts") if w in text))
    composite = round(hook_score * 0.35 + flow * 0.2 + value * 0.25 + trend * 0.2)
    return composite, {"hook": hook_score, "flow": flow, "value": value, "trend": trend}


def get_clip(clip_id: str) -> Optional[Dict[str, Any]]:
    row = db().execute("SELECT * FROM clips WHERE id=?", (clip_id,)).fetchone()
    if not row:
        return None
    clip = dict(row)
    clip["score_breakdown"] = json.loads(clip["score_breakdown"])
    clip["segments"] = [
        dict(r) for r in db().execute(
            "SELECT * FROM transcript_segments WHERE clip_id=? ORDER BY start_sec",
            (clip_id,),
        ).fetchall()
    ]
    clip["publish_jobs"] = [
        dict(r) for r in db().execute(
            "SELECT pj.*, sa.platform, sa.handle FROM publish_jobs pj"
            " JOIN social_accounts sa ON sa.id = pj.social_account_id"
            " WHERE pj.clip_id=?",
            (clip_id,),
        ).fetchall()
    ]
    return clip


# --- Credits -----------------------------------------------------------------

CREDIT_COSTS = {"render": 10, "export": 2, "publish": 1}


def spend_credits(amount: int, reason: str, ref_type: str, ref_id: str) -> int:
    ident = demo_identity()
    balance = credit_balance() - amount
    with _lock:
        db().execute(
            "INSERT INTO credit_ledger VALUES (?,?,?,?,?,?,?,?,?)",
            (_uid("led"), ident["workspace_id"], ident["user_id"],
             -amount, reason, ref_type, ref_id, balance, time.time()),
        )
        db().commit()
    record_event("credit_spent", metadata={"amount": amount, "reason": reason})
    return balance


def credit_balance() -> int:
    ident = demo_identity()
    row = db().execute(
        "SELECT COALESCE(SUM(delta), 0) AS bal FROM credit_ledger WHERE workspace_id=?",
        (ident["workspace_id"],),
    ).fetchone()
    return int(row["bal"])


def credit_history(limit: int = 20) -> List[Dict[str, Any]]:
    ident = demo_identity()
    rows = db().execute(
        "SELECT * FROM credit_ledger WHERE workspace_id=?"
        " ORDER BY created_at DESC LIMIT ?",
        (ident["workspace_id"], limit),
    ).fetchall()
    return [dict(r) for r in rows]


# --- Publishing ---------------------------------------------------------------

def schedule_publish(clip_id: str, platforms: List[str], scheduled_at: Optional[float]) -> List[str]:
    ident = demo_identity()
    ids = []
    with _lock:
        for platform in platforms:
            acc = db().execute(
                "SELECT id FROM social_accounts WHERE workspace_id=? AND platform=? LIMIT 1",
                (ident["workspace_id"], platform),
            ).fetchone()
            if not acc:
                continue
            pid = _uid("pub")
            db().execute(
                "INSERT INTO publish_jobs (id, clip_id, social_account_id,"
                " scheduled_at, status, created_at) VALUES (?,?,?,?,?,?)",
                (pid, clip_id, acc["id"], scheduled_at,
                 "scheduled" if scheduled_at else "queued", time.time()),
            )
            ids.append(pid)
        db().execute("UPDATE clips SET status='scheduled' WHERE id=?", (clip_id,))
        db().commit()
    record_event("clip_scheduled", clip_id=clip_id, metadata={"platforms": platforms})
    return ids


# --- Analytics ----------------------------------------------------------------

def record_event(event_type: str, project_id: Optional[str] = None,
                 clip_id: Optional[str] = None, metadata: Optional[Dict] = None) -> None:
    ident = demo_identity()
    with _lock:
        db().execute(
            "INSERT INTO analytics_events VALUES (?,?,?,?,?,?,?)",
            (_uid("evt"), ident["workspace_id"], project_id, clip_id,
             event_type, json.dumps(metadata or {}), time.time()),
        )
        db().commit()


def analytics_summary() -> Dict[str, Any]:
    ident = demo_identity()
    c = db()
    ws = ident["workspace_id"]
    by_type = {
        r["event_type"]: r["n"]
        for r in c.execute(
            "SELECT event_type, COUNT(*) AS n FROM analytics_events"
            " WHERE workspace_id=? GROUP BY event_type", (ws,),
        ).fetchall()
    }
    top_clips = [
        dict(r) for r in c.execute(
            "SELECT c.id, c.title, c.virality_score, c.status FROM clips c"
            " JOIN projects p ON p.id = c.project_id"
            " WHERE p.workspace_id=? ORDER BY c.virality_score DESC LIMIT 5", (ws,),
        ).fetchall()
    ]
    totals = c.execute(
        "SELECT COUNT(*) AS projects, COALESCE(SUM(progress=100),0) AS done"
        " FROM projects WHERE workspace_id=?", (ws,),
    ).fetchone()
    return {
        "credit_balance": credit_balance(),
        "projects_total": totals["projects"],
        "projects_completed": totals["done"],
        "events_by_type": by_type,
        "top_clips": top_clips,
    }


def workspace_overview() -> Dict[str, Any]:
    ident = demo_identity()
    c = db()
    ws = dict(c.execute("SELECT * FROM workspaces WHERE id=?",
                        (ident["workspace_id"],)).fetchone())
    ws["members"] = [
        dict(r) for r in c.execute(
            "SELECT u.id, u.name, u.email, u.avatar_url, m.role"
            " FROM workspace_members m JOIN users u ON u.id = m.user_id"
            " WHERE m.workspace_id=?", (ws["id"],),
        ).fetchall()
    ]
    ws["social_accounts"] = [
        dict(r) for r in c.execute(
            "SELECT id, platform, handle, status, connected_at"
            " FROM social_accounts WHERE workspace_id=?", (ws["id"],),
        ).fetchall()
    ]
    ws["brand_kits"] = [
        {**dict(r), "colors": json.loads(r["colors"]), "fonts": json.loads(r["fonts"])}
        for r in c.execute(
            "SELECT * FROM brand_kits WHERE workspace_id=?", (ws["id"],),
        ).fetchall()
    ]
    return ws
