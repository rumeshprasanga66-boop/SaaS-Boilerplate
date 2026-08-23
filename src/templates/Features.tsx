import { Reveal } from '@/components/motion/Reveal';
import type { Feature } from '@/data/features';
import { FEATURES } from '@/data/features';

// Flagship features get large bento cards with media mockups, keyed by slug.
const FLAGSHIP: Record<string, { className: string; mockup: React.ReactNode }> = {
  'clip-anything': {
    className: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
    mockup: (
      <div className="mt-6 space-y-2">
        {[
          ['the funniest moment…', 92],
          ['the $1M mistake…', 87],
          ['starting over at 30…', 84],
        ].map(([label, score]) => (
          <div key={label} className="landing-border flex items-center justify-between rounded-lg border bg-black/20 px-3 py-2 text-xs">
            <span className="landing-muted font-mono">{label}</span>
            <span className="font-black text-emerald-400">{score}</span>
          </div>
        ))}
      </div>
    ),
  },
  'face-tracking': {
    className: 'lg:row-span-2',
    mockup: (
      <div className="mt-6 flex items-end justify-center gap-2">
        <div className="flex h-20 w-12 items-center justify-center rounded-md bg-indigo-500/20 text-[10px] font-bold text-indigo-300">16:9</div>
        <svg viewBox="0 0 24 24" className="mb-8 size-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-6-6l6 6-6 6" /></svg>
        <div className="relative flex h-28 w-16 items-center justify-center rounded-md border border-emerald-400/50 bg-emerald-500/10">
          <div className="absolute size-8 rounded-full border-2 border-emerald-400/70 bg-emerald-400/20" />
          <span className="absolute -bottom-4 text-[9px] font-bold text-emerald-400">9:16 auto-crop</span>
        </div>
      </div>
    ),
  },
  'virality-score': {
    className: 'sm:col-span-2 lg:col-span-1',
    mockup: (
      <div className="mt-6 flex items-center gap-3">
        <div className="landing-strong text-4xl font-black text-emerald-400">91</div>
        <div className="flex-1 space-y-1.5">
          {[94, 88, 81].map((v, i) => (
            <div key={i} className="landing-track h-1.5 overflow-hidden rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: `${v}%` }} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  'subtitles': {
    className: 'lg:col-span-1',
    mockup: (
      <div className="mt-6 text-center">
        <span className="text-lg font-black">
          <span className="text-yellow-400">WORD</span>
          <span className="landing-strong">-LEVEL CAPTIONS</span>
        </span>
      </div>
    ),
  },
  'auto-publish': {
    className: 'sm:col-span-2 lg:col-span-2',
    mockup: (
      <div className="mt-6 flex items-center justify-center gap-3">
        {['TikTok', 'Shorts', 'Reels', 'FB'].map(p => (
          <div key={p} className="landing-border landing-muted rounded-full border px-3.5 py-1.5 text-xs font-semibold">{p}</div>
        ))}
        <svg viewBox="0 0 24 24" className="size-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-6-6l6 6-6 6" /></svg>
      </div>
    ),
  },
};

const FeatureCard = ({ feature, delay }: { feature: Feature; delay: number }) => {
  const flagship = FLAGSHIP[feature.slug];
  return (
    <Reveal delay={delay} className={flagship?.className}>
      <div id={`feature-${feature.slug}`} className="glass-card glass-card-hover flex h-full scroll-mt-28 flex-col rounded-2xl p-7">
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-emerald-500/25 text-indigo-300">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {feature.icon}
          </svg>
        </div>
        <h3 className="landing-strong mt-5 text-lg font-bold">{feature.title}</h3>
        <p className="landing-muted mt-2 text-sm leading-relaxed">{feature.description}</p>
        {flagship?.mockup}
      </div>
    </Reveal>
  );
};

export const Features = () => (
  <section id="features" className="relative py-24">
    {/* ambient glow */}
    <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
    <div className="relative mx-auto max-w-6xl px-6">
      <Reveal className="text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-indigo-400">AI Editing Models</div>
        <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
          Everything You Need to Go Viral
        </h2>
        <p className="landing-muted mx-auto mt-3 max-w-2xl">
          One platform replaces your editor, captioning tool, scheduler, and analytics suite.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.slug} feature={feature} delay={(i % 3) * 100} />
        ))}
      </div>
    </div>
  </section>
);
