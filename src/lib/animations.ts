// src/lib/animations.ts
// Wiederverwendbare Motion Variants für WIGRO Reifen Website
// Motion (motion.dev) nutzt die Web Animations API — hardware-accelerated auf allen Geräten

import type { Variants } from 'motion/react'

// Einheitliches Easing — custom cubic-bezier überall
const EASE = [0.22, 1, 0.36, 1] as const

// Keine Animation — für prefers-reduced-motion Accessibility
export const noAnim: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.25, ease: EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.25, ease: EASE },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: EASE },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.25, ease: EASE },
  },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 48,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
}
