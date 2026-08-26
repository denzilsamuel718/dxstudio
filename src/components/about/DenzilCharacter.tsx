'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function DenzilCharacter() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse/Touch tilt physics for spatial 3D feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 280,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), {
    stiffness: 280,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-full max-w-[260px] sm:max-w-[280px] h-[360px] sm:h-[400px] md:h-[460px] select-none cursor-pointer flex flex-col items-center justify-end group mt-6"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Deep Purple Backlight */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-t from-dx-purple/45 via-dx-purple-bright/25 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isHovered ? 'opacity-100 scale-115' : 'opacity-50 scale-95'
        }`}
      />

      {/* 3D Floor Shadow */}
      <div
        aria-hidden="true"
        className={`absolute bottom-4 w-32 h-6 bg-black/80 rounded-full blur-md transition-all duration-500 ${
          isHovered ? 'scale-110 opacity-90' : 'scale-90 opacity-60'
        }`}
      />

      {/* 3D Character Mesh Layer */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-end justify-center will-change-transform pb-2"
      >
        <div className="relative w-full h-[92%] max-w-[240px]">
          <Image
            src="/assets/denzil-character.png"
            alt="Denzil Samuel — DX Studio Founder & Creative Technologist"
            fill
            className={`object-contain transition-all duration-500 filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] ${
              isHovered
                ? 'brightness-110 contrast-110 scale-105 drop-shadow-[0_30px_60px_rgba(124,42,232,0.45)]'
                : 'brightness-100 contrast-105'
            }`}
            sizes="(max-width: 768px) 260px, 280px"
            priority
          />
        </div>
      </motion.div>

      {/* Interactive Name Badge (Pops on hover / proximity / tap) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="absolute -top-6 z-30 px-5 py-2.5 rounded-full bg-[#0E0E14]/95 border border-dx-purple-bright/60 backdrop-blur-xl shadow-[0_12px_35px_rgba(124,42,232,0.55)] flex items-center gap-3 pointer-events-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-dx-purple-bright shadow-[0_0_10px_#A64DFF] animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="font-display text-sm font-extrabold tracking-wide text-white uppercase">
                Denzil Samuel
              </span>
              <span className="font-mono text-[9px] text-dx-purple-bright uppercase tracking-wider font-semibold">
                Founder &amp; Creative Technologist
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
