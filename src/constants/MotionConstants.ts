import { HTMLMotionProps } from 'framer-motion';
import { MotionType } from '@/types/motion';

type IMotionConstants = {
  [key in MotionType]: HTMLMotionProps<any>;
};

export const MOTION: IMotionConstants = {
  SLIDE: {
    initial: { opacity: 0, y: '50%' },
    animate: { opacity: 1, y: 0 },
    transition: { bounce: 0, duration: 0.3 },
  },
  FADE: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  POP: {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%', transition: { duration: 0.1 } },
  },
  DRAWER: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    transition: { bounce: 0, duration: 0.2 },
  },
};
