# FIX_19 — Google Maps: Marker exakt auf WIGRO Reifen setzen (Startseite + Kontaktseite)

## Ziel
Die Google Maps Einbettungen auf beiden Seiten zeigen aktuell den Marker nicht exakt auf WIGRO Reifen. Die Koordinaten müssen korrigiert werden, damit die Nadel präzise auf den richtigen Standort zeigt.

---

## Problem-Analyse

### Aktuelle Embed-URL (beide Seiten):
```
https://maps.google.com/maps?q=51.4447147,7.318914&z=16&output=embed
```

### Korrekte Koordinaten aus Google Maps Place-Daten:
Die Google Maps Place-URL zeigt die **exakten** Koordinaten:
- **Latitude**: `51.4447114`
- **Longitude**: `7.3214889`

**Das Problem:** Die aktuelle Embed-URL nutzt `7.318914` als Längengrad — das ist NICHT der korrekte Wert. Der korrekte Längengrad ist `7.3214889`. Die Differenz von ~0.0026° entspricht ca. **200 Meter** Abweichung nach Westen!

### Bessere Lösung: Place-Name statt rohe Koordinaten
Statt reiner Koordinaten kann man den Google Maps Place-Namen verwenden, dann löst Google selbst den korrekten Standort auf und zeigt auch den Firmennamen im Info-Fenster:

```
https://maps.google.com/maps?q=Wigro+Reifen,+Cörmannstr.+25,+58455+Witten&output=embed
```

Alternativ mit korrigierten Koordinaten:
```
https://maps.google.com/maps?q=51.4447114,7.3214889&z=16&output=embed
```

**Empfehlung:** Die Place-Name-Variante ist robuster, weil Google den Ort automatisch erkennt und auch das Info-Fenster mit Firmenname anzeigt.

---

## Änderung 1: AnfahrtSection.tsx (Startseite)

### Datei
- `src/sections/AnfahrtSection.tsx`

### Aktuell (Zeile 102):
```tsx
src="https://maps.google.com/maps?q=51.4447147,7.318914&z=16&output=embed"
```

### Neu:
```tsx
src="https://maps.google.com/maps?q=Wigro+Reifen,+Cörmannstr.+25,+58455+Witten&z=16&output=embed"
```

---

## Änderung 2: AnfahrtKontakt.tsx (Kontaktseite)

### Datei
- `src/sections/AnfahrtKontakt.tsx`

### Aktuell (Zeile 102):
```tsx
src="https://maps.google.com/maps?q=51.4447147,7.318914&z=16&output=embed"
```

### Neu:
```tsx
src="https://maps.google.com/maps?q=Wigro+Reifen,+Cörmannstr.+25,+58455+Witten&z=16&output=embed"
```

---

## Änderung 3: content.ts — googleMapsEmbed aktualisieren

### Datei
- `src/data/content.ts`

### Aktuell (Zeile 311):
```ts
googleMapsEmbed: 'https://maps.google.com/maps?q=51.4447147,7.318914&z=16&output=embed',
```

### Neu:
```ts
googleMapsEmbed: 'https://maps.google.com/maps?q=Wigro+Reifen,+Cörmannstr.+25,+58455+Witten&z=16&output=embed',
```

---

## Änderung 4: content.ts — routenplanerUrl mit korrekten Koordinaten

### Aktuell (Zeile 312):
```ts
routenplanerUrl: 'https://www.google.com/maps/dir/?api=1&destination=51.4447147,7.318914',
```

### Neu:
```ts
routenplanerUrl: 'https://www.google.com/maps/dir/?api=1&destination=51.4447114,7.3214889',
```

**Hinweis:** Für die Routenplanung sind Koordinaten besser als der Firmenname, weil die Navigation sonst ggf. den falschen Ort findet.

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Startseite → Anfahrt-Section: Google Maps zeigt Pin **exakt auf WIGRO Reifen** (Cörmannstr. 25)
3. Kontaktseite → Anfahrt-Section: Identisches Ergebnis
4. Im Maps-Popup erscheint „Wigro Reifen" als Firmenname (bei Place-Name-Variante)
5. „Route planen"-Button öffnet korrekte Navigation zum WIGRO-Standort
6. Pin liegt NICHT mehr 200m westlich vom tatsächlichen Standort
