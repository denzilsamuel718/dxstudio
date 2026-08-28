'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function PhilosophySection() {
  const containerRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      // Desktop Cinematic Pinned Scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
        },
      });

      // First statement fades and scales out
      tl.to(text1Ref.current, {
        opacity: 0,
        scale: 0.88,
        filter: 'blur(8px)',
        duration: 1,
      })
        // Second statement enters and expands with purple glow
        .fromTo(
          text2Ref.current,
          {
            opacity: 0,
            scale: 1.15,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
          }
        )
        .to(
          glowRef.current,
          {
            opacity: 0.7,
            scale: 1.3,
            duration: 1,
          },
          '<'
        );
    });

    mm.add('(max-width: 768px)', () => {
      // Mobile Fluid Scroll: Stacked natural flow without scroll lock
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });

      if (text1Ref.current) {
        tl.fromTo(text1Ref.current, { opacity: 0.2, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      }
      if (text2Ref.current) {
        tl.fromTo(text2Ref.current, { opacity: 0.2, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative min-h-[80vh] md:min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-20 md:py-0 select-none"
    >
      {/* Background Deep Purple Atmosphere */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[800px] h-[320px] sm:h-[500px] md:h-[800px] bg-dx-purple/20 rounded-full blur-[100px] md:blur-[160px] pointer-events-none opacity-25"
      />

      {/* Grid Pattern Behind */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center">
        {/* Desktop Container (Absolute Overlay) vs Mobile (Flowing) */}
        <div className="relative min-h-[360px] sm:min-h-[420px] md:min-h-[500px] flex flex-col items-center justify-center">
          {/* Phase 1: LESS NOISE. */}
          <div
            ref={text1Ref}
            className="md:absolute md:inset-0 flex flex-col items-center justify-center mb-12 md:mb-0"
          >
            <span className="font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.35em] text-foreground-secondary/60 uppercase mb-3 sm:mb-4">
              [ THE CREATIVE FILTER ]
            </span>
            <h2 className="font-display text-[clamp(2.25rem,9vw,8.5rem)] font-black uppercase tracking-tighter text-white break-words max-w-full">
              LESS NOISE.
            </h2>
          </div>

          {/* Phase 2: MORE PURPOSE. */}
          <div
            ref={text2Ref}
            className="flex flex-col items-center justify-center md:opacity-0"
          >
            <span className="font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.35em] text-dx-purple-bright uppercase mb-3 sm:mb-4">
              [ THE DX CODE ]
            </span>
            <h2 className="font-display text-[clamp(2.25rem,9vw,8.5rem)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-dx-purple-bright break-words max-w-full">
              MORE PURPOSE.
            </h2>
            <p className="mt-4 sm:mt-6 font-mono text-xs md:text-sm text-foreground-secondary max-w-md mx-auto px-4">
              Every detail is intentional. We build systems that perform, inspire, and endure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
