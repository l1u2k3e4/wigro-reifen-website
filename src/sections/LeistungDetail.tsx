// src/sections/LeistungDetail.tsx
// Wiederverwendbare Leistungs-Detail-Section — Icon + Text mit Stagger-Animationen

import { motion, type Variants } from 'framer-motion'
import { Check, Phone } from 'lucide-react'
import { getIcon } from '@/lib/icons'
import { isMobile, noAnim } from '@/lib/animations'
import GlowButton from '@/components/ui/GlowButton'
import { cn } from '@/lib/utils'

interface LeistungDetailProps {
  id: string
  icon: string
  title: string
  intro: string
  vorteile: readonly string[]
  cta: { label: string; href: string }
  image?: string
  reversed?: boolean
  surface?: boolean
}

const containerVariants: Variants = isMobile
  ? noAnim
  : { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }

const fadeInLeft: Variants = isMobile
  ? noAnim
  : { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }

const fadeInRight: Variants = isMobile
  ? noAnim
  : { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }

const scaleIn: Variants = isMobile
  ? noAnim
  : { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } } }

export default function LeistungDetail({
  id,
  icon,
  title,
  intro,
  vorteile,
  cta,
  reversed = false,
  surface = false,
}: LeistungDetailProps) {
  const IconComponent = getIcon(icon)

  // Linke Spalte fährt von links rein, rechte von rechts — umgekehrt wenn reversed
  const iconAnimation = reversed ? fadeInRight : fadeInLeft
  const textAnimation = reversed ? fadeInLeft : fadeInRight

  return (
    <section
      id={id}
      className={cn(surface ? 'section-surface' : 'section')}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={containerVariants}
          className={cn(
            'grid gap-10 md:grid-cols-2 items-start',
            reversed && 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1',
          )}
        >
          {/* Icon + Badge Seite */}
          <motion.div
            variants={iconAnimation}
            className="flex flex-col items-center justify-center bg-brand-accentLight rounded-card p-12 min-h-[280px]"
          >
            <motion.div
              variants={scaleIn}
              className="w-20 h-20 rounded-full bg-brand-accent flex items-center justify-center mb-6"
            >
              <IconComponent size={40} className="text-brand-white" aria-hidden />
            </motion.div>
            <h2
              id={`${id}-heading`}
              className="font-display font-bold text-2xl text-brand-heading text-center leading-tight"
            >
              {title}
            </h2>
          </motion.div>

          {/* Text Seite */}
          <motion.div
            variants={textAnimation}
            className="flex flex-col gap-5"
          >
            <p className="text-brand-body text-base leading-relaxed">{intro}</p>

            {/* Vorteile */}
            <ul className="flex flex-col gap-2.5">
              {vorteile.map((vorteil) => (
                <li
                  key={vorteil}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-accentLight flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-brand-accent" aria-hidden />
                  </div>
                  <span className="text-brand-body text-sm leading-relaxed">{vorteil}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div>
              <GlowButton
                label={cta.label}
                href={cta.href}
                variant="primary"
                size="md"
                icon={Phone}
                iconPosition="left"
                className="w-fit"
                ariaLabel={cta.label}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
