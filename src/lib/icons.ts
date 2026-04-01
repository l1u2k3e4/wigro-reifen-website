// src/lib/icons.ts
// Icon-Registry — nur verwendete Icons importieren (verhindert Bundle-Bloat durch `import * as LucideIcons`)
// Alle in content.ts und Komponenten genutzten Icons sind hier registriert.

import type { LucideIcon as LucideIconBase } from 'lucide-react'
import {
  RefreshCw,
  Archive,
  Settings,
  Sparkles,
  MessageSquare,
  Gauge,
  Users,
  Shield,
  BadgeEuro,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  ChevronDown,
  Check,
  Wrench,
  Menu,
  X,
  Star,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react'

export type LucideIcon = LucideIconBase

export const iconRegistry: Record<string, LucideIcon> = {
  RefreshCw,
  Archive,
  Settings,
  Sparkles,
  MessageSquare,
  Gauge,
  Users,
  Shield,
  BadgeEuro,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  ChevronDown,
  Check,
  Wrench,
  Menu,
  X,
  Star,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
}

/** Gibt das Icon zurück — Fallback: Wrench */
export function getIcon(name: string): LucideIcon {
  return iconRegistry[name] ?? Wrench
}
