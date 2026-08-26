'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type CursorVariant = 'default' | 'view' | 'drag' | 'link' | 'hidden';

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor positioning
  const smoothX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Global event delegation for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest('[data-cursor="view"]');
      const dragTarget = target.closest('[data-cursor="drag"]');
      const linkTarget = target.closest('a, button, [role="button"], [data-cursor="pointer"]');

      if (projectTarget) {
        setVariant('view');
        setCursorText('VIEW');
      } else if (dragTarget) {
        setVariant('drag');
        setCursorText('DRAG');
      } else if (linkTarget) {
        setVariant('link');
        setCursorText('');
      } else {
        setVariant('default');
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}
    >
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: variant === 'view' ? 88 : variant === 'drag' ? 76 : variant === 'link' ? 36 : 10,
          height: variant === 'view' ? 88 : variant === 'drag' ? 76 : variant === 'link' ? 36 : 10,
          backgroundColor:
            variant === 'view'
              ? 'rgba(124, 42, 232, 0.95)'
              : variant === 'drag'
              ? 'rgba(166, 77, 255, 0.9)'
              : variant === 'link'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(245, 245, 245, 0.9)',
          borderColor:
            variant === 'link' ? 'rgba(166, 77, 255, 0.6)' : 'rgba(255, 255, 255, 0)',
          borderWidth: variant === 'link' ? 1.5 : 0,
          backdropFilter: variant === 'link' || variant === 'view' ? 'blur(4px)' : 'none',
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 24,
        }}
      >
        {(variant === 'view' || variant === 'drag') && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-mono text-[11px] font-bold tracking-widest text-white uppercase text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
