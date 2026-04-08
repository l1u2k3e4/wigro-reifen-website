# FIX_26 — Markenpartner: Endlos-Karussell auf Mobile wiederherstellen

## Ziel
Die Sektion „Unsere Markenpartner" zeigt die Logos nicht als fließende Endlosschleife, sondern stockt oder bewegt sich gar nicht. Die CSS-Marquee-Animation muss auf allen Geräten (besonders Mobile) flüssig laufen.

---

## Problem-Analyse

### Aktueller Code in `PartnerLogos.tsx`:
```tsx
<div
  className="flex items-center gap-8 md:gap-12 animate-marquee w-max"
  aria-hidden="true"
>
  {tripled.map((partner, i) => ( ... ))}
</div>
```

### Tailwind-Konfiguration:
```ts
marquee: {
  '0%':   { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-33.333%)' },
},
// ...
'marquee': 'marquee 30s linear infinite',
```

### Mögliche Ursachen warum die Animation stockt:

**Ursache 1: `prefers-reduced-motion` Override**
In `src/index.css` (Zeile 106–113) steht:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Wenn das Gerät `prefers-reduced-motion: reduce` gesetzt hat, wird JEDE Animation auf 0.01ms gesetzt — also auch die Marquee. **Das ist korrekt und gewollt** für Accessibility. Aber wenn der Nutzer diese Einstellung NICHT hat und es trotzdem stockt, liegt es an etwas anderem.

**Ursache 2: `w-max` reicht nicht — der Track ist zu schmal**
Die Logos sind 5 Stück, dreifach dupliziert = 15 Elemente. Jedes Logo-Container ist `w-36 md:w-44` (144px / 176px) + `gap-8 md:gap-12` (32px / 48px). Gesamtbreite:
- Mobile: 15 × (144 + 32) = **2.640px**
- Desktop: 15 × (176 + 48) = **3.360px**

Die Animation verschiebt um `-33.333%` = ein Drittel der Gesamtbreite (= 5 Logos). Das sollte mathematisch aufgehen.

**Ursache 3: Browser-Rendering auf Mobile**
CSS-Animationen mit `transform: translateX()` sollten GPU-beschleunigt sein. Aber ohne `will-change: transform` könnte der Browser die Animation auf dem Main-Thread rendern, was zu Ruckeln führt.

**Ursache 4: Layout-Thrashing durch `w-max`**
`w-max` berechnet die Breite basierend auf dem Inhalt. Wenn Bilder asynchron laden (`loading="lazy"`), ändert sich die Breite nach dem Laden → die Animation "springt".

---

## Dateien
- `src/components/PartnerLogos.tsx`
- `src/index.css` (optional)

---

## Lösung

### Änderung 1: `will-change` und `transform` für GPU-Beschleunigung

### Datei: `src/components/PartnerLogos.tsx`

**Aktuell (Zeile 28–30):**
```tsx
<div
  className="flex items-center gap-8 md:gap-12 animate-marquee w-max"
  aria-hidden="true"
>
```

**Neu:**
```tsx
<div
  className="flex items-center gap-8 md:gap-12 animate-marquee w-max will-change-transform"
  style={{ backfaceVisibility: 'hidden' }}
  aria-hidden="true"
>
```

### Änderungen:
- `will-change-transform` (Tailwind Klasse) → erzwingt GPU-Layer
- `backfaceVisibility: 'hidden'` → verhindert Subpixel-Rendering-Artefakte, die Ruckeln verursachen

---

### Änderung 2: Bilder nicht lazy laden (sie sind sichtbar nach kurzem Scroll)

**Aktuell (Zeile 38–40):**
```tsx
<img
  src={partner.src}
  alt={partner.alt}
  className="h-10 md:h-12 max-w-full object-contain"
  loading="lazy"
  decoding="async"
/>
```

**Neu:**
```tsx
<img
  src={partner.src}
  alt={partner.alt}
  className="h-10 md:h-12 max-w-full object-contain"
  loading="eager"
  decoding="async"
  draggable="false"
/>
```

### Warum `loading="eager"`?
- Die Logos sind klein (wenige KB pro Stück)
- Lazy Loading erzeugt Layout-Shifts wenn die Bilder spät laden → Animation springt
- Eager Loading stellt sicher, dass ALLE Logos da sind bevor die Animation startet

---

### Änderung 3: CSS-Animation mit `translateZ(0)` Hack

### Datei: `tailwind.config.ts`

**Aktuell (Zeile 165–168):**
```ts
marquee: {
  '0%':   { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-33.333%)' },
},
```

**Neu:**
```ts
marquee: {
  '0%':   { transform: 'translateX(0) translateZ(0)' },
  '100%': { transform: 'translateX(-33.333%) translateZ(0)' },
},
```

### Warum `translateZ(0)`?
Das ist ein bekannter Trick, um den Browser zu zwingen, die Animation auf der GPU (Compositor) statt auf der CPU auszuführen. Zusammen mit `will-change: transform` garantiert das flüssige 60fps.

---

### Änderung 4: Mobile-spezifische Geschwindigkeit

30 Sekunden für einen vollen Durchlauf kann auf Mobile zu langsam wirken (Nutzer scrollt schnell vorbei, sieht kaum Bewegung). Optional: Schnellere Animation auf Mobile.

**In `tailwind.config.ts` (Zeile 212):**

**Aktuell:**
```ts
'marquee': 'marquee 30s linear infinite',
```

**Optional — schneller auf Mobile:**
Die Animation-Duration ist global. Falls auf Mobile eine andere Geschwindigkeit gewünscht ist, kann das über CSS in `index.css` gemacht werden:

```css
/* Schnellere Marquee auf Mobile für bessere Sichtbarkeit */
@media (max-width: 639px) {
  .animate-marquee {
    animation-duration: 20s !important;
  }
}
```

Füge das am Ende der `@layer components`-Sektion in `src/index.css` ein.

---

### Änderung 5: Container-Overflow prüfen

Der Marquee-Container hat Fade-Edges mit `z-10`:
```tsx
<div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-brand-surface to-transparent z-10 pointer-events-none" />
```

Das ist korrekt. Aber stelle sicher, dass der Eltern-Container (`<div className="relative mt-10">`) KEIN `overflow-hidden` hat. Falls doch, muss es entfernt werden — andernfalls werden die Logos am Rand abgeschnitten und die Illusion der Endlosschleife bricht.

Aktuell hat der Eltern-Container kein `overflow-hidden` — nur die `<section>` hat `overflow-hidden` in der Klasse `section-surface overflow-hidden`. **Das ist das Problem!**

**Aktuell (Zeile 13):**
```tsx
<section className="section-surface overflow-hidden" aria-label="Unsere Markenpartner">
```

Das `overflow-hidden` auf der Section schneidet die Marquee-Animation ab! Entferne es:

**Neu:**
```tsx
<section className="section-surface" aria-label="Unsere Markenpartner">
```

**WICHTIG:** `overflow-hidden` war nötig, um den horizontalen Scroll zu verhindern. Aber die Fade-Edges (Gradient-Overlays) visuell reichen aus. Falls nach dem Entfernen ein horizontaler Scrollbar erscheint, muss stattdessen `overflow-x: clip` verwendet werden:

```tsx
<section className="section-surface overflow-x-clip" aria-label="Unsere Markenpartner">
```

`overflow-x-clip` (Tailwind: `overflow-x-clip`) verhindert horizontalen Scroll, OHNE die CSS-Animation zu brechen. `overflow: hidden` kann CSS-Animationen mit `transform` auf manchen Browsern stören.

---

## Zusammenfassung aller Änderungen

1. **PartnerLogos.tsx**: `will-change-transform` + `backfaceVisibility: 'hidden'` auf den Track
2. **PartnerLogos.tsx**: Bilder `loading="eager"` statt `loading="lazy"`
3. **PartnerLogos.tsx**: Section `overflow-hidden` → `overflow-x-clip`
4. **tailwind.config.ts**: `translateZ(0)` in Marquee-Keyframes
5. **index.css** (optional): Schnellere Animation auf Mobile (20s statt 30s)

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Mobile: Partner-Logos gleiten flüssig und endlos von rechts nach links
3. Desktop: Gleiche flüssige Animation
4. Kein horizontaler Scrollbar sichtbar
5. Fade-Edges links und rechts sind sichtbar (Logos blenden sanft ein/aus)
6. Kein Sprung/Ruckeln am Übergangspunkt (wo die Animation loopt)
7. Logos sind sofort sichtbar (kein Nachladen/Flackern)
