// src/components/ui/TeamCard.tsx
// Mitarbeiter-Karte mit Foto, Name und Rolle

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface TeamCardProps {
  name: string
  role: string
  image: string
  className?: string
}

export default function TeamCard({
  name,
  role,
  image,
  className,
}: TeamCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-32px' }}
      variants={fadeInUp}
      className={cn('card overflow-hidden group', className)}
    >
      <div className="overflow-hidden aspect-[3/4] bg-brand-light">
        <img
          src={image}
          alt={`${name} — ${role} bei WIGRO Reifen Witten`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width="800"
          height="1067"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-display font-semibold text-lg text-brand-heading leading-tight">
          {name}
        </h3>
        <p className="text-brand-muted text-sm">{role}</p>
      </div>
    </motion.div>
  )
}
