import { Reveal } from '@/components/motion/Reveal';

const FACTORS = [
  { name: 'Hook strength', value: 94, color: 'from-emerald-500 to-emerald-400' },
  { name: 'Pacing & flow', value: 88, color: 'from-indigo-500 to-indigo-400' },
  { name: 'Trend alignment', value: 81, color: 'from-purple-500 to-purple-400' },
  { name: 'Shareability', value: 90, color: 'from-cyan-500 to-cyan-400' },
];

export const ViralityScore = () => (
  <section id="virality-score" className="relative py-24">
    <div className="pointer-events-none absolute left-0 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[140px]" />
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal direction="left">
          <div className="text-sm font-bold uppercase tracking-widest text-purple-400">Virality Score</div>
          <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
            Know If It'll Go Viral — Before You Post
          </h2>
          <p className="landing-muted mt-4 leading-relaxed">
            Every clip gets scored against millions of viral videos. Hook strength, pacing, trend alignment, and shareability — so you only publish winners.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Trained on 10M+ viral shorts across TikTok, Reels & YouTube',
              'Predicts retention drop-off second by second',
              'Ranks your clips so the best one always goes first',
            ].map(item => (
              <li key={item} className="landing-muted flex items-start gap-3 text-sm">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="glass-card rounded-3xl p-8">
            {/* big score */}
            <div className="flex items-center justify-center">
              <div className="relative flex size-44 items-center justify-center">
                <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset="29.4" />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center">
                  <div className="landing-strong text-5xl font-black">91</div>
                  <div className="landing-faint text-xs font-semibold uppercase tracking-widest">/ 100</div>
                </div>
              </div>
            </div>
            <div className="landing-strong mt-4 text-center text-sm font-bold text-emerald-400">High viral potential</div>

            {/* factor bars */}
            <div className="mt-8 space-y-4">
              {FACTORS.map(f => (
                <div key={f.name}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="landing-muted font-medium">{f.name}</span>
                    <span className="landing-strong font-bold">{f.value}</span>
                  </div>
                  <div className="landing-track h-2 overflow-hidden rounded-full">
                    <div className={`h-full rounded-full bg-gradient-to-r ${f.color}`} style={{ width: `${f.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
