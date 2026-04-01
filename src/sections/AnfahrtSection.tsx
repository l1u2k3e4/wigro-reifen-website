// src/sections/AnfahrtSection.tsx
// Anfahrt auf Startseite — Zweispaltig: Links Kontaktinfos, Rechts Google Maps (direkt geladen)

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, Navigation } from 'lucide-react'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowButton from '@/components/ui/GlowButton'
import { fadeInUp } from '@/lib/animations'
import { openMapsRoute } from '@/lib/maps'

export default function AnfahrtSection() {
  return (
    <section id="anfahrt" className="section" aria-labelledby="anfahrt-heading">
      <div className="container-content">
        <SectionHeading
          title={COPY.anfahrt.headline}
          subtitle={COPY.anfahrt.subline}
          tag="h2"
          alignment="center"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          {/* Links: Kontaktinfos als gestaltete Blöcke */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
            className="flex flex-col gap-6"
          >
            {/* Adresse */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-0.5">Adresse</p>
                <p className="text-brand-body text-sm">{COPY.anfahrt.adresse}</p>
                <p className="text-brand-muted text-xs mt-1">{COPY.anfahrt.parkplatz}</p>
              </div>
            </div>

            {/* Telefon */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <Phone size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-0.5">Telefon</p>
                <a
                  href={COPY.anfahrt.telefonHref}
                  className="text-brand-blue text-sm hover:text-brand-blueLight transition-colors font-medium"
                >
                  {COPY.anfahrt.telefon}
                </a>
              </div>
            </div>

            {/* E-Mail */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <Mail size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-0.5">E-Mail</p>
                <a
                  href={COPY.anfahrt.emailHref}
                  className="text-brand-blue text-sm hover:text-brand-blueLight transition-colors font-medium"
                >
                  {COPY.anfahrt.email}
                </a>
              </div>
            </div>

            {/* Öffnungszeiten */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <Clock size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-1">Öffnungszeiten</p>
                {COPY.anfahrt.oeffnungszeiten.map((row, i) => (
                  <div key={i} className="flex gap-4 text-sm text-brand-body">
                    <span className="min-w-[120px]">{row.tag}</span>
                    <span>{row.zeiten}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rechts: Google Maps direkt eingebettet */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
            className="flex flex-col gap-4"
          >
            <div className="rounded-xl overflow-hidden shadow-card border border-brand-border h-72 md:h-96">
              <iframe
                src="https://maps.google.com/maps?q=Wigro+Reifen,+Cörmannstr.+25,+58455+Witten&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps — WIGRO Reifen Witten"
              />
            </div>

            {/* Route planen Button */}
            <GlowButton
              label="Route planen"
              onClick={openMapsRoute}
              variant="secondary"
              size="md"
              icon={Navigation}
              iconPosition="right"
              ariaLabel="Route zu WIGRO Reifen planen"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
