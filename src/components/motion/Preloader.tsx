'use client';

import { useEffect, useState } from 'react';

/** VidStack logo splash — fades out once the page has loaded. */
export const Preloader = () => {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 900);
    const t2 = setTimeout(() => setGone(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] transition-opacity duration-500 ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-2">
        <svg className="size-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="12" width="6" height="8" rx="1" className="preloader-bar" style={{ animationDelay: '0ms' }} />
          <rect x="9" y="8" width="6" height="12" rx="1" className="preloader-bar" style={{ animationDelay: '150ms' }} />
          <rect x="15" y="4" width="6" height="16" rx="1" className="preloader-bar" style={{ animationDelay: '300ms' }} />
        </svg>
        <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-3xl font-extrabold text-transparent">
          VidStack
        </span>
      </div>
      <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="preloader-track h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" />
      </div>
    </div>
  );
};
