// src/sections/WarumWIGRO.tsx
// 3 USP-Cards: Persönlich, Qualität, Fairness + Zahlen prominent
// Blaues Theme, animierte Counter, Card-Layout mit stagger

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useInView, type Variants } from 'motion/react'
import { COPY } from '@/data/content'
import { getIcon } from '@/lib/icons'
import SectionHeading from '@/components/ui/SectionHeading'

// ── Animated counter hook ──
function useAnimatedCounter(target: string, isInView: boolean) {
  const [display, setDisplay] = useState('0')

  const parsed = useMemo(() => {
    const match = target.match(/^[\d.,]+/)
    if (!match) return null
    return {
      endVal: parseFloat(match[0].replace(',', '.')),
      suffix: target.slice(match[0].length),
      isDecimal: match[0].includes(',') || match[0].includes('.'),
    }
  }, [target])

  useEffect(() => {
    if (!isInView || !parsed) {
      if (!parsed) setDisplay(target)
      return
    }

    const { endVal, suffix, isDecimal } = parsed
    const duration = 1600
    let start: number | null = null
    let rafId: number

    function tick(timestamp: number) {
      if (start === null) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = eased * endVal

      if (isDecimal) {
        setDisplay(current.toFixed(1).replace('.', ',') + suffix)
      } else {
        setDisplay(Math.round(current).toString() + suffix)
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, target, parsed])

  return display
}

function AnimatedStat({ zahl, label }: { zahl: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-48px' })
  const animated = useAnimatedCounter(zahl, isInView)

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-1"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <span className="font-display font-bold text-2xl md:text-4xl text-brand-blue">
        {animated}
      </span>
      <span className="text-brand-muted text-xs md:text-sm">{label}</span>
    </div>
  )
}

// ── Stagger container & card variants ──
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function WarumWIGRO() {
  return (
    <section
      id="warum-wigro"
      className="py-16 md:py-24 bg-brand-surface"
      aria-labelledby="warum-heading"
    >
      <div className="container-content">
        <SectionHeading
          title={COPY.usp.headline}
          subtitle={COPY.usp.subline}
          tag="h2"
          alignment="center"
        />

        {/* Zahlen-Highlight mit animierten Countern */}
        <div className="mt-10 grid grid-cols-3 gap-4 md:gap-8 mb-12">
          {COPY.usp.zahlen.map((item) => (
            <AnimatedStat key={item.label} zahl={item.zahl} label={item.label} />
          ))}
        </div>

        {/* USP Cards — blaues Theme */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={containerVariants}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {COPY.usp.items.map((item) => {
            const IconComponent = getIcon(item.icon)

            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="bg-white rounded-xl shadow-card border border-brand-border p-6 flex flex-col gap-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
              >
                {/* Blue icon circle */}
                <div className="w-12 h-12 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                  <IconComponent size={24} className="text-brand-blue" aria-hidden />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-semibold text-xl text-brand-heading">
                    {item.title}
                  </h3>
                  <p className="text-brand-body text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
