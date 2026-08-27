"""Centralized provider/secret config (MoneyPrinterTurbo-style).

Reads from environment first, then an optional config.toml, so providers can be
swapped without touching code. Single source of truth for all external APIs.
"""

from __future__ import annotations

import os
from typing import Any

try:
    import tomllib  # Python 3.11+
except ImportError:  # pragma: no cover
    tomllib = None  # type: ignore


def _load_toml() -> dict:
    if tomllib is None:
        return {}
    for path in ("config.toml", "backend/config.toml", os.path.join(os.path.dirname(__file__), "..", "config.toml")):
        if os.path.exists(path):
            try:
                with open(path, "rb") as f:
                    return tomllib.load(f)
            except Exception:
                return {}
    return {}


_CFG = _load_toml()


def get(key: str, default: Any = None, section: str | None = None) -> Any:
    """Read a config value: env var wins, then config.toml, then default.

    Env var name is the uppercased key (e.g. get("pexels_api_key") reads
    PEXELS_API_KEY). For sectioned keys, get("api_key", section="elevenlabs")
    reads ELEVENLABS_API_KEY or [elevenlabs] api_key.
    """
    env_name = f"{section}_{key}".upper() if section else key.upper()
    if os.getenv(env_name):
        return os.environ[env_name]
    if section and isinstance(_CFG.get(section), dict):
        if key in _CFG[section]:
            return _CFG[section][key]
    return _CFG.get(key, default)


# --- LLM providers ---
GEMINI_API_KEY = get("gemini_api_key")
GEMINI_MODEL = get("gemini_model", "gemini-3.6-flash")
OPENAI_API_KEY = get("openai_api_key")
ANTHROPIC_API_KEY = get("anthropic_api_key")
DEEPSEEK_API_KEY = get("deepseek_api_key")

# --- Stock media ---
PEXELS_API_KEY = get("pexels_api_key")
PIXABAY_API_KEY = get("pixabay_api_key")

# --- TTS ---
ELEVENLABS_API_KEY = get("elevenlabs_api_key")
EDGE_TTS_VOICE = get("edge_tts_voice", "en-US-AriaNeural")

# --- Publishing ---
UPLOAD_POST_API_KEY = get("upload_post_api_key")

# --- Whisper ---
WHISPER_MODEL = get("whisper_model", "base")
WHISPER_DEVICE = get("whisper_device", "cpu")
WHISPER_COMPUTE = get("whisper_compute", "int8")

# --- Task queue ---
MAX_PENDING_TASKS = int(get("max_pending_tasks", 10))


def has_llm(provider: str) -> bool:
    return bool(
        {
            "gemini": GEMINI_API_KEY,
            "openai": OPENAI_API_KEY,
            "claude": ANTHROPIC_API_KEY,
            "deepseek": DEEPSEEK_API_KEY,
        }.get(provider)
    )
