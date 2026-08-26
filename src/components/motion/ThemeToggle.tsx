'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'vidstack-theme';

/** Sun/moon toggle — flips #landing-root between .theme-dark and .theme-light. */
export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) === 'light';
    setLight(saved);
    const root = document.getElementById('landing-root');
    if (root) {
      root.classList.toggle('theme-light', saved);
      root.classList.toggle('theme-dark', !saved);
    }
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    localStorage.setItem(STORAGE_KEY, next ? 'light' : 'dark');
    const root = document.getElementById('landing-root');
    if (root) {
      root.classList.toggle('theme-light', next);
      root.classList.toggle('theme-dark', !next);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`flex size-9 items-center justify-center rounded-full border border-white/15 text-current transition-all hover:scale-110 hover:border-indigo-400/60 ${className}`}
    >
      {light
        ? (
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
            </svg>
          )
        : (
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          )}
    </button>
  );
};
