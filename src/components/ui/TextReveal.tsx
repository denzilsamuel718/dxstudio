'use client';

import { motion } from 'framer-motion';
import { TRANSITION_EASE } from '@/utils/animations';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Component = 'div',
}: TextRevealProps) {
  const words = text.split(' ');

  return (
    <Component className={`flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="text-mask inline-block overflow-hidden py-1">
          <motion.span
            className="text-mask-inner inline-block"
            initial={{ y: '115%', opacity: 0, rotateZ: 1.5 }}
            whileInView={{ y: '0%', opacity: 1, rotateZ: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.95,
              ease: TRANSITION_EASE,
              delay: delay + index * 0.04,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
