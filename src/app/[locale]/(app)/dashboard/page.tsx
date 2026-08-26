import type { Metadata } from 'next';

import { GenerateClip } from '@/components/app/GenerateClip';
import { RecentProjects } from '@/components/app/RecentProjects';
import { Card, SectionTitle } from '@/components/app/ui';

export const metadata: Metadata = {
  title: 'Dashboard — VidStack',
  description: 'Create AI clips from YouTube links, raw uploads, text, or avatars. Track projects and credits.',
  robots: { index: false, follow: false },
};

const STATS = [
  { label: 'Active clips', value: '18', icon: 'M3 5h18v14H3z' },
  { label: 'Published', value: '142', icon: 'M5 13l4 4L19 7' },
  { label: 'Credits used', value: '22 min', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* 1. Input Bar (live — calls the backend) */}
      <Card>
        <SectionTitle sub="Paste a YouTube link or type a topic — the AI writes, renders & captions it.">
          Create a new clip
        </SectionTitle>
        <GenerateClip />
      </Card>

      {/* 5. Quick Stats + 4. Credits */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(s => (
          <Card key={s.label}>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/15">
                <svg viewBox="0 0 24 24" className="size-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            </div>
          </Card>
        ))}
        {/* 4. Credit usage */}
        <Card>
          <div className="text-xs text-gray-400">Credits remaining</div>
          <div className="mt-1 text-2xl font-black text-white">38 min</div>
          <div className="landing-track mt-2 h-1.5 overflow-hidden rounded-full">
            <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 2. Recent projects (live from backend) */}
        <Card className="lg:col-span-2">
          <SectionTitle sub="Your latest generated clips — click to play.">Recent projects</SectionTitle>
          <RecentProjects />
        </Card>

        {/* 3. ClipAnything prompt */}
        <Card>
          <SectionTitle sub="Tell the AI exactly what to clip.">ClipAnything™</SectionTitle>
          <textarea
            rows={4}
            placeholder="e.g. Find the moment where they explain the 5-second rule…"
            className="landing-border w-full rounded-xl border bg-black/30 p-3 text-sm text-white outline-none placeholder:text-gray-500"
          />
          <button type="button" className="mt-3 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 py-2.5 text-sm font-bold text-white">
            Clip it
          </button>
          <div className="mt-4 flex flex-wrap gap-2">
            {['the funniest moment', 'the hot take', 'the key insight'].map(s => (
              <span key={s} className="landing-border cursor-pointer rounded-full border px-3 py-1 text-xs text-gray-400 hover:text-white">{s}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
