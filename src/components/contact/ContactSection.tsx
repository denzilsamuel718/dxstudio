'use client';

import { useState } from 'react';
import { studioConfig } from '@/data/studio';
import { MagneticButton } from './MagneticButton';
import { Magnetic } from '@/components/ui/Magnetic';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studioConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-[1540px] mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-dx-purple-bright mb-6 sm:mb-8">
        <span className="inline-block w-2 h-2 rounded-sm bg-dx-purple-bright" />
        <span>05 / INITIATE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end mb-14 sm:mb-20">
        <div className="lg:col-span-8 space-y-3 sm:space-y-4">
          <span className="font-mono text-xs sm:text-sm md:text-base text-foreground-secondary uppercase tracking-widest">
            HAVE AN IDEA?
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8.5vw,8.5rem)] font-black uppercase tracking-tight text-white leading-[0.92] break-words">
            LET&apos;S MAKE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-dx-purple-bright">
              IT MATTER.
            </span>
          </h2>
        </div>

        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4 sm:gap-6">
          <MagneticButton href={`mailto:${studioConfig.email}`}>
            <span>Start a Conversation</span>
            <span>↗</span>
          </MagneticButton>

          {/* Quick Copy Email Option */}
          <button
            onClick={handleCopyEmail}
            className="font-mono text-[11px] sm:text-xs text-foreground-secondary hover:text-white transition-colors flex items-center gap-2 cursor-pointer break-all"
          >
            <span>{copied ? '✓ Email Copied to Clipboard' : `or click to copy: ${studioConfig.email}`}</span>
          </button>
        </div>
      </div>

      {/* Social & Direct Connections Grid */}
      <div className="pt-8 sm:pt-12 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs uppercase tracking-widest">
        {studioConfig.socials.map((social) => (
          <Magnetic key={social.label} strength={0.2} className="w-full">
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-dx-purple-bright/40 hover:bg-white/[0.04] transition-all duration-300 w-full"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-dx-purple-bright shadow-[0_0_8px_#A64DFF]" />
                <span className="text-foreground font-bold group-hover:text-white transition-colors text-sm">
                  {social.label}
                </span>
              </div>
              <span className="text-white/30 group-hover:text-dx-purple-bright transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 text-base">
                ↗
              </span>
            </a>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}
