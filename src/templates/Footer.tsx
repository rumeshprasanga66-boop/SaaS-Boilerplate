const LINK_GROUPS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Demo', 'Changelog'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Docs', 'API Reference', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Contact', 'Privacy', 'Terms'],
  },
] as const;

const SOCIALS = [
  {
    name: 'Twitter',
    icon: <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L2 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.4 3.8H5.6L17.8 20z" />,
  },
  {
    name: 'LinkedIn',
    icon: <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.2 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7 20.5H3.4V9H7v11.5z" />,
  },
  {
    name: 'YouTube',
    icon: <path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.8.4c-.4.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.4 7.6.4s4.6 0 7.8-.4c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15V8.4l6.2 3.3L9.7 15z" />,
  },
  {
    name: 'Discord',
    icon: <path d="M20.3 4.4A19.8 19.8 0 0015.4 3c-.2.4-.5.9-.6 1.3a18.3 18.3 0 00-5.5 0C9.1 3.9 8.8 3.4 8.6 3a19.7 19.7 0 00-4.9 1.5A20.3 20.3 0 00.1 18.1a19.9 19.9 0 006 3c.5-.7.9-1.4 1.3-2.1-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0012.2 0l.5.4c-.6.4-1.3.7-2 1 .4.7.8 1.4 1.3 2.1a19.8 19.8 0 006-3A20.2 20.2 0 0020.3 4.4zM8 15.3c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.5 8 10.5s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z" />,
  },
] as const;

export const Footer = () => (
  <footer className="landing-surface landing-border border-t">
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="landing-strong flex items-center gap-2 text-xl font-bold">
            <svg className="size-7 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="12" width="6" height="8" rx="1" />
              <rect x="9" y="8" width="6" height="12" rx="1" />
              <rect x="15" y="4" width="6" height="16" rx="1" />
            </svg>
            VidStack
          </div>
          <p className="landing-faint mt-3 max-w-xs text-sm">
            From script to short, to YouTube to Shorts — all in one place.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(social => (
              <a
                key={social.name}
                href="#top"
                aria-label={social.name}
                className="landing-border landing-muted hover:landing-strong flex size-9 items-center justify-center rounded-lg border transition-all hover:border-indigo-400/50"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {LINK_GROUPS.map(group => (
          <div key={group.title}>
            <div className="landing-strong text-sm font-bold uppercase tracking-wider">{group.title}</div>
            <ul className="mt-4 space-y-2.5">
              {group.links.map(link => (
                <li key={link}>
                  <a href="#top" className="landing-faint hover:landing-strong text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
        <p className="landing-faint text-xs">
          © 2026 VidStack. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
