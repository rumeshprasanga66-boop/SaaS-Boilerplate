import { Reveal } from '@/components/motion/Reveal';

const SUGGESTIONS = [
  'the funniest moment with the guest',
  'the hot take about AI replacing editors',
  'where they explain the $1M mistake',
  'the emotional story about starting over',
  'the controversial opinion on remote work',
  'the 3 tips every beginner needs',
];

const RESULTS = [
  { time: '12:34 – 13:02', clip: 'Mel Robbins: one decision away…', score: 92, tone: 'Motivation' },
  { time: '28:11 – 28:48', clip: 'Jay Shetty: purpose over pressure…', score: 87, tone: 'Wisdom' },
  { time: '41:55 – 42:19', clip: 'Mel: the 5 Second Rule…', score: 84, tone: 'Action' },
];

export const ClipAnythingPrompt = () => (
  <section id="clip-anything" className="relative py-24">
    <div className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[140px]" />
    <div className="relative mx-auto max-w-5xl px-6">
      <Reveal className="text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-emerald-400">ClipAnything™</div>
        <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
          Just Ask. We Clip It.
        </h2>
        <p className="landing-muted mx-auto mt-3 max-w-2xl">
          Type what you want in plain English. The AI watches your whole video and returns the exact moments you asked for.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="glass-card mt-12 rounded-3xl p-6 sm:p-8">
          {/* prompt input */}
          <div className="landing-border flex items-center gap-3 rounded-2xl border bg-black/30 px-5 py-4">
            <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a7 7 0 017 7c0 2.4-1.2 4.2-2.6 5.6-.9.9-1.4 2-1.4 3.4h-6c0-1.4-.5-2.5-1.4-3.4C6.2 13.2 5 11.4 5 9a7 7 0 017-7zM9 21h6" />
            </svg>
            <span className="landing-muted flex-1 text-sm sm:text-base">
              Find me
              {' '}
              <span className="landing-strong font-semibold">the funniest moment with the guest</span>
              …
            </span>
            <span className="animate-pulse text-emerald-400">|</span>
            <button type="button" className="btn-gradient shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-2 text-sm font-bold text-white">
              Clip it
            </button>
          </div>

          {/* suggestion chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <span key={s} className="landing-border landing-muted cursor-pointer rounded-full border px-3.5 py-1.5 text-xs transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                {s}
              </span>
            ))}
          </div>

          {/* results */}
          <div className="mt-8 space-y-3">
            <div className="landing-faint text-xs font-semibold uppercase tracking-widest">Found 3 clips</div>
            {RESULTS.map(r => (
              <div key={r.time} className="landing-border landing-hover-bg flex items-center gap-4 rounded-xl border p-4 transition-colors">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-emerald-500/20">
                  <svg viewBox="0 0 24 24" className="size-6 text-emerald-400" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="landing-strong truncate text-sm font-semibold">{r.clip}</div>
                  <div className="landing-faint mt-0.5 font-mono text-xs">
                    {r.time}
                    {' '}
                    ·
                    {' '}
                    {r.tone}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-400">{r.score}</div>
                  <div className="landing-faint text-[10px] uppercase tracking-wider">Virality</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
