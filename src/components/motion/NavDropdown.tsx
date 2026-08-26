'use client';

import type { NavMenu } from '@/data/navigation';

type Props = {
  menu: NavMenu;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  linkCls: string;
};

/** One top-level nav option with a mega-menu dropdown panel. */
export const NavDropdown = ({ menu, open, onToggle, onClose, linkCls }: Props) => (
  <li className="relative">
    <button
      type="button"
      aria-expanded={open}
      aria-haspopup="true"
      onClick={onToggle}
      className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkCls}`}
    >
      {menu.label}
      <svg viewBox="0 0 24 24" className={`size-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <div
      className={`absolute left-1/2 top-full mt-3 w-[34rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 transition-all duration-200 ${
        open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <div className="glass-panel rounded-2xl p-4 shadow-2xl shadow-black/50">
        <div className="grid grid-cols-2 gap-1">
          {menu.items.map(item => (
            <a
              key={item.href + item.title}
              href={item.href}
              onClick={onClose}
              className="landing-hover-bg group flex items-start gap-3 rounded-xl p-3 transition-colors"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/25 to-emerald-500/25 text-indigo-400 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </span>
              <span>
                <span className="landing-strong block text-sm font-semibold leading-tight">{item.title}</span>
                <span className="landing-faint mt-1 block text-xs leading-snug">{item.description}</span>
              </span>
            </a>
          ))}
        </div>
        <a
          href={menu.viewAllHref}
          onClick={onClose}
          className="landing-border mt-2 block border-t pt-3 text-center text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
        >
          {menu.viewAllLabel}
        </a>
      </div>
    </div>
  </li>
);
