# PROMPT_07: SEO-Implementierung

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/website-seo` — Meta-Tags, JSON-LD Structured Data, Sitemap, robots.txt, Core Web Vitals
- `/seo-audit` — SEO-Audit und Optimierung bestehender Implementierung

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**
**Lies `docs/analyse.md` für Keyword-Strategie und Wettbewerbs-Analyse.**
**Lies den Sub-Agent `.claude/agents/seo-auditor.md` für Prüfkriterien.**

---

## Ziel

Am Ende ist die komplette SEO-Infrastruktur implementiert: unique Meta-Tags pro Seite, vollständiges JSON-LD Structured Data, sitemap.xml, robots.txt, semantisches HTML Audit, Open Graph Tags, und optimierte Heading-Hierarchie.

---

## Kontext

WIGRO Reifen will Platz 1 bei Google für lokale Suchbegriffe rund um Reifen und Werkstatt in Witten. Lokales SEO ist der wichtigste Ranking-Faktor. Die Website hat 6 Seiten (Home, Leistungen, Team, Kontakt, Impressum, Datenschutz).

### Ziel-Keywords

**Primär:** Reifenhändler Witten, Reifenwechsel Witten, Werkstatt Witten
**Sekundär:** Reifen einlagern Witten, Felgenreinigung Witten, Reifenservice Witten
**Long-Tail:** FAQ-Fragen, saisonale Begriffe

---

## Aufgaben

### 1. Meta-Tags pro Seite

Implementiere dynamische Meta-Tags für jede Route. Erstelle einen `useDocumentMeta` Hook oder eine `MetaTag`-Komponente:

| Seite | Title (< 60 Zeichen) | Description (150-160 Zeichen) |
|---|---|---|
| Home | Reifenhändler Witten \| WIGRO Reifen — Reifenwechsel & Service | Ihr Reifenhändler in Witten: Reifenwechsel, Einlagerung & Felgenreinigung. 4,8/5 Sterne, 300+ Bewertungen. Jetzt Termin vereinbaren! |
| Leistungen | Reifenwechsel & Einlagerung Witten \| WIGRO Reifen Leistungen | Reifenwechsel, Einlagerung, Rädermontage & Felgenreinigung in Witten. Schnell, sauber, fair. Alle Leistungen von WIGRO Reifen im Überblick. |
| Team | Unser Team \| WIGRO Reifen Witten — 7 Experten für Ihre Reifen | Lernen Sie das WIGRO-Team kennen: 7 erfahrene Mitarbeiter, persönlicher Service, familiäre Atmosphäre. Ihr Reifenspezialist in Witten. |
| Kontakt | Kontakt & Anfahrt \| WIGRO Reifen Witten — Jetzt Termin machen | WIGRO Reifen erreichen: Tel. 02302 54951, Cörmannstr. 25, 58455 Witten. Mo-So 9-17 Uhr. Kostenlose Parkplätze vor Ort. |
| Impressum | Impressum \| WIGRO Räder und Reifen Witten | `noindex, follow` |
| Datenschutz | Datenschutzerklärung \| WIGRO Räder und Reifen Witten | `noindex, follow` |

### 2. Open Graph Tags

Für jede Seite:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Page Description]" />
<meta property="og:image" content="https://wigro-reifen.de/og-image.jpg" />
<meta property="og:url" content="https://wigro-reifen.de/[path]" />
<meta property="og:locale" content="de_DE" />
<meta property="og:site_name" content="WIGRO Reifen" />
```

### 3. JSON-LD Structured Data

#### LocalBusiness + AutoRepair (Home)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair"],
  "name": "WIGRO Räder und Reifen",
  "description": "Reifenhändler und Werkstatt in Witten...",
  "url": "https://wigro-reifen.de",
  "telephone": "+49-2302-54951",
  "email": "info@wigro-reifen.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Cörmannstr. 25",
    "addressLocality": "Witten",
    "postalCode": "58455",
    "addressRegion": "NRW",
    "addressCountry": "DE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "51.4437", "longitude": "7.3350" },
  "openingHoursSpecification": [...],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "300",
    "bestRating": "5"
  },
  "sameAs": [...]
}
```

#### Service (pro Leistung)

Für jede Leistung ein eigenes Service-Schema.

#### FAQPage

Für die FAQ-Section — alle Fragen und Antworten als Schema.

### 4. Semantisches HTML Audit

Prüfe und korrigiere:
- [ ] Genau ein `<h1>` pro Seite
- [ ] Heading-Hierarchie: h1 → h2 → h3 (keine Sprünge)
- [ ] `<main>` genau einmal pro Seite
- [ ] `<nav>` für Navigation
- [ ] `<section>` mit Überschrift für thematische Blöcke
- [ ] `<footer>` für Footer
- [ ] `<address>` für Kontaktdaten
- [ ] `<html lang="de">`

### 5. sitemap.xml erstellen

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://wigro-reifen.de/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://wigro-reifen.de/leistungen</loc><priority>0.9</priority></url>
  <url><loc>https://wigro-reifen.de/team</loc><priority>0.7</priority></url>
  <url><loc>https://wigro-reifen.de/kontakt</loc><priority>0.8</priority></url>
</urlset>
```

### 6. robots.txt erstellen

```
User-agent: *
Allow: /
Disallow: /impressum
Disallow: /datenschutz

Sitemap: https://wigro-reifen.de/sitemap.xml
```

### 7. Canonical URLs

Jede Seite bekommt ein `<link rel="canonical">` Tag.

### 8. Bilder-SEO

- Alle `<img>` haben beschreibende `alt`-Tags mit Keywords
- Dateinamen optimieren (z.B. `reifenwechsel-wigro-witten.webp`)
- `width` + `height` Attribute setzen

---

## Erwartetes Ergebnis

1. Dynamische Meta-Tags pro Route
2. Open Graph Tags auf jeder Seite
3. JSON-LD: LocalBusiness, AutoRepair, Service, FAQPage, AggregateRating
4. `public/sitemap.xml`
5. `public/robots.txt`
6. Semantisches HTML verifiziert
7. Alle Bilder mit `alt`-Tags

---

## Verification

- [ ] Google Structured Data Testing Tool: Keine Fehler
- [ ] Jede Seite hat unique Title + Description
- [ ] H1-Hierarchie auf jeder Seite korrekt
- [ ] sitemap.xml enthält alle indexierbaren Seiten
- [ ] robots.txt ist korrekt konfiguriert
- [ ] Open Graph Preview zeigt korrekte Daten
- [ ] Canonical URLs auf jeder Seite gesetzt
- [ ] Alle Bilder haben alt-Tags
- [ ] Keine Keyword-Stuffing — alles liest sich natürlich
