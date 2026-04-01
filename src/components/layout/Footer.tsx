// src/components/layout/Footer.tsx
// Vollständiger Footer: Blue Background, White Text — Kontakt, Links, Öffnungszeiten, Copyright

import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'
import { COPY } from '@/data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-blue text-white" aria-label="Seitenfuß">
      <div className="container-content py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Spalte 1: Firma + Slogan */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <img
              src={COPY.nav.logo.src}
              alt={COPY.nav.logo.alt}
              className="h-12 w-auto max-w-[160px] object-contain rounded-md self-start"
              loading="lazy"
            />
            <p className="text-sm text-white/90 font-medium leading-relaxed">
              {COPY.footer.slogan}
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.instagram.com/wigroreifen/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
                aria-label="WIGRO Reifen auf Instagram"
              >
                <Instagram size={18} aria-hidden />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100070979276713"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
                aria-label="WIGRO Reifen auf Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Spalte 2: Navigation */}
          <nav aria-label="Footer Navigation">
            <p className="font-display font-semibold text-sm uppercase tracking-widest text-white/90 mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {COPY.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Spalte 3: Kontakt */}
          <div>
            <p className="font-display font-semibold text-sm uppercase tracking-widest text-white/90 mb-4">
              Kontakt
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={COPY.footer.telefonHref}
                  className="flex items-start gap-2 text-white/90 font-medium hover:text-white transition-colors"
                  aria-label={`WIGRO Reifen anrufen: ${COPY.footer.telefon}`}
                >
                  <Phone size={14} className="shrink-0 mt-0.5" aria-hidden />
                  <span>{COPY.footer.telefon}</span>
                </a>
              </li>
              <li>
                <a
                  href={COPY.footer.emailHref}
                  className="flex items-start gap-2 text-white/90 font-medium hover:text-white transition-colors"
                  aria-label={`E-Mail an WIGRO Reifen: ${COPY.footer.email}`}
                >
                  <Mail size={14} className="shrink-0 mt-0.5" aria-hidden />
                  <span>{COPY.footer.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={COPY.footer.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/90 font-medium hover:text-white transition-colors"
                  aria-label="WIGRO Reifen auf Google Maps finden"
                >
                  <MapPin size={14} className="shrink-0 mt-0.5" aria-hidden />
                  <span>{COPY.footer.adresse}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Spalte 4: Öffnungszeiten */}
          <div>
            <p className="font-display font-semibold text-sm uppercase tracking-widest text-white/90 mb-4">
              Öffnungszeiten
            </p>
            <div className="flex items-start gap-2 text-sm text-white/90 font-medium">
              <Clock size={14} className="shrink-0 mt-0.5 text-brand-cta" aria-hidden />
              <div>
                <p className="text-white/90">Mo – Fr</p>
                <p className="text-white/90">08:00 – 12:30 Uhr</p>
                <p className="text-white/90">13:00 – 17:00 Uhr</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-content py-4 flex items-center justify-between text-xs text-white/60 font-medium">
          <span>{COPY.footer.copyright.replace(new Date().getFullYear().toString(), year.toString())}</span>
          <div className="flex gap-4">
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
