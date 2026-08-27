'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  input_type: string;
  status: string;
  progress: number;
  current_step: string;
  clip_count: number;
  created_at: number;
};

const badge = (status: string) => {
  if (status === 'completed') {
    return 'bg-emerald-500/15 text-emerald-400';
  }
  if (status === 'failed') {
    return 'bg-red-500/15 text-red-400';
  }
  return 'bg-yellow-500/15 text-yellow-400';
};

const timeAgo = (ts: number) => {
  const s = Math.max(1, Math.floor(Date.now() / 1000 - ts));
  if (s < 60) {
    return `${s}s ago`;
  }
  if (s < 3600) {
    return `${Math.floor(s / 60)}m ago`;
  }
  if (s < 86400) {
    return `${Math.floor(s / 3600)}h ago`;
  }
  return `${Math.floor(s / 86400)}d ago`;
};

export const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        const data = await res.json();
        if (alive) {
          setProjects(data.projects ?? []);
        }
      } catch { /* keep last */ }
    };
    load();
    const t = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  if (projects.length === 0) {
    return (
      <div className="landing-border rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
        No projects yet — generate your first clip above.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map(p => (
        <a
          key={p.id}
          href={`/project/${p.id}`}
          className="landing-border flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition hover:bg-white/5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-900/60 to-slate-950">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                {p.input_type.replace('_', ' ')}
              </span>
            </div>
            <div>
              <div className="line-clamp-1 font-bold text-white">{p.title || 'Untitled project'}</div>
              <div className="font-mono text-xs text-gray-500">
                {p.current_step || 'queued'}
                {' · '}
                {p.clip_count}
                {' '}
                {p.clip_count === 1 ? 'clip' : 'clips'}
                {' · '}
                {timeAgo(p.created_at)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden w-32 sm:block">
              <div className="landing-track h-1.5 overflow-hidden rounded-full">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{ width: `${p.progress}%` }} />
              </div>
              <div className="mt-1 text-right text-[10px] text-gray-500">
                {p.progress}
                %
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge(p.status)}`}>{p.status}</span>
          </div>
        </a>
      ))}
    </div>
  );
};
