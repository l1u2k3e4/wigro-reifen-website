// src/components/ui/StarRating.tsx
// Sterne-Anzeige für Bewertungen

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: number
  className?: string
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  className,
}: StarRatingProps) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`Bewertung: ${rating} von ${maxStars} Sternen`}
      role="img"
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.round(rating)
        return (
          <Star
            key={i}
            size={size}
            className={filled ? 'fill-brand-wigro text-brand-wigro' : 'fill-transparent text-brand-border'}
            aria-hidden
          />
        )
      })}
    </div>
  )
}
