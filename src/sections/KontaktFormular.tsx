// src/sections/KontaktFormular.tsx
// Kontaktformular + Öffnungszeiten nebeneinander

import { motion } from 'motion/react'
import { Clock } from 'lucide-react'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactForm from '@/components/ContactForm'
import { fadeInUp } from '@/lib/animations'

export default function KontaktFormular() {
  return (
    <section id="formular" className="section-surface" aria-labelledby="formular-heading">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Formular */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
          >
            <SectionHeading
              title={COPY.kontakt.formular.headline}
              subtitle={COPY.kontakt.formular.subline}
              tag="h2"
              alignment="left"
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </motion.div>

          {/* Öffnungszeiten */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
            className="lg:pt-2"
          >
            <div className="card p-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-brand-accent" aria-hidden />
                </div>
                <h3 className="font-display font-semibold text-xl text-brand-heading">
                  {COPY.kontakt.oeffnungszeiten.headline}
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {COPY.kontakt.oeffnungszeiten.zeilen.map((zeile, i) => (
                  <div key={i} className="flex gap-4 text-sm">
                    {zeile.tag && (
                      <span className="text-brand-muted min-w-[140px]">{zeile.tag}</span>
                    )}
                    <span className="text-brand-body font-medium">{zeile.zeiten}</span>
                  </div>
                ))}
              </div>

              <p className="text-brand-muted text-xs leading-relaxed border-t border-brand-border pt-4">
                {COPY.kontakt.oeffnungszeiten.hinweis}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
