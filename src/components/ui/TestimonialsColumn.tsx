// src/components/ui/TestimonialsColumn.tsx
// Vertical auto-scrolling testimonial column (infinite loop)
// JS-basiert via requestAnimationFrame — immun gegen prefers-reduced-motion CSS-Override

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TestimonialItem {
  text: string
  name: string
  rating: number
  date?: string
  initial?: string
  color?: string
}

interface TestimonialsColumnProps {
  className?: string
  testimonials: TestimonialItem[]
  duration?: number
}

function InitialAvatar({ name, color }: { name: string; color?: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const bg = color || '#1F2D4B'

  return (
    <div
      className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
      style={{ backgroundColor: bg }}
      aria-hidden
    >
      {initials}
    </div>
  )
}

function StarRatingInline({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
          aria-hidden
        />
      ))}
    </div>
  )
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 15,
}: TestimonialsColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // IntersectionObserver — Pause wenn nicht sichtbar
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // JS-basierte Scroll-Animation via requestAnimationFrame
  const animRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  const animate = useCallback((timestamp: number) => {
    const el = scrollRef.current
    if (!el) return

    if (!startRef.current) startRef.current = timestamp
    const elapsed = timestamp - startRef.current
    const totalHeight = el.scrollHeight / 2
    const progress = (elapsed / (duration * 1000)) % 1

    el.style.transform = `translateY(${-progress * totalHeight}px) translateZ(0)`
    animRef.current = requestAnimationFrame(animate)
  }, [duration])

  useEffect(() => {
    if (isVisible) {
      animRef.current = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animRef.current)
    }
    return () => cancelAnimationFrame(animRef.current)
  }, [isVisible, animate])

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <div
        ref={scrollRef}
        className="flex flex-col gap-6 pb-6 will-change-transform"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map((item, i) => (
              <div
                className="p-6 rounded-2xl border border-brand-border bg-white shadow-card max-w-xs w-full"
                key={`${item.name}-${i}`}
              >
                {/* Stars + Google icon */}
                <div className="flex items-center justify-between mb-3">
                  <StarRatingInline rating={item.rating} />
                  {/* Google "G" icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-40" aria-hidden>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>

                {/* Review text */}
                <p className="text-brand-body text-sm leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-4">
                  <InitialAvatar name={item.name} color={item.color} />
                  <div className="flex flex-col">
                    <span className="font-medium text-brand-heading text-sm leading-5">
                      {item.name}
                    </span>
                    {item.date && (
                      <span className="text-brand-muted text-xs leading-5">{item.date}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
