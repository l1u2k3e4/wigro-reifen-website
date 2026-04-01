# FIX 03 — „Warum WIGRO?" Animationen reparieren

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Framer Motion 12+ wird verwendet
- Animationen sollen `whileInView` mit `viewport={{ once: true }}` nutzen
- Tailwind `ease-smooth` = `cubic-bezier(0.16, 1, 0.3, 1)`
- Globale Animations-Varianten in `src/lib/animations.ts`

## Problem

Die Sektion `src/sections/WarumWIGRO.tsx` hat mehrere Animationsprobleme:

1. **Doppelte Animation:** Die `AnimatedStat`-Komponente hat sowohl `whileInView` direkt auf dem Element ALS AUCH den `useInView`-Hook für den Counter — das kann zu Race Conditions führen
2. **Container-Stagger ohne Wrapper:** Der `containerVariants` mit `staggerChildren: 0.15` wird nur für die Cards verwendet, aber die Zahlen oberhalb animieren unabhängig
3. **Potenzielle Rerender-Schleife:** Der `useAnimatedCounter`-Hook hat `numericMatch` als Dependency in `useEffect`, aber `numericMatch` wird bei jedem Render neu erzeugt (`.match()` liefert immer ein neues Array)

## Aufgaben

### 1. useAnimatedCounter Dependency-Bug fixen

**Datei:** `src/sections/WarumWIGRO.tsx`

Das Problem: `numericMatch` ist ein regulärer Ausdruck-Match, der bei JEDEM Render neu erzeugt wird. Als useEffect-Dependency kann das eine Endlosschleife auslösen.

**Lösung:** Extrahiere den numerischen Wert einmalig mit `useMemo`:

```tsx
import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

function useAnimatedCounter(target: string, isInView: boolean) {
  const [display, setDisplay] = useState('0')

  const parsed = useMemo(() => {
    const match = target.match(/^[\d.,]+/)
    if (!match) return null
    return {
      endVal: parseFloat(match[0].replace(',', '.')),
      suffix: target.slice(match[0].length),
      isDecimal: match[0].includes(',') || match[0].includes('.'),
    }
  }, [target])

  useEffect(() => {
    if (!isInView || !parsed) {
      if (!parsed) setDisplay(target)
      return
    }

    const { endVal, suffix, isDecimal } = parsed
    const duration = 1600
    const steps = 40
    const stepTime = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = eased * endVal

      if (isDecimal) {
        setDisplay(current.toFixed(1).replace('.', ',') + suffix)
      } else {
        setDisplay(Math.round(current).toString() + suffix)
      }

      if (step >= steps) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, target, parsed])

  return display
}
```

### 2. AnimatedStat vereinfachen

Entferne die doppelte `whileInView`-Animation und verlasse dich nur auf `useInView`:

```tsx
function AnimatedStat({ zahl, label }: { zahl: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-48px' })
  const animated = useAnimatedCounter(zahl, isInView)

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-1"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      }}
    >
      <span className="font-display font-bold text-2xl md:text-4xl text-brand-blue">
        {animated}
      </span>
      <span className="text-brand-muted text-xs md:text-sm">{label}</span>
    </div>
  )
}
```

### 3. Card-Varianten korrekt typen

Die Variants müssen korrekt getypt sein, damit TypeScript keine Fehler wirft:

```tsx
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}
```

**Wichtig:** Durch den expliziten `Variants`-Type wird der `ease: 'easeOut'`-String automatisch korrekt getypt. Entferne das bisherige `as const`.

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Zahlen-Counter animieren flüssig beim Scroll (einmalig)
- Cards erscheinen nacheinander mit Stagger-Effekt
- Keine Flicker, Sprünge oder doppelte Animationen
- `prefers-reduced-motion` wird durch den globalen CSS-Reset in `index.css` respektiert
