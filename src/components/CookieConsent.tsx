// src/components/CookieConsent.tsx
// DSGVO-konformer Cookie-Banner — kein Dark Pattern

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { slideUp } from '@/lib/animations'
import { COPY } from '@/data/content'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'wigro_cookie_consent'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Nur anzeigen wenn noch keine Entscheidung getroffen wurde
    try {
      const decision = localStorage.getItem(STORAGE_KEY)
      if (!decision) {
        setIsVisible(true)
      }
    } catch {
      // localStorage nicht verfügbar (z.B. Private Mode)
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // silent fail
    }
    setIsVisible(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'declined')
    } catch {
      // silent fail
    }
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 inset-x-0 z-toast p-4 lg:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie-Einstellungen"
          aria-live="polite"
        >
          <div className="max-w-3xl mx-auto bg-brand-bg border border-brand-border rounded-card shadow-float p-5 lg:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-brand-heading text-sm">
                  Cookie-Einstellungen
                </p>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {COPY.cookieConsent.text}{' '}
                  <Link
                    to="/datenschutz"
                    className="text-brand-accent underline hover:no-underline"
                  >
                    Datenschutzerklärung
                  </Link>
                </p>
              </div>
              <button
                type="button"
                onClick={handleDecline}
                className="shrink-0 w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-heading transition-colors rounded"
                aria-label="Cookie-Banner schließen (Ablehnen)"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                type="button"
                onClick={handleAccept}
                className="btn-primary text-sm px-5 py-2.5 flex-1 sm:flex-none"
              >
                {COPY.cookieConsent.akzeptieren}
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="btn-secondary text-sm px-5 py-2.5 flex-1 sm:flex-none"
              >
                {COPY.cookieConsent.ablehnen}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
