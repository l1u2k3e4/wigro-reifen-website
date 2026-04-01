# PROMPT_08: Performance-Optimierung

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/frontend-design` — Build-Optimierung, Code Splitting, Lazy Loading

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**

---

## Ziel

Am Ende erreicht die Website Lighthouse-Scores von 90+ in allen vier Kategorien (Performance, Accessibility, Best Practices, SEO). Die Seite lädt in unter 2 Sekunden auf 4G-Mobilfunk.

---

## Kontext

Performance ist ein Google-Ranking-Faktor (Core Web Vitals) und entscheidet über Conversion-Raten. Jede Sekunde Ladezeit kostet ca. 7% Conversion. Die WIGRO-Zielgruppe kommt zu 70% mobil — Performance auf langsameren Verbindungen ist kritisch.

### Ziel-Metriken

| Metrik | Ziel | Google-Schwellwert |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.0s | < 2.5s (gut) |
| INP (Interaction to Next Paint) | < 150ms | < 200ms (gut) |
| CLS (Cumulative Layout Shift) | < 0.05 | < 0.1 (gut) |
| FCP (First Contentful Paint) | < 1.5s | < 1.8s (gut) |
| Total Bundle Size (gzipped) | < 150 KB | — |

---

## Aufgaben

### 1. Bildoptimierung

#### Bilder konvertieren

Alle Bilder in WebP konvertieren mit optimaler Kompression:

```bash
# Installiere Bildoptimierungs-Tools
npm install -D sharp vite-plugin-image-optimizer
```

- **Team-Fotos:** Originale sind 10-12 MB! → WebP, 800px breit, Qualität 80%
- **Werkstatt-Bilder:** → WebP, 1200px breit, Qualität 80%
- **Logos:** → WebP oder bestehendes PNG (bereits klein)
- **Hero-Bild:** → WebP, 1920px breit, Qualität 85% + 640px Variante für Mobile

#### Responsive Images

```html
<img
  srcSet="/images/hero-640w.webp 640w, /images/hero-1280w.webp 1280w, /images/hero-1920w.webp 1920w"
  sizes="100vw"
  src="/images/hero-1280w.webp"
  alt="WIGRO Reifen Werkstatt in Witten"
  width="1920"
  height="1080"
  loading="eager"
  fetchpriority="high"
/>
```

#### Loading-Strategien

- `loading="eager"` + `fetchpriority="high"` — NUR für Hero-Bild
- `loading="lazy"` — für ALLES unterhalb des Fold
- `width` + `height` auf allen Bildern (verhindert CLS)
- `decoding="async"` auf allen Bildern

### 2. Code Splitting & Lazy Loading

#### Route-basiertes Code Splitting

```typescript
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Leistungen = lazy(() => import('@/pages/Leistungen'))
const Team = lazy(() => import('@/pages/Team'))
const Kontakt = lazy(() => import('@/pages/Kontakt'))
const Impressum = lazy(() => import('@/pages/Impressum'))
const Datenschutz = lazy(() => import('@/pages/Datenschutz'))

// Wrapping in Suspense:
<Suspense fallback={<PageLoader />}>
  <Routes>...</Routes>
</Suspense>
```

#### Chunk-Optimierung (vite.config.ts)

```typescript
manualChunks: {
  'framer-motion': ['framer-motion'],
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'icons': ['lucide-react'],
}
```

### 3. Font-Optimierung

- **Google Fonts mit `display=swap`** — verhindert FOIT
- **Preconnect** zu fonts.googleapis.com und fonts.gstatic.com
- **Subset** — nur benötigte Zeichensätze (latin, latin-ext)
- **Fallback-Font** mit ähnlicher Metrik (verhindert CLS)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=...:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Alternativ: Fonts lokal hosten für bessere DSGVO-Compliance und Performance.

### 4. CSS-Optimierung

- **Tailwind CSS Purge** — nur genutzte Klassen im Build
- Prüfe dass `tailwind.config.ts` korrekte `content`-Pfade hat
- Keine ungenutzten Custom CSS-Klassen

### 5. JavaScript-Optimierung

- **Keine unnötigen Re-Renders:** useCallback für Event-Handler in Listen
- **Stabile Keys** in Listen (nicht Array-Index)
- **Debounce** auf Scroll-Handler (für Sticky CTA-Bar)
- **Keine console.log** im Production-Build
- **Tree Shaking:** Named Imports statt Wildcard (`import { Phone } from 'lucide-react'` statt `import * as Icons`)

### 6. Critical Rendering Path

- **Inline Critical CSS** für Above-the-Fold Content
- **Defer non-critical JS** — Third-Party Scripts (Maps, Analytics) mit `defer` oder dynamic import
- **Preload** wichtige Assets:

```html
<link rel="preload" as="image" href="/images/hero.webp" />
```

### 7. Bundle-Analyse

```bash
# Bundle-Größe analysieren
npm run build
npx vite-bundle-visualizer

# Oder manuell prüfen:
ls -lh dist/assets/*.js
ls -lh dist/assets/*.css
```

Ziel-Größen (gzipped):
- Main JS: < 80 KB
- Vendor (React): < 50 KB
- Framer Motion: < 40 KB
- CSS: < 20 KB
- Total: < 150 KB

### 8. Caching-Strategie

Vite generiert automatisch Content-Hashed Dateinamen. Zusätzlich:
- Statische Assets: `Cache-Control: max-age=31536000, immutable`
- HTML: `Cache-Control: no-cache` (immer frisch)
- Empfehlung für Hosting-Config dokumentieren

---

## Erwartetes Ergebnis

1. Alle Bilder optimiert (WebP, responsive, lazy)
2. Route-basiertes Code Splitting aktiv
3. Fonts optimiert (preconnect, display=swap, ggf. lokal)
4. Bundle unter 150 KB (gzipped)
5. Lighthouse Score 90+ in allen Kategorien

---

## Verification

```bash
# Build erstellen
npm run build

# Bundle-Größe prüfen
ls -lh dist/assets/

# Lighthouse CLI (falls verfügbar)
npx lighthouse http://localhost:4173 --output json
```

- [ ] `npm run build` fehlerfrei
- [ ] Keine Bilder über 200 KB
- [ ] Team-Fotos von ~12 MB auf < 100 KB reduziert
- [ ] Total Bundle (JS) < 150 KB gzipped
- [ ] Alle Bilder unterhalb Fold haben `loading="lazy"`
- [ ] Hero-Bild hat `loading="eager"` + `fetchpriority="high"`
- [ ] Lazy Routes aktiv (separate Chunks pro Page)
- [ ] Keine console.log im Build
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
