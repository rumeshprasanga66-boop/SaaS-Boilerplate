import { Reveal } from '@/components/motion/Reveal';

export const CTA = () => (
  <section id="cta" className="relative overflow-hidden py-28">
    {/* Full-width gradient background */}
    <div className="cta-bg absolute inset-0" />
    <div className="bg-blueprint-dark absolute inset-0 opacity-60" />
    <div className="pointer-events-none absolute left-1/4 top-0 size-96 rounded-full bg-indigo-500/20 blur-[120px]" />
    <div className="pointer-events-none absolute bottom-0 right-1/4 size-96 rounded-full bg-emerald-500/20 blur-[120px]" />

    <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
      <h2 className="landing-strong text-3xl font-black sm:text-5xl">
        Ready to Turn Your Content Into Shorts?
      </h2>
      <p className="landing-muted mx-auto mt-4 max-w-xl text-lg">
        Join 10,000+ creators shipping daily without touching a timeline.
      </p>
      <div className="mt-9">
        <a
          href="#pricing"
          className="btn-gradient inline-block rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 px-10 py-4 text-lg font-bold text-white"
        >
          Start Free — No Credit Card
        </a>
        <p className="landing-faint mt-4 text-sm">
          ✓ 30-day money-back guarantee · ✓ Cancel anytime · ✓ No watermark
        </p>
      </div>
    </Reveal>
  </section>
);
