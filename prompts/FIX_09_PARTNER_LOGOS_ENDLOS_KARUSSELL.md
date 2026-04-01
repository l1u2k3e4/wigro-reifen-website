# FIX 09 — Markenpartner-Logos: Weißer Hintergrund + echte Endlosschleife

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Komponente: `src/components/PartnerLogos.tsx` — Marquee-Carousel
- Logo-Daten: `src/data/content.ts` → `COPY.partner.items` (5 Partner: Hankook, Michelin, Continental, Nexen, Nokian)
- Bilder: `public/Bilder Reifenmarken/` (`.webp`-Dateien)
- Marquee-Animation: In `tailwind.config.ts` definiert als `animate-marquee`
- Aktuelle Marquee-Keyframes: `'0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' }`
- Animation-Duration: `35s linear infinite`

## Probleme

1. **Continental + Nokian Logos**: Transparenter Hintergrund zeigt auf `bg-brand-surface` (helles Grau) durch — Logos wirken "schmutzig" oder haben unsaubere Kanten
2. **Karussell stoppt/wiederholt sichtbar**: Die Animation pausiert oder zeigt eine sichtbare Wiederholung, weil die Logos-Duplikation nicht korrekt eingerichtet ist

---

## Aufgabe 1: Logos mit weißem Hintergrund-Container

**Datei:** `src/components/PartnerLogos.tsx`

Gib jedem Logo einen weißen Hintergrund-Container mit Padding und abgerundeten Ecken, damit alle Logos einheitlich und sauber aussehen:

```tsx
// src/components/PartnerLogos.tsx
// Infinite-scroll Marquee der Markenpartner-Logos

import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

export default function PartnerLogos() {
  const logos = COPY.partner.items
  // Dreifach duplizieren für lückenlosen Loop — wichtig bei nur 5 Logos
  const tripled = [...logos, ...logos, ...logos]

  return (
    <section className="section-surface overflow-hidden" aria-label="Unsere Markenpartner">
      <div className="container-content">
        <SectionHeading
          title={COPY.partner.headline}
          subtitle={COPY.partner.subline}
        />
      </div>

      {/* Marquee-Container */}
      <div className="relative mt-10">
        {/* Fade-Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-brand-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-brand-surface to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex items-center gap-8 md:gap-12 animate-marquee w-max"
          aria-hidden="true"
        >
          {tripled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center shrink-0 w-36 md:w-44 h-16 md:h-20 bg-white rounded-xl shadow-sm border border-brand-border/50 px-4"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-10 md:h-12 max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Änderungen:**
- **Dreifach-Duplikation** (`[...logos, ...logos, ...logos]`) statt nur doppelt — bei 5 Logos reicht doppelt oft nicht für lückenlosen Übergang bei großen Bildschirmen
- **Weißer Container** pro Logo: `bg-white rounded-xl shadow-sm border border-brand-border/50 px-4` — einheitliche Größe `w-36 md:w-44 h-16 md:h-20`
- **`grayscale` und `opacity` komplett entfernt** — Logos immer farbig und voll sichtbar
- **`hover:[animation-play-state:paused]` entfernt** — Karussell läuft durchgehend ohne Pause
- `gap` auf `gap-8 md:gap-12` reduziert (weißer Container hat eigenes Padding)

---

## Aufgabe 2: Marquee-Animation anpassen

**Datei:** `tailwind.config.ts`

Die Marquee muss zu `-33.33%` translateX gehen (statt `-50%`), weil wir jetzt 3× duplizieren:

```ts
// In extend.keyframes:
marquee: {
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-33.333%)' },
},

// In extend.animation:
marquee: 'marquee 30s linear infinite',
```

**Erklärung:** Bei 3× Duplikation deckt jedes Drittel den Originalset ab. Wenn wir `-33.333%` scrollen, springt die Animation nahtlos zurück zu Position 0 — der Loop ist unsichtbar.

Die Duration von `35s` auf `30s` reduzieren, da das Karussell etwas dynamischer wirken soll.

---

## Aufgabe 3: Logo-Dateien prüfen

Prüfe ob alle Logo-Dateien in `public/Bilder Reifenmarken/` existieren und korrekt referenziert sind:

```
/Bilder Reifenmarken/Hankook_logo.webp
/Bilder Reifenmarken/Michelin_Logo.svg.webp
/Bilder Reifenmarken/continental-logo.webp
/Bilder Reifenmarken/NEXEN TIRE_Portrait_Emphasis on the symbol.webp
/Bilder Reifenmarken/Nokian_Tyres-logo.webp
```

Falls Dateien fehlen oder beschädigt sind, erstelle saubere SVG-Ersatzlogos unter `public/logos/` und aktualisiere die Pfade in `src/data/content.ts`.

---

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Alle 5 Logos sichtbar mit weißem Hintergrund-Container
- Kein Durchscheinen des grauen Hintergrunds bei Continental/Nokian
- Karussell läuft endlos, kein sichtbarer Sprung/Reset
- Animation pausiert NICHT bei Hover
- Responsive: Auf 375px, 768px, 1280px testen — Container passen sich an
