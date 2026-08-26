'use client';

import { motion } from 'framer-motion';

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-foreground-secondary/70">
        Scroll to Explore
      </span>
      <div className="w-[1px] h-9 bg-white/10 relative overflow-hidden">
        <motion.div
          className="w-full h-1/2 bg-dx-purple-bright"
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}
