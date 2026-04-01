# FIX 04 — Button Hover-Zustand: Text muss sichtbar bleiben

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Alle CTAs verwenden `src/components/ui/GlowButton.tsx`
- Globale Button-Styles in `src/index.css` (@layer components)
- Farb-Tokens: `brand-accent: #2E3D56` (= brand-blue), `brand-accentHover: #3A5070` (= brand-blueLight)

## Problem

Bei Buttons (speziell `variant="secondary"`) verschwindet beim Hover der Text, weil sowohl Hintergrundfarbe als auch Textfarbe zu ähnlich werden ODER der Text die gleiche Farbe wie der Hover-Hintergrund bekommt.

### GlowButton.tsx — Zeile 28-34

**Aktuell:**
```tsx
const variantClasses = {
  primary:
    'bg-brand-accent text-brand-white font-semibold rounded-btn shadow-glow hover:bg-brand-accentHover hover:shadow-glow-lg active:scale-[0.98] animate-pulse-glow hover:[animation:none]',
  secondary:
    'border-2 border-brand-accent text-brand-accent font-semibold rounded-btn hover:bg-brand-accent hover:text-brand-white active:scale-[0.98] transition-colors',
  ghost:
    'text-brand-white font-semibold underline underline-offset-4 hover:text-brand-accentLight active:scale-[0.98] transition-colors',
}
```

**Probleme:**
1. `primary`: `bg-brand-accent` ist `#2E3D56`, `hover:bg-brand-accentHover` ist `#3A5070` — Text ist `text-brand-white`, das funktioniert ✓
2. `secondary`: Hover setzt `hover:bg-brand-accent hover:text-brand-white` — Text muss weiß werden auf blauem Hintergrund ✓, aber `brand-accent = brand-blue = #2E3D56` — prüfe ob Kontrast reicht
3. `ghost`: `hover:text-brand-accentLight` — auf dunklem Hintergrund (Hero) muss das sichtbar bleiben

### index.css — Button-Klassen

**Aktuell `.btn-primary` (Zeile ~125):**
```css
bg-brand-blue hover:bg-brand-blueLight text-brand-white
```
Das funktioniert — Text bleibt weiß.

**Aktuell `.btn-secondary` (Zeile ~139):**
```css
bg-transparent hover:bg-brand-accentLight text-brand-blue hover:text-brand-blueLight
```
**Problem:** `brand-accentLight` könnte eine helle Variante von `#2E3D56` sein — prüfe in `tailwind.config.ts` welcher Wert das ist. Wenn `brand-accentLight` ein helles Blau/Grau ist und `hover:text-brand-blueLight` ein mittleres Blau, kann der Kontrast schlecht sein.

## Aufgaben

### 1. GlowButton Hover-Varianten fixen

**Datei:** `src/components/ui/GlowButton.tsx`

Ändere die `variantClasses`:

```tsx
const variantClasses = {
  primary:
    'bg-brand-cta text-brand-ctaText font-semibold rounded-btn shadow-glow hover:bg-brand-ctaHover hover:shadow-glow-lg active:scale-[0.98] transition-all',
  secondary:
    'border-2 border-brand-blue text-brand-blue font-semibold rounded-btn hover:bg-brand-blue hover:text-white active:scale-[0.98] transition-colors',
  ghost:
    'bg-white/10 backdrop-blur-sm text-white font-semibold rounded-btn border border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-[0.98] transition-all',
}
```

**Erklärung der Änderungen:**
- `primary`: Nutzt jetzt Lime-Green (`brand-cta: #C8E632`) mit dunklem Text (`brand-ctaText: #1F2B3D`) — maximaler Kontrast, Text immer lesbar
- `secondary`: Hover-Hintergrund wird `brand-blue` mit `text-white` — klarer Kontrast
- `ghost`: Backdrop-blur Glaseffekt statt Underline, weiße Schrift bleibt auf dunklem Hintergrund immer sichtbar

### 2. Entferne `animate-pulse-glow` vom Primary-Button

Die pulsierende Glow-Animation kann ablenkend wirken. Entferne `animate-pulse-glow hover:[animation:none]` aus dem primary Variant.

### 3. Prüfe `.btn-secondary` in index.css

**Datei:** `src/index.css`

Stelle sicher, dass der Hover-Zustand Text und Hintergrund klar trennt:

```css
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2
         bg-transparent hover:bg-brand-blue
         text-brand-blue hover:text-white
         font-body font-semibold text-base
         px-6 py-3 rounded-btn
         border-2 border-brand-blue hover:border-brand-blue
         transition-all duration-200 ease-smooth
         focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2
         active:scale-[0.98]
         select-none cursor-pointer;
  min-height: 44px;
}
```

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Primary Button: Lime-Green Hintergrund, dunkler Text → Hover: etwas dunkleres Grün, Text bleibt lesbar
- Secondary Button: Transparenter Hintergrund, blauer Text → Hover: blauer Hintergrund, weißer Text
- Ghost Button: Semi-transparenter Hintergrund, weißer Text → Hover: stärkere Deckkraft, Text bleibt weiß
- Teste ALLE Buttons: Hero CTAs, Anfahrt „Route planen", Kontakt-Page, Footer CTA
