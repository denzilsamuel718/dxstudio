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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        },
      });

      // First statement fades and scales out
      tl.to(text1Ref.current, {
        opacity: 0,
        scale: 0.85,
        filter: 'blur(10px)',
        duration: 1,
      })
        // Second statement enters and expands with purple glow
        .fromTo(
          text2Ref.current,
          {
            opacity: 0,
            scale: 1.2,
            filter: 'blur(12px)',
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden px-6 select-none"
    >
      {/* Background Deep Purple Atmosphere */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-dx-purple/20 rounded-full blur-[160px] pointer-events-none opacity-20"
      />

      {/* Grid Pattern Behind */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Phase 1: LESS NOISE. */}
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-foreground-secondary/60 uppercase mb-4">
            [ THE CREATIVE FILTER ]
          </span>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-white">
            LESS NOISE.
          </h2>
        </div>

        {/* Phase 2: MORE PURPOSE. */}
        <div
          ref={text2Ref}
          className="flex flex-col items-center justify-center opacity-0"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-dx-purple-bright uppercase mb-4">
            [ THE DX CODE ]
          </span>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-dx-purple-bright">
            MORE PURPOSE.
          </h2>
          <p className="font-handwritten text-xl md:text-3xl text-white/80 mt-6 tracking-wide">
            Every interaction has a reason.
          </p>
        </div>
      </div>
    </section>
  );
}
