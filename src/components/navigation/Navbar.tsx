'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { studioConfig } from '@/data/studio';
import { Magnetic } from '@/components/ui/Magnetic';
import { LiveClock } from '@/components/ui/LiveClock';
import { SoundToggle } from '@/components/audio/SoundToggle';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sectionIds = ['projects', 'about', 'process', 'philosophy', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // Bottom of page check -> Contact
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 120
      ) {
        setActiveSection('contact');
        return;
      }

      // Top of page check -> Hero / Home
      if (scrollY < 240) {
        setActiveSection('');
        return;
      }

      const triggerPoint = window.innerHeight * 0.38;
      let detectedSection = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            detectedSection = id;
            break;
          }
        }
      }

      if (!detectedSection) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerPoint) {
              detectedSection = id;
              break;
            }
          }
        }
      }

      if (detectedSection) {
        setActiveSection(detectedSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('');
      return;
    }

    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9980] transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#050505]/92 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
            : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1540px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Magnetic strength={0.2}>
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className="flex items-center gap-2.5 group cursor-pointer select-none"
              aria-label="DX Studio Home"
            >
              <div
                className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 transform group-hover:rotate-45 ${
                  !activeSection
                    ? 'bg-dx-purple-bright shadow-[0_0_12px_#A64DFF]'
                    : 'bg-foreground group-hover:bg-dx-purple-bright'
                }`}
              />
              <span className="font-display text-sm md:text-base font-extrabold tracking-widest text-foreground uppercase whitespace-nowrap">
                {studioConfig.name}
              </span>
            </a>
          </Magnetic>

          {/* Desktop Navigation Links (Strictly Visible on Large Displays >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            {studioConfig.navLinks.map((link) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <Magnetic key={link.label} strength={0.15}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 select-none whitespace-nowrap ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-foreground-secondary/70 hover:text-foreground hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Active Background Pill with Spring Motion */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-dx-purple/35 border border-dx-purple-bright/60 shadow-[0_0_16px_rgba(124,42,232,0.4)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10">{link.label}</span>

                    {/* Active Glowing Indicator Dot */}
                    {isActive && (
                      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-dx-purple-bright shadow-[0_0_8px_#A64DFF]" />
                    )}
                  </a>
                </Magnetic>
              );
            })}
          </nav>

          {/* Desktop Far-Right: Tape Sound Toggle, Live Clock & CTA (>= 1024px) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            <Magnetic strength={0.25}>
              <SoundToggle />
            </Magnetic>
            <div className="w-[1px] h-3.5 bg-white/10" />
            <LiveClock />
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`px-4 py-2 rounded-full border transition-all duration-300 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap ${
                  activeSection === 'contact'
                    ? 'bg-dx-purple text-white border-dx-purple-bright shadow-[0_0_15px_rgba(124,42,232,0.6)]'
                    : 'border-white/10 hover:border-dx-purple-bright/50 bg-white/[0.03] hover:bg-dx-purple/15 text-foreground hover:text-white'
                }`}
              >
                Let&apos;s Talk ↗
              </a>
            </Magnetic>
          </div>

          {/* Mobile & Tablet Controls (< 1024px): Compact Sound Toggle & Burger Menu */}
          <div className="flex lg:hidden items-center gap-2.5 sm:gap-3">
            <SoundToggle compact />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col items-end justify-center w-9 h-9 p-1.5 gap-1.5 focus:outline-none rounded-lg bg-white/[0.03] border border-white/[0.08]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-[2px] bg-foreground transition-all duration-300 ${
                  mobileOpen ? 'w-5 rotate-45 translate-y-[6px] bg-dx-purple-bright' : 'w-5'
                }`}
              />
              <span
                className={`block h-[2px] bg-foreground transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : 'w-3.5'
                }`}
              />
              <span
                className={`block h-[2px] bg-foreground transition-all duration-300 ${
                  mobileOpen ? 'w-5 -rotate-45 -translate-y-[6px] bg-dx-purple-bright' : 'w-4.5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
