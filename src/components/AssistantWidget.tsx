'use client';

import { useEffect, useRef, useState } from 'react';

type Msg = { from: 'user' | 'bot'; text: string };

const REPLIES: Array<[RegExp, string]> = [
  [/price|cost|plan|pay/i, 'Plans start at $19/mo (Starter), $49 Pro, $99 Creator, $199 Agency. The free plan includes 30 clips/month — no card needed.'],
  [/how|work|clip|short/i, 'Paste a YouTube link or type a topic. VidStack writes the script, finds B-roll, adds voiceover + captions, and renders a 9:16 short in minutes.'],
  [/platform|tiktok|youtube|instagram|publish/i, 'One click publishes to TikTok, YouTube Shorts, Instagram Reels, and Facebook — or schedule them in the calendar.'],
  [/free|trial/i, 'Yes — the free plan gives you 30 clips a month, no credit card required.'],
  [/hello|hi|hey/i, 'Hey! 👋 I can help with features, pricing, or how VidStack works. What would you like to know?'],
];

const answer = (q: string): string => {
  for (const [re, a] of REPLIES) {
    if (re.test(q)) {
      return a;
    }
  }
  return 'I can help with features, pricing, platforms, or how the AI pipeline works. Try asking “How does it work?” or “How much is it?”';
};

export const AssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Hi! I\'m the VidStack assistant. Ask me anything about features or pricing.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) {
      return;
    }
    setMsgs(m => [...m, { from: 'user', text: q }]);
    setInput('');
    setTimeout(() => setMsgs(m => [...m, { from: 'bot', text: answer(q) }]), 500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f] shadow-2xl shadow-black/60">
          <div className="flex items-center gap-2.5 border-b border-white/10 bg-gradient-to-r from-indigo-500/15 to-emerald-500/10 px-4 py-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-sm font-bold">AI</div>
            <div>
              <div className="text-sm font-bold text-white">VidStack Assistant</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {' '}
                Online
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="ml-auto rounded p-1 text-gray-400 hover:bg-white/10">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                  m.from === 'user'
                    ? 'rounded-br-sm bg-gradient-to-r from-indigo-500 to-emerald-500 text-white'
                    : 'rounded-bl-sm bg-white/10 text-gray-200'
                }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about features, pricing…"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400"
            />
            <button type="submit" className="rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-3.5 text-white" aria-label="Send">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="Open assistant"
        className="flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105"
      >
        {open
          ? <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          : <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>}
      </button>
    </div>
  );
};
