// src/components/PartnerLogos.tsx
// Infinite-scroll Marquee der Markenpartner-Logos

import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

export default function PartnerLogos() {
  const logos = COPY.partner.items
  // Dreifach duplizieren für lückenlosen Loop — wichtig bei nur 5 Logos
  const tripled = [...logos, ...logos, ...logos]

  return (
    <section className="section-surface overflow-x-clip" aria-label="Unsere Markenpartner">
      <div className="container-content">
        <SectionHeading
          title={COPY.partner.headline}
          subtitle={COPY.partner.subline}
        />
      </div>

      {/* Marquee-Container */}
      <div className="relative mt-10">
        {/* Fade-Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-brand-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-brand-surface to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex items-center gap-8 md:gap-12 animate-marquee w-max will-change-transform"
          style={{ backfaceVisibility: 'hidden' }}
          aria-hidden="true"
        >
          {tripled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center shrink-0 w-36 md:w-44 h-16 md:h-20 bg-white rounded-xl shadow-sm border border-brand-border/50 px-4"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-10 md:h-12 max-w-full object-contain"
                loading="eager"
                decoding="async"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
