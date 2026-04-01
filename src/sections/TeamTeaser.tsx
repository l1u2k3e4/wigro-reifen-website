// src/sections/TeamTeaser.tsx
// Kurzvorstellung des Teams auf der Startseite — Bild + Text + Link zu /team

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeInUp } from '@/lib/animations'

export default function TeamTeaser() {
  return (
    <section id="team" className="section" aria-labelledby="team-teaser-heading">
      <div className="container-content">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Bild */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
            className="order-2 md:order-1"
          >
            <div className="rounded-card overflow-hidden aspect-[4/3] shadow-card">
              <img
                src={COPY.teamTeaser.image.src}
                alt={COPY.teamTeaser.image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
            className="order-1 md:order-2 flex flex-col gap-6"
          >
            <SectionHeading
              title={COPY.teamTeaser.headline}
              subtitle={COPY.teamTeaser.subline}
              tag="h2"
              alignment="left"
            />

            <Link
              to={COPY.teamTeaser.cta.href}
              className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm hover:text-brand-accentHover transition-colors group w-fit"
              aria-label="Das WIGRO-Team kennenlernen"
            >
              <span>{COPY.teamTeaser.cta.label}</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
