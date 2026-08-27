'use client';

import { useEffect, useState } from 'react';

import { NavDropdown } from '@/components/motion/NavDropdown';
import { ThemeToggle } from '@/components/motion/ThemeToggle';
import { NAV_MENUS } from '@/data/navigation';

/** Fixed navbar — transparent over the hero, solid glass once scrolled. */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Over the (always dark) hero the nav keeps light text; once solid it follows the theme.
  const solid = scrolled || open;
  const linkCls = solid
    ? 'landing-muted hover:landing-strong'
    : 'text-gray-300 hover:text-white';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'navbar-solid border-b' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className={`flex items-center gap-2 text-xl font-bold ${solid ? 'landing-strong' : 'text-white'}`}>
          <svg className="size-7 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="12" width="6" height="8" rx="1" />
            <rect x="9" y="8" width="6" height="12" rx="1" />
            <rect x="15" y="4" width="6" height="16" rx="1" />
          </svg>
          VidStack
        </a>

        {/* Desktop: every option is a mega-menu dropdown */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_MENUS.map(menu => (
            <NavDropdown
              key={menu.id}
              menu={menu}
              open={openMenu === menu.id}
              onToggle={() => setOpenMenu(m => (m === menu.id ? null : menu.id))}
              onClose={() => setOpenMenu(null)}
              linkCls={linkCls}
            />
          ))}
        </ul>

        <div className={`hidden items-center gap-3 md:flex ${solid ? 'landing-strong' : 'text-white'}`}>
          <ThemeToggle />
          <a href="/sign-in" className="landing-border rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5">
            Log in
          </a>
          <a
            href="/sign-up"
            className="btn-gradient rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-5 py-2.5 text-sm font-bold text-white"
          >
            Start Free
          </a>
        </div>

        {/* Mobile hamburger + theme toggle */}
        <div className={`flex items-center gap-3 md:hidden ${solid ? 'landing-strong' : 'text-white'}`}>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu: every option is an accordion */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? 'max-h-[36rem] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <ul className="space-y-1 px-6 pb-5">
          {NAV_MENUS.map(menu => (
            <li key={menu.id}>
              <button
                type="button"
                aria-expanded={mobileOpenMenu === menu.id}
                onClick={() => setMobileOpenMenu(m => (m === menu.id ? null : menu.id))}
                className="landing-muted hover:landing-strong landing-hover-bg flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors"
              >
                {menu.label}
                <svg viewBox="0 0 24 24" className={`size-4 transition-transform duration-300 ${mobileOpenMenu === menu.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileOpenMenu === menu.id ? 'max-h-[42rem]' : 'max-h-0'}`}>
                {menu.items.map(item => (
                  <a
                    key={item.href + item.title}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="landing-muted hover:landing-strong landing-hover-bg flex items-center gap-3 rounded-lg px-3 py-2 pl-6 text-sm transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon}
                    </svg>
                    {item.title}
                  </a>
                ))}
                <a
                  href={menu.viewAllHref}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 pl-6 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  {menu.viewAllLabel}
                </a>
              </div>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-3 py-2.5 text-center font-bold text-white"
            >
              Start Free
            </a>
            <a
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="landing-border mt-2 block rounded-lg border px-3 py-2.5 text-center font-medium text-gray-200 hover:bg-white/5"
            >
              Log in
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
