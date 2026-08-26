'use client';

import React, { ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.35, className = '' }: MagneticProps) {
  const ref = useMagnetic<HTMLDivElement>({ strength });

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
