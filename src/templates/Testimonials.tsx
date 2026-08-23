import { Reveal } from '@/components/motion/Reveal';

const TESTIMONIALS = [
  {
    quote: 'It used to take my editor two days to cut one podcast into shorts. VidStack does it in four minutes — and the hooks it picks are better than ours.',
    name: 'Marcus Reid',
    role: 'Podcast Host',
    company: 'The Reid Cast · 890K subs',
    initials: 'MR',
    color: 'from-indigo-500 to-violet-500',
    metric: { value: '48×', label: 'faster clipping' },
  },
  {
    quote: 'I was skeptical about AI video tools. Then VidStack scheduled a month of TikToks from three YouTube videos. My watch time doubled.',
    name: 'Sofia Almeida',
    role: 'Fitness Creator',
    company: '2.1M followers',
    initials: 'SA',
    color: 'from-violet-500 to-emerald-500',
    metric: { value: '2×', label: 'watch time' },
  },
  {
    quote: 'We run 14 brand channels. One render gives us Shorts, Reels, and feed posts. VidStack paid for itself in week one.',
    name: 'Daniel Kim',
    role: 'Head of Content',
    company: 'Streamly Media',
    initials: 'DK',
    color: 'from-emerald-500 to-teal-500',
    metric: { value: '1 wk', label: 'to positive ROI' },
  },
  {
    quote: 'The word-level subtitles alone are worth it. Retention on my Shorts went from 41% to 68% in a month.',
    name: 'Aisha Okafor',
    role: 'Educator',
    company: '640K subscribers',
    initials: 'AO',
    color: 'from-pink-500 to-indigo-500',
    metric: { value: '+66%', label: 'retention' },
  },
] as const;

const StarRow = () => (
  <div className="flex gap-0.5 text-amber-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
      </svg>
    ))}
  </div>
);

export const Testimonials = () => (
  <section id="testimonials" className="relative py-24">
    <div className="mx-auto max-w-6xl px-6">
      <Reveal className="text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-emerald-400">Reviews</div>
        <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
          Loved by 10,000+ Creators
        </h2>
        <p className="landing-muted mx-auto mt-3 max-w-2xl">
          Real growth, real numbers — from people who ship content every week.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 100} direction={i % 2 === 0 ? 'left' : 'right'}>
            <figure id={`review-${t.name.split(' ')[0]?.toLowerCase()}`} className="glass-card glass-card-hover relative flex h-full scroll-mt-28 flex-col rounded-2xl p-7">
              <div className="flex items-start justify-between gap-4">
                <StarRow />
                {/* ROI metric badge */}
                <div className={`shrink-0 rounded-xl bg-gradient-to-br px-3.5 py-2 text-center text-white ${t.color}`}>
                  <div className="text-xl font-black leading-none">{t.metric.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider opacity-90">{t.metric.label}</div>
                </div>
              </div>
              <blockquote className="landing-muted mt-4 flex-1 leading-relaxed">
                “
                {t.quote}
                ”
              </blockquote>
              <figcaption className="landing-border mt-6 flex items-center gap-3 border-t pt-5">
                <div className={`flex size-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="landing-strong text-sm font-bold">{t.name}</div>
                  <div className="landing-faint text-xs">
                    {t.role}
                    {' '}
                    ·
                    {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
