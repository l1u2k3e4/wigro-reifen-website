# FIX_15 — Google Maps: WIGRO Reifen exakt vorausgewählt (Startseite + Kontaktseite)

## Ziel
Auf beiden Google-Maps-Einbettungen (Startseite `AnfahrtSection` + Kontaktseite `AnfahrtKontakt`) soll WIGRO Reifen als exakter Ort vorausgewählt und mit Pin markiert sein — nicht nur eine allgemeine Suchanfrage.

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict)
- Google Maps Embed via iframe (kein API-Key nötig)
- Content zentral in `src/data/content.ts` (COPY-Objekt)

---

## Problem
Aktuell wird dieser iframe-URL verwendet:
```
https://maps.google.com/maps?q=WIGRO+Reifen+Witten&output=embed
```

Diese URL macht eine **Suchanfrage** — Google zeigt ggf. mehrere Ergebnisse oder den falschen Ort. Besser: die **exakte Google Maps Place URL** verwenden.

---

## Lösung: Google Maps Place ID verwenden

### WIGRO Reifen Standort-Daten
- **Adresse**: Cörmannstr. 25, 58455 Witten
- **Koordinaten**: 51.4447, 7.3189
- **Google Maps URL**: `https://www.google.com/maps/place/Wigro+Reifen/@51.4447147,7.318914`

### Neue Embed-URL
Verwende die Koordinaten-basierte Embed-URL für präzise Lokalisierung:

```
https://maps.google.com/maps?q=51.4447147,7.318914&z=16&output=embed
```

**Warum Koordinaten statt Suchtext?**
- Koordinaten sind eindeutig — kein Risiko falscher Ergebnisse
- `z=16` setzt einen sinnvollen Zoom-Level (Straßenebene)
- Der Pin landet exakt auf dem WIGRO-Standort

---

## Änderung 1: AnfahrtSection.tsx (Startseite)

### Datei
- `src/sections/AnfahrtSection.tsx`

### Aktueller Code (Zeile 101–102)
```tsx
<iframe
  src="https://maps.google.com/maps?q=WIGRO+Reifen+Witten&output=embed"
```

### Neuer Code
```tsx
<iframe
  src="https://maps.google.com/maps?q=51.4447147,7.318914&z=16&output=embed"
```

---

## Änderung 2: AnfahrtKontakt.tsx (Kontaktseite)

### Hinweis
Falls FIX_12 bereits umgesetzt wurde, nutzt `AnfahrtKontakt.tsx` jetzt denselben Code wie `AnfahrtSection.tsx`. In diesem Fall nur die eine Stelle ändern.

Falls FIX_12 NOCH NICHT umgesetzt wurde und `AnfahrtKontakt` noch die `GoogleMapsEmbed`-Komponente nutzt:

### Datei
- `src/components/GoogleMapsEmbed.tsx`

### Aktueller Default (Zeile 18)
```tsx
embedUrl = COPY.anfahrt.googleMapsEmbed,
```

### Datei
- `src/data/content.ts`

### Aufgabe
Suche nach dem `googleMapsEmbed`-Eintrag im COPY-Objekt und ersetze die URL:

**Alt:**
```ts
googleMapsEmbed: 'https://maps.google.com/maps?q=WIGRO+Reifen+Witten&output=embed',
```

**Neu:**
```ts
googleMapsEmbed: 'https://maps.google.com/maps?q=51.4447147,7.318914&z=16&output=embed',
```

---

## Änderung 3: content.ts — routenplanerUrl prüfen

### Datei
- `src/data/content.ts`

Stelle sicher, dass die `routenplanerUrl` den exakten Standort nutzt:

```ts
routenplanerUrl: 'https://www.google.com/maps/dir/?api=1&destination=51.4447147,7.318914',
```

Und die `googleMapsUrl`:
```ts
googleMapsUrl: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4447147,7.318914,16z',
```

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Startseite → Anfahrt: Google Maps zeigt exakt den WIGRO-Standort mit Pin
3. Kontaktseite → Anfahrt: Google Maps zeigt exakt denselben Standort
4. "Route planen" Button öffnet Google Maps Navigation zum korrekten Standort
5. Kein CORS-Fehler oder blockierter iframe
