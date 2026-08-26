'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Breakdown = { hook: number; flow: number; value: number; trend: number };
type Clip = {
  id: string;
  title: string;
  hook_text: string;
  transcript: string;
  duration_sec: number;
  virality_score: number;
  score_breakdown: Breakdown;
  status: string;
  video_url: string | null;
  aspect_ratio: string;
};
type Segment = { id: string; start_sec: number; end_sec: number; text: string; confidence: number };
type PublishJob = { id: string; platform: string; handle: string; status: string };
type Project = {
  id: string;
  title: string;
  input_type: string;
  input_data: string;
  status: string;
  progress: number;
  clips: Clip[];
};

const PLATFORM_LABELS = ['tiktok', 'instagram', 'youtube_shorts'];

const bar = (v: number) => (
  <div className="landing-track h-1.5 flex-1 overflow-hidden rounded-full">
    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{ width: `${v}%` }} />
  </div>
);

const fmtTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

const scoreTone = (v: number) =>
  v >= 80 ? 'text-emerald-400' : v >= 60 ? 'text-indigo-400' : 'text-yellow-400';

export const ProjectDetail = ({ projectId }: { projectId: string }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [segments, setSegments] = useState<Record<string, Segment[]>>({});
  const [publishJobs, setPublishJobs] = useState<Record<string, PublishJob[]>>({});
  const [publishing, setPublishing] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`, { cache: 'no-store' });
        if (res.ok && alive) {
          setProject(await res.json());
        }
      } catch { /* keep last */ }
    };
    load();
    const t = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [projectId]);

  const toggleTranscript = async (clipId: string) => {
    if (expanded === clipId) {
      setExpanded(null);
      return;
    }
    setExpanded(clipId);
    if (!segments[clipId]) {
      try {
        const res = await fetch(`/api/clips/${clipId}`, { cache: 'no-store' });
        const data = await res.json();
        setSegments(prev => ({ ...prev, [clipId]: data.segments ?? [] }));
        setPublishJobs(prev => ({ ...prev, [clipId]: data.publish_jobs ?? [] }));
      } catch { /* ignore */ }
    }
  };

  const publish = async (clipId: string) => {
    setPublishing(clipId);
    try {
      const res = await fetch(`/api/clips/${clipId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platforms: PLATFORM_LABELS }),
      });
      const data = await res.json();
      if (res.ok) {
        // refresh publish jobs for this clip
        const r = await fetch(`/api/clips/${clipId}`, { cache: 'no-store' });
        const d = await r.json();
        setPublishJobs(prev => ({ ...prev, [clipId]: d.publish_jobs ?? [] }));
      } else {
        console.error('publish failed', data);
      }
    } catch { /* ignore */ }
    setPublishing(null);
  };

  if (!project) {
    return (
      <div className="landing-border rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
        Loading project…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">{project.title || 'Untitled project'}</h1>
          <p className="text-sm text-gray-400">
            {project.clips.length}
            {' '}
            {project.clips.length === 1 ? 'clip' : 'clips'}
            {' · '}
            {project.input_type.replace('_', ' ')}
            {' · '}
            <span className="capitalize">{project.status}</span>
          </p>
        </div>
      </div>

      {project.clips.length === 0 && (
        <div className="landing-border rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
          {project.status === 'completed'
            ? 'No clips generated for this project.'
            : `Processing… ${project.progress}% — clips will appear here.`}
        </div>
      )}

      {project.clips.map((c, i) => {
        const segs = segments[c.id];
        const pubs = publishJobs[c.id] ?? [];
        return (
          <div key={c.id} className="glass-card rounded-2xl p-5">
            <div className="grid gap-6 lg:grid-cols-[200px_1fr_260px]">
              {/* player / thumb */}
              <div className="relative flex aspect-[9/16] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 lg:aspect-auto lg:h-full">
                {c.video_url
                  ? <video src={c.video_url} controls className="size-full object-cover"><track kind="captions" label="captions" /></video>
                  : <svg viewBox="0 0 24 24" className="size-10 text-gray-600" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-gray-300">
                  {fmtTime(c.duration_sec)}
                </span>
              </div>

              {/* metadata + actions */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-white">{c.title || `Clip ${i + 1}`}</h2>
                  <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Clip
                    {i + 1}
                  </span>
                </div>
                {c.hook_text && (
                  <div className="mt-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Hook</div>
                    <p className="mt-1 text-sm text-gray-300">
                      “
                      {c.hook_text}
                      ”
                    </p>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggleTranscript(c.id)}
                    className="landing-border rounded-lg border px-3.5 py-2 text-xs font-bold text-gray-300 hover:bg-white/5"
                  >
                    {expanded === c.id ? 'Hide transcript' : 'Transcript'}
                  </button>
                  <Link
                    href={`/edit/${c.id}`}
                    className="landing-border rounded-lg border px-3.5 py-2 text-xs font-bold text-gray-300 hover:bg-white/5"
                  >
                    Edit
                  </Link>
                  {c.video_url && (
                    <a href={c.video_url} download className="landing-border rounded-lg border px-3.5 py-2 text-xs font-bold text-gray-300 hover:bg-white/5">
                      Download
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => publish(c.id)}
                    disabled={publishing === c.id}
                    className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-3.5 py-2 text-xs font-bold text-white disabled:opacity-40"
                  >
                    {publishing === c.id ? 'Publishing…' : 'Publish'}
                  </button>
                </div>

                {/* transcript segments */}
                {expanded === c.id && segs && (
                  <div className="landing-border mt-4 max-h-48 space-y-1 overflow-y-auto rounded-xl border p-3">
                    {segs.map(seg => (
                      <div key={seg.id} className="flex gap-3 text-xs">
                        <span className="w-20 shrink-0 font-mono text-gray-500">
                          {fmtTime(seg.start_sec)}
                          {' → '}
                          {fmtTime(seg.end_sec)}
                        </span>
                        <span className="text-gray-300">{seg.text}</span>
                      </div>
                    ))}
                    {segs.length === 0 && (
                      <div className="text-xs text-gray-500">No transcript segments.</div>
                    )}
                  </div>
                )}

                {/* publish status */}
                {pubs.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pubs.map(pj => (
                      <span key={pj.id} className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {pj.platform}
                        {' · '}
                        {pj.status}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* virality score */}
              <div className="landing-border rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-xl font-black ${scoreTone(c.virality_score)}`}>
                    {c.virality_score}
                  </div>
                  <div className="text-sm font-bold text-white">
                    Virality
                    <div className="text-xs font-normal text-gray-400">
                      {c.virality_score >= 80 ? 'High potential' : c.virality_score >= 60 ? 'Good potential' : 'Average'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2.5">
                  {Object.entries(c.score_breakdown).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2 text-xs">
                      <span className="w-16 capitalize text-gray-400">{k}</span>
                      {bar(v)}
                      <span className="w-6 text-right font-mono text-gray-300">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
