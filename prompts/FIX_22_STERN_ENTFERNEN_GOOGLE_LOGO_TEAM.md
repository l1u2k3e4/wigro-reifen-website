# FIX_22 — Stern zwischen Google-Logo und 4,8 entfernen + Google-Logo auf Teamseite ergänzen

## Ziel
1. Auf der **Startseite** im Bewertungs-Header den einzelnen Stern zwischen dem Google-„G"-Logo und der „4,8"-Zahl entfernen
2. Auf der **Teamseite** in der Sektion „Lokal verwurzelt — seit Jahren in Witten" den aktuell verwendeten Stern-Emoji im Trust-Chip durch das Google-„G"-Logo ersetzen

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.4
- Lucide React für Icons (`Star` aus `lucide-react`)
- Content in `src/data/content.ts` (COPY-Objekt)

---

## Änderung 1: Stern zwischen Google-Logo und 4,8-Bewertung entfernen (Startseite)

### Datei
- `src/sections/TestimonialsSection.tsx`

### Aktueller Code (Zeile 30–48) — Google Rating Badge:
```tsx
<div className="flex items-center gap-3 mb-6">
  <div className="flex items-center gap-1.5 bg-white border border-brand-border rounded-full px-4 py-2 shadow-card">
    {/* Google "G" */}
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    <span className="font-display font-bold text-xl text-brand-heading">
      {COPY.bewertungen.ratingValue}
    </span>
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" aria-hidden />
      ))}
    </div>
  </div>
</div>
```

### Aufgabe
Die 5 gelben Sterne (Zeile 43–47) stehen **rechts** neben der „4,8"-Zahl. Aber **zwischen** dem Google-Logo und der „4,8"-Zahl befindet sich visuell ein Stern-artiges Element.

Prüfe genau, was zwischen dem Google „G" SVG und der `ratingValue`-Zahl steht. Falls es die 5 kleinen Sterne sind, die rechts vom Rating stehen, und der Nutzer wünscht, dass die **Gesamtdarstellung** so ist: `[Google G] [4,8] [5 Sterne]` → dann ist nur der Abstand/Trenner zu prüfen.

**Der Nutzer möchte:** Den einzelnen Stern ZWISCHEN Google-Logo und „4,8" entfernen.

Entferne die 5-Sterne-Zeile komplett, sodass nur noch Google-G + Rating-Zahl angezeigt werden:

### Neuer Code:
```tsx
<div className="flex items-center gap-3 mb-6">
  <div className="flex items-center gap-2 bg-white border border-brand-border rounded-full px-4 py-2 shadow-card">
    {/* Google "G" */}
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    <span className="font-display font-bold text-xl text-brand-heading">
      {COPY.bewertungen.ratingValue}
    </span>
  </div>
</div>
```

### Änderungen:
- Die 5 Sterne (`Array.from({ length: 5 })...`) sind entfernt
- `gap-1.5` → `gap-2` für besseres Spacing ohne Sterne
- `Star` Import kann aus der Import-Zeile entfernt werden (falls nicht anderweitig verwendet)

### Import-Cleanup (Zeile 5):
**Alt:**
```tsx
import { Star, ExternalLink } from 'lucide-react'
```
**Neu:**
```tsx
import { ExternalLink } from 'lucide-react'
```

---

## Änderung 2: Teamseite — Google-Logo im Trust-Chip statt Stern-Emoji

### Dateien
- `src/data/content.ts`
- `src/sections/GeschichteSection.tsx`

### Aktueller Stand in content.ts (Zeile 487):
```ts
trustChip: '⭐ 4,8 / 5 bei 300+ Google-Bewertungen',
```

### Aktueller Stand in GeschichteSection.tsx (Zeile 58–61):
```tsx
{/* Trust-Chip */}
<div className="flex items-center gap-2">
  <span className="trust-chip">{COPY.team.geschichte.trustChip}</span>
</div>
```

Das Problem: Der Trust-Chip nutzt ein ⭐-Emoji statt des Google-Logos. Der Nutzer möchte stattdessen das echte Google-„G"-Logo verwenden.

### Aufgabe — content.ts:
Ändere den `trustChip`-Text, entferne das Stern-Emoji:

```ts
trustChip: '4,8 / 5 bei 300+ Google-Bewertungen',
```

### Aufgabe — GeschichteSection.tsx:
Ersetze den Trust-Chip-Block (Zeile 58–61) mit einer Version, die das Google-Logo als SVG enthält:

```tsx
{/* Trust-Chip mit Google Logo */}
<div className="flex items-center gap-2">
  <div className="trust-chip inline-flex items-center gap-2">
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    <span>{COPY.team.geschichte.trustChip}</span>
  </div>
</div>
```

### Ergebnis:
- **Startseite** Bewertungen: `[Google G] [4,8]` — ohne Sterne dazwischen
- **Teamseite** Trust-Chip: `[Google G] [4,8 / 5 bei 300+ Google-Bewertungen]` — statt ⭐-Emoji

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Startseite → Bewertungen: Kein Stern zwischen Google-Logo und „4,8" — nur `[G] [4,8]`
3. Startseite → Bewertungen: Die 5 kleinen gelben Sterne RECHTS neben dem Rating sind entfernt
4. Teamseite → Geschichte: Trust-Chip zeigt Google-„G"-Logo statt ⭐-Emoji
5. Beide Google-Logos verwenden exakt dasselbe SVG (vierfarbig: blau, grün, gelb, rot)
6. `Star` Import nicht mehr in TestimonialsSection.tsx (falls nicht anderweitig genutzt)
