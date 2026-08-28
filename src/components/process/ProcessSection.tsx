'use client';

import { studioConfig } from '@/data/studio';

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full py-20 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-[1540px] mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6 sm:pb-8 mb-12 sm:mb-16 md:mb-24">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-dx-purple-bright mb-3">
            <span className="inline-block w-2 h-2 rounded-sm bg-dx-purple-bright" />
            <span>04 / METHODOLOGY</span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,7.5vw,5.5rem)] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] break-words">
            HOW WE BUILD
          </h2>
        </div>

        <div className="max-w-xs font-mono text-xs text-foreground-secondary/70">
          A disciplined four-stage creative and engineering cycle designed to maximize clarity and eliminate friction.
        </div>
      </div>

      {/* Editorial Vertical Process List */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {studioConfig.processSteps.map((step) => (
          <div
            key={step.number}
            className="group py-8 sm:py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start hover:bg-white/[0.015] transition-colors duration-500 px-3 sm:px-4 md:px-6 rounded-2xl"
          >
            {/* Number */}
            <div className="lg:col-span-2">
              <span className="font-mono text-2xl sm:text-3xl md:text-5xl font-black text-white/30 group-hover:text-dx-purple-bright transition-colors duration-500">
                {step.number}
              </span>
            </div>

            {/* Phase Title & Tagline */}
            <div className="lg:col-span-4 space-y-1.5 sm:space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">
                {step.phase}
              </h3>
              <p className="font-handwritten text-dx-purple-bright text-base sm:text-lg md:text-xl font-bold">
                {step.tagline}
              </p>
            </div>

            {/* Detailed Description & Deliverables */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <p className="font-sans text-sm sm:text-base md:text-lg text-foreground-secondary leading-relaxed">
                {step.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {step.deliverables.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-foreground-secondary/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
