'use client';

import { motion } from 'framer-motion';
import { studioConfig } from '@/data/studio';
import { VelocityMarquee } from './VelocityMarquee';
import { DenzilCharacter } from './DenzilCharacter';

export function AboutSection() {
  return (
    <section id="about" className="relative w-full pt-20 md:pt-32">
      <div className="max-w-[1540px] mx-auto px-6 md:px-12 mb-20 md:mb-32">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-dx-purple-bright mb-6">
          <span className="inline-block w-2 h-2 rounded-sm bg-dx-purple-bright" />
          <span>03 / STUDIO IDENTITY</span>
        </div>

        {/* Massive Headline */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.92]">
            IDEAS SHOULD
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-dx-purple-bright">
              FEEL ALIVE.
            </span>
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/[0.08] items-start">
          {/* Left Column: Philosophy Tag + Interactive Denzil Character */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-secondary/60">
                [ THE PHILOSOPHY ]
              </span>
            </div>

            {/* Interactive Character Avatar */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <DenzilCharacter />
            </div>
          </div>

          {/* Right Column: Bio & Services Breakdown */}
          <div className="lg:col-span-8 space-y-8">
            <p className="font-sans text-xl md:text-3xl text-foreground font-light leading-relaxed">
              {studioConfig.extendedBio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/[0.06]">
              {studioConfig.services.map((service) => (
                <div key={service.num} className="space-y-2">
                  <div className="font-mono text-xs text-dx-purple-bright font-bold">
                    {service.num}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white uppercase">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed font-sans">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Velocity Ribbon */}
      <VelocityMarquee />
    </section>
  );
}
