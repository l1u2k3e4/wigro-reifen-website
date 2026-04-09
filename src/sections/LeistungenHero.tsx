// src/sections/LeistungenHero.tsx
// Hero-Section der Leistungsseite — Bildbasiert mit Werkstatt-Foto

import { motion } from 'motion/react'
import { COPY } from '@/data/content'
import { fadeInUp } from '@/lib/animations'

export default function LeistungenHero() {
  return (
    <section
      className="relative overflow-hidden min-h-[280px] md:min-h-[480px]"
      aria-labelledby="leistungen-hero-heading"
    >
      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <img
          src="/Logo Sonstige/Werkstatt.01.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="1920"
          height="1080"
          aria-hidden="true"
        />
        {/* Dunkles Overlay für Textlesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 via-brand-blue/70 to-brand-blue/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 md:py-28 px-4">
        <div className="container-content text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col gap-4"
          >
            <h1
              id="leistungen-hero-heading"
              className="font-display font-bold text-4xl md:text-5xl text-white leading-tight"
            >
              {COPY.leistungen.hero.headline}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {COPY.leistungen.hero.subline}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
