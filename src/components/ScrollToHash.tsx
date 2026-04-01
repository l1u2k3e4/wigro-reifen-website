// src/components/ScrollToHash.tsx
// Scrollt nach Routenwechsel zum Hash-Fragment (z.B. /leistungen#reifenwechsel)

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      // Kurze Verzögerung damit die Seite erst rendern kann
      const timer = setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Ohne Hash → nach oben scrollen
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [hash, pathname])

  return null
}
