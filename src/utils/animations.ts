import { Variants, Transition } from 'framer-motion'

// ── Spring presets ──────────────────────────────────────────────

/** Gentle, cinematic spring — for scroll-triggered entrances */
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 60,
  damping: 20,
  mass: 1,
}

/** Snappier spring — for hovers / micro-interactions */
export const springSnap: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 16,
  mass: 0.6,
}

/** Weighty, slow spring — for hero reveals */
export const springHeavy: Transition = {
  type: 'spring',
  stiffness: 40,
  damping: 25,
  mass: 1.5,
}

// ── Container / stagger variants ────────────────────────────────

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      ...springGentle,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springGentle,
  },
}

// ── Single-element variants ─────────────────────────────────────

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: springGentle,
  },
}

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springGentle,
  },
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springGentle,
  },
}

// ── Interactive hover variants (spring) ─────────────────────────

export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: springSnap },
}

export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 24px rgba(0,0,0,.35)',
  },
  hover: {
    y: -6,
    boxShadow: '0 16px 56px rgba(0, 0, 0, 0.5)',
    transition: springSnap,
  },
}

// ── Parallax ────────────────────────────────────────────────────

export const parallaxVariants = (offset: number): Variants => ({
  initial: { y: offset },
  animate: { y: offset * 0.5 },
})

// ── Scroll-reveal clip-path presets ─────────────────────────────

export const clipRevealHorizontal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
  },
}

export const clipRevealVertical: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
  },
}

export const clipRevealRadial: Variants = {
  hidden: { clipPath: 'circle(0% at 50% 50%)' },
  visible: {
    clipPath: 'circle(100% at 50% 50%)',
    transition: { duration: 1.4, ease: [0.23, 1, 0.32, 1] },
  },
}
