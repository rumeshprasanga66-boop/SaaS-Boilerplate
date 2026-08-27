'use client';

import { useEffect, useState } from 'react';

type Task = { job_id: string; status: string; progress: number; current_step: string };
type JobDetail = { job_id?: string; video_url?: string | null; thumbnail_url?: string | null; generated_script?: { hook_text?: string } | null };

const badge = (status: string) => {
  if (status === 'completed') {
    return 'bg-emerald-500/15 text-emerald-400';
  }
  if (status === 'failed') {
    return 'bg-red-500/15 text-red-400';
  }
  return 'bg-yellow-500/15 text-yellow-400';
};

export const RecentProjects = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [details, setDetails] = useState<Record<string, JobDetail>>({});
  const [playing, setPlaying] = useState<JobDetail | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/tasks', { cache: 'no-store' });
        const data = await res.json();
        if (!alive) {
          return;
        }
        const list: Task[] = (data.tasks ?? []).slice(-6).reverse();
        setTasks(list);
        // fetch details for the most recent few
        for (const t of list.slice(0, 6)) {
          const r = await fetch(`/api/jobs/${t.job_id}`, { cache: 'no-store' });
          if (alive) {
            const d: JobDetail = await r.json();
            setDetails(prev => ({ ...prev, [t.job_id]: d }));
          }
        }
      } catch { /* ignore */ }
    };
    load();
    const t = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const open = (jobId: string) => {
    const d = details[jobId];
    if (d?.video_url) {
      setPlaying({ ...d, job_id: jobId });
    }
  };

  const [publishing, setPublishing] = useState<string | null>(null);
  const publish = async (jobId: string) => {
    setPublishing(jobId);
    try {
      await fetch(`/api/publish/${jobId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channels: ['tiktok', 'youtube'] }),
      });
    } catch { /* ignore */ }
    setPublishing(null);
  };

  return (
    <div>
      {tasks.length === 0
        ? (
            <div className="landing-border rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
              No projects yet — generate your first clip above.
            </div>
          )
        : (
            <div className="space-y-3">
              {tasks.map((t, i) => {
                const d = details[t.job_id];
                const title = d?.generated_script?.hook_text ?? `Clip ${t.job_id.slice(0, 8)}`;
                return (
                  <button
                    type="button"
                    key={t.job_id}
                    onClick={() => open(t.job_id)}
                    disabled={!d?.video_url}
                    className="landing-border flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition hover:bg-white/5 disabled:cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      {d?.thumbnail_url
                        ? <img src={d.thumbnail_url} alt={title} width={96} height={54} className="h-14 w-24 rounded-lg object-cover" />
                        : (
                            <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-950">
                              <svg viewBox="0 0 24 24" className="size-6 text-gray-600" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          )}
                      <div>
                        <div className="line-clamp-1 font-bold text-white">{title}</div>
                        <div className="font-mono text-xs text-gray-500">{t.current_step || t.job_id.slice(0, 8)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden w-32 sm:block">
                        <div className="landing-track h-1.5 overflow-hidden rounded-full">
                          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{ width: `${t.progress}%` }} />
                        </div>
                        <div className="mt-1 text-right text-[10px] text-gray-500">
                          {t.progress}
                          %
                        </div>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge(t.status)}`}>{t.status}</span>
                      <span className="text-xs text-gray-500">
                        #
                        {i + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

      {/* in-app player modal */}
      {playing?.video_url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm">
            <video
              src={playing.video_url}
              controls
              autoPlay
              className="aspect-[9/16] w-full rounded-2xl bg-black"
            >
              <track kind="captions" label="English captions" />
            </video>
            <div className="mt-3 flex gap-2">
              <a
                href={playing.video_url}
                download
                className="landing-border flex-1 rounded-xl border py-2.5 text-center text-sm font-medium text-gray-200 hover:bg-white/5"
              >
                Download
              </a>
              <button
                type="button"
                onClick={() => playing.job_id && publish(playing.job_id)}
                disabled={publishing === playing.job_id}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 py-2.5 text-sm font-bold text-white disabled:opacity-40"
              >
                {publishing === playing.job_id ? 'Publishing…' : 'Publish'}
              </button>
            </div>
            <button type="button" onClick={() => setPlaying(null)} className="landing-border mt-2 w-full rounded-xl border py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
