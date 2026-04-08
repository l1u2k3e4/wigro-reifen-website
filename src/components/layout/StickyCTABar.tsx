// src/components/layout/StickyCTABar.tsx
// Mobile Sticky CTA-Bar — erscheint sobald Hero nicht mehr sichtbar, nur unter lg

import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { COPY } from '@/data/content'

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Beobachte den Hero-Bereich — sobald er aus dem Viewport verschwindet, CTA zeigen
    const hero = document.getElementById('hero')
    if (!hero) {
      // Fallback: nach 1s einblenden wenn kein Hero gefunden
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // CTA sichtbar wenn Hero NICHT mehr sichtbar ist
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`sticky-cta lg:hidden bg-white border-t border-brand-border shadow-lg transition-transform duration-200 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="complementary"
      aria-label="Schnellkontakt"
      aria-hidden={!isVisible}
    >
      <a
        href={COPY.stickyCta.anrufen.href}
        className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-btn font-semibold text-sm transition-colors bg-brand-cta text-brand-ctaText hover:brightness-105"
        aria-label="WIGRO Reifen anrufen"
        tabIndex={isVisible ? 0 : -1}
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
        tabIndex={isVisible ? 0 : -1}
      >
        <MessageCircle size={18} aria-hidden />
        <span>{COPY.stickyCta.whatsapp.label}</span>
      </a>
    </div>
  )
}
