'use client';

import { useState } from 'react';

import { Reveal } from '@/components/motion/Reveal';

const FAQS = [
  {
    q: 'How does VidStack turn a long video into shorts?',
    a: 'Drop in a YouTube URL or upload a file. The AI finds the strongest hooks, applies face-tracking crop to 9:16, adds word-level subtitles and B-roll, then hands you publish-ready clips.',
  },
  {
    q: 'Can I create a video from just a script or idea?',
    a: 'Yes. Type an idea and the 4-step pipeline writes the script (hook, body, CTA), generates a natural voiceover, matches B-roll, and renders the finished video.',
  },
  {
    q: 'Which platforms can I publish to?',
    a: 'TikTok, YouTube Shorts, Instagram Reels, and Facebook — auto-published or scheduled for peak engagement times.',
  },
  {
    q: 'Is there really a free plan?',
    a: 'Yes — 30 clips per month, no credit card, no watermark. Upgrade only when you need more volume or 4K exports.',
  },
  {
    q: 'What AI models power the scripts?',
    a: 'VidStack supports Gemini, GPT-4, and Claude. Pick your favorite or let the platform route each script to the best model.',
  },
  {
    q: 'Do I keep the rights to my clips?',
    a: 'Absolutely. You own 100% of everything VidStack renders for you, forever.',
  },
] as const;

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-indigo-400">FAQ</div>
          <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
            Questions, Answered
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="glass-card overflow-hidden rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="landing-strong landing-hover-bg flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`size-5 shrink-0 text-indigo-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="landing-muted px-6 pb-5 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
