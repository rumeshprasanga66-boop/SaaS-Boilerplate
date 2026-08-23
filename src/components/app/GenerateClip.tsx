'use client';

import { useState } from 'react';

type JobStatus = {
  job_id: string;
  status: string;
  progress: number;
  current_step: string;
  video_url?: string | null;
  error_message?: string | null;
};

const STEP_LABELS: Record<string, string> = {
  queued: 'Queued',
  script: 'Writing script',
  render: 'Rendering video',
  subtitles: 'Generating subtitles',
  publish: 'Publishing',
  done: 'Done',
  error: 'Error',
};

export const GenerateClip = () => {
  const [input, setInput] = useState('');
  const [job, setJob] = useState<JobStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectType = (v: string) => {
    if (/youtube\.com|youtu\.be/.test(v)) {
      return 'youtube_url';
    }
    return 'script';
  };

  const poll = async (jobId: string) => {
    for (;;) {
      await new Promise(r => setTimeout(r, 1500));
      const res = await fetch(`/api/jobs/${jobId}`, { cache: 'no-store' });
      const data: JobStatus = await res.json();
      setJob(data);
      if (data.status === 'completed' || data.status === 'failed') {
        break;
      }
    }
    setBusy(false);
  };

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || busy) {
      return;
    }
    setBusy(true);
    setError(null);
    setJob(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input_type: detectType(input),
          input_data: input,
          llm_provider: 'gemini',
          output_format: 'vertical_9_16',
          voiceover: true,
          add_subtitles: true,
          face_tracking: true,
          language: 'en',
          publish_to: [],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail ?? 'Failed to start job');
      }
      setJob({ job_id: data.job_id, status: data.status, progress: 0, current_step: 'queued' });
      poll(data.job_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setBusy(false);
    }
  };

  return (
    <div>
      <form onSubmit={generate} className="flex flex-col gap-3 sm:flex-row">
        <div className="landing-border flex flex-1 items-center gap-3 rounded-xl border bg-black/30 px-4 py-3">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" />
          </svg>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste a YouTube URL or type a topic…"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? 'Working…' : 'Generate'}
        </button>
      </form>

      {error && (
        <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {error}
        </div>
      )}

      {job && (
        <div className="landing-border mt-4 rounded-xl border p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-white">
              {STEP_LABELS[job.current_step] ?? job.current_step}
            </span>
            <span className="font-mono text-xs text-gray-400">
              {job.progress}
              %
            </span>
          </div>
          <div className="landing-track mt-2 h-2 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${job.progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Job
            {' '}
            {job.job_id.slice(0, 8)}
            … ·
            {' '}
            {job.status}
          </div>

          {job.status === 'completed' && job.video_url && (
            <a
              href={job.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-400 hover:bg-emerald-500/25"
            >
              ▶ View clip
            </a>
          )}
          {job.status === 'failed' && (
            <div className="mt-2 text-sm text-red-400">{job.error_message}</div>
          )}
        </div>
      )}
    </div>
  );
};
