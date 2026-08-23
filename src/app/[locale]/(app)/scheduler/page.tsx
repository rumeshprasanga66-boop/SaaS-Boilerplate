import type { Metadata } from 'next';

import { Badge, Card, SectionTitle } from '@/components/app/ui';

export const metadata: Metadata = {
  title: 'Scheduler — VidStack',
  description: 'Connect social accounts, drag-and-drop calendar, cross-platform publishing, and posting queue.',
  robots: { index: false, follow: false },
};

const PLATFORMS = [
  { name: 'TikTok', connected: true },
  { name: 'YouTube', connected: true },
  { name: 'Instagram', connected: true },
  { name: 'Facebook', connected: false },
  { name: 'LinkedIn', connected: false },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SCHEDULED: Record<number, Array<{ t: string; p: string }>> = {
  1: [{ t: '5s Rule clip', p: 'TikTok' }],
  3: [{ t: 'Decision clip', p: 'Shorts' }, { t: 'Motivation myth', p: 'Reels' }],
  5: [{ t: 'Habits hook', p: 'TikTok' }],
};

const QUEUE = [
  { clip: 'You are one decision away', when: 'Today 6:00 PM', platform: 'TikTok' },
  { clip: 'The 5 Second Rule', when: 'Wed 9:00 AM', platform: 'Shorts' },
  { clip: 'Why motivation fails', when: 'Wed 12:00 PM', platform: 'Reels' },
];

export default function SchedulerPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Scheduler</h1>
        {/* 23. cross-platform */}
        <button type="button" className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-2 text-sm font-bold text-white">
          Publish to all platforms
        </button>
      </div>

      {/* 21. social accounts */}
      <Card>
        <SectionTitle sub="Connect your accounts once.">Social accounts</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {PLATFORMS.map(p => (
            <div key={p.name} className="landing-border flex items-center gap-2 rounded-xl border px-4 py-2.5">
              <span className="text-sm font-medium text-white">{p.name}</span>
              <Badge tone={p.connected ? 'emerald' : 'gray'}>{p.connected ? 'Connected' : 'Connect'}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 22. calendar */}
        <Card className="lg:col-span-2">
          <SectionTitle sub="Drag clips onto a day to schedule.">Calendar</SectionTitle>
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-bold uppercase tracking-wider text-gray-500">{d}</div>
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="landing-border min-h-24 rounded-lg border p-1.5">
                <div className="text-[10px] text-gray-600">{i + 1}</div>
                <div className="mt-1 space-y-1">
                  {(SCHEDULED[i] ?? []).map(s => (
                    <div key={s.t} className="cursor-grab rounded bg-gradient-to-r from-indigo-500/30 to-emerald-500/20 px-1.5 py-1 text-[10px] font-medium text-white">
                      {s.t}
                      <span className="block text-[9px] text-emerald-300">{s.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          {/* 25. posting queue */}
          <Card>
            <SectionTitle sub="Upcoming scheduled posts.">Posting queue</SectionTitle>
            <div className="space-y-2.5">
              {QUEUE.map(q => (
                <div key={q.clip} className="landing-border rounded-lg border p-3">
                  <div className="text-sm font-bold text-white">{q.clip}</div>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                    <span>{q.when}</span>
                    <Badge tone="indigo">{q.platform}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 24. auto hashtags */}
          <Card>
            <SectionTitle sub="AI titles & hashtags per platform.">Auto metadata</SectionTitle>
            <div className="rounded-lg bg-black/30 p-3 text-sm">
              <div className="font-bold text-white">One decision away 🔑</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {['#motivation', '#mindset', '#habits', '#selfimprovement', '#5secondrule'].map(h => (
                  <span key={h} className="text-xs text-indigo-400">{h}</span>
                ))}
              </div>
            </div>
            <button type="button" className="landing-border mt-3 w-full rounded-lg border py-2 text-xs text-gray-300 hover:bg-white/5">Regenerate</button>
          </Card>
        </div>
      </div>
    </div>
  );
}
