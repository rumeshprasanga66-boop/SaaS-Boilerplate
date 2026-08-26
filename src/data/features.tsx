import type { ReactNode } from 'react';

export type Feature = {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
  /** When set, the nav menu links here instead of the feature card anchor. */
  href?: string;
};

export const FEATURES: Feature[] = [
  {
    slug: 'clip-anything',
    title: 'ClipAnything™ Prompt Bar',
    description: 'Type what you want in plain English — the AI finds and clips the exact moment.',
    icon: <path d="M12 2a7 7 0 017 7c0 2.4-1.2 4.2-2.6 5.6-.9.9-1.4 2-1.4 3.4h-6c0-1.4-.5-2.5-1.4-3.4C6.2 13.2 5 11.4 5 9a7 7 0 017-7zM9 21h6" />,
    href: '/dashboard',
  },
  {
    slug: 'virality-score',
    title: 'Virality Score',
    description: 'Every clip is scored against millions of viral videos before you post.',
    icon: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
    href: '/project/1',
  },
  {
    slug: 'face-tracking',
    title: 'AI Face Tracking & Smart Crop',
    description: 'Keeps the speaker perfectly centered as 16:9 becomes 9:16 — frame by frame, automatically.',
    icon: <path d="M9 10a3 3 0 106 0 3 3 0 00-6 0zM3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />,
    href: '/edit/1',
  },
  {
    slug: 'script-pipeline',
    title: '4-Step Script Pipeline',
    description: 'Hook, body, CTA, render — type one idea and get a finished short with voiceover and captions.',
    icon: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h6" />,
    href: '/dashboard',
  },
  {
    slug: 'b-roll',
    title: 'Auto B-Roll Generation',
    description: 'Context-matched stock footage drops onto your timeline exactly where the script needs it.',
    icon: <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM2 9h20M7 4v5M17 4v5M10 13l5 3-5 3v-6z" />,
    href: '/edit/1',
  },
  {
    slug: 'multi-llm',
    title: 'Multi-LLM Support',
    description: 'Gemini, GPT-4, Claude — pick the brain behind your scripts, or let VidStack route to the best one.',
    icon: <path d="M12 2a7 7 0 017 7c0 2.4-1.2 4.2-2.6 5.6-.9.9-1.4 2-1.4 3.4h-6c0-1.4-.5-2.5-1.4-3.4C6.2 13.2 5 11.4 5 9a7 7 0 017-7zM9 21h6" />,
    href: '/dashboard',
  },
  {
    slug: 'subtitles',
    title: 'Word-Level Subtitles',
    description: 'Karaoke-accurate animated captions in 30+ languages that keep viewers watching to the end.',
    icon: <path d="M4 6h16M4 12h10M4 18h7" />,
    href: '/edit/1',
  },
  {
    slug: 'auto-publish',
    title: 'Auto-Publish to 4+ Platforms',
    description: 'TikTok, YouTube Shorts, Instagram Reels, Facebook — one render, everywhere at once.',
    icon: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
    href: '/scheduler',
  },
  {
    slug: 'scheduling',
    title: 'Scheduling & Calendar',
    description: 'Plan a month of content in one sitting. Posts go out at peak engagement times automatically.',
    icon: <path d="M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM9 14l2 2 4-4" />,
    href: '/scheduler',
  },
  {
    slug: 'batch',
    title: 'Batch Processing',
    description: 'Drop ten videos, get a hundred shorts. Queue entire seasons of content overnight.',
    icon: <path d="M4 6h16M4 12h16M4 18h16M8 6v0M8 12v0M8 18v0" strokeWidth="2.5" />,
    href: '/dashboard',
  },
  {
    slug: 'analytics',
    title: 'Analytics Dashboard',
    description: 'Views, retention, and growth across every platform in one place — know what hooks land.',
    icon: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
    href: '/settings',
  },
  {
    slug: 'transcript-editor',
    title: 'Text-Based Editor',
    description: 'Edit video like a doc — delete a sentence, delete that moment.',
    icon: <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />,
    href: '/edit/1',
  },
  {
    slug: 'caption-styles',
    title: 'Caption Style Suite',
    description: '12+ animated caption presets — karaoke, pop, news & more.',
    icon: <path d="M4 6h16M4 12h10M4 18h7M17 15l5 3-5 3v-6z" />,
    href: '/brand-templates',
  },
  {
    slug: 'credit-usage',
    title: 'Credit Usage Metrics',
    description: 'Real-time meters, per-action costs, and alerts before you run out.',
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
    href: '/settings',
  },
];
