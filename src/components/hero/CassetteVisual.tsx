'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export function CassetteVisual() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics for spatial depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      className="relative w-full max-w-[560px] aspect-square mx-auto cursor-pointer select-none group flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      {/* Soft Ambient Purple Glow Behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 bg-gradient-to-tr from-dx-purple-deep/40 via-dx-purple/35 to-dx-purple-bright/40 blur-[90px] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center will-change-transform drop-shadow-[0_35px_60px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_45px_80px_rgba(124,42,232,0.35)] transition-all duration-500"
      >
        <div className="relative w-full h-full max-w-[520px] max-h-[520px]">
          <Image
            src="/assets/dx-cassette-transparent.png"
            alt="DX Studio Official Analog Cassette Tape - Designed with a Purpose"
            fill
            priority
            className="object-contain filter contrast-105 select-none pointer-events-none"
            sizes="(max-width: 768px) 90vw, 540px"
          />
        </div>
      </motion.div>
    </div>
  );
}
