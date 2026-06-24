use client';

import { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Directly update width to the new value for immediate rendering
          setWidth(value);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  // Ensure width is always updated to the current value prop for scaleX
  useEffect(() => {
    setWidth(value);
  }, [value]);

  return (
    <div
      ref={ref}
      className={`h-1.5 w-full rounded-full bg-bg-elevated overflow-hidden ${className}`}
    >
      <div
        className="h-full w-full rounded-full bg-accent-primary origin-left"
        style={{
          transform: `scaleX(${width / 100})`,
          transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
}