'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CassetteVisual } from './CassetteVisual';
import { ScrollIndicator } from './ScrollIndicator';
import { studioConfig } from '@/data/studio';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineTopRef = useRef<HTMLHeadingElement>(null);
  const headlineBottomRef = useRef<HTMLHeadingElement>(null);
  const cassetteWrapperRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll-driven parallax and scale transform
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      if (headlineTopRef.current) {
        tl.to(headlineTopRef.current, { xPercent: -18, opacity: 0.25 }, 0);
      }
      if (headlineBottomRef.current) {
        tl.to(headlineBottomRef.current, { xPercent: 18, opacity: 0.25 }, 0);
      }
      if (cassetteWrapperRef.current) {
        tl.to(
          cassetteWrapperRef.current,
          {
            scale: 1.15,
            y: 80,
            rotateZ: -2,
            filter: 'brightness(1.15)',
          },
          0
        );
      }
      if (subtextRef.current) {
        tl.to(subtextRef.current, { opacity: 0, y: -40 }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 md:pt-36 pb-12 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Subtle Radial Purple Depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-dx-purple/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* Top Tagline & Micro-Meta */}
      <div className="max-w-[1540px] w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-foreground-secondary/80">
        <div className="flex items-center gap-3">
          <span className="text-dx-purple-bright font-bold">●</span>
          <span>EST. {studioConfig.establishedYear}</span>
          <span className="text-white/20">—</span>
          <span>{studioConfig.location}</span>
        </div>
        <div className="hidden md:block text-foreground-secondary/60">
          CREATIVE DIRECTION &amp; INTERACTIVE SYSTEMS
        </div>
      </div>

      {/* Center Cinematic Composition: Giant Typography + Cassette Artwork */}
      <div className="relative max-w-[1540px] w-full mx-auto my-auto py-8 md:py-12 flex flex-col items-center justify-center">
        {/* Massive Headline Top */}
        <h1
          ref={headlineTopRef}
          className="w-full text-center font-display text-[13vw] lg:text-[11vw] font-black leading-[0.88] tracking-tighter uppercase text-foreground select-none will-change-transform z-10"
        >
          DIGITAL
        </h1>

        {/* Cassette Visual Centered with Floating & Depth */}
        <div
          ref={cassetteWrapperRef}
          className="relative my-2 md:-my-6 z-20 w-full max-w-[580px] px-4 will-change-transform animate-float"
        >
          <CassetteVisual />
        </div>

        {/* Massive Headline Bottom */}
        <h2
          ref={headlineBottomRef}
          className="w-full text-center font-display text-[13vw] lg:text-[11vw] font-black leading-[0.88] tracking-tighter uppercase text-foreground select-none will-change-transform z-10"
        >
          WITH PURPOSE.
        </h2>
      </div>

      {/* Bottom Subtext & Scroll Indicator */}
      <div
        ref={subtextRef}
        className="max-w-[1540px] w-full mx-auto grid grid-cols-1 md:grid-cols-3 items-end gap-8 pt-4 border-t border-white/[0.06]"
      >
        <div className="max-w-md">
          <p className="text-sm md:text-base text-foreground-secondary leading-relaxed font-sans">
            {studioConfig.shortBio}
          </p>
        </div>

        <div className="flex justify-start md:justify-center">
          <ScrollIndicator />
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 font-mono text-[11px] text-foreground-secondary/70">
          <span className="text-white uppercase tracking-wider font-semibold">
            {studioConfig.tagline}
          </span>
          <span className="text-foreground-secondary/50">
            Awwwards-grade Interactive Portfolio
          </span>
        </div>
      </div>
    </section>
  );
}
