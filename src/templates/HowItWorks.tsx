import { Reveal } from '@/components/motion/Reveal';

const STEP_IDS = ['step-input', 'step-ai-process', 'step-publish'];

const STEPS = [
  {
    number: '01',
    title: 'Input',
    description: 'Upload a video or paste a YouTube URL. VidStack ingests podcasts, webinars, vlogs — anything long-form.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Process',
    description: 'Face tracking, hook extraction, auto B-roll, and word-level subtitles — the AI cuts viral moments for you.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4c2.2.6 4 2.5 4 5a5 5 0 01-1 3M12 2a4 4 0 00-4 4c-2.2.6-4 2.5-4 5a5 5 0 001 3M12 2v20M8 14h8M9 18h6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Publish',
    description: 'One click auto-posts to TikTok, YouTube Shorts, Instagram Reels, and Facebook — or schedule for peak times.',
    icon: (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
] as const;

export const HowItWorks = () => (
  <section id="how-it-works" className="relative py-24">
    <div className="mx-auto max-w-6xl px-6">
      <Reveal className="text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-emerald-400">How It Works</div>
        <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
          Long Video to Viral Shorts in 3 Steps
        </h2>
        <p className="landing-muted mx-auto mt-3 max-w-2xl">
          No timeline scrubbing, no editing skills. The whole pipeline runs on autopilot.
        </p>
      </Reveal>

      <div className="relative mt-16 grid gap-10 md:grid-cols-3">
        {/* connecting line */}
        <div className="absolute inset-x-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent md:block" />
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 150} className="relative">
            <div id={STEP_IDS[i]} className="glass-card glass-card-hover relative scroll-mt-28 rounded-2xl p-8 text-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-1 text-sm font-extrabold text-white">
                {step.number}
              </div>
              <div className="mx-auto mt-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-indigo-300">
                {step.icon}
              </div>
              <h3 className="landing-strong mt-5 text-xl font-bold">{step.title}</h3>
              <p className="landing-muted mt-3 text-sm leading-relaxed">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
