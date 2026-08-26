'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SignatureDX() {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (textRef.current && containerRef.current) {
        gsap.fromTo(
          textRef.current,
          {
            opacity: 0.15,
            y: 20,
          },
          {
            opacity: 0.35,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full mx-auto px-6 md:px-12 select-none pointer-events-none py-10 flex items-center justify-center overflow-hidden"
    >
      <div
        ref={textRef}
        className="w-full text-center font-display text-[7vw] md:text-[6.8vw] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white/40 via-white/25 to-dx-purple-bright/40 whitespace-nowrap leading-none drop-shadow-[0_0_30px_rgba(124,42,232,0.15)]"
      >
        DX STUDIO
      </div>
    </div>
  );
}
