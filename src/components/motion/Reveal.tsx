'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
};

const HIDDEN = {
  up: 'translate-y-10',
  left: '-translate-x-10',
  right: 'translate-x-10',
  none: '',
} as const;

/** Fade/slide-in on scroll via IntersectionObserver. Pure CSS transition. */
export const Reveal = ({ children, className = '', delay = 0, direction = 'up' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${HIDDEN[direction]} ${
        visible ? 'translate-x-0 translate-y-0 opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
