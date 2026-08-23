from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class InputType(str, Enum):
    SCRIPT = "script"
    YOUTUBE_URL = "youtube_url"
    VIDEO_FILE = "video_file"
    VIDEO_URL = "video_url"  # direct MP4 link — no YouTube bot-check
    TEXT = "text"


class LLMProvider(str, Enum):
    GEMINI = "gemini"
    OPENAI = "openai"
    CLAUDE = "claude"
    DEEPSEEK = "deepseek"


class OutputFormat(str, Enum):
    VERTICAL_9_16 = "vertical_9_16"
    HORIZONTAL_16_9 = "horizontal_16_9"
    SQUARE_4_5 = "square_4_5"


class PublishingChannel(str, Enum):
    TIKTOK = "tiktok"
    INSTAGRAM = "instagram"
    YOUTUBE_SHORTS = "youtube_shorts"
    YOUTUBE_LONG = "youtube_long"


class HookType(str, Enum):
    NEGATIVE_FRAMING = "negative_framing"
    PATTERN_INTERRUPT = "pattern_interrupt"
    QUESTION = "question"
    CURIOSITY_GAP = "curiosity_gap"
    CONTRARIAN = "contrarian"


# Core Data Models
class ShortFormScript(BaseModel):
    hook_type: HookType
    hook_text: str = Field(description="First 3 seconds - aggressive, catchy")
    body_text: str = Field(description="Main value - short, punchy, <60 words")
    cta_text: str = Field(description="Call to action or open loop")
    visual_broll_cues: List[str] = Field(description="Visual directions")
    estimated_duration_seconds: int = Field(description="Expected duration")


class VideoGenerationJob(BaseModel):
    # Input
    input_type: InputType
    input_data: str = Field(description="URL, text, or file reference")

    # Processing
    llm_provider: LLMProvider = LLMProvider.GEMINI
    output_format: OutputFormat = OutputFormat.VERTICAL_9_16
    language: str = "en"
    add_subtitles: bool = True
    voiceover: bool = True
    auto_broll: bool = True
    face_tracking: bool = True

    # Publishing
    publish_to: List[PublishingChannel] = Field(default_factory=list)
    schedule_time: Optional[str] = None  # ISO format

    # Metadata
    title: str = ""
    description: str = ""
    tags: List[str] = []
    cover_image: Optional[str] = None

    # Output
    generated_script: Optional[ShortFormScript] = None
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    status: str = "processing"  # queued, processing, completed, failed
    progress: int = 0  # 0-100
    current_step: str = ""  # e.g. "script", "broll", "voiceover", "render", "subtitles", "publish"
    error_message: Optional[str] = None
    cost_cents: float = 0.0


class JobResponse(BaseModel):
    job_id: str
    status: str
    progress: int = 0
    current_step: str = ""
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    error_message: Optional[str] = None
    generated_script: Optional[ShortFormScript] = None
    cost_cents: float = 0.0


class PublishRequest(BaseModel):
    channels: List[PublishingChannel]
    schedule_time: Optional[str] = None


class PricingTier(BaseModel):
    name: str
    price_monthly_usd: int
    clips_per_month: str
    features: List[str]


PRICING_TIERS = [
    PricingTier(
        name="Starter",
        price_monthly_usd=19,
        clips_per_month="20",
        features=["Basic LLM", "1 publishing platform", "9:16 vertical output"],
    ),
    PricingTier(
        name="Pro",
        price_monthly_usd=49,
        clips_per_month="50",
        features=["GPT-4o", "3 platforms", "B-roll generation", "Word-level subtitles"],
    ),
    PricingTier(
        name="Creator",
        price_monthly_usd=99,
        clips_per_month="100",
        features=["All LLMs", "4 platforms", "Auto scheduling", "Multi-format output"],
    ),
    PricingTier(
        name="Agency",
        price_monthly_usd=199,
        clips_per_month="Unlimited",
        features=["Team seats", "White-label", "Full API access", "No watermark"],
    ),
    PricingTier(
        name="Enterprise",
        price_monthly_usd=499,
        clips_per_month="Unlimited",
        features=["Custom LLM", "SSO", "Priority support", "SLA"],
    ),
]
