import type { ReactNode } from 'react';

import { FEATURES } from '@/data/features';

export type NavItem = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export type NavMenu = {
  id: string;
  label: string;
  viewAllHref: string;
  viewAllLabel: string;
  items: NavItem[];
};

const STEP_ICONS = [
  <path key="1" d="M4 16v3a1 1 0 001 1h3M16 4h3a1 1 0 011 1v3M4 4l7 7M20 20l-7-7" />,
  <path key="2" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
  <path key="3" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
];

export const NAV_MENUS: NavMenu[] = [
  {
    id: 'how-it-works',
    label: 'How it works',
    viewAllHref: '/dashboard',
    viewAllLabel: 'Open the app →',
    items: [
      {
        href: '/dashboard',
        title: 'Input',
        description: 'Upload a video or paste a YouTube URL — podcasts, webinars, vlogs.',
        icon: STEP_ICONS[0],
      },
      {
        href: '/edit/1',
        title: 'AI Process',
        description: 'Face tracking, hook extraction, auto B-roll, word-level subtitles.',
        icon: STEP_ICONS[1],
      },
      {
        href: '/scheduler',
        title: 'Publish',
        description: 'One click auto-posts to TikTok, Shorts, Reels, and Facebook.',
        icon: STEP_ICONS[2],
      },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    viewAllHref: '/dashboard',
    viewAllLabel: 'Open the app →',
    items: FEATURES.map(f => ({
      href: f.href ?? `#feature-${f.slug}`,
      title: f.title,
      description: f.description,
      icon: f.icon,
    })),
  },
  {
    id: 'demo',
    label: 'Demo',
    viewAllHref: '/edit/1',
    viewAllLabel: 'Open the editor →',
    items: [
      {
        href: '/project/1',
        title: 'Watch It in Action',
        description: 'From a 45-minute podcast to ten publish-ready shorts in five minutes.',
        icon: <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM10 9l5 3-5 3V9z" />,
      },
      {
        href: '/edit/1',
        title: 'The Editor',
        description: 'Transcript editing, reframe, captions, B-roll — all in one studio.',
        icon: STEP_ICONS[1],
      },
      {
        href: '/scheduler',
        title: 'One-Click Publish',
        description: 'See how a finished render reaches every platform at once.',
        icon: STEP_ICONS[2],
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    viewAllHref: '#pricing',
    viewAllLabel: 'Compare all plans →',
    items: [
      {
        href: '#plan-starter',
        title: 'Starter — $19/mo',
        description: '30 clips, 720p exports, 2 platforms. For creators testing the waters.',
        icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
      },
      {
        href: '#plan-pro',
        title: 'Pro — $49/mo',
        description: '150 clips, 1080p, 4 platforms, AI face tracking. Most popular.',
        icon: <path d="M12 2l3 6.5 7 .8-5.2 4.7 1.5 6.9L12 17.5 5.7 21l1.5-7L2 9.3l7-.8L12 2z" />,
      },
      {
        href: '#plan-creator',
        title: 'Creator — $99/mo',
        description: '500 clips, 4K exports, AI avatars, batch processing.',
        icon: <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M8 2h8v4H8V2z" />,
      },
      {
        href: '#plan-agency',
        title: 'Agency — $199/mo',
        description: 'Unlimited clips, API access, 5 team seats, priority rendering.',
        icon: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
      },
    ],
  },
  {
    id: 'reviews',
    label: 'Reviews',
    viewAllHref: '#testimonials',
    viewAllLabel: 'Read all reviews →',
    items: [
      {
        href: '#review-marcus',
        title: 'Marcus Reid',
        description: 'Podcast host · 890K subs — "VidStack does it in four minutes."',
        icon: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 12a4 4 0 118 0M8 12H4m16 0h-4" />,
      },
      {
        href: '#review-sofia',
        title: 'Sofia Almeida',
        description: 'Fitness creator · 2.1M followers — "My watch time doubled."',
        icon: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 12a4 4 0 118 0M8 12H4m16 0h-4" />,
      },
      {
        href: '#review-daniel',
        title: 'Daniel Kim',
        description: 'Head of Content · Streamly Media — "Paid for itself in week one."',
        icon: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 12a4 4 0 118 0M8 12H4m16 0h-4" />,
      },
      {
        href: '#review-aisha',
        title: 'Aisha Okafor',
        description: 'Educator · 640K subs — "Retention went from 41% to 68%."',
        icon: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 12a4 4 0 118 0M8 12H4m16 0h-4" />,
      },
    ],
  },
];

export const SUPPORT_LINKS = [
  { href: '/support#docs', title: 'Docs', description: 'Guides and API reference.' },
  { href: '/support#guides', title: 'Guides', description: 'Step-by-step tutorials.' },
  { href: '/support#api', title: 'API Reference', description: 'REST endpoints and webhooks.' },
  { href: '/support#status', title: 'Status', description: 'Uptime and incident history.' },
];
