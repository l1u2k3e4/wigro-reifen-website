# FIX 08 — „Was wir für Sie tun" Redesign + Deep-Links zu Leistungen

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Section: `src/sections/LeistungenPreview.tsx` (Startseite)
- Card-Komponente: `src/components/ui/ServiceCard.tsx`
- Leistungs-Detailseite: `src/pages/Leistungen.tsx` → rendert `src/sections/LeistungDetail.tsx`
- Content: `src/data/content.ts` → `COPY.leistungenOverview.items` (6 Items mit `href: '/leistungen#reifenwechsel'` etc.)
- Detail-IDs: `reifenwechsel`, `reifeneinlagerung`, `raedermontage`, `felgenreinigung`, `reifenberatung`, `profiltiefe`
- Die `href`-Werte in content.ts verweisen bereits korrekt auf `/leistungen#id` — das Problem liegt im Routing/Scrolling
- Framer Motion + React Router v6

---

## Aufgabe 1: Deep-Link Scroll-Fix

**Problem:** Wenn man auf eine ServiceCard klickt (z.B. „Reifenwechsel" → `/leistungen#reifenwechsel`), landet man immer am Seitenanfang statt beim entsprechenden Abschnitt.

**Ursache:** React Router scrollt standardmäßig nach oben bei Routenwechsel. Hash-Fragmente werden ignoriert.

### 1a. ServiceCard — `<Link>` statt `<a>` verwenden

**Datei:** `src/components/ui/ServiceCard.tsx`

Aktuell verwendet die Komponente ein `<a href={href}>` (Zeile 63). Für interne Links mit Hash muss stattdessen React Router's `<Link>` verwendet werden:

```tsx
import { Link } from 'react-router-dom'

// Im return (Zeile 62-64), ersetze:
{href ? (
  <Link to={href} className="block h-full no-underline" aria-label={title}>
    {cardContent}
  </Link>
) : (
  cardContent
)}
```

### 1b. ScrollToHash-Komponente erstellen

**Neue Datei:** `src/components/ScrollToHash.tsx`

```tsx
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
```

### 1c. ScrollToHash in SharedLayout einbinden

**Datei:** `src/components/layout/SharedLayout.tsx`

```tsx
import ScrollToHash from '@/components/ScrollToHash'

// Im return, direkt nach <Header />:
<Header />
<ScrollToHash />
```

---

## Aufgabe 2: Section optisch ansprechender gestalten

**Datei:** `src/sections/LeistungenPreview.tsx`

Komplett neuschreiben mit besserem Design und Animationen:

```tsx
// src/sections/LeistungenPreview.tsx
// Vorschau der Leistungen auf der Startseite — 6 ServiceCards mit Stagger-Animation

import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function LeistungenPreview() {
  return (
    <section id="leistungen" className="section-surface" aria-labelledby="leistungen-heading">
      <div className="container-content">
        <SectionHeading
          title={COPY.leistungenOverview.headline}
          subtitle={COPY.leistungenOverview.subline}
          tag="h2"
          alignment="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {COPY.leistungenOverview.items.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <ServiceCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                href={item.href}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:text-brand-blueLight transition-colors group"
            aria-label="Alle Leistungen ansehen"
          >
            <span>Alle Leistungen im Detail</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

**Änderungen:**
- Hintergrund `section-surface` (leichtes Blau-Grau) statt weißem `section` — hebt die Sektion visuell hervor
- Eigene `containerVariants` + `itemVariants` mit `staggerChildren: 0.1` statt globale `staggerContainer`
- Jede Karte bekommt einen eigenen `<motion.div>` Wrapper mit `itemVariants` für sauberes Stagger
- Explizites `Variants`-Typing für TypeScript-Kompatibilität
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` (konsistent, responsive)
- „Alle Leistungen" Link nutzt jetzt `<Link>` statt `<a>` (React Router)
- Link-Farbe: `text-brand-blue` statt `text-brand-accent` (konsistenter)

### 2b. ServiceCard — Hover-Effekt verbessern

**Datei:** `src/components/ui/ServiceCard.tsx`

Füge der Card einen dezenten blauen Rand beim Hover hinzu:

Ändere in der `cardContent`-Definition (Zeile 28):
```tsx
// ALT:
className={cn('card-hover p-6 flex flex-col gap-4 h-full group', className)}

// NEU:
className={cn(
  'bg-white rounded-xl shadow-card border border-brand-border p-6 flex flex-col gap-4 h-full',
  'hover:shadow-card-hover hover:-translate-y-1 hover:border-brand-blue/30 transition-all duration-200',
  'group',
  className,
)}
```

Entferne die doppelte `motion.div`-Animation aus ServiceCard selbst (Zeile 56-60) — die Animation kommt jetzt vom Parent in LeistungenPreview:

```tsx
// ALT:
return (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-32px' }}
    variants={fadeInUp}
  >
    {href ? ( ... ) : cardContent}
  </motion.div>
)

// NEU:
return (
  <div>
    {href ? (
      <Link to={href} className="block h-full no-underline" aria-label={title}>
        {cardContent}
      </Link>
    ) : (
      cardContent
    )}
  </div>
)
```

Entferne den `motion`- und `fadeInUp`-Import wenn nicht mehr benötigt.

---

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Klick auf „Reifenwechsel"-Card → navigiert zu `/leistungen#reifenwechsel` → scrollt zum Abschnitt
- Alle 6 Cards erscheinen nacheinander mit Stagger-Animation
- Cards haben Hover-Effekt (Schatten + leichtes Anheben + blauer Rand-Akzent)
- „Alle Leistungen" Link navigiert korrekt mit React Router
- Ohne Hash navigiert man normal zum Seitenanfang
