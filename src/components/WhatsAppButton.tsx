// src/components/WhatsAppButton.tsx
// Floating WhatsApp-Button (unten rechts) — immer sichtbar

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { COPY } from '@/data/content'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={COPY.kontaktdaten.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-modal lg:bottom-6 lg:right-6 group"
      aria-label="WhatsApp schreiben"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Tooltip */}
      <span
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-brand-heading text-brand-white text-xs font-medium px-3 py-1.5 rounded-badge opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        aria-hidden
      >
        WhatsApp schreiben
      </span>

      {/* Button */}
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-float hover:shadow-glow-lg transition-shadow duration-200">
        <MessageCircle size={26} aria-hidden />
      </span>
    </motion.a>
  )
}
