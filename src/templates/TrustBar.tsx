import { Reveal } from '@/components/motion/Reveal';

const PLATFORMS = [
  {
    name: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
        <path d="M19.6 6.7a5.1 5.1 0 01-3.7-4.2V2h-3.4v13.4a2.9 2.9 0 11-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 00-.9-.1 6.3 6.3 0 106.3 6.3V9.6a8.4 8.4 0 004.8 1.5V7.7c-.4 0-.8-.1-1.1-.2z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
        <path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.8.4c-.4.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.4 7.6.4s4.6 0 7.8-.4c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15V8.4l6.2 3.3L9.7 15z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm7.8-10.3a1.4 1.4 0 11-2.9 0 1.4 1.4 0 012.9 0z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
        <path d="M24 12a12 12 0 10-13.9 11.9v-8.4h-3v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0024 12z" />
      </svg>
    ),
  },
] as const;

/** Trust bar — platform wordmarks + creator count. */
export const TrustBar = () => (
  <section id="trust" className="landing-surface landing-border border-y py-12">
    <Reveal className="mx-auto max-w-5xl px-6 text-center">
      <p className="landing-faint text-sm font-medium uppercase tracking-[0.25em]">
        Used by 10,000+ creators worldwide
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
        {PLATFORMS.map(platform => (
          <div
            key={platform.name}
            className="landing-faint hover:landing-strong flex items-center gap-2.5 transition-colors duration-300"
          >
            {platform.icon}
            <span className="text-lg font-bold tracking-tight">{platform.name}</span>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);
