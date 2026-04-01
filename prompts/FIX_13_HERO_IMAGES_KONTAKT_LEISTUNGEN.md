# FIX_13 — KontaktHero + LeistungenHero: Image-basierte Header (Theke.webp / Werkstatt-Bilder)

## Ziel
Beide Hero-Sections (Kontakt + Leistungen) von einfarbigem Grün-Hintergrund zu professionellen, bildbasierten Headern mit Overlay und modernem Look umbauen.

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.4 + Framer Motion 12+
- Content zentral in `src/data/content.ts` (COPY-Objekt) — KEIN hardcoded Text in JSX
- Bilder im `public/`-Ordner: Pfade mit Leerzeichen in Anführungszeichen
- Design-Tokens: `brand-blue: #2E3D56`, `brand-cta: #C8E632`

---

## Änderung 1: KontaktHero — Theke.webp als Hintergrundbild

### Datei
- `src/sections/KontaktHero.tsx`

### Aktueller Stand
Einfarbiger grüner Hintergrund (`bg-brand-wigro`) mit Text:
```tsx
<section className="bg-brand-wigro py-16 md:py-20 px-4" ...>
```

### Verfügbares Bild
`/Logo Sonstige/Theke.webp` — Foto der WIGRO-Empfangstheke

### Aufgabe
Ersetze den kompletten Inhalt von `KontaktHero.tsx`:

```tsx
// src/sections/KontaktHero.tsx
// Hero-Section der Kontakt-Seite — Bildbasiert mit Theke.webp

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import { fadeInUp } from '@/lib/animations'

export default function KontaktHero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="kontakt-hero-heading"
    >
      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <img
          src="/Logo Sonstige/Theke.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
        {/* Dunkles Overlay für Textlesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 via-brand-blue/70 to-brand-blue/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 md:py-28 px-4">
        <div className="container-content text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col gap-4"
          >
            <h1
              id="kontakt-hero-heading"
              className="font-display font-bold text-4xl md:text-5xl text-white leading-tight"
            >
              {COPY.kontakt.hero.headline}
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
              {COPY.kontakt.hero.subline}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### Design-Entscheidungen
- **Overlay**: Gradient von `brand-blue/80` bis `brand-blue/85` — dunkler Blauton für Text-Kontrast
- **Text**: Weiß statt `brand-ctaText` (war dunkelblau auf grün, jetzt weiß auf dunkelblau-Overlay)
- **Padding**: Erhöht auf `py-20 md:py-28` für mehr vertikalen Raum und professionelleres Erscheinungsbild
- **Bild**: `loading="eager"` + `fetchPriority="high"` weil es Above-the-Fold ist

---

## Änderung 2: LeistungenHero — Werkstatt-Bilder als Hintergrund

### Datei
- `src/sections/LeistungenHero.tsx`

### Aktueller Stand
Einfarbiger grüner Hintergrund (`bg-brand-wigro`) mit Text:
```tsx
<section className="bg-brand-wigro py-16 md:py-20 px-4" ...>
```

### Verfügbare Bilder
- `/Logo Sonstige/Werkstatt.01.webp`
- `/Logo Sonstige/Werkstatt.02.webp`
- `/Logo Sonstige/Werkstatt.03.webp`

### Aufgabe
Ersetze den kompletten Inhalt von `LeistungenHero.tsx`. Verwende `Werkstatt.01.webp` als Hauptbild (beste Werkstatt-Gesamtansicht):

```tsx
// src/sections/LeistungenHero.tsx
// Hero-Section der Leistungsseite — Bildbasiert mit Werkstatt-Foto

import { motion } from 'framer-motion'
import { COPY } from '@/data/content'
import { fadeInUp } from '@/lib/animations'

export default function LeistungenHero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="leistungen-hero-heading"
    >
      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <img
          src="/Logo Sonstige/Werkstatt.01.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
        {/* Dunkles Overlay für Textlesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 via-brand-blue/70 to-brand-blue/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 md:py-28 px-4">
        <div className="container-content text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col gap-4"
          >
            <h1
              id="leistungen-hero-heading"
              className="font-display font-bold text-4xl md:text-5xl text-white leading-tight"
            >
              {COPY.leistungen.hero.headline}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {COPY.leistungen.hero.subline}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### Gleiche Design-Prinzipien wie KontaktHero
- Dunkles Blau-Overlay über dem Werkstatt-Foto
- Weißer Text für maximalen Kontrast
- Erhöhtes Padding für professionelles Erscheinungsbild
- `loading="eager"` weil Above-the-Fold

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Kontaktseite: Hero zeigt Theke-Foto mit blauem Overlay + weißem Text
3. Leistungsseite: Hero zeigt Werkstatt-Foto mit blauem Overlay + weißem Text
4. Mobile: Bilder füllen die Section vollständig, Text bleibt lesbar
5. Kein CLS (Cumulative Layout Shift): Bilder sind `absolute` positioniert, Section hat festes Padding
