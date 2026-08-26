'use client';

export function VelocityMarquee() {
  const marqueeItems = [
    'DESIGN',
    'DEVELOPMENT',
    'STORYTELLING',
    'INTERACTIVE SYSTEMS',
    'PURPOSEFUL MOTION',
    'ANALOG WARMTH',
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden py-10 md:py-16 border-y border-white/[0.08] select-none bg-[#070709]"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
            {marqueeItems.map((item, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-16">
                <span className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-white/20 hover:text-white transition-colors duration-300">
                  {item}
                </span>
                <span className="text-dx-purple-bright text-2xl md:text-4xl">×</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
