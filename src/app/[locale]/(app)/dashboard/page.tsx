import type { Metadata } from 'next';

import { GenerateClip } from '@/components/app/GenerateClip';
import { LiveStats } from '@/components/app/LiveStats';
import { ProjectsList } from '@/components/app/ProjectsList';
import { Card, SectionTitle } from '@/components/app/ui';

export const metadata: Metadata = {
  title: 'Dashboard — VidStack',
  description: 'Create AI clips from YouTube links, raw uploads, text, or avatars. Track projects and credits.',
  robots: { index: false, follow: false },
};

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

      {/* Live stats + credit meter from the workflow DB */}
      <LiveStats />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 2. Projects (live from the workflow DB) */}
        <Card className="lg:col-span-2">
          <SectionTitle sub="Your latest projects — click to open clips & transcript.">Projects</SectionTitle>
          <ProjectsList />
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
