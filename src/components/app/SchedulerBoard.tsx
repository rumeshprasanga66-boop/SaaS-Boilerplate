'use client';

import { useEffect, useState } from 'react';

type SocialAccount = { id: string; platform: string; handle: string; status: string };
type Workspace = { social_accounts: SocialAccount[] };
type Clip = { id: string; title: string; status: string; virality_score: number };
type Project = { id: string; title: string; clips?: Clip[] };
type QueueItem = { clip: string; platform: string; status: string };

const PLATFORM_META: Record<string, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube_shorts: 'YouTube Shorts',
  youtube_long: 'YouTube',
};

const statusTone = (s: string) => {
  if (s === 'published') {
    return 'bg-emerald-500/15 text-emerald-400';
  }
  if (s === 'scheduled' || s === 'queued') {
    return 'bg-indigo-500/15 text-indigo-400';
  }
  return 'bg-white/10 text-gray-300';
};

export const SchedulerBoard = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [readyClips, setReadyClips] = useState<Array<{ id: string; title: string; score: number }>>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const ws: Workspace = await fetch('/api/workspace', { cache: 'no-store' }).then(r => r.json());
        const projectsRes = await fetch('/api/projects', { cache: 'no-store' }).then(r => r.json());
        if (!alive) {
          return;
        }
        setAccounts(ws.social_accounts ?? []);

        // Build queue + ready clips by scanning project clips
        const queueItems: QueueItem[] = [];
        const ready: Array<{ id: string; title: string; score: number }> = [];
        for (const p of (projectsRes.projects ?? []) as Project[]) {
          try {
            const detail = await fetch(`/api/projects/${p.id}`, { cache: 'no-store' }).then(r => r.json());
            for (const clip of detail.clips ?? []) {
              if (clip.status === 'scheduled' || clip.status === 'published') {
                queueItems.push({ clip: clip.title, platform: '—', status: clip.status });
              } else if (clip.status === 'ready') {
                ready.push({ id: clip.id, title: clip.title, score: clip.virality_score });
              }
            }
          } catch { /* skip */ }
        }
        if (alive) {
          setQueue(queueItems);
          setReadyClips(ready);
        }
      } catch { /* keep last */ }
    };
    load();
    const t = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const connected = new Set(accounts.filter(a => a.status === 'connected').map(a => a.platform));

  return (
    <div className="space-y-6">
      {/* Social accounts — live from the workspace */}
      <div className="glass-card rounded-2xl p-5">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">Social accounts</h2>
          <p className="mt-0.5 text-sm text-gray-400">Connected to the Demo Studio workspace.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(PLATFORM_META).map(([key, name]) => {
            const acc = accounts.find(a => a.platform === key);
            const isOn = connected.has(key);
            return (
              <div key={key} className="landing-border flex items-center gap-2 rounded-xl border px-4 py-2.5">
                <span className="text-sm font-medium text-white">{name}</span>
                {isOn && acc && <span className="font-mono text-xs text-gray-500">{acc.handle}</span>}
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${isOn ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-gray-300'}`}>
                  {isOn ? 'Connected' : 'Not connected'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Publish queue — live scheduled/published clips */}
        <div className="glass-card rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Publishing queue</h2>
            <p className="mt-0.5 text-sm text-gray-400">Clips that are scheduled or published.</p>
          </div>
          {queue.length === 0
            ? (
                <div className="landing-border rounded-xl border border-dashed p-6 text-center text-sm text-gray-500">
                  Nothing scheduled — publish a clip from its project page.
                </div>
              )
            : (
                <div className="space-y-3">
                  {queue.map((q, i) => (
                    <div key={`${q.clip}-${i}`} className="landing-border flex items-center justify-between gap-3 rounded-xl border p-3.5">
                      <div>
                        <div className="text-sm font-bold text-white">{q.clip}</div>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusTone(q.status)}`}>
                        {q.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
        </div>

        {/* Ready to publish — clips waiting */}
        <div className="glass-card rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Ready to publish</h2>
            <p className="mt-0.5 text-sm text-gray-400">Rendered clips not yet scheduled.</p>
          </div>
          {readyClips.length === 0
            ? (
                <div className="landing-border rounded-xl border border-dashed p-6 text-center text-sm text-gray-500">
                  No ready clips — generate a project first.
                </div>
              )
            : (
                <div className="space-y-3">
                  {readyClips.map(c => (
                    <div key={c.id} className="landing-border flex items-center justify-between gap-3 rounded-xl border p-3.5">
                      <div>
                        <div className="text-sm font-bold text-white">{c.title}</div>
                        <div className="text-xs text-gray-500">
                          Virality
                          {' '}
                          <span className="font-mono text-emerald-400">{c.score}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-300">
                        ready
                      </span>
                    </div>
                  ))}
                </div>
              )}
        </div>
      </div>
    </div>
  );
};
