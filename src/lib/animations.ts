// src/lib/animations.ts
// Wiederverwendbare Framer Motion Variants für WIGRO Reifen Website
// Auf Mobile (< 1024px) werden Animationen deaktiviert für flüssiges Scrollen

import type { Variants } from 'framer-motion'

// Mobile-Erkennung — einmalig beim Import ausgewertet
export const isMobile =
  typeof window !== 'undefined' && window.innerWidth < 1024

// Einheitliches Easing — custom cubic-bezier überall
const EASE = [0.22, 1, 0.36, 1] as const

// Auf Mobile: hidden === visible → Element sofort sichtbar, kein Observer nötig
export const noAnim: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
}

export const fadeInUp: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.25, ease: EASE },
      },
    }

export const fadeIn: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.25, ease: EASE },
      },
    }

export const staggerContainer: Variants = isMobile
  ? noAnim
  : {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.03 },
      },
    }

export const slideInRight: Variants = isMobile
  ? {
      hidden: { x: '100%', opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.2, ease: EASE },
      },
      exit: {
        x: '100%',
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeIn' },
      },
    }
  : {
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

export const scaleIn: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.25, ease: EASE },
      },
    }

export const slideUp: Variants = isMobile
  ? {
      ...noAnim,
      exit: { opacity: 0, y: 48, transition: { duration: 0.18, ease: 'easeIn' } },
    }
  : {
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
