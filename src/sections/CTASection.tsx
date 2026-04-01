// src/sections/CTASection.tsx
// Finaler Call-to-Action Block — dunkler Hintergrund, starke Headline, Dual CTA

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { COPY } from '@/data/content'
import GlowButton from '@/components/ui/GlowButton'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function CTASection() {
  return (
    <section
      id="kontakt-cta"
      className="bg-brand-wigro py-20 px-4"
      aria-labelledby="cta-heading"
    >
      <div className="container-content text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={staggerContainer}
          className="flex flex-col items-center gap-6"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display font-bold text-3xl md:text-4xl text-brand-ctaText leading-tight max-w-2xl"
          >
            {COPY.ctaSection.headline}
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-brand-ctaText/75 text-lg max-w-xl leading-relaxed">
            {COPY.ctaSection.subline}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <GlowButton
              label={COPY.ctaSection.ctaPrimary.label}
              href={COPY.ctaSection.ctaPrimary.href}
              variant="primary"
              size="lg"
              icon={Phone}
              iconPosition="left"
              ariaLabel="Jetzt WIGRO Reifen anrufen"
            />
            <GlowButton
              label={COPY.ctaSection.ctaSecondary.label}
              href={COPY.ctaSection.ctaSecondary.href}
              variant="secondary"
              size="lg"
              icon={MessageCircle}
              iconPosition="left"
              ariaLabel="WhatsApp Nachricht an WIGRO Reifen"
            />
          </motion.div>

          <motion.p variants={fadeInUp} className="text-brand-ctaText/60 text-sm">
            {COPY.ctaSection.note}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
