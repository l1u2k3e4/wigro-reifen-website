# FIX_11 — CTASection entfernen + FAQ alle geschlossen + Damian Änderung + Reifeneinlagerung Versicherung

## Ziel
4 schnelle Content- und Layout-Korrekturen: CTASection ("Reifen wechseln lassen") von allen Seiten entfernen, FAQ standardmäßig alle geschlossen, Damian-Eintrag korrigieren, Reifeneinlagerung-Vorteile erweitern.

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.4 + Framer Motion 12+
- Content zentral in `src/data/content.ts` (COPY-Objekt) — KEIN hardcoded Text in JSX
- Alle Importe mit `@/` Alias (tsconfig paths)

---

## Änderung 1: CTASection von allen Seiten entfernen

### Dateien
- `src/pages/Home.tsx`
- `src/pages/Leistungen.tsx`
- `src/pages/Team.tsx`

### Aktueller Stand
Alle drei Seiten importieren und rendern `<CTASection />` als letztes Element in `<main>`:

```tsx
// Home.tsx — Zeile 15 (Import) + Zeile 105 (Render)
import CTASection from '@/sections/CTASection'
// ...
<CTASection />

// Leistungen.tsx — Zeile 9 (Import) + Zeile 65 (Render)
import CTASection from '@/sections/CTASection'
// ...
<CTASection />

// Team.tsx — Zeile 9 (Import) + Zeile 23 (Render)
import CTASection from '@/sections/CTASection'
// ...
<CTASection />
```

### Aufgabe
1. **Home.tsx**: Import `CTASection` entfernen (Zeile 15) + `<CTASection />` aus dem JSX entfernen (Zeile 105).
2. **Leistungen.tsx**: Import `CTASection` entfernen (Zeile 9) + `<CTASection />` aus dem JSX entfernen (Zeile 65).
3. **Team.tsx**: Import `CTASection` entfernen (Zeile 9) + `<CTASection />` aus dem JSX entfernen (Zeile 23).
4. Die Datei `src/sections/CTASection.tsx` NICHT löschen — sie könnte später wieder gebraucht werden.

### Ergebnis
Auf keiner der drei Seiten erscheint mehr der grüne "Reifen wechseln lassen" CTA-Block.

---

## Änderung 2: FAQ — alle Fragen standardmäßig geschlossen

### Datei
- `src/sections/FAQSection.tsx`

### Aktueller Stand (Zeile 42)
```tsx
<FAQItem
  question={item.frage}
  answer={item.antwort}
  defaultOpen={index === 0}
/>
```
Die erste Frage (index 0) wird standardmäßig geöffnet dargestellt.

### Aufgabe
Ändere `defaultOpen={index === 0}` zu `defaultOpen={false}`:

```tsx
<FAQItem
  question={item.frage}
  answer={item.antwort}
  defaultOpen={false}
/>
```

### Ergebnis
Alle FAQ-Fragen sind beim Seitenaufruf geschlossen. Der Nutzer öffnet per Klick.

---

## Änderung 3: Damian — Rolle ändern + Position verschieben

### Datei
- `src/data/content.ts`

### Aktueller Stand
Damian steht an **Position 3** (Index 2) im `mitglieder`-Array (nach Denise):
```ts
{
  name: 'Damian',
  rolle: 'Kundenberatung',
  beschreibung: 'Damian berät Sie rund um Reifen und Felgen — ehrlich, unkompliziert und ohne Fachchinesisch.',
  bild: '/Mitarbeiter Bilder/Damian.webp',
  bildAlt: 'Damian — Kundenberatung WIGRO Reifen Witten',
},
```

Aktuelle Reihenfolge: Mario → Denise → **Damian** → Igor → Lukasz → Max → Pawlo

### Aufgabe
1. **Rolle ändern**: `rolle: 'Kundenberatung'` → `rolle: 'Reifenmonteur'`
2. **bildAlt anpassen**: `'Damian — Kundenberatung WIGRO Reifen Witten'` → `'Damian — Reifenmonteur WIGRO Reifen Witten'`
3. **beschreibung anpassen**: `'Damian berät Sie rund um Reifen und Felgen — ehrlich, unkompliziert und ohne Fachchinesisch.'` → `'Damian packt mit an — ob Reifenwechsel, Montage oder Auswuchtung, er arbeitet schnell und sauber.'`
4. **Position verschieben**: Damian-Objekt aus Index 2 entfernen und als **letztes Element** nach Pawlo einfügen.

### Neue Reihenfolge
Mario → Denise → Igor → Lukasz → Max → Pawlo → **Damian**

---

## Änderung 4: Reifeneinlagerung — "Reifen sind versichert" als ersten Vorteil

### Datei
- `src/data/content.ts`

### Aktueller Stand (ca. Zeile 369)
```ts
vorteile: [
  'Klimatisch geeignete Lagerräume',
  'Individuelle Beschriftung — Ihre Reifen bleiben Ihre Reifen',
  'Erinnerungsservice zum Reifenwechsel-Termin',
  'Sichtprüfung bei jeder Ein- und Auslagerung',
  'Platzsparend und stressfrei für Sie',
],
```

### Aufgabe
Neuen Eintrag `'Ihre Reifen sind versichert'` als **erstes Element** im `vorteile`-Array hinzufügen:

```ts
vorteile: [
  'Ihre Reifen sind versichert',
  'Klimatisch geeignete Lagerräume',
  'Individuelle Beschriftung — Ihre Reifen bleiben Ihre Reifen',
  'Erinnerungsservice zum Reifenwechsel-Termin',
  'Sichtprüfung bei jeder Ein- und Auslagerung',
  'Platzsparend und stressfrei für Sie',
],
```

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Home, Leistungen, Team: CTASection nicht mehr sichtbar
3. FAQ: alle Fragen geschlossen beim Laden
4. Team-Seite: Damian an letzter Stelle mit Rolle "Reifenmonteur"
5. Leistungen → Reifeneinlagerung: "Ihre Reifen sind versichert" als erster Vorteil
