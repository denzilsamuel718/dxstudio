'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
  strength?: number; // Higher means more movement (e.g. 0.3 to 0.6)
  ease?: string;
  duration?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(options: MagneticOptions = {}) {
  const elementRef = useRef<T>(null);
  const { strength = 0.35, ease = 'power2.out', duration = 0.6 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof window === 'undefined') return;

    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration,
        ease,
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, ease, duration]);

  return elementRef;
}
