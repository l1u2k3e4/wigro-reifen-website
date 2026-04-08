# FIX_23 — StickyCTABar: Fest am unteren Bildschirmrand fixieren (kein Schweben)

## Ziel
Die mobile StickyCTABar schwebt aktuell leicht über dem unteren Rand statt direkt am Boden zu kleben. Sie soll **immer** am unteren Bildschirmrand fixiert sein — ohne Abstand, ohne Animation die sie verschiebt.

---

## Problem-Analyse

### Ursache 1: Framer Motion `slideUp`-Variant verschiebt die Bar
Die StickyCTABar nutzt die `slideUp`-Variante aus `src/lib/animations.ts`:
```ts
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 48 },
}
```

Framer Motion setzt `transform: translateY(0px)` im `visible`-State. Aber durch Timing-Ungenauigkeiten oder Animation-Interpolation kann `y` kurzfristig **nicht exakt 0** sein, was die Bar leicht anhebt. Außerdem erzeugt `y: 48` im `hidden`-State einen Sprung von unten, der visuell wie "Schweben" aussehen kann, wenn die Animation noch nicht abgeschlossen ist.

### Ursache 2: CSS `padding-bottom` mit `env(safe-area-inset-bottom)`
Die `.sticky-cta` CSS-Klasse hat:
```css
padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
```
Auf Geräten OHNE Home-Indicator (ältere iPhones, Android) gibt `env(safe-area-inset-bottom)` den Wert `0` zurück. Die `0.75rem` (12px) bleiben aber — das erzeugt **zusätzlichen Abstand am unteren Rand**.

### Ursache 3: `py-3` doppelt mit `padding-bottom`
Die Tailwind-Klasse `py-3` (12px oben + unten) aus der `.sticky-cta` @apply-Regel PLUS das zusätzliche `padding-bottom: calc(...)` erzeugen zusammen **24px+ Abstand unten** statt der erwarteten 12px.

---

## Dateien
- `src/components/layout/StickyCTABar.tsx`
- `src/index.css`

---

## Änderung 1: Framer Motion Animation durch reine CSS-Transition ersetzen

### Datei: `src/components/layout/StickyCTABar.tsx`

Das Problem mit `slideUp` ist, dass Framer Motion die `transform`-Property kontrolliert und dadurch die `fixed bottom-0` Positionierung stören kann. **Lösung:** Keine `y`-Animation verwenden, stattdessen nur `opacity`-Fade.

**Ersetze den kompletten Inhalt von StickyCTABar.tsx:**

```tsx
// src/components/layout/StickyCTABar.tsx
// Mobile Sticky CTA-Bar — erscheint nach 30% Scroll, nur unter lg

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { COPY } from '@/data/content'

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: unknown[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as T
}

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(
    debounce(() => {
      const scrolled =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setIsVisible(scrolled > 0.3)
    }, 50),
    [],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="sticky-cta lg:hidden bg-white border-t border-brand-border shadow-lg"
          role="complementary"
          aria-label="Schnellkontakt"
        >
          <a
            href={COPY.stickyCta.anrufen.href}
            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-btn font-semibold text-sm transition-colors bg-brand-cta text-brand-ctaText hover:brightness-105"
            aria-label="WIGRO Reifen anrufen"
          >
            <Phone size={18} aria-hidden />
            <span>{COPY.stickyCta.anrufen.label}</span>
          </a>
          <a
            href={COPY.stickyCta.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-btn font-semibold text-sm transition-colors bg-[#25D366] text-white hover:bg-[#20BD5A]"
            aria-label="WIGRO Reifen auf WhatsApp schreiben"
          >
            <MessageCircle size={18} aria-hidden />
            <span>{COPY.stickyCta.whatsapp.label}</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Kernänderung:
- **Keine `variants`/`slideUp` mehr** — stattdessen inline `initial/animate/exit` nur mit `opacity`
- Kein `y`-Transform → die Bar wird NIEMALS durch Framer Motion verschoben
- `import { slideUp } from '@/lib/animations'` wird entfernt

---

## Änderung 2: CSS `.sticky-cta` — Padding korrigieren

### Datei: `src/index.css`

### Aktueller Code (Zeile 249–256):
```css
.sticky-cta {
  @apply fixed bottom-0 left-0 right-0 z-nav
         flex items-center justify-between
         px-4 py-3
         gap-3;
  /* Safe Area für iPhones mit Home Indicator */
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
}
```

### Problem:
- `py-3` setzt `padding-top: 0.75rem` UND `padding-bottom: 0.75rem`
- Danach überschreibt `padding-bottom: calc(0.75rem + env(safe-area-inset-bottom))` den Bottom-Wert
- Ergebnis: Bottom-Padding = 0.75rem + Safe-Area → auf Geräten ohne Safe-Area sind das 12px, auf iPhones mit Notch bis zu 46px

### Neuer Code:
```css
.sticky-cta {
  @apply fixed bottom-0 left-0 right-0 z-nav
         flex items-center justify-between
         px-4 pt-3
         gap-3;
  /* Safe Area für iPhones mit Home Indicator — NUR bottom */
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
}
```

### Was sich ändert:
- `py-3` → `pt-3` (nur Top-Padding via Tailwind)
- `padding-bottom: calc(0.75rem + env(...))` → `padding-bottom: max(0.75rem, env(...))` — nimmt den GRÖSSEREN Wert statt Addition. Auf normalen Geräten = 12px, auf iPhones mit Notch = Safe-Area-Wert.

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Mobile: StickyCTABar klebt **exakt** am unteren Bildschirmrand — kein Spalt sichtbar
3. Mobile: Bar erscheint per Fade (kein Slide-von-unten), verschwindet per Fade
4. iPhone mit Notch: Bar berücksichtigt Safe-Area, aber ohne doppeltes Padding
5. Android: Bar sitzt direkt am unteren Rand, 12px Padding unten
6. Desktop (`lg+`): Bar ist nicht sichtbar
