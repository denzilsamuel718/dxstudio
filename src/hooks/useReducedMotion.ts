'use client';

import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  return matches;
}
