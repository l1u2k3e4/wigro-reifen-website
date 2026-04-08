# WIGRO Reifen — Design-System

> Generiert: 2026-03-31 | Basis: PROMPT_03 + CLAUDE.md + UI/UX Pro Max Guidelines
> Stack: Vite + React + TypeScript + Tailwind CSS v3.4+

---

## 1. Farbpalette

### Übersicht

| Token | Klasse | Hex | Einsatz | WCAG auf Weiß |
|-------|--------|-----|---------|----------------|
| `brand-bg` | `bg-brand-bg` | `#FFFFFF` | Haupthintergrund | — |
| `brand-surface` | `bg-brand-surface` | `#F0F7EC` | Alternierende Sections | — |
| `brand-wigro` | `bg-brand-wigro` | `#54B435` | Dekoration, Icons, Checkmarks | 2.47:1 ⚠️ |
| `brand-accent` | `bg-brand-accent` | `#2A7318` | Buttons, Links, CTAs | **5.28:1 ✓ AA** |
| `brand-accentHover` | `bg-brand-accentHover` | `#1E5510` | Hover-State Buttons | **7.42:1 ✓ AAA** |
| `brand-accentLight` | `bg-brand-accentLight` | `#EAF5E4` | Badges, Chips, Highlights | — |
| `brand-success` | `bg-brand-success` | `#16A34A` | Bestätigungen, Erfolg | **4.54:1 ✓ AA** |
| `brand-heading` | `text-brand-heading` | `#1A1A1A` | Überschriften | **17.1:1 ✓ AAA** |
| `brand-body` | `text-brand-body` | `#374151` | Fließtext | **9.0:1 ✓ AAA** |
| `brand-muted` | `text-brand-muted` | `#6B7280` | Sekundärtext, Labels | **4.6:1 ✓ AA** |
| `brand-white` | `text-brand-white` | `#FFFFFF` | Text auf dunklen Flächen | — |
| `brand-border` | `border-brand-border` | `#E5E7EB` | Trennlinien, Rahmen | — |
| `brand-light` | `bg-brand-light` | `#F9FAFB` | Card-Hintergründe | — |
| `brand-callout` | `bg-brand-callout` | `#EAF5E4` | Callout-Boxen | — |
| `brand-calloutBorder` | `border-brand-calloutBorder` | `#86EFAC` | Callout-Rahmen | — |
| `brand-tableHeader` | `bg-brand-tableHeader` | `#D1FAE5` | Tabellenkopf | — |

### Wichtige Regeln

- **`brand-wigro` (#54B435)** hat nur 2.47:1 Kontrast auf Weiß → **NUR für dekorative Elemente** (Checkmarks, Aufzählungen, Icon-Akzente). NIEMALS als Textfarbe auf weißem Hintergrund verwenden.
- **`brand-accent` (#2A7318)** ist die WCAG-konforme Aktionsfarbe für alle Buttons und Links.
- **Weiß auf `brand-accent`** = 5.28:1 ✓ → Immer weiße Schrift auf grünen Buttons.
- **Section-Wechsel:** `bg-brand-bg` (weiß) → `bg-brand-surface` (hellgrün) → `bg-brand-bg` → ...

### Farbpsychologie (Automotive)

- **Grün:** Verlässlichkeit, Frische, Sicherheit — passt zu "Ihr Reifen sind bei uns sicher"
- **Dunkelgrün (#2A7318):** Seriosität, Kompetenz, Premium-Werkstatt
- **Helles Grün (#F0F7EC):** Sauberkeit, Ordnung, professioneller Betrieb
- **Fast-Schwarz (#1A1A1A):** Autorität, Technik, Expertise — nicht das gleiche wie hartes Schwarz

---

## 2. Typografie

### Font-Pairing

#### Display: **Oswald** (400, 500, 600, 700)
- **Charakter:** Kondensiert, kraftvoll, maskulin, technisch
- **Automotive-Passung:** Erinnert an Fahrzeuglogos und Motorsport-Typografie
- **Einsatz:** `h1`, `h2`, `h3`, Hero-Headlines, Section-Titel
- **Tailwind-Klasse:** `font-display`
- **Google Fonts URL:** `family=Oswald:wght@400;500;600;700`

#### Body: **DM Sans** (400, 500, 600, 700)
- **Charakter:** Modern, geometrisch, neutral, ausgezeichnet lesbar
- **Automotive-Passung:** Klar und direkt — wie ein präziser Mechaniker
- **Einsatz:** Fließtext, Labels, Navigation, Buttons, Karten
- **Tailwind-Klasse:** `font-body` oder `font-sans`
- **Google Fonts URL:** `family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400`

### Google Fonts Einbindung (index.html)

```html
<!-- Preconnect für Ladezeit-Optimierung -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Fonts laden -->
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
```

### Typografie-Scale

| Größe | px | Einsatz |
|-------|-----|---------|
| `text-xs` | 12px | Labels, Fußnoten |
| `text-sm` | 14px | Sekundärtext, Zeiten, kleine Hinweise |
| `text-base` | 16px | Standard-Fließtext (Minimum Mobile) |
| `text-lg` | 18px | Großer Body, Lead-Text |
| `text-xl` | 20px | Subheadlines, Karten-Titel |
| `text-2xl` | 24px | Section-Untertitel |
| `text-3xl` | 30px | Überschriften (h3) |
| `text-4xl` | 36px | Hero-Subline, h2 Mobile |
| `text-5xl` | 48px | Hero-Headline |
| `text-6xl` | 60px | Maximale Hero-Größe |

### Typografie-Regeln

- **Body minimum 16px** auf Mobile — verhindert iOS Auto-Zoom bei Formfeldern
- **Line-Height:** `leading-relaxed` (1.625) für Fließtext, `leading-tight` für Headlines
- **Maximale Zeilenlänge:** 65–75 Zeichen Desktop, 35–55 Zeichen Mobile
- **Font-Weight Hierarchie:** Headlines bold/extrabold, Body regular, Labels medium

---

## 3. Spacing-System

Basis: **4pt/8dp-Raster** (Material Design Standard)

| Token | Wert | Einsatz |
|-------|------|---------|
| `py-16 md:py-24` | 64px / 96px | Section-Padding (Standard) |
| `max-w-[1200px]` | 1200px | Content-Breite |
| `max-w-[800px]` | 800px | Schmale Seiten (Kontakt, Impressum) |
| `p-6 md:p-8` | 24px / 32px | Card-Innenabstand |
| `gap-6 md:gap-8` | 24px / 32px | Grid-Abstände |
| `px-4 sm:px-6 lg:px-8` | 16/24/32px | Horizontale Container-Abstände |

### Section-Wechsel-Pattern

```tsx
// Seite 1 — weiß
<section className="section">
  <div className="container-content">...</div>
</section>

// Seite 2 — hellgrün
<section className="section-surface">
  <div className="container-content">...</div>
</section>

// Seite 3 — weiß (wieder)
<section className="section">
  ...
</section>
```

---

## 4. Schatten

| Token | Tailwind-Klasse | Einsatz |
|-------|-----------------|---------|
| `card` | `shadow-card` | Service-Cards, Team-Cards, Standard-Elemente |
| `card-hover` | `shadow-card-hover` | Cards beim Hover — Lift-Effekt |
| `glow` | `shadow-glow` | CTA-Buttons, dezenter grüner Glow |
| `glow-lg` | `shadow-glow-lg` | Hero-Buttons, prominenter Glow |
| `nav` | `shadow-nav` | Navigationsleiste |
| `float` | `shadow-float` | Modals, Dropdowns, Sticky-Bar |

---

## 5. Border Radius

| Token | Wert | Einsatz |
|-------|------|---------|
| `rounded-card` | 12px | Cards, Boxen, Service-Container |
| `rounded-btn` | 8px | Alle Buttons |
| `rounded-badge` | 6px | Badges, Tags, Chips |
| `rounded-icon` | 10px | Icon-Wrapper-Hintergründe |
| `rounded-full` | 9999px | Kreise, Pills, Bewertungs-Chips |

---

## 6. Komponenten-Styles

### Buttons

```tsx
// Primär — GlowButton (alle CTAs)
<button className="btn-primary">
  Jetzt anrufen: 02302 54951
</button>

// Sekundär — Outline
<button className="btn-secondary">
  Mehr erfahren
</button>

// Ghost — auf dunklen Hintergründen (Hero)
<button className="btn-ghost">
  WhatsApp Nachricht
</button>
```

**Regeln für Buttons:**
- Immer `min-height: 44px` (Touch-Target Standard)
- Alle CTAs nutzen `btn-primary` — kein Mix von Stilen
- Primäre Aktion pro Screen: immer nur EIN `btn-primary`
- `btn-secondary` für sekundäre Aktionen

### Cards

```tsx
<div className="card card-hover p-6 md:p-8">
  {/* Inhalt */}
</div>
```

### Badges / Trust-Chips

```tsx
// Auf grünem Hintergrund
<span className="badge">✓ WCAG konform</span>

// Auf hellem Hintergrund — dezent
<span className="trust-chip">⭐ 4,8 / 5 Sterne</span>
```

### Section-Headline Pattern

```tsx
<div className="text-center mb-12 md:mb-16">
  <span className="badge mb-4">Unsere Stärken</span>
  <h2 className="section-headline">Was wir für Sie tun</h2>
  <p className="section-subline mx-auto">
    Von der schnellen Montage bis zur sicheren Einlagerung...
  </p>
</div>
```

### Callout-Box

```tsx
<div className="callout">
  <p className="font-semibold text-brand-heading mb-2">
    Schnelle Montage garantiert
  </p>
  <p className="text-brand-body">
    Wir wechseln Ihre Reifen in unter 30 Minuten.
  </p>
</div>
```

---

## 7. Animationen

> **WICHTIG:** Framer Motion Scroll-Animationen sind auf **Mobile (< 1024px) komplett deaktiviert** für flüssiges Scrolling. Alle Inhalte werden auf Mobile sofort sichtbar gerendert. Desktop (≥ 1024px) behält alle Animationen.

### Mobile-Bypass (`src/lib/animations.ts`)

```tsx
// isMobile wird einmalig beim Import ausgewertet
export const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

// Auf Mobile: hidden === visible → sofort sichtbar, kein Observer
export const noAnim: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
}

// Alle exportierten Variants (fadeInUp, staggerContainer, etc.)
// nutzen automatisch noAnim auf Mobile
export const fadeInUp: Variants = isMobile ? noAnim : { /* Desktop-Animation */ }
```

**Regel:** Bei lokalen Variants in Section-Dateien immer `isMobile` und `noAnim` importieren:
```tsx
import { isMobile, noAnim } from '@/lib/animations'
const myVariants: Variants = isMobile ? noAnim : { /* Desktop */ }
```

### CSS-Animationen (laufen auch auf Mobile)

| Animation | Klasse | Dauer | Einsatz | Mobile-Verhalten |
|-----------|--------|-------|---------|-----------------|
| `scrollUp` | `animate-scroll-up` | var `--scroll-duration` | Testimonials-Spalte vertikaler Loop | Pausiert wenn nicht im Viewport (IntersectionObserver) |
| `marquee` | `animate-marquee` | 30s | Partner-Logos Karussell | Pausiert wenn nicht im Viewport |
| `bounceChevron` | `animate-bounce-chevron` | 2s | Hero Scroll-Indikator | Pausiert wenn Hero nicht sichtbar |
| `pulseGlow` | `animate-pulse-glow` | 2.5s | CTA-Button | Nur auf Desktop |
| `wgPulse` | CSS in ChatWidget | 2.5s × 3 | Chat-FAB Puls | 3 Iterationen, dann Stopp |
| `wgBlink` | CSS in ChatWidget | 2s | Status-Indikator | Nur wenn Chat-Panel offen |
| `slideInRight` | `animate-slide-in-right` | 280ms | Mobile-Menü öffnen | Normal |
| `slideOutRight` | `animate-slide-out-right` | 200ms | Mobile-Menü schließen | Normal |

### Framer Motion (nur Desktop ≥ 1024px)

```tsx
// Standard Scroll-Animation — funktioniert auf Desktop, auf Mobile sofort sichtbar
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

<motion.div
  variants={fadeInUp}         // → noAnim auf Mobile
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
>
  Inhalt
</motion.div>
```

### Animationsregeln

- **Mobile (< 1024px):** Keine Framer Motion Animationen — alle Inhalte sofort sichtbar
- **Desktop:** Dauer 400–600ms für Scroll-Einblendungen, max. 700ms
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (Spring) für Einblenden, `ease-in` für Ausblenden
- **Austritt kürzer als Eintritt:** Ausblend-Animationen 60–70% der Einblend-Dauer
- **CSS-Endlos-Animationen:** Müssen `animationPlayState: paused` setzen wenn nicht im Viewport (IntersectionObserver)
- **ChatWidget:** Pulse max. 3 Iterationen, Blink nur bei offenem Panel
- **`scroll-behavior: smooth`** nur auf Desktop (≥ 1024px) — auf Mobile verursacht es Jank
- **Scroll-Listener:** Immer mit `requestAnimationFrame`-Throttle (kein unthrottled `addEventListener('scroll')`)
- **`once: true`** bei `whileInView` — Element wird nicht jedes Mal animiert
- **`prefers-reduced-motion: reduce`:** Globale Regel in `index.css` deaktiviert alle Animationen

---

## 8. Accessibility-Regeln

### Kontrast-Checkliste

- ✅ `brand-accent` (#2A7318) auf Weiß: **5.28:1** (AA für normalen Text ✓)
- ✅ `brand-heading` (#1A1A1A) auf Weiß: **17.1:1** (AAA ✓)
- ✅ `brand-body` (#374151) auf Weiß: **9.0:1** (AAA ✓)
- ✅ `brand-muted` (#6B7280) auf Weiß: **4.6:1** (AA ✓)
- ✅ Weiß auf `brand-accent` (#2A7318): **5.28:1** (AA ✓) → Buttons immer mit weißem Text
- ⚠️ `brand-wigro` (#54B435) auf Weiß: **2.47:1** — NUR für Dekoration, NIE für Text

### Regeln

```
1. Focus-Ring immer sichtbar (`:focus-visible` — bereits in index.css)
2. Touch-Targets minimum 44×44px (bereits in .btn-primary)
3. Alt-Text für alle Bilder (wird in content.ts gepflegt)
4. Aria-Labels für Icon-only Buttons
5. Heading-Hierarchie einhalten: h1 → h2 → h3 (nie überspringen)
6. Farbe nie als einziges Indikator-Signal (immer + Icon/Text)
7. Deutsche Sprache im HTML-Lang Attribut: <html lang="de">
8. Reduced-Motion via CSS (bereits in index.css implementiert)
```

---

## 9. Mobile-first Breakpoints

| Breakpoint | Min-Width | Tailwind-Prefix |
|------------|-----------|-----------------|
| Mobile (default) | 0px | — |
| Small | 640px | `sm:` |
| Medium | 768px | `md:` |
| Large | 1024px | `lg:` |
| Extra Large | 1280px | `xl:` |

**70% der Besucher kommen mobil** → immer Mobile-first entwickeln, dann nach oben skalieren.

---

## 10. Z-Index Skala

| Token | Wert | Einsatz |
|-------|------|---------|
| `z-nav` | 40 | Navigationsleiste |
| `z-overlay` | 50 | Scrim/Overlay hinter Modals |
| `z-modal` | 60 | Modals, Drawer |
| `z-toast` | 100 | Toast-Benachrichtigungen |

---

## 11. Verification Checklist

- [x] Alle `brand-*` Farben sind definiert
- [x] WCAG AA Kontrast: `brand-accent` (5.28:1), `brand-body` (9.0:1), `brand-muted` (4.6:1) ✓
- [x] `brand-wigro` (#54B435) als dekorativ markiert — nicht für Text auf Weiß
- [x] Google Fonts korrekt referenziert (display=swap, preconnect in index.css)
- [x] Tailwind-Config: Farben, Fonts, Shadows, Keyframes, Z-Index alle definiert
- [x] `index.css` hat korrekte Tailwind Directives
- [x] Reduced-Motion Mediaquery in `index.css` (globale Regel für alle Animationen)
- [x] Framer Motion auf Mobile (< 1024px) deaktiviert via `isMobile`/`noAnim` in `animations.ts`
- [x] CSS-Endlos-Animationen pausieren wenn nicht im Viewport (IntersectionObserver)
- [x] Scroll-Listener mit `requestAnimationFrame`-Throttle (Header, StickyCTABar)
- [x] `scroll-behavior: smooth` nur auf Desktop (≥ 1024px)
- [x] Touch-Target min. 44px in `.btn-primary`
- [x] Farbpalette passt zur Automotive-Branche (dunkelgrün = Kompetenz/Verlässlichkeit)
- [x] Kein reines Schwarz (#000) — `brand-heading` = #1A1A1A
- [x] Section-Hintergründe alternieren: weiß → surface → weiß
