'use client';

import { useEffect, useState } from 'react';

type TypingTextProps = {
  phrases: string[];
  className?: string;
};

/** Rotating typewriter effect — types, pauses, deletes, next phrase. */
export const TypingText = ({ phrases, className = '' }: TypingTextProps) => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const current = phrases[index % phrases.length] ?? '';
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase('deleting'), 2200);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 28);
    } else {
      setIndex(i => i + 1);
      setPhase('typing');
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, phrases]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] animate-pulse bg-current align-middle" />
    </span>
  );
};
