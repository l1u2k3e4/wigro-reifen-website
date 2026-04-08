// src/components/layout/Header.tsx
// Sticky Header: Blue Nav — Logo + Desktop-Nav + CTA | Mobile: Logo + Hamburger

import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu } from 'lucide-react'
import { COPY } from '@/data/content'
import { useModuleOverrides } from '@/hooks/useContentOverrides'
import { mergeOverrides } from '@/lib/mergeOverrides'
import MobileMenu from '@/components/layout/MobileMenu'
import { cn } from '@/lib/utils'

export default function Header() {
  const overrides = useModuleOverrides<typeof COPY.nav>('header')
  const nav = mergeOverrides(COPY.nav, overrides)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const handleMenuClose = useCallback(() => setIsMenuOpen(false), [])
  const location = useLocation()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 8)
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Skip-Link für Tastaturnutzer */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-toast focus:px-4 focus:py-2 focus:bg-brand-cta focus:text-brand-ctaText focus:rounded-btn focus:text-sm focus:font-semibold"
      >
        Zum Inhalt springen
      </a>

      <header
        className={cn(
          'sticky top-0 z-nav bg-brand-blue transition-shadow duration-200',
          isScrolled ? 'shadow-nav' : 'shadow-none',
        )}
        role="banner"
      >
        <div className="container-content flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2 rounded-sm"
            aria-label="WIGRO Reifen — Startseite"
          >
            <img
              src={nav.logo.src}
              alt={nav.logo.alt}
              className="h-14 w-auto object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Hauptnavigation"
          >
            {nav.links.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-3 py-2 rounded-btn font-body font-medium text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2',
                    isActive
                      ? 'text-white bg-white/15'
                      : 'text-white/80 hover:text-white hover:bg-white/10',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA — Lime-Green Button */}
            <a
              href={nav.cta.href}
              className="hidden lg:inline-flex items-center gap-2 text-sm px-5 py-2.5 bg-brand-cta hover:bg-brand-ctaHover text-brand-ctaText font-semibold rounded-btn transition-colors"
              aria-label={`WIGRO Reifen anrufen: ${COPY.kontaktdaten.telefon}`}
            >
              <Phone size={16} aria-hidden />
              <span>{nav.cta.label}</span>
            </a>

            {/* Hamburger-Button (Mobile) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={cn(
                'lg:hidden w-11 h-11 flex items-center justify-center',
                'rounded-btn text-white/80 hover:text-white hover:bg-white/10',
                'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2',
              )}
              aria-label="Menü öffnen"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      />
    </>
  )
}
