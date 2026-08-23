'use client';

import { useEffect, useState } from 'react';

type Toast = { id: number; name: string; plan: string; time: string };

const PEOPLE = [
  { name: 'Jorge', plan: 'Pro plan' },
  { name: 'Sofia', plan: 'Creator plan' },
  { name: 'Marcus', plan: 'Pro plan' },
  { name: 'Aisha', plan: 'Agency plan' },
  { name: 'Daniel', plan: 'Starter plan' },
  { name: 'Emma', plan: 'Creator plan' },
  { name: 'Liam', plan: 'Pro plan' },
  { name: 'Maya', plan: 'Starter plan' },
];

const TIMES = ['just now', '1 min ago', '2 min ago', '3 min ago', '5 min ago'];

export const PurchaseToasts = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let i = 0;
    let hide: ReturnType<typeof setTimeout>;

    const show = () => {
      const p = PEOPLE[i % PEOPLE.length]!;
      const time = TIMES[Math.floor(Math.random() * TIMES.length)]!;
      setToast({ id: Date.now(), name: p.name, plan: p.plan, time });
      i++;
      hide = setTimeout(() => setToast(null), 5000);
    };

    const first = setTimeout(show, 4000);
    const loop = setInterval(show, 12000);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
      clearTimeout(hide);
    };
  }, []);

  if (!toast) {
    return null;
  }

  return (
    <div
      key={toast.id}
      className="fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0f]/95 py-3 pl-3 pr-4 shadow-2xl shadow-black/60 backdrop-blur"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-sm font-bold text-white">
        {toast.name.charAt(0)}
      </div>
      <div className="text-sm">
        <div className="text-white">
          <span className="font-bold">{toast.name}</span>
          {' '}
          just bought the
          {' '}
          <span className="font-bold text-emerald-400">{toast.plan}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {toast.time}
          {' '}
          · Verified
        </div>
      </div>
      <button type="button" onClick={() => setToast(null)} aria-label="Dismiss" className="ml-2 rounded p-1 text-gray-500 hover:bg-white/10 hover:text-white">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
};
