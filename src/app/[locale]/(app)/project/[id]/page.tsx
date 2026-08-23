import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge, Card } from '@/components/app/ui';

export const metadata: Metadata = {
  title: 'Project Clips — VidStack',
  description: 'AI-scored clips with virality breakdown, metadata, hooks, and one-click export & publish.',
  robots: { index: false, follow: false },
};

const CLIPS = [
  {
    title: 'You are one decision away from a different life',
    score: 92,
    time: '12:34 – 13:02',
    hook: 'Nobody is coming to save you',
    tags: ['motivation', 'mindset', 'habits'],
    breakdown: { Hook: 95, Pacing: 90, Retention: 89, Trend: 92 },
    why: 'Strong contrarian hook in the first 2 seconds + rising emotional arc. High save-rate potential.',
  },
  {
    title: 'The 5 Second Rule, explained in 30s',
    score: 87,
    time: '28:11 – 28:48',
    hook: '5, 4, 3, 2, 1 — move',
    tags: ['productivity', '5secondrule'],
    breakdown: { Hook: 84, Pacing: 88, Retention: 90, Trend: 85 },
    why: 'Actionable framework with a countdown pattern that loops well on Shorts.',
  },
  {
    title: 'Why motivation never works',
    score: 84,
    time: '41:55 – 42:19',
    hook: 'You don\'t need motivation',
    tags: ['discipline', 'routine'],
    breakdown: { Hook: 90, Pacing: 80, Retention: 82, Trend: 83 },
    why: 'Myth-busting angle drives comments & debate — strong engagement signal.',
  },
];

const bar = (v: number) => (
  <div className="landing-track h-1.5 flex-1 overflow-hidden rounded-full">
    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{ width: `${v}%` }} />
  </div>
);

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Habits podcast ep.12</h1>
          <p className="text-sm text-gray-400">3 clips found · source 1:12:45</p>
        </div>
        {/* 9. Export to XML */}
        <button type="button" className="landing-border flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>
          Export XML (Premiere / AE)
        </button>
      </div>

      {CLIPS.map((c, i) => (
        <Card key={c.title}>
          <div className="grid gap-6 lg:grid-cols-[200px_1fr_260px]">
            {/* thumb */}
            <div className="relative flex aspect-[9/16] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 lg:aspect-auto lg:h-full">
              <svg viewBox="0 0 24 24" className="size-10 text-gray-600" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-gray-300">{c.time}</span>
            </div>

            {/* 8. metadata & hooks + 10. AI breakdown */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-white">{c.title}</h2>
                <Badge tone="indigo">
                  Clip
                  {i + 1}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.tags.map(t => (
                  <span key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400">
                    #
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  AI breakdown — why
                  {c.score}
                </div>
                <p className="mt-1 text-sm text-gray-300">{c.why}</p>
                <div className="mt-2 text-xs text-gray-500">
                  Suggested title:
                  <span className="text-gray-300">
                    {' '}
                    “
                    {c.hook}
                    ”
                  </span>
                </div>
              </div>
              {/* 7. quick actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {['Download', 'Edit', 'Export', 'Publish'].map(a => (
                  <Link
                    key={a}
                    href={a === 'Edit' ? '/edit/1' : '/project/1'}
                    className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                      a === 'Publish'
                        ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white'
                        : 'landing-border border text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {a}
                  </Link>
                ))}
              </div>
            </div>

            {/* 6. virality score */}
            <div className="landing-border rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-xl font-black text-emerald-400">
                  {c.score}
                </div>
                <div className="text-sm font-bold text-white">
                  Virality
                  <div className="text-xs font-normal text-gray-400">High potential</div>
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {Object.entries(c.breakdown).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-gray-400">{k}</span>
                    {bar(v)}
                    <span className="w-6 text-right font-mono text-gray-300">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
