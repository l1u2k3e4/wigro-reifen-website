// src/components/ui/GlowButton.tsx
// Primärer CTA-Button mit Glow-Effekt — wird für alle CTAs verwendet

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface GlowButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
}

const sizeClasses = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-14 px-8 text-base gap-2.5',
}

const variantClasses = {
  primary:
    'bg-brand-cta text-brand-ctaText font-semibold rounded-btn shadow-glow hover:bg-brand-ctaHover hover:shadow-glow-lg active:scale-[0.98] transition-all',
  secondary:
    'border-2 border-brand-blue text-brand-blue font-semibold rounded-btn hover:bg-brand-blue hover:text-white active:scale-[0.98] transition-colors',
  ghost:
    'bg-white/10 backdrop-blur-sm text-white font-semibold rounded-btn border border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-[0.98] transition-all',
}

export default function GlowButton({
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className,
  type = 'button',
  disabled = false,
  ariaLabel,
}: GlowButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-body transition-all duration-200 select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
    'min-w-[44px] min-h-[44px]',
    sizeClasses[size],
    variantClasses[variant],
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="shrink-0" size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} aria-hidden />}
      <span>{label}</span>
      {Icon && iconPosition === 'right' && <Icon className="shrink-0" size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} aria-hidden />}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  )
}
