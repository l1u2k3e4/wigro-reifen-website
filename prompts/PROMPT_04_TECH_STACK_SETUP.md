# PROMPT_04: Tech-Stack Setup

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/frontend-design` — Vite + React + TypeScript Setup, Konfiguration, Build-Einstellungen

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**

---

## Ziel

Am Ende existiert ein lauffähiges Grundprojekt: `npm run dev` startet den Dev-Server, `npm run build` läuft fehlerfrei durch, alle Dependencies sind installiert, Routing ist konfiguriert, und die Ordnerstruktur steht.

---

## Kontext

Das Projekt nutzt Vite + React 18+ + TypeScript strict + Tailwind CSS v3.4 + Framer Motion + React Router v6. KEIN Next.js.

---

## Aufgaben

### 1. Projekt initialisieren

```bash
cd Website.v2
npm create vite@latest . -- --template react-ts
npm install
npm install framer-motion lucide-react clsx tailwind-merge react-router-dom
npx tailwindcss init -p --ts
```

### 2. Konfigurationsdateien einrichten

#### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
```

#### tsconfig.json

Ergänze Pfad-Aliase:

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

#### tailwind.config.ts

Übernimm die vollständige Config aus PROMPT_03 (Design-System). Falls PROMPT_03 noch nicht ausgeführt wurde, erstelle eine Basis-Config die später erweitert wird.

#### src/lib/utils.ts

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3. Ordnerstruktur erstellen

```
src/
├── components/         ← Wiederverwendbare UI-Komponenten
│   ├── ui/            ← Basis-Komponenten (Button, Card, etc.)
│   └── layout/        ← Layout-Komponenten (Header, Footer, etc.)
├── sections/          ← Seitenabschnitte (Hero, Leistungen, etc.)
├── pages/             ← Seitenkomponenten (Home, Leistungen, Team, Kontakt)
├── data/              ← Content & Konfiguration
│   └── content.ts     ← Aus PROMPT_02
├── lib/               ← Utilities
│   └── utils.ts
├── styles/            ← Globale Styles
├── hooks/             ← Custom React Hooks
├── types/             ← TypeScript Type-Definitionen
├── App.tsx            ← Root-Komponente mit Router
├── main.tsx           ← Entry Point
└── index.css          ← Tailwind Directives + Base Styles
```

### 4. Router Setup

Konfiguriere React Router v6 mit folgenden Routes:

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Routes:
// /              → Home
// /leistungen    → Leistungen
// /team          → Team (Über uns)
// /kontakt       → Kontakt
// /impressum     → Impressum
// /datenschutz   → Datenschutzerklärung
// *              → 404 Not Found
```

### 5. Layout-Komponente

Erstelle eine SharedLayout-Komponente mit:
- Header (Navigation) — auf jeder Seite
- `<main>` — Content-Bereich
- Footer — auf jeder Seite
- Sticky CTA-Bar (Mobile) — auf jeder Seite

### 6. Platzhalter-Seiten

Erstelle leere Platzhalter-Seiten für alle Routes:
- `src/pages/Home.tsx`
- `src/pages/Leistungen.tsx`
- `src/pages/Team.tsx`
- `src/pages/Kontakt.tsx`
- `src/pages/Impressum.tsx`
- `src/pages/Datenschutz.tsx`
- `src/pages/NotFound.tsx`

Jede Seite zeigt erstmal nur ihren Namen als `<h1>`.

### 7. index.html konfigurieren

Erstelle das Root-HTML mit:
- Charset, Viewport, Title, Description
- Google Fonts Preconnect + Link
- Favicon
- Language: `<html lang="de">`

### 8. Assets verlinken

Stelle sicher dass die Bilder aus `Public/` im Build verfügbar sind:
- Logo
- Favicon
- Team-Bilder
- Werkstatt-Bilder
- Reifenmarken-Logos

---

## Erwartetes Ergebnis

1. `npm run dev` startet fehlerfrei
2. `npm run build` läuft durch ohne Errors
3. Alle Routes sind konfiguriert und zeigen Platzhalter
4. Ordnerstruktur ist vollständig angelegt
5. Alle Dependencies installiert

---

## Verification

```bash
# TypeScript Check
npx tsc --noEmit

# Dev Server starten
npm run dev

# Build prüfen
npm run build

# Preview starten
npm run preview
```

- [ ] Keine TypeScript-Fehler
- [ ] Dev Server startet auf localhost
- [ ] Alle Routes erreichbar (/, /leistungen, /team, /kontakt, /impressum, /datenschutz)
- [ ] Navigation zwischen Seiten funktioniert
- [ ] Build erzeugt `dist/` Ordner
- [ ] Keine Console-Errors im Browser
