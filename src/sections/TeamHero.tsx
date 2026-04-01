// src/sections/TeamHero.tsx
// Hero-Section der Team-Seite

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import { fadeInUp } from '@/lib/animations'

export default function TeamHero() {
  return (
    <section
      className="bg-brand-wigro py-16 md:py-20 px-4"
      aria-labelledby="team-hero-heading"
    >
      <div className="container-content text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col gap-4"
        >
          <h1
            id="team-hero-heading"
            className="font-display font-bold text-4xl md:text-5xl text-brand-ctaText leading-tight"
          >
            {COPY.team.hero.headline}
          </h1>
          <p className="text-brand-ctaText/75 text-lg max-w-2xl mx-auto leading-relaxed">
            {COPY.team.hero.subline}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
