# FIX_14 — Leistungsseite: Hochwertigere Animationen + Hinweis-Sections entfernen

## Ziel
Die einzelnen Leistungs-Detail-Sections mit professionelleren Animationen versehen und die "Hinweis"-Callout-Box komplett entfernen.

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.4 + Framer Motion 12+
- Alle Framer Motion Variants als `type Variants` aus `framer-motion` importieren
- `whileInView` + `viewport={{ once: true }}` für Scroll-Animationen
- Content zentral in `src/data/content.ts`

---

## Änderung 1: Hinweis-Section aus LeistungDetail entfernen

### Datei
- `src/sections/LeistungDetail.tsx`

### Problem
Jede Leistungs-Detail-Section zeigt einen "Hinweis: Preis auf Anfrage..."-Block an. Dieser soll entfernt werden.

### Aktueller Code — Interface (Zeile 13–22)
```tsx
interface LeistungDetailProps {
  id: string
  icon: string
  title: string
  intro: string
  vorteile: readonly string[]
  hinweis: string          // ← entfernen
  cta: { label: string; href: string }
  image?: string
  reversed?: boolean
  surface?: boolean
}
```

### Aktueller Code — Props Destrukturierung (Zeile 24–33)
```tsx
export default function LeistungDetail({
  id,
  icon,
  title,
  intro,
  vorteile,
  hinweis,               // ← entfernen
  cta,
  reversed = false,
  surface = false,
}: LeistungDetailProps) {
```

### Aktueller Code — Hinweis-Render (Zeile 91–94)
```tsx
{/* Hinweis */}
<div className="callout text-sm text-brand-body leading-relaxed p-4">
  <span className="font-semibold text-brand-accent">Hinweis: </span>
  {hinweis}
</div>
```

### Aufgabe
1. **Interface**: `hinweis: string` Zeile entfernen
2. **Props**: `hinweis,` aus der Destrukturierung entfernen
3. **JSX**: Den gesamten Hinweis-Block (Zeile 91–94 inkl. Kommentar) entfernen
4. **Leistungen.tsx** (Zeile 58): `hinweis={item.hinweis}` Prop-Übergabe entfernen

### Leistungen.tsx Anpassung
Aktuell (Zeile 50–66):
```tsx
{COPY.leistungen.items.map((item, index) => (
  <LeistungDetail
    key={item.id}
    id={item.id}
    icon={item.icon}
    title={item.title}
    intro={item.intro}
    vorteile={item.vorteile}
    hinweis={item.hinweis}        // ← diese Zeile entfernen
    cta={item.cta}
    reversed={index % 2 !== 0}
    surface={index % 2 !== 0}
  />
))}
```

---

## Änderung 2: Hochwertigere Animationen für LeistungDetail

### Datei
- `src/sections/LeistungDetail.tsx`

### Problem
Aktuell nutzen beide Spalten (Icon-Seite + Text-Seite) nur `fadeInUp`. Das wirkt eintönig. Gewünscht: professionellere Animationen mit Stagger-Effekt.

### Aufgabe
Ersetze den kompletten `LeistungDetail.tsx`-Inhalt mit dieser verbesserten Version:

```tsx
// src/sections/LeistungDetail.tsx
// Wiederverwendbare Leistungs-Detail-Section — Icon + Text mit Stagger-Animationen

import { motion, type Variants } from 'framer-motion'
import { Check, Phone } from 'lucide-react'
import { getIcon } from '@/lib/icons'
import GlowButton from '@/components/ui/GlowButton'
import { cn } from '@/lib/utils'

interface LeistungDetailProps {
  id: string
  icon: string
  title: string
  intro: string
  vorteile: readonly string[]
  cta: { label: string; href: string }
  image?: string
  reversed?: boolean
  surface?: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function LeistungDetail({
  id,
  icon,
  title,
  intro,
  vorteile,
  cta,
  reversed = false,
  surface = false,
}: LeistungDetailProps) {
  const IconComponent = getIcon(icon)

  // Linke Spalte fährt von links rein, rechte von rechts — umgekehrt wenn reversed
  const iconAnimation = reversed ? fadeInRight : fadeInLeft
  const textAnimation = reversed ? fadeInLeft : fadeInRight

  return (
    <section
      id={id}
      className={cn(surface ? 'section-surface' : 'section')}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={containerVariants}
          className={cn(
            'grid gap-10 md:grid-cols-2 items-start',
            reversed && 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1',
          )}
        >
          {/* Icon + Badge Seite */}
          <motion.div
            variants={iconAnimation}
            className="flex flex-col items-center justify-center bg-brand-accentLight rounded-card p-12 min-h-[280px]"
          >
            <motion.div
              variants={scaleIn}
              className="w-20 h-20 rounded-full bg-brand-accent flex items-center justify-center mb-6"
            >
              <IconComponent size={40} className="text-brand-white" aria-hidden />
            </motion.div>
            <h2
              id={`${id}-heading`}
              className="font-display font-bold text-2xl text-brand-heading text-center leading-tight"
            >
              {title}
            </h2>
          </motion.div>

          {/* Text Seite */}
          <motion.div
            variants={textAnimation}
            className="flex flex-col gap-5"
          >
            <p className="text-brand-body text-base leading-relaxed">{intro}</p>

            {/* Vorteile mit Stagger */}
            <motion.ul
              variants={containerVariants}
              className="flex flex-col gap-2.5"
            >
              {vorteile.map((vorteil) => (
                <motion.li
                  key={vorteil}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-accentLight flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-brand-accent" aria-hidden />
                  </div>
                  <span className="text-brand-body text-sm leading-relaxed">{vorteil}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <GlowButton
                label={cta.label}
                href={cta.href}
                variant="primary"
                size="md"
                icon={Phone}
                iconPosition="left"
                className="w-fit"
                ariaLabel={cta.label}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

### Was sich ändert
1. **Icon-Spalte**: Fährt von links rein (oder rechts wenn reversed) statt nur fade-up
2. **Text-Spalte**: Fährt von rechts rein (oder links wenn reversed)
3. **Icon-Circle**: Scale-Animation (wächst von 85% auf 100%)
4. **Vorteile-Liste**: Jeder Punkt erscheint mit Stagger-Delay nacheinander
5. **CTA-Button**: Eigene fade-in-up Animation
6. **Container**: `staggerChildren: 0.12` für abgestimmtes Timing
7. **Hinweis**: Komplett entfernt

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler (WICHTIG: `hinweis` Prop ist nirgends mehr referenziert)
2. Leistungsseite: Keine "Hinweis"-Boxen mehr sichtbar
3. Leistungsseite: Sections animieren beim Scrollen mit Links/Rechts-Slide + Stagger
4. Animations fühlen sich flüssig an — kein Ruckeln, kein Flackern
5. Reversed-Sections (ungerade Indizes) animieren spiegelverkehrt
