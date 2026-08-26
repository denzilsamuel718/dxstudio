'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { studioConfig } from '@/data/studio';
import { TRANSITION_EASE } from '@/utils/animations';
import { LiveClock } from '@/components/ui/LiveClock';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9990] bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
        >
          {/* Menu Navigation Links */}
          <div className="flex flex-col gap-6 my-auto">
            {studioConfig.navLinks.map((link, idx) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <div key={link.label} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={onClose}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.7, ease: TRANSITION_EASE, delay: idx * 0.08 }}
                    className={`font-display text-4xl font-extrabold uppercase tracking-tight transition-colors flex items-center justify-between group ${
                      isActive ? 'text-dx-purple-bright' : 'text-foreground hover:text-dx-purple-bright'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-dx-purple-bright shadow-[0_0_8px_#A64DFF]" />
                      )}
                      <span>{link.label}</span>
                    </span>
                    <span className="font-mono text-xs text-foreground-secondary/40 group-hover:text-dx-purple-bright transition-colors">
                      0{idx + 1}
                    </span>
                  </motion.a>
                </div>
              );
            })}
          </div>

          {/* Bottom Footer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="pt-6 border-t border-white/[0.08] flex flex-col gap-4"
          >
            <div className="flex justify-between items-center text-xs text-foreground-secondary font-mono">
              <LiveClock />
            </div>
            <p className="text-xs text-foreground-secondary/70 font-mono uppercase tracking-wider">
              {studioConfig.tagline}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
