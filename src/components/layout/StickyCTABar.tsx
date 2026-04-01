// src/components/layout/StickyCTABar.tsx
// Mobile Sticky CTA-Bar — erscheint nach 30% Scroll, nur unter lg

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { COPY } from '@/data/content'

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: unknown[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as T
}

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(
    debounce(() => {
      const scrolled =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setIsVisible(scrolled > 0.3)
    }, 50),
    [],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="sticky-cta lg:hidden bg-white border-t border-brand-border shadow-lg"
          role="complementary"
          aria-label="Schnellkontakt"
        >
          <a
            href={COPY.stickyCta.anrufen.href}
            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-btn font-semibold text-sm transition-colors bg-brand-cta text-brand-ctaText hover:brightness-105"
            aria-label="WIGRO Reifen anrufen"
          >
            <Phone size={18} aria-hidden />
            <span>{COPY.stickyCta.anrufen.label}</span>
          </a>
          <a
            href={COPY.stickyCta.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-btn font-semibold text-sm transition-colors bg-[#25D366] text-white hover:bg-[#20BD5A]"
            aria-label="WIGRO Reifen auf WhatsApp schreiben"
          >
            <MessageCircle size={18} aria-hidden />
            <span>{COPY.stickyCta.whatsapp.label}</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
