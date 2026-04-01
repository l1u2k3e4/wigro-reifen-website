# FIX 02 — Google-Bewertungen Link & Routenplanung Link aktualisieren

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Alle Links werden zentral in `src/data/content.ts` verwaltet (COPY-Objekt)
- Die Links werden in mehreren Components referenziert — ändere NUR die Quelle in `content.ts`

## Aufgaben

### 1. Link „Alle Bewertungen auf Google ansehen" aktualisieren

**Datei:** `src/data/content.ts`

Suche nach dem Bewertungen-CTA-Objekt (ca. Zeile 266-269):
```ts
cta: {
  label: 'Alle Bewertungen auf Google ansehen',
  href: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4447147,7.318914',
},
```

Ersetze die `href` mit:
```
https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,683m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m8!3m7!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D
```

### 2. Routenplaner-Link aktualisieren

**Datei:** `src/data/content.ts`

Es gibt ZWEI Stellen mit `routenplanerUrl` (ca. Zeile 313 und 659). Ersetze BEIDE mit:
```
https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,1365m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D
```

### 3. Optional: googleMapsUrl ebenfalls aktualisieren

Es gibt drei weitere Stellen mit `googleMapsUrl` (ca. Zeile 310, 658, 748) die noch die alte URL `https://www.google.com/maps/place/Wigro+Reifen/@51.4447147,7.318914` verwenden. Diese werden im Footer-Kontakt und in der Anfahrt-Section als allgemeiner Maps-Link verwendet. Aktualisiere auch diese auf:
```
https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,1365m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D
```

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Alle Google-Links in der gesamten App zeigen auf die neuen URLs
- Teste: „Alle Bewertungen auf Google ansehen" → öffnet Google Maps Bewertungen
- Teste: „Route planen" Button → öffnet Google Maps Routenplanung
