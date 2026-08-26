const CREATORS = [
  { name: 'Jay Shetty', avatar: 'https://i.pravatar.cc/64?img=11' },
  { name: 'Mel Robbins', avatar: 'https://i.pravatar.cc/64?img=47' },
  { name: 'Grant Cardone', avatar: 'https://i.pravatar.cc/64?img=13' },
  { name: 'Logan Paul', avatar: 'https://i.pravatar.cc/64?img=59' },
  { name: 'Ali Abdaal', avatar: 'https://i.pravatar.cc/64?img=15' },
  { name: 'MrBeast', avatar: 'https://i.pravatar.cc/64?img=3' },
  { name: 'Marques Brownlee', avatar: 'https://i.pravatar.cc/64?img=53' },
  { name: 'GaryVee', avatar: 'https://i.pravatar.cc/64?img=60' },
  { name: 'Emma Chamberlain', avatar: 'https://i.pravatar.cc/64?img=44' },
  { name: 'Peter McKinnon', avatar: 'https://i.pravatar.cc/64?img=51' },
  { name: 'Casey Neistat', avatar: 'https://i.pravatar.cc/64?img=17' },
  { name: 'Lilly Singh', avatar: 'https://i.pravatar.cc/64?img=32' },
  { name: 'Roberto Blake', avatar: 'https://i.pravatar.cc/64?img=68' },
  { name: 'Vanessa Lau', avatar: 'https://i.pravatar.cc/64?img=26' },
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
        {[...CREATORS, ...CREATORS].map((creator, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${creator.name}-${i}`}
            className="landing-faint hover:landing-strong flex items-center gap-3 text-xl font-bold tracking-tight transition-colors"
          >
            <img
              src={creator.avatar}
              alt={creator.name}
              width={36}
              height={36}
              className="size-9 rounded-full object-cover ring-2 ring-white/10"
            />
            {creator.name}
          </span>
        ))}
      </div>
    </div>
  </section>
);
