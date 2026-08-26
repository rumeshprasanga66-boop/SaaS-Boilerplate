import { Reveal } from '@/components/motion/Reveal';

export const TranscriptEditor = () => (
  <section id="transcript-editor" className="relative py-24">
    <div className="pointer-events-none absolute right-0 top-1/3 size-[36rem] translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal direction="left" className="order-2 lg:order-1">
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            {/* source video — autoplaying muted loop */}
            <div className="landing-border relative aspect-video overflow-hidden rounded-xl border">
              <iframe
                title="Mel Robbins — The Science of Making & Breaking Habits"
                src="https://www.youtube-nocookie.com/embed/8dHEG7WxR4c?autoplay=1&mute=1&loop=1&playlist=8dHEG7WxR4c&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3"
                allow="autoplay; encrypted-media"
                className="pointer-events-none absolute inset-0 size-full"
                tabIndex={-1}
              />
              <div className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                ● SOURCE
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={150} className="order-1 lg:order-2">
          <div className="text-sm font-bold uppercase tracking-widest text-indigo-400">Text-Based Editor</div>
          <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
            Edit Video Like a Google Doc
          </h2>
          <p className="landing-muted mt-4 leading-relaxed">
            Delete a sentence, delete that moment from the video. Highlight a quote, make it a clip. No timeline, no keyframes — just words.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Auto-removes filler words, silences, and dead air',
              'Highlight any sentence to spin it into its own short',
              'Search the transcript and jump straight to that frame',
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
      </div>
    </div>
  </section>
);
