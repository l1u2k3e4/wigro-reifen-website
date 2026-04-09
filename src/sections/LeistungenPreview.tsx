// src/sections/LeistungenPreview.tsx
// Vorschau der Leistungen auf der Startseite — 6 ServiceCards mit hochwertigen Mobile-Animationen

import { Link } from 'react-router-dom'
import { motion, type Variants, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { COPY } from '@/data/content'
import { useModuleOverrides } from '@/hooks/useContentOverrides'
import { mergeOverrides } from '@/lib/mergeOverrides'
import { noAnim } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const reducedVariants: Variants = noAnim

export default function LeistungenPreview() {
  const prefersReduced = useReducedMotion()
  const overrides = useModuleOverrides<typeof COPY.leistungenOverview>('leistungen')
  const leistungen = mergeOverrides(COPY.leistungenOverview, overrides)

  return (
    <section id="leistungen" className="section-surface" aria-labelledby="leistungen-heading">
      <div className="container-content">
        <SectionHeading
          title={leistungen.headline}
          subtitle={leistungen.subline}
          tag="h2"
          alignment="center"
        />

        {/* Desktop Grid (sm+): Standard stagger fade-up */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="mt-12 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {leistungen.items.map((item) => (
            <motion.div
              key={item.title}
              variants={prefersReduced ? reducedVariants : cardVariants}
              className="h-full"
            >
              <ServiceCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                href={item.href}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile (unter sm): Alternierende Links/Rechts-Animationen */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="mt-12 flex flex-col gap-4 sm:hidden"
        >
          {leistungen.items.map((item) => {
            return (
              <motion.div
                key={item.title}
                variants={prefersReduced ? reducedVariants : cardVariants}
              >
                <ServiceCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  href={item.href}
                />
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:text-brand-blueLight transition-colors group"
            aria-label="Alle Leistungen ansehen"
          >
            <span>Alle Leistungen im Detail</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
