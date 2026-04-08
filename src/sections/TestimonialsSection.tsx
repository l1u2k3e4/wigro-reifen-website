// src/sections/TestimonialsSection.tsx
// Google-Bewertungen im Spalten-Karussell-Stil (Desktop: 3 Columns, Tablet: 2, Mobile: 1)

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { isMobile } from '@/lib/animations'
import { ExternalLink } from 'lucide-react'
import { COPY } from '@/data/content'
import { useModuleOverrides } from '@/hooks/useContentOverrides'
import { mergeOverrides } from '@/lib/mergeOverrides'
import SectionHeading from '@/components/ui/SectionHeading'
import { TestimonialsColumn } from '@/components/ui/TestimonialsColumn'
import type { TestimonialItem } from '@/components/ui/TestimonialsColumn'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

export default function TestimonialsSection() {
  const overrides = useModuleOverrides<typeof COPY.bewertungen>('bewertungen')
  const bewertungen = mergeOverrides(COPY.bewertungen, overrides)
  const items = bewertungen.items as unknown as TestimonialItem[]

  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')

  // Split items into 3 columns
  const col1 = items.slice(0, 3)
  const col2 = items.slice(3, 6)
  const col3 = items.slice(6, 9)

  return (
    <section id="bewertungen" className="section relative" aria-labelledby="bewertungen-heading">
      <div className="container-content">
        {/* Header with overall rating */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-4"
        >
          {/* Google Rating Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white border border-brand-border rounded-full px-4 py-2 shadow-card">
              {/* Google "G" */}
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-display font-bold text-xl text-brand-heading">
                {bewertungen.ratingValue}
              </span>
            </div>
          </div>

          <SectionHeading
            title={bewertungen.headline}
            subtitle={`Basierend auf ${bewertungen.ratingCount} Google-Bewertungen`}
            tag="h2"
            alignment="center"
          />
        </motion.div>

        {/* Testimonial Columns — mit fade-mask oben/unten */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden">
          <TestimonialsColumn testimonials={col1} duration={15} />
          {isMd && <TestimonialsColumn testimonials={col2} duration={19} />}
          {isLg && <TestimonialsColumn testimonials={col3} duration={17} />}
        </div>

        {/* Google CTA */}
        <div className="mt-8 flex flex-col items-center">
          <a
            href={bewertungen.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:text-brand-blueLight transition-colors group"
            aria-label="Alle Google-Bewertungen von WIGRO Reifen ansehen"
          >
            <span>{bewertungen.cta.label}</span>
            <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
