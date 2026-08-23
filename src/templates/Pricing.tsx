'use client';

import { useState } from 'react';

import { Reveal } from '@/components/motion/Reveal';

const TIERS = [
  {
    name: 'Starter',
    monthly: 19,
    description: 'For creators testing the waters',
    ring: 'ring-sky-500/40',
    priceColor: 'text-sky-400',
    features: ['30 clips / month', '720p exports', '2 platforms', 'Word-level subtitles', 'No watermark'],
  },
  {
    name: 'Pro',
    monthly: 49,
    recommended: true,
    description: 'For serious creators growing fast',
    ring: 'ring-indigo-500/50',
    priceColor: 'text-indigo-400',
    features: ['150 clips / month', '1080p exports', '4 platforms', 'AI face tracking', 'Auto B-roll', 'Scheduling & calendar'],
  },
  {
    name: 'Creator',
    monthly: 99,
    description: 'For full-time content machines',
    ring: 'ring-violet-500/40',
    priceColor: 'text-violet-400',
    features: ['500 clips / month', '4K exports', 'All platforms', 'AI avatars', 'Batch processing', 'Analytics dashboard'],
  },
  {
    name: 'Agency',
    monthly: 199,
    description: 'For teams managing many brands',
    ring: 'ring-emerald-500/40',
    priceColor: 'text-emerald-400',
    features: ['Unlimited clips', '4K exports', 'All platforms', 'API access', 'Team seats (5)', 'Priority rendering', 'Dedicated support'],
  },
] as const;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[36rem] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-indigo-400">Pricing</div>
          <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
            Simple Pricing, Serious Output
          </h2>
          <p className="landing-muted mx-auto mt-3 max-w-2xl">
            Start free. Upgrade when the views start compounding.
          </p>
        </Reveal>

        {/* Monthly / Yearly toggle */}
        <Reveal delay={100} className="mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${yearly ? 'landing-faint' : 'landing-strong'}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            onClick={() => setYearly(y => !y)}
            className="landing-track relative h-7 w-14 rounded-full transition-colors"
          >
            <span
              className={`absolute top-1 size-5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all ${
                yearly ? 'left-8' : 'left-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${yearly ? 'landing-strong' : 'landing-faint'}`}>
            Yearly
            <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-400">
              Save 20%
            </span>
          </span>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => {
            const price = yearly ? Math.round(tier.monthly * 0.8) : tier.monthly;
            const recommended = 'recommended' in tier && tier.recommended;
            return (
              <Reveal key={tier.name} delay={i * 100}>
                <div
                  id={`plan-${tier.name.toLowerCase()}`}
                  className={`glass-card glass-card-hover relative flex h-full scroll-mt-28 flex-col rounded-2xl p-7 ring-1 ${tier.ring}`}
                >
                  {recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-1 text-xs font-bold text-white">
                      Most Popular
                    </div>
                  )}
                  <h3 className="landing-strong text-lg font-bold">{tier.name}</h3>
                  <p className="landing-faint mt-1 text-xs">{tier.description}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${tier.priceColor}`}>
                      $
                      {price}
                    </span>
                    <span className="landing-faint text-sm">/mo</span>
                  </div>
                  {yearly && (
                    <div className="mt-1 text-xs text-emerald-400 line-through opacity-70">
                      $
                      {tier.monthly}
                      /mo billed monthly
                    </div>
                  )}
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map(feature => (
                      <li key={feature} className="landing-muted flex items-center gap-2.5 text-sm">
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#cta"
                    className={`mt-8 rounded-xl py-3 text-center text-sm font-bold transition-all ${
                      recommended
                        ? 'btn-gradient bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 text-white'
                        : 'landing-border landing-strong landing-hover-bg border hover:border-indigo-400/50'
                    }`}
                  >
                    Start Free Trial
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className="landing-faint mt-10 text-center text-sm">
          30-day money-back guarantee · No credit card to start · Cancel anytime
        </Reveal>
      </div>
    </section>
  );
};
