'use client';

import { useEffect, useState } from 'react';

type Analytics = {
  credit_balance: number;
  projects_total: number;
  projects_completed: number;
  events_by_type: Record<string, number>;
  top_clips: Array<{ id: string; title: string; virality_score: number; status: string }>;
};

type Credits = { balance: number };

const ICONS = [
  'M3 5h18v14H3z',
  'M5 13l4 4L19 7',
  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
];

export const LiveStats = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const [a, c] = await Promise.all([
          fetch('/api/analytics', { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/credits', { cache: 'no-store' }).then(r => r.json()),
        ]);
        if (alive) {
          setAnalytics(a);
          setCredits(c);
        }
      } catch { /* backend offline — keep last values */ }
    };
    load();
    const t = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const total = analytics?.projects_total ?? 0;
  const done = analytics?.projects_completed ?? 0;
  const published = analytics?.events_by_type?.clip_scheduled ?? 0;
  const balance = credits?.balance ?? analytics?.credit_balance ?? 0;
  const pct = Math.min(100, Math.round((balance / 900) * 100));

  const stats = [
    { label: 'Projects', value: String(total) },
    { label: 'Completed', value: String(done) },
    { label: 'Published / scheduled', value: String(published) },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className="landing-border rounded-2xl border bg-black/30 p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/15">
              <svg viewBox="0 0 24 24" className="size-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={ICONS[i % ICONS.length]} />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          </div>
        </div>
      ))}
      {/* Live credit meter from the ledger */}
      <div className="landing-border rounded-2xl border bg-black/30 p-5">
        <div className="text-xs text-gray-400">Credits remaining</div>
        <div className="mt-1 text-2xl font-black text-white">{balance}</div>
        <div className="landing-track mt-2 h-1.5 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 text-right text-[10px] text-gray-500">
          {pct}
          % of 900
        </div>
      </div>
    </div>
  );
};
