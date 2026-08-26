'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSITION_EASE } from '@/utils/animations';
import { useAudio } from '@/context/AudioContext';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showBrandReveal, setShowBrandReveal] = useState(false);
  const { playWithSound, enterMuted } = useAudio();

  useEffect(() => {
    // Reset scroll to top on every fresh page load / refresh
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const checkpoints = [0, 16, 32, 54, 71, 88, 98, 100];
    let step = 0;

    const interval = setInterval(() => {
      if (step < checkpoints.length - 1) {
        step++;
        setProgress(checkpoints[step]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsReady(true);
        }, 150);
      }
    }, 130);

    return () => clearInterval(interval);
  }, []);

  const handleEnterWithSound = async () => {
    await playWithSound();
    setShowBrandReveal(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 1100);
  };

  const handleEnterMuted = () => {
    enterMuted();
    setShowBrandReveal(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 1100);
  };

  if (isDone) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] select-none flex flex-col justify-between overflow-hidden">
        {/* Top Curtain Mask */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505] z-20 border-b border-white/[0.04]"
          initial={{ y: '0%' }}
          animate={{ y: showBrandReveal ? '-100%' : '0%' }}
          transition={{ duration: 1.1, ease: TRANSITION_EASE }}
        />

        {/* Bottom Curtain Mask */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] z-20 border-t border-white/[0.04]"
          initial={{ y: '0%' }}
          animate={{ y: showBrandReveal ? '100%' : '0%' }}
          transition={{ duration: 1.1, ease: TRANSITION_EASE }}
        />

        {/* Center Loading Content */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#050505]"
          initial={{ opacity: 1 }}
          animate={{ opacity: showBrandReveal ? 0 : 1, scale: showBrandReveal ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Studio Wordmark */}
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: TRANSITION_EASE }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-white/70 font-semibold uppercase">
                DX STUDIO
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-dx-purple-bright shadow-[0_0_8px_#A64DFF]" />
            </motion.div>
          </div>

          {/* Minimalist Progress Counter */}
          <div className="flex flex-col items-center">
            <div className="font-mono text-6xl md:text-8xl font-black tracking-tighter text-white tabular-nums">
              {String(progress).padStart(3, '0')}
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-44 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-dx-purple via-dx-purple-bright to-white"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </div>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-secondary/70">
              Designed with a Purpose.
            </div>
          </div>

          {/* Subtle Sound Permission Options when Ready */}
          <AnimatePresence>
            {isReady && !showBrandReveal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: TRANSITION_EASE }}
                className="mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 z-40"
              >
                <button
                  onClick={handleEnterWithSound}
                  type="button"
                  className="px-6 py-3 rounded-full bg-dx-purple/25 hover:bg-dx-purple border border-dx-purple-bright/60 hover:border-dx-purple-bright text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_0_20px_rgba(124,42,232,0.4)] flex items-center gap-2 cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-dx-purple-bright group-hover:bg-white shadow-[0_0_6px_#A64DFF] animate-pulse" />
                  <span>ENTER WITH SOUND</span>
                </button>

                <button
                  onClick={handleEnterMuted}
                  type="button"
                  className="px-5 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-foreground-secondary hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  <span>ENTER MUTED</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
