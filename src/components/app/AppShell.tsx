'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { href: '/clips', label: 'Clips Feed', icon: 'M4 6h16M4 12h16M4 18h7' },
  { href: '/edit', label: 'Video Editor', icon: 'M3 5h18v14H3zM8 5v14m8-14v14M3 12h18' },
  { href: '/brand-templates', label: 'Brand Kits', icon: 'M12 2l2.6 5.6 6 .7-4.5 4.1 1.2 5.9-5.3-3-5.3 3 1.2-5.9L3.4 8.3l6-.7L12 2z' },
  { href: '/scheduler', label: 'Scheduler', icon: 'M8 2v4m8-4v4M3 9h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
  { href: '/settings', label: 'Team & Settings', icon: 'M12 12a3 3 0 100-6 3 3 0 000 6zm7 3a7 7 0 10-14 0h14z' },
];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    const seg = `/${href.split('/')[1]}`;
    return pathname.startsWith(seg);
  };

  const navLinks = (
    <nav className="space-y-1">
      {NAV.map(item => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive(item.href)
              ? 'bg-gradient-to-r from-indigo-500/20 to-emerald-500/10 text-white ring-1 ring-indigo-500/30'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={item.icon} />
          </svg>
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="theme-dark landing-page flex min-h-screen bg-[#0A0A0A] text-white antialiased">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/10 bg-[#0d0d0f] md:flex">
        <Link href="/" className="flex items-center gap-2 px-6 py-5">
          <svg viewBox="0 0 24 24" className="size-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />
          </svg>
          <span className="text-lg font-black tracking-tight">VidStack</span>
        </Link>

        <div className="mt-2 flex-1 px-3">{navLinks}</div>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500/15 to-emerald-500/10 p-3">
            <div className="text-xs font-bold text-white">Free plan</div>
            <div className="mt-0.5 text-[11px] text-gray-400">38 / 60 min left</div>
            <div className="landing-track mt-2 h-1.5 overflow-hidden rounded-full">
              <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" />
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col md:pl-60">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0d0d0f]/80 px-5 py-3 backdrop-blur">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-gray-300 hover:bg-white/5 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <Link href="/" className="hidden items-center gap-2 md:hidden">
            <span className="text-lg font-black">VidStack</span>
          </Link>
          <div className="hidden text-sm text-gray-400 md:block">
            {NAV.find(n => isActive(n.href))?.label ?? 'App'}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
            >
              + New clip
            </Link>
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-sm font-bold">
              R
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>

      {/* mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-white/10 bg-[#0d0d0f] p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-black">VidStack</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            {navLinks}
          </div>
        </div>
      )}
    </div>
  );
};
