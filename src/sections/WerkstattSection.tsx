// src/sections/WerkstattSection.tsx
// Bildergalerie der Werkstatt — 4 Fotos in Grid

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export default function WerkstattSection() {
  return (
    <section id="werkstatt" className="section-surface" aria-labelledby="werkstatt-heading">
      <div className="container-content">
        <SectionHeading
          title={COPY.team.werkstattBilder.headline}
          tag="h2"
          alignment="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {COPY.team.werkstattBilder.bilder.map((bild, index) => (
            <motion.div
              key={bild.src}
              variants={fadeInUp}
              className={`rounded-card overflow-hidden shadow-card ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div className={`${index === 0 ? 'aspect-square' : 'aspect-square'} overflow-hidden`}>
                <img
                  src={bild.src}
                  alt={bild.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
