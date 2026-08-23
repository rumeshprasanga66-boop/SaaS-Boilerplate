import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { TypingText } from '@/components/motion/TypingText';

// Swap this with the ID from your YouTube link, e.g. https://youtube.com/watch?v=VIDEO_ID
// Opus Clip Tutorial (Nick Nimmin, 117K views) — oEmbed-verified embeddable.
const HERO_YOUTUBE_ID = 'S-YZs5h32AY';

const STATS = [
  { value: 100, suffix: '+', label: 'clips generated' },
  { value: 4, suffix: '', label: 'platforms' },
  { value: 30, suffix: '+', label: 'languages' },
] as const;

export const Hero = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
    {/* YouTube background video — muted, looping, no controls */}
    <div className="absolute inset-0">
      <img
        src="/videos/hero-poster.jpg"
        alt="VidStack AI video editing interface preview"
        className="absolute inset-0 size-full object-cover"
      />
      <iframe
        title="Background showcase video"
        src={`https://www.youtube-nocookie.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_YOUTUBE_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`}
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[56.25vw] min-h-screen w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        tabIndex={-1}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]" />
    </div>

    <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 text-center">
      <Reveal>
        <div className="mx-auto mb-6 w-fit rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300">
          #1 AI Video Automation Platform
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
          Turn Any Video Into
          {' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            Viral Shorts
          </span>
          {' '}
          — Powered by AI
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <p className="mt-5 text-lg text-gray-300 sm:text-xl">
          Script. Clip. Publish. All in one platform.
          {' '}
          <TypingText
            phrases={['Face tracking built in.', 'Word-level subtitles.', 'Auto-post everywhere.', 'No editing skills needed.']}
            className="font-semibold text-emerald-400"
          />
        </p>
      </Reveal>

      <Reveal delay={300}>
        {/* URL input bar — paste a link, try it now */}
        <form
          action="#clip-anything"
          className="mx-auto mt-9 flex max-w-xl items-center gap-2 rounded-2xl border border-white/15 bg-black/40 p-2 backdrop-blur-md transition-colors focus-within:border-indigo-400/60"
        >
          <svg viewBox="0 0 24 24" className="ml-2 size-5 shrink-0 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
          <input
            type="url"
            placeholder="Paste a YouTube link — get 10 viral clips"
            aria-label="Paste a YouTube link"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="btn-gradient shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 px-5 py-2.5 text-sm font-bold text-white"
          >
            Get clips
          </button>
        </form>
        <div className="mt-3 text-xs text-gray-500">Free · No credit card · 60 min of video / month</div>

        <div className="mt-7 flex items-center justify-center gap-5 text-sm">
          <a href="#demo" className="flex items-center gap-2 font-semibold text-gray-300 transition-colors hover:text-white">
            <svg viewBox="0 0 24 24" className="size-4 text-emerald-400" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Demo
          </a>
          <span className="text-gray-700">·</span>
          <a href="#pricing" className="font-semibold text-gray-300 transition-colors hover:text-white">
            See Pricing →
          </a>
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-14 flex items-center justify-center gap-8 sm:gap-14">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white sm:text-4xl">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>

    {/* Scroll indicator */}
    <a href="#trust" aria-label="Scroll down" className="absolute bottom-8 z-10 text-gray-400 transition-colors hover:text-white">
      <svg viewBox="0 0 24 24" className="chevron-bounce size-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  </section>
);
