// src/sections/KontaktGrid.tsx
// 4 Kontakt-Karten: Telefon, WhatsApp, E-Mail, Adresse

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import { getIcon } from '@/lib/icons'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export default function KontaktGrid() {
  return (
    <section id="kontakt-kanaele" className="section" aria-labelledby="kontakt-grid-heading">
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {COPY.kontakt.kanaele.map((kanal) => {
            const IconComponent = getIcon(kanal.icon)

            return (
              <motion.div
                key={kanal.label}
                variants={fadeInUp}
                className="card p-6 flex flex-col gap-4 hover:border-brand-accentLight transition-colors"
              >
                <div className="w-12 h-12 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                  <IconComponent size={24} className="text-brand-accent" aria-hidden />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <p className="font-semibold text-brand-heading text-sm">{kanal.label}</p>
                  <p className="text-brand-body text-sm font-medium">{kanal.wert}</p>
                  <p className="text-brand-muted text-xs leading-relaxed">{kanal.beschreibung}</p>
                </div>
                <a
                  href={kanal.href}
                  target={kanal.href.startsWith('http') ? '_blank' : undefined}
                  rel={kanal.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-center py-2.5 px-4 inline-flex items-center justify-center rounded-btn font-semibold transition-colors bg-brand-cta text-brand-ctaText hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                  aria-label={`${kanal.cta} — ${kanal.wert}`}
                >
                  {kanal.cta}
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
