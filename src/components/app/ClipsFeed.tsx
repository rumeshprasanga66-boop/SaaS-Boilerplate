'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Clip = {
  id: string;
  title: string;
  hook_text: string;
  duration_sec: number;
  virality_score: number;
  status: string;
  video_url: string | null;
};

type ProjectWithClips = {
  id: string;
  title: string;
  clips: Clip[];
};

const badge = (s: string) => {
  if (s === 'ready') {
    return 'bg-emerald-500/15 text-emerald-400';
  }
  if (s === 'scheduled' || s === 'published') {
    return 'bg-indigo-500/15 text-indigo-400';
  }
  return 'bg-white/10 text-gray-300';
};

export const ClipsFeed = () => {
  const [rows, setRows] = useState<Array<{ clip: Clip; projectId: string }>>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        const data = await res.json();
        const out: Array<{ clip: Clip; projectId: string }> = [];
        for (const p of (data.projects ?? []) as Array<{ id: string }>) {
          try {
            const detail: ProjectWithClips = await fetch(`/api/projects/${p.id}`, { cache: 'no-store' }).then(r => r.json());
            for (const clip of detail.clips ?? []) {
              out.push({ clip, projectId: p.id });
            }
          } catch { /* skip */ }
        }
        if (alive) {
          setRows(out);
          setLoaded(true);
        }
      } catch { /* keep */ }
    };
    load();
    const t = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  if (loaded && rows.length === 0) {
    return (
      <div className="landing-border rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
        No clips yet — generate a project from the dashboard.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map(({ clip, projectId }) => (
        <Link
          key={clip.id}
          href={`/project/${projectId}`}
          className="glass-card group rounded-2xl p-5 transition hover:bg-white/5"
        >
          <div className="relative mb-3 flex aspect-[9/16] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900/40 to-slate-950">
            {clip.video_url
              ? <video src={clip.video_url} className="size-full object-cover" muted />
              : <svg viewBox="0 0 24 24" className="size-8 text-gray-600" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
            <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-black text-emerald-400">
              {clip.virality_score}
            </span>
          </div>
          <div className="line-clamp-2 text-sm font-bold text-white">{clip.title}</div>
          {clip.hook_text && (
            <div className="mt-1 line-clamp-1 text-xs text-gray-500">
              “
              {clip.hook_text}
              ”
            </div>
          )}
          <div className="mt-2 flex items-center justify-between">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge(clip.status)}`}>
              {clip.status}
            </span>
            <span className="font-mono text-xs text-gray-500">
              {Math.round(clip.duration_sec)}
              s
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
