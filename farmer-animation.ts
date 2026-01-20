export const slideInFromLeft = {
  initial: { x: -200 },
  animate: { x: 0, transition: { duration: 1.5, ease: 'easeOut' } },
};

export const slideImageInFromLeft = {
  initial: { x: -1100 },
  animate: { x: 0, transition: { duration: 1.5, ease: 'easeOut' } },
};

export const slideInFromRight = {
  initial: { x: 200 },
  animate: { x: 0, transition: { duration: 1.5, ease: 'easeOut' } },
};

export const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export const containerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export const textVariants = {
  initial: { opacity: 0, y: 120 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut', delay: 0.3 },
  },
};

export const parallaxVariants = {
  initial: { backgroundPositionY: '0%' },
  animate: { backgroundPositionY: '50%', transition: { duration: 1.2 } },
};

export const fadeInFromBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.2 } },
};

export const fadeInFromLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const fadeInFromRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const containerVariant = (stagerChild?: number) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: stagerChild ?? 0.2,
    },
  },
});
