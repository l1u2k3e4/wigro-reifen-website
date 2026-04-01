# FIX 07 — Header Logo größer + Footer komplett überarbeiten

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Tech-Stack: Vite + React 18 + TypeScript + Tailwind CSS v3.4 + Framer Motion
- Content aus `src/data/content.ts` (COPY-Objekt)
- Farb-Tokens: `brand-blue: #2E3D56`, `brand-cta: #C8E632`
- Header: `bg-brand-blue`, Footer: `bg-brand-blue` mit weißem Text
- Icons: `lucide-react` (bereits installiert)

---

## Aufgabe 1: Header-Logo größer machen

**Datei:** `src/components/layout/Header.tsx`

Das Logo ist aktuell `h-10` (40px). Mache es deutlich größer und passe die Header-Höhe an:

**Ändere Zeile 49:**
```tsx
// ALT:
className="h-10 w-auto object-contain"

// NEU:
className="h-14 w-auto object-contain"
```

**Ändere Zeile 39 — Header-Höhe anpassen:**
```tsx
// ALT:
className="container-content flex items-center justify-between h-16"

// NEU:
className="container-content flex items-center justify-between h-20"
```

---

## Aufgabe 2: Footer komplett überarbeiten

**Datei:** `src/components/layout/Footer.tsx`

### 2a. Logo-Fix: Weißen Balken entfernen, linksbündig

Das Logo hat aktuell `brightness-0 invert` was einen weißen Balken erzeugt. Stattdessen soll das Logo natürlich angezeigt werden, mit einem hellen Filter der auf dunkelblauem Hintergrund gut wirkt. Außerdem linksbündig statt zentriert.

**Aktuell:**
```tsx
<img
  src={COPY.nav.logo.src}
  alt={COPY.nav.logo.alt}
  className="h-12 w-auto object-contain brightness-0 invert"
  loading="lazy"
/>
```

**Neu — Option A (Invertiert ohne weißen Balken):**
Prüfe ob das Logo-Bild (`.webp`) einen transparenten Hintergrund hat. Falls ja, nutze `brightness-0 invert` — das sollte ohne Balken funktionieren.

Falls das Logo einen weißen Hintergrund hat (daher der Balken), verwende stattdessen:
```tsx
<img
  src={COPY.nav.logo.src}
  alt={COPY.nav.logo.alt}
  className="h-12 w-auto object-contain rounded-md"
  loading="lazy"
/>
```

Das Logo wird dann mit seinen Originalfarben auf dem blauen Hintergrund angezeigt, mit leicht abgerundeten Ecken.

### 2b. Social-Media-Icons hinzufügen (Instagram + Facebook)

Importiere `Instagram` aus lucide-react. Für Facebook nutze ein inline SVG (lucide hat kein Facebook-Icon).

Füge nach dem Slogan-Text in Spalte 1 folgendes hinzu:

```tsx
{/* Social Media Links */}
<div className="flex items-center gap-3 mt-2">
  <a
    href="https://www.instagram.com/wigroreifen/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
    aria-label="WIGRO Reifen auf Instagram"
  >
    <Instagram size={18} aria-hidden />
  </a>
  <a
    href="https://www.facebook.com/profile.php?id=100070979276713"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
    aria-label="WIGRO Reifen auf Facebook"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  </a>
</div>
```

Füge `Instagram` zum lucide-react Import hinzu:
```tsx
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react'
```

### 2c. Untere Zeile vereinfachen — „WIGRO Reifen" + weißen Balken entfernen

Im Bottom-Bar-Bereich steht aktuell `{COPY.footer.firma}` als separater Text. Das ist redundant zum Logo oben. Entferne den Firmenname und zeige NUR Impressum/Datenschutz:

**Aktuell:**
```tsx
<div className="border-t border-white/20">
  <div className="container-content py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70 font-medium">
    <span>{COPY.footer.firma}</span>
    <div className="flex gap-4">
      <Link to="/impressum" ...>Impressum</Link>
      <Link to="/datenschutz" ...>Datenschutz</Link>
    </div>
  </div>
</div>
```

**Neu:**
```tsx
<div className="border-t border-white/20">
  <div className="container-content py-4 flex items-center justify-between text-xs text-white/60 font-medium">
    <span>{COPY.footer.copyright.replace(new Date().getFullYear().toString(), year.toString())}</span>
    <div className="flex gap-4">
      <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
      <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
    </div>
  </div>
</div>
```

Und entferne das Copyright aus der oberen Logo-Spalte (da es jetzt in der Bottom-Bar steht).

---

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Header-Logo ist deutlich größer (h-14 statt h-10)
- Footer-Logo zeigt kein weißer Balken mehr
- Instagram + Facebook Icons sichtbar mit korrekten Links
- Kein doppelter Firmenname im Footer
- Bottom-Bar zeigt nur Copyright + Impressum/Datenschutz
