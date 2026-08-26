import { Reveal } from '@/components/motion/Reveal';

// Vertical clip backgrounds — reused across the 4 preset cards.
// Swap these IDs with vertical Shorts links for the closest fit.
const VIDEO_IDS = ['8dHEG7WxR4c', 'S-YZs5h32AY', '8dHEG7WxR4c', 'S-YZs5h32AY'];

const ytEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`;

const STYLES = [
  {
    name: 'Karaoke',
    tag: 'Most viral',
    render: (
      <span className="text-xl font-black">
        <span className="text-yellow-400">THIS</span>
        {' '}
        <span className="text-white">IS HOW</span>
      </span>
    ),
  },
  {
    name: 'Pop',
    tag: 'High energy',
    render: (
      <span className="text-xl font-black uppercase tracking-wide text-white [text-shadow:0_2px_0_#000,0_0_24px_rgba(236,72,153,0.8)]">
        <span className="text-pink-400">BOLD</span>
        {' '}
        MOVES
      </span>
    ),
  },
  {
    name: 'Minimal',
    tag: 'Clean',
    render: (
      <span className="text-lg font-medium tracking-wide text-gray-200">
        subtle and
        {' '}
        <span className="border-b-2 border-emerald-400 font-bold text-white">sharp</span>
      </span>
    ),
  },
  {
    name: 'News',
    tag: 'Authority',
    render: (
      <span className="text-lg font-bold uppercase text-white">
        <span className="bg-red-600 px-2 py-0.5">BREAKING:</span>
        {' '}
        <span className="bg-black/70 px-2 py-0.5">YOU NEED THIS</span>
      </span>
    ),
  },
];

export const CaptionStyles = () => (
  <section id="caption-styles" className="relative py-24">
    <div className="relative mx-auto max-w-6xl px-6">
      <Reveal className="text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-yellow-400">Caption Style Suite</div>
        <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
          Captions That Stop the Scroll
        </h2>
        <p className="landing-muted mx-auto mt-3 max-w-2xl">
          12+ animated caption presets — the exact styles behind the biggest creators on TikTok and Shorts. One click to apply.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STYLES.map((s, i) => (
          <Reveal key={s.name} delay={i * 100}>
            <div className="glass-card glass-card-hover flex h-full flex-col rounded-2xl p-5">
              {/* 9:16 animated video preview */}
              <div className="relative flex aspect-[9/16] items-center justify-center overflow-hidden rounded-xl bg-slate-950">
                <iframe
                  title={`${s.name} caption preview`}
                  src={ytEmbed(VIDEO_IDS[i]!)}
                  allow="autoplay; encrypted-media"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[177.78%] w-full -translate-x-1/2 -translate-y-1/2"
                  tabIndex={-1}
                />
                {/* darken so caption pops */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-[22%] text-center">
                  {s.render}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="landing-strong text-sm font-bold">{s.name}</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">{s.tag}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center" delay={200}>
        <span className="landing-faint text-sm">+ 8 more styles, custom fonts, brand colors &amp; keyword highlighting</span>
      </Reveal>
    </div>
  </section>
);
