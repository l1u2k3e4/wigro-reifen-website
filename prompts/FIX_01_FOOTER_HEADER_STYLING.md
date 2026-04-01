# FIX 01 — Footer Logo, Schriftstärke & Mobile-Ausrichtung + Header Trust-Badge

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Tech-Stack: Vite + React 18 + TypeScript + Tailwind CSS v3.4 + Framer Motion
- Content kommt aus `src/data/content.ts` (COPY-Objekt)
- Farb-Tokens: `brand-blue: #2E3D56`, `brand-cta: #C8E632`
- Footer hat aktuell `bg-brand-blue` mit weißem Text

## Aufgaben

### 1. Footer-Logo farblich an Header anpassen

**Datei:** `src/components/layout/Footer.tsx`

Das Logo im Footer ist zu dunkel und sieht anders aus als im Header. Im Header (`src/components/layout/Header.tsx`) wird das Logo OHNE Filter angezeigt — einfach `<img>` mit `className="h-10 w-auto object-contain"`.

**Aktuell im Footer:**
```tsx
<img
  src={COPY.nav.logo.src}
  alt={COPY.nav.logo.alt}
  className="h-12 w-auto object-contain"
  style={{ mixBlendMode: 'multiply' }}
  loading="lazy"
/>
```

**Problem:** `mix-blend-mode: multiply` verdunkelt das Logo auf dem blauen Hintergrund.

**Lösung:** Entferne `style={{ mixBlendMode: 'multiply' }}` und verwende stattdessen `brightness-0 invert` als Tailwind-Klassen, um das Logo weiß auf dem dunkelblauen Hintergrund darzustellen. So wird es auf `bg-brand-blue` optimal sichtbar:

```tsx
<img
  src={COPY.nav.logo.src}
  alt={COPY.nav.logo.alt}
  className="h-12 w-auto object-contain brightness-0 invert"
  loading="lazy"
/>
```

### 2. Footer-Schriftstärke erhöhen

**Datei:** `src/components/layout/Footer.tsx`

Alle Footer-Texte sollen fetter/lesbarer werden:

- **Slogan-Text** (aktuell `text-sm text-white/80`): Ändere zu `text-sm text-white/90 font-medium`
- **Copyright** (aktuell `text-xs text-white/60`): Ändere zu `text-xs text-white/70 font-medium`
- **Spaltenüberschriften** (aktuell `font-semibold text-sm ... text-white/60`): Ändere `text-white/60` zu `text-white/90`
- **Kontakt-Links & Texte** (aktuell `text-white/80`): Ändere zu `text-white/90 font-medium`
- **Öffnungszeiten-Text** (aktuell `text-sm text-white/80`): Ändere zu `text-sm text-white/90 font-medium`
- **Bottom Bar** (aktuell `text-xs text-white/60`): Ändere zu `text-xs text-white/70 font-medium`

### 3. Mobiles Menü — Logo linksbündig

**Datei:** `src/components/layout/MobileMenu.tsx`

Im Header-Bereich des Mobile-Menüs (Zeile ~66) ist das Logo zentriert via `justify-between`. Das Logo soll stattdessen linksbündig sein, analog zum Textblock darunter.

**Aktuell:**
```tsx
<div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
  <img src={COPY.nav.logo.src} ... className="h-10 w-auto object-contain" />
  <button ...>
```

Das Logo steht bereits links dank `justify-between`, aber prüfe ob die Kontaktinfos unten (`<div className="text-center ...">`) auch linksbündig sein müssen. Ändere `text-center` zu `text-left` bei den Kontaktinfos am Footer des Mobil-Menüs:

```tsx
<div className="text-left text-xs text-brand-muted space-y-0.5">
```

### 4. Header Trust-Badge — Google-Logo statt Sterne links

**Datei:** `src/sections/HeroSection.tsx`

Im Trust-Badge am Hero-Ende steht aktuell:
```tsx
<span className="badge-white text-sm px-4 py-1.5 inline-flex items-center gap-2">
  <Star size={14} className="text-yellow-400 fill-yellow-400" aria-hidden />
  <span>{COPY.hero.trustSignal}</span>
</span>
```

**Änderung:** Ersetze das `<Star>`-Icon durch das offizielle Google "G" SVG (wie es in `TestimonialsSection.tsx` verwendet wird):

```tsx
<span className="badge-white text-sm px-4 py-1.5 inline-flex items-center gap-2">
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
  <span>{COPY.hero.trustSignal}</span>
</span>
```

Entferne auch den `Star`-Import aus lucide-react, falls er danach nicht mehr verwendet wird.

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Footer-Logo erscheint weiß auf dunkelblauem Hintergrund
- Footer-Texte sind fetter und gut lesbar (font-medium, höhere Opazität)
- Mobiles Menü: Logo und Kontaktinfos linksbündig
- Hero Trust-Badge zeigt Google "G" statt Stern-Icon
