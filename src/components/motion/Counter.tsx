'use client';

import { useEffect, useRef, useState } from 'react';

type CounterProps = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Animated number counter that starts when scrolled into view. */
export const Counter = ({ end, suffix = '', duration = 1800, className = '' }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - p) ** 3;
            setValue(Math.round(end * eased));
            if (p < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};
