'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed right-0 top-0 bottom-0 w-[2px] z-50 pointer-events-none hidden md:block"
    >
      <div className="w-full h-full bg-white/[0.04] relative">
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top bg-dx-purple-bright shadow-[0_0_8px_#A64DFF]"
          style={{ scaleY, height: '100%' }}
        />
      </div>
    </div>
  );
}
