// src/components/layout/MobileMenu.tsx
// Slide-Over Panel von RECHTS — Mobile Navigation

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { COPY } from '@/data/content'
import { slideInRight } from '@/lib/animations'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation()

  // Schließen bei Routenwechsel
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  // Body-Scroll sperren wenn Menü offen (deferred via rAF, damit Framer Motion's erster Frame nicht blockiert wird)
  useEffect(() => {
    if (isOpen) {
      const rafId = requestAnimationFrame(() => {
        document.body.style.overflow = 'hidden'
        document.body.classList.add('menu-open')
      })
      return () => cancelAnimationFrame(rafId)
    }
    document.body.style.overflow = ''
    document.body.classList.remove('menu-open')
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay / Backdrop */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-overlay bg-black/60"
            onClick={onClose}
            aria-hidden
          />

          {/* Slide-Over Panel */}
          <motion.div
            key="panel"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full z-modal bg-brand-bg shadow-float flex flex-col transform-gpu will-change-transform"
            style={{ width: 'min(320px, 80vw)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <img
                src={COPY.nav.logo.src}
                alt={COPY.nav.logo.alt}
                className="h-10 w-auto object-contain"
                loading="eager"
              />
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-btn text-brand-muted hover:text-brand-heading hover:bg-brand-light transition-colors"
                aria-label="Menü schließen"
              >
                <X size={22} aria-hidden />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1" aria-label="Hauptnavigation Mobile">
              {COPY.nav.links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center h-12 px-3 rounded-btn font-body font-medium text-brand-body hover:text-brand-accent hover:bg-brand-accentLight transition-colors"
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Kontakt */}
            <div className="px-4 py-6 border-t border-brand-border flex flex-col gap-3">
              <a
                href={COPY.kontaktdaten.telefonHref}
                className="btn-primary flex items-center justify-center gap-2 w-full"
              >
                <Phone size={18} aria-hidden />
                <span>{COPY.nav.cta.label}</span>
              </a>
              <div className="text-left text-xs text-brand-muted space-y-0.5">
                <p>{COPY.kontaktdaten.strasse}, {COPY.kontaktdaten.plzOrt}</p>
                <p>{COPY.anfahrt.oeffnungszeiten[0].zeiten}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
