// src/components/ui/SectionHeading.tsx
// Zentrierte oder linksbündige Überschrift + Subtext für jede Section

import { motion } from 'motion/react'
import { fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  tag?: 'h1' | 'h2' | 'h3'
  alignment?: 'center' | 'left'
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  tag: Tag = 'h2',
  alignment = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
      variants={fadeInUp}
      className={cn(
        'max-w-[700px]',
        alignment === 'center' && 'mx-auto text-center',
        alignment === 'left' && 'text-left',
        className,
      )}
    >
      <Tag className="section-headline">{title}</Tag>
      {subtitle && (
        <p className="section-subline">{subtitle}</p>
      )}
    </motion.div>
  )
}
