import { Variants } from 'framer-motion';

// Standardized easing matching cubic-bezier(0.76, 0, 0.24, 1)
export const TRANSITION_EASE = [0.76, 0, 0.24, 1] as const;
export const TRANSITION_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const maskRevealVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
    rotateZ: 2,
  },
  visible: (i: number = 0) => ({
    y: '0%',
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      delay: i * 0.1,
    },
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: TRANSITION_SMOOTH,
      delay: i * 0.08,
    },
  }),
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: TRANSITION_EASE,
    },
  },
};
