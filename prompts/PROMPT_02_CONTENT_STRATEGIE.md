# PROMPT_02: Content-Strategie & Texterstellung

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/website-content-strategie` — Seitenstruktur, Dramaturgie, Copywriting, content.ts Generierung
- `/wigro-reifen` — Geschäftsdaten, Leistungen, Preise, Team

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**
**Lies `docs/analyse.md` für die Bestandsaufnahme und Keyword-Strategie.**

---

## Ziel

Am Ende existiert eine vollständige `src/data/content.ts` Datei mit ALLEN Texten für die gesamte Website — keine Platzhalter, keine "[Text hier]"-Stellen. Zusätzlich eine dokumentierte Seitenstruktur mit Sales-Dramaturgie.

---

## Kontext

WIGRO Reifen ist ein Familienbetrieb in Witten mit 7 Mitarbeitern, 4,8/5 Google-Bewertung (300+ Reviews), und Partnerschaften mit Hankook, Michelin, Continental, Nexen, Nokian. Die Website muss gleichzeitig lokal vertrauenswürdig UND conversion-optimiert sein — kein aggressiver Sales-Ton, aber klare Handlungsaufforderungen.

### Tonalität

- **Seriös aber nahbar** — Familienbetrieb, kein Konzern
- **Siezen** — professionell, respektvoll
- **Konkret** — Zahlen, Fakten, keine Marketing-Floskeln
- **Lokal stolz** — Witten als Heimat, Einzugsgebiet betonen

---

## Aufgaben

### 1. Seitenstruktur mit Dramaturgie definieren

Die Website hat folgende Seiten (Multi-Page mit React Router):

#### Startseite (Home)
```
1. Navigation (sticky)
2. Hero — Headline + Subline + Dual CTA (Anrufen + WhatsApp) + Trust-Signal (4,8/5)
3. Leistungen-Übersicht — 4-6 Service-Cards mit Icons
4. Warum WIGRO — 3 USPs (Erfahrung, Qualität, Fairness)
5. Kundenstimmen — Google-Bewertungen Karussell
6. Partner — Reifenmarken-Logos
7. Team-Teaser — Gruppenfoto + "Lernen Sie uns kennen" Link
8. Anfahrt — Google Maps + Adresse + Öffnungszeiten
9. CTA-Section — Finaler Call-to-Action
10. Footer
```

#### Leistungen
```
1. Hero — Leistungen-Übersicht Headline
2. Reifenwechsel — Detail + Vorteile
3. Reifeneinlagerung — Detail + Vorteile
4. Rädermontage — Detail + Vorteile
5. Felgenreinigung — Detail + Vorteile
6. Reifenberatung — Detail + Vorteile
7. CTA-Section
8. Footer
```

#### Team (Über uns)
```
1. Hero — "Ihr Team bei WIGRO"
2. Geschichte — Über den Betrieb, Tradition, Werte
3. Team-Grid — Einzelne Mitarbeiter-Karten mit Foto + Name + Rolle
4. Werkstatt-Impressionen — Bilder der Werkstatt
5. CTA-Section
6. Footer
```

#### Kontakt
```
1. Hero — Kontaktmöglichkeiten
2. Kontakt-Grid — Telefon, WhatsApp, E-Mail, Öffnungszeiten
3. Kontaktformular — Name, E-Mail, Telefon, Nachricht, DSGVO-Checkbox
4. Anfahrt — Google Maps + Routenplaner-Link
5. Footer
```

#### Impressum
Vollständiges Impressum nach §5 TMG

#### Datenschutzerklärung
Vollständig nach DSGVO Art. 13

### 2. Alle Texte schreiben

Schreibe ALLE Texte für jede Section. Verwende dabei:
- Keywords aus der Keyword-Strategie (docs/analyse.md)
- Echte WIGRO-Daten (Bewertungen, Kontakt, Team)
- Konkrete, spezifische Formulierungen (keine Floskeln)

### 3. content.ts erstellen

Generiere die vollständige Content-Datei nach diesem Pattern:

```typescript
// src/data/content.ts

export const COPY = {
  meta: {
    siteName: 'WIGRO Reifen',
    defaultTitle: 'Reifenhändler Witten | WIGRO Räder und Reifen — Reifenwechsel & Einlagerung',
    defaultDescription: 'Ihr Reifenhändler in Witten: Reifenwechsel, Einlagerung, Rädermontage & Felgenreinigung. 4,8/5 Sterne bei 300+ Google-Bewertungen. Jetzt Termin vereinbaren!',
    ogImage: '/og-image.jpg',
  },
  nav: {
    links: [
      { label: 'Startseite', href: '/' },
      { label: 'Leistungen', href: '/leistungen' },
      { label: 'Team', href: '/team' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
    cta: { label: 'Jetzt anrufen', href: 'tel:0230254951' },
  },
  hero: {
    headline: '...',
    subline: '...',
    ctaPrimary: { label: '...', href: '...' },
    ctaSecondary: { label: '...', href: '...' },
    trustSignal: '...',
  },
  // ... ALLE weiteren Sections
} as const;
```

### 4. SEO-Texte pro Seite

Für jede Seite definiere:
- **Title-Tag** (< 60 Zeichen, Keyword am Anfang)
- **Meta-Description** (150-160 Zeichen, Keyword, CTA am Ende)
- **H1** (unique, Keyword enthalten)
- **Erster Absatz** (Keyword natürlich eingebaut)

### 5. FAQ-Inhalte erstellen

Schreibe 8-10 echte FAQ-Einträge die reale Kundenfragen beantworten:
- Wann sollte ich Reifen wechseln?
- Was kostet Reifeneinlagerung?
- Brauche ich einen Termin?
- Welche Reifenmarken führen Sie?
- Wie finde ich die richtige Reifengröße?
- etc.

---

## Erwartetes Ergebnis

1. `src/data/content.ts` — Vollständiges COPY-Objekt mit allen Texten
2. `docs/seitenstruktur.md` — Dokumentierte Seitenstruktur mit Dramaturgie pro Seite

---

## Verification

- [ ] `content.ts` kompiliert fehlerfrei (TypeScript check)
- [ ] Kein Text enthält Platzhalter wie "[...]" oder "TODO"
- [ ] Alle Kontaktdaten sind korrekt (Adresse, Telefon, E-Mail)
- [ ] Keywords aus der Analyse sind natürlich in den Texten eingebaut
- [ ] CTAs sind spezifisch ("Jetzt anrufen: 02302 54951" statt "Kontakt")
- [ ] Tonalität ist konsistent (seriös, nahbar, Sie-Form)
- [ ] FAQ beantwortet echte Kundenfragen
- [ ] Impressum-Daten sind vollständig
- [ ] `as const` am Ende des COPY-Objekts
