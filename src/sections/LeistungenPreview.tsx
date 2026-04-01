// src/sections/LeistungenPreview.tsx
// Vorschau der Leistungen auf der Startseite — 6 ServiceCards mit hochwertigen Mobile-Animationen

import { Link } from 'react-router-dom'
import { motion, type Variants, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

// Desktop: Standard fade-up für Grid-Layout
const desktopVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

// Mobile: Alternierende Richtungen — ungerade von links, gerade von rechts
const mobileLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Spring-ähnlicher Ease
    },
  },
}

const mobileRightVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Für Nutzer mit reduzierten Bewegungen
const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export default function LeistungenPreview() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="leistungen" className="section-surface" aria-labelledby="leistungen-heading">
      <div className="container-content">
        <SectionHeading
          title={COPY.leistungenOverview.headline}
          subtitle={COPY.leistungenOverview.subline}
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
          {COPY.leistungenOverview.items.map((item) => (
            <motion.div
              key={item.title}
              variants={prefersReduced ? reducedVariants : desktopVariants}
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
          {COPY.leistungenOverview.items.map((item, index) => {
            const mobileVariant = prefersReduced
              ? reducedVariants
              : index % 2 === 0
                ? mobileLeftVariants
                : mobileRightVariants

            return (
              <motion.div
                key={item.title}
                variants={mobileVariant}
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
