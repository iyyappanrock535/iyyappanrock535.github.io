import type { Variants, Transition } from 'framer-motion';

/* ─────────────────────────────────────────────
   Shared easing + timing
───────────────────────────────────────────── */
const ease: Transition['ease'] = [0.16, 1, 0.3, 1]; // custom ease-out spring

/* ─────────────────────────────────────────────
   Entry variants
───────────────────────────────────────────── */

/** Fade up — primary scroll/hero entry */
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
};

/** Fade from left */
export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.52, ease } },
};

/** Fade from right */
export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.52, ease } },
};

/** Pure fade */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

/** Scale in */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.5, ease } },
};

/* ─────────────────────────────────────────────
   Stagger containers
───────────────────────────────────────────── */

/** Standard stagger for section children */
export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Faster stagger (tags, badges, small items) */
export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

/** Hero heading — tighter stagger for letter cascade */
export const heroContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.032, delayChildren: 0.08 } },
};

/* ─────────────────────────────────────────────
   Interactive hover / tap variants
───────────────────────────────────────────── */

/** Primary CTA button — scale + glow shadow */
export const btnPrimary: Variants = {
  rest:  { scale: 1,    boxShadow: '0 4px 24px 0 rgba(59,130,246,0.18)' },
  hover: { scale: 1.04, boxShadow: '0 6px 32px 4px rgba(59,130,246,0.35)',
           transition: { duration: 0.22, ease: 'easeOut' } },
  tap:   { scale: 0.97, transition: { duration: 0.1 } },
};

/** Ghost / outline button */
export const btnGhost: Variants = {
  rest:  { scale: 1,    boxShadow: '0 0 0 0 rgba(59,130,246,0)' },
  hover: { scale: 1.04, boxShadow: '0 4px 20px 0 rgba(59,130,246,0.12)',
           transition: { duration: 0.22, ease: 'easeOut' } },
  tap:   { scale: 0.97, transition: { duration: 0.1 } },
};

/** Small utility button (social links, etc.) */
export const btnSmall: Variants = {
  rest:  { y: 0 },
  hover: { y: -2, transition: { duration: 0.18, ease: 'easeOut' } },
  tap:   { y: 0,  scale: 0.96 },
};

/** Skill tag / domain tag hover */
export const tagHover: Variants = {
  rest:  { y: 0,  boxShadow: '0 0 0 0 rgba(59,130,246,0)',   borderColor: 'rgba(100,116,139,0.5)' },
  hover: { y: -2, boxShadow: '0 0 12px 1px rgba(59,130,246,0.18)', borderColor: 'rgba(59,130,246,0.45)',
           transition: { duration: 0.18, ease: 'easeOut' } },
};

/** Project card hover */
export const cardHover: Variants = {
  rest:  { y: 0, boxShadow: '0 0 0 0 rgba(0,0,0,0)',    borderColor: 'rgba(30,41,59,1)' },
  hover: { y: -5, boxShadow: '0 20px 48px -8px rgba(0,0,0,0.45)', borderColor: 'rgba(100,116,139,0.55)',
           transition: { duration: 0.22, ease: 'easeOut' } },
  tap:   { y: -2, transition: { duration: 0.1 } },
};

/* ─────────────────────────────────────────────
   Viewport config (reused across components)
───────────────────────────────────────────── */
export const viewport = { once: true, margin: '-60px' } as const;
