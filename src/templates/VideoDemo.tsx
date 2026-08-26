'use client';

import { useState } from 'react';

import { Reveal } from '@/components/motion/Reveal';

export const VideoDemo = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="demo" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-emerald-400">Demo</div>
          <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
            Watch It in Action
          </h2>
          <p className="landing-muted mx-auto mt-3 max-w-2xl">
            From a 45-minute podcast to ten publish-ready shorts — in under five minutes.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="glass-card relative mt-12 overflow-hidden rounded-3xl">
            <div className="relative aspect-video">
              {playing
                ? (
                    <iframe
                      title="VidStack demo — Mel Robbins, The Science of Making & Breaking Habits"
                      src="https://www.youtube-nocookie.com/embed/8dHEG7WxR4c?autoplay=1&rel=0&modestbranding=1"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                      className="absolute inset-0 size-full"
                    />
                  )
                : (
                    <>
                      <img
                        src="https://i.ytimg.com/vi/8dHEG7WxR4c/maxresdefault.jpg"
                        alt="VidStack workflow demo"
                        className="absolute inset-0 size-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#0A0A0A]/40" />
                      <button
                        type="button"
                        aria-label="Play demo"
                        onClick={() => setPlaying(true)}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <span className="pulse-ring absolute inset-0 rounded-full bg-indigo-500" />
                        <span className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-white shadow-2xl shadow-indigo-500/40 transition-transform hover:scale-110">
                          <svg viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                    </>
                  )}
            </div>

            {/* mock timeline bar */}
            <div className="landing-border flex items-center gap-3 border-t px-5 py-3">
              <span className="landing-faint text-xs font-medium">00:00</span>
              <div className="landing-track h-1.5 flex-1 overflow-hidden rounded-full">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" />
              </div>
              <span className="landing-faint text-xs font-medium">04:32</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
