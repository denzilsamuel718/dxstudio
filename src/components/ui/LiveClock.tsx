'use client';

import { useState, useEffect } from 'react';

export function LiveClock() {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
        setTimeString(formatted);
      } catch (err) {
        const now = new Date();
        setTimeString(now.toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-foreground-secondary/70">
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>BENGALURU</span>
      </span>
      <span className="text-white/20">/</span>
      <span className="text-foreground font-medium tabular-nums min-w-[72px]">
        {timeString || '12:00:00 PM'}
      </span>
    </div>
  );
}
