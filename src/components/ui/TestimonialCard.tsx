// src/components/ui/TestimonialCard.tsx
// Kundenbewertungs-Karte mit Sterne-Anzeige

import { motion } from 'motion/react'
import { Quote } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import { fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  quote: string
  name: string
  rating: number
  date?: string
  featured?: boolean
  className?: string
}

export default function TestimonialCard({
  quote,
  name,
  rating,
  date,
  featured = false,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-32px' }}
      variants={fadeInUp}
      className={cn(
        'card flex flex-col gap-4 p-6',
        featured && 'ring-2 ring-brand-accent ring-offset-2',
        className,
      )}
    >
      <Quote
        size={28}
        className="text-brand-wigro opacity-60 shrink-0"
        aria-hidden
      />
      <p className="text-brand-body leading-relaxed flex-1 text-sm lg:text-base italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-brand-border">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-brand-heading text-sm">{name}</span>
          {date && <span className="text-brand-muted text-xs">{date}</span>}
        </div>
        <StarRating rating={rating} size={14} />
      </div>
    </motion.div>
  )
}
