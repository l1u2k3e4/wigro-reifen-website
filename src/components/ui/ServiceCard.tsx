// src/components/ui/ServiceCard.tsx
// Leistungs-Karte für Service-Grid auf Startseite und Leistungsseite

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href?: string
  className?: string
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  className,
}: ServiceCardProps) {
  const IconComponent = getIcon(icon)

  const cardContent = (
    <div
      className={cn(
        'bg-white rounded-xl shadow-card border border-brand-border p-6 flex flex-col gap-4 h-full',
        'hover:shadow-card-hover hover:-translate-y-1 hover:border-brand-blue/30 transition-all duration-200',
        'group',
        className,
      )}
    >
      <div className="w-12 h-12 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
        <IconComponent
          size={24}
          className="text-brand-accent"
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-display font-semibold text-xl text-brand-heading leading-tight">
          {title}
        </h3>
        <p className="text-brand-body text-sm leading-relaxed flex-1">{description}</p>
      </div>
      {href && (
        <div className="flex items-center gap-1 text-brand-accent text-sm font-medium mt-auto pt-2">
          <span>Mehr erfahren</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full">
      {href ? (
        <Link to={href} className="block h-full no-underline" aria-label={title}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  )
}
