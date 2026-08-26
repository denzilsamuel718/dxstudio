'use client';

import { studioConfig } from '@/data/studio';
import { Magnetic } from '@/components/ui/Magnetic';
import { SignatureDX } from './SignatureDX';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/[0.08] pt-12 pb-16 overflow-hidden">
      {/* Massive Signature DX in background */}
      <SignatureDX />

      <div className="max-w-[1540px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between font-mono text-xs uppercase tracking-widest text-foreground-secondary/70 pt-8 border-t border-white/[0.06]">
          {/* Left: Studio Branding */}
          <div className="md:col-span-4 space-y-1">
            <div className="text-white font-bold text-sm tracking-wider">
              {studioConfig.name}
            </div>
            <div className="text-[11px] text-foreground-secondary/60">
              {studioConfig.tagline}
            </div>
          </div>

          {/* Center: Location */}
          <div className="md:col-span-4 text-left md:text-center text-[11px]">
            {studioConfig.location}
          </div>

          {/* Right: Copyright & Back to top */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-6">
            <span className="text-[11px]">© {studioConfig.establishedYear} DX Studio</span>
            <Magnetic strength={0.3}>
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-full border border-white/10 hover:border-dx-purple-bright/50 hover:bg-white/[0.04] text-[11px] text-white transition-all duration-300"
              >
                Back to Top ↑
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
