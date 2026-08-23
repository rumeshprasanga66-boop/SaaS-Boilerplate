const CREATORS = [
  'Jay Shetty',
  'Mel Robbins',
  'Grant Cardone',
  'Logan Paul',
  'Ali Abdaal',
  'MrBeast',
  'Marques Brownlee',
  'GaryVee',
  'Emma Chamberlain',
  'Peter McKinnon',
  'Casey Neistat',
  'Lilly Singh',
  'Roberto Blake',
  'Vanessa Lau',
];

/** Continuous scrolling creator marquee — opus.pro-style logowall. */
export const LogoMarquee = () => (
  <section aria-label="Trusted by top creators" className="landing-surface landing-border overflow-hidden border-y py-10">
    <p className="landing-faint px-6 text-center text-sm font-medium uppercase tracking-[0.25em]">
      Trusted by 16M+ creators &amp; brands
    </p>
    <div className="relative mt-7">
      {/* fade edges */}
      <div className="landing-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-24" />
      <div className="landing-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-24" />
      <div className="marquee-track flex w-max items-center gap-14 whitespace-nowrap px-6">
        {[...CREATORS, ...CREATORS].map((name, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${name}-${i}`}
            className="landing-faint hover:landing-strong flex items-center gap-2.5 text-xl font-bold tracking-tight transition-colors"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-[11px] font-black text-white">
              {name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);
