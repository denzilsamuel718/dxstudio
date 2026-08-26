'use client';

import { ReactNode } from 'react';
import { Magnetic } from '@/components/ui/Magnetic';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
}: MagneticButtonProps) {
  const content = (
    <div
      className={`relative inline-flex items-center justify-center px-8 md:px-14 py-6 md:py-8 rounded-full bg-gradient-to-r from-dx-purple to-dx-purple-bright text-white font-display text-lg md:text-2xl font-black uppercase tracking-tight overflow-hidden group shadow-[0_10px_40px_rgba(124,42,232,0.4)] hover:shadow-[0_15px_60px_rgba(166,77,255,0.6)] transition-all duration-500 cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </div>
  );

  return (
    <Magnetic strength={0.4}>
      {href ? (
        <a href={href} className="inline-block">
          {content}
        </a>
      ) : (
        <button onClick={onClick} className="inline-block focus:outline-none">
          {content}
        </button>
      )}
    </Magnetic>
  );
}
