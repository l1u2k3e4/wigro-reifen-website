# FIX 05 — Markenpartner-Logos: Einheitlich groß & farbig

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Marquee-Carousel in `src/components/PartnerLogos.tsx`
- Logo-Daten in `src/data/content.ts` → `COPY.partner.items`
- Bilder liegen in `public/` (verschiedene Unterordner)
- Partner: Hankook, Michelin, Continental, Nexen, Nokian

## Problem

1. Die Logos sind aktuell `grayscale opacity-50` und werden nur bei Hover farbig
2. Die Größen sind uneinheitlich (`h-10 md:h-12`) — manche Logos wirken kleiner
3. Einige Logo-Dateien haben möglicherweise keinen transparenten Hintergrund

## Aufgaben

### 1. Logos immer farbig anzeigen

**Datei:** `src/components/PartnerLogos.tsx`

Ändere die Logo-Klasse von:
```tsx
className="h-10 md:h-12 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
```

zu:
```tsx
className="h-12 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
```

**Änderungen:**
- `grayscale` und `opacity-50` entfernt → Logos sind IMMER farbig
- Größe einheitlich auf `h-12 md:h-14` erhöht
- Nur leichte Opacity-Änderung als Hover-Effekt (90% → 100%)

### 2. Prüfe vorhandene Logo-Dateien

Überprüfe in `src/data/content.ts` unter `COPY.partner.items`, welche Bild-Pfade gesetzt sind. Dann prüfe in `public/`, ob diese Dateien existieren und ob sie brauchbar sind.

Falls Logo-Dateien fehlen oder nur in schlechter Qualität vorliegen:

- Erstelle SVG-Logos als Ersatz. Für jeden Partner ein einfaches, sauberes SVG:
  - **Hankook**: Orange/Schwarz Schriftzug
  - **Michelin**: Blau/Weiß Schriftzug
  - **Continental**: Gelb/Schwarz mit Pferd-Icon (vereinfacht)
  - **Nexen**: Rot/Schwarz Schriftzug
  - **Nokian**: Blau Schriftzug

- Speichere SVGs unter `public/logos/` als `hankook.svg`, `michelin.svg`, etc.
- Aktualisiere die Pfade in `content.ts`

### 3. Einheitliche Container-Größe erzwingen

Für visuell gleichmäßige Darstellung, gib jedem Logo-Container eine feste Breite:

```tsx
<div
  key={`${partner.name}-${i}`}
  className="flex items-center justify-center shrink-0 w-32 md:w-40 px-4"
>
  <img
    src={partner.src}
    alt={partner.alt}
    className="h-12 md:h-14 max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
    loading="lazy"
    decoding="async"
  />
</div>
```

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Alle 5 Partner-Logos sind farbig sichtbar
- Logos haben einheitliche Höhe und wirken visuell gleich groß
- Marquee-Animation läuft flüssig ohne Sprünge
- Hover pausiert Animation (via `hover:[animation-play-state:paused]`)
