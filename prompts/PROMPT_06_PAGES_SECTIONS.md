# PROMPT_06: Pages & Sections zusammenbauen

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/frontend-design` — Section-Patterns, responsive Layouts, Grid-Systeme
- `/website-ux-ui-design` — Visuelle Hierarchie, CTA-Platzierung, Conversion-Design
- `/website-content-strategie` — Seitenstruktur, Sales-Dramaturgie

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**
**Lies `docs/seitenstruktur.md` für die geplante Section-Reihenfolge.**
**Lies `src/data/content.ts` für alle Texte.**

---

## Ziel

Am Ende sind alle Seiten und Sections gebaut, mit Routing verbunden, und vollständig mit Content befüllt. Die komplette Website ist navigierbar und zeigt alle Inhalte an.

---

## Kontext

Die Komponenten aus PROMPT_05 stehen bereit. Jetzt werden sie zu vollständigen Sections und Pages zusammengesetzt. Alle Texte kommen aus `content.ts`. Die Seitenstruktur folgt der in PROMPT_02 definierten Dramaturgie.

---

## Aufgaben

### 1. Sections erstellen (`src/sections/`)

Jede Section ist eine eigenständige Komponente die:
- Texte aus `@/data/content` importiert
- Framer Motion für Scroll-Animationen nutzt (`whileInView`, `viewport={{ once: true }}`)
- Responsive ist (mobile-first)
- Alternierenden Hintergrund hat (weiß / surface)
- Section-ID hat für Anchor-Links (z.B. `id="leistungen"`)

#### Startseite-Sections:

**HeroSection.tsx**
- Vollbild-Hero mit Werkstatt-Hintergrundbild (Overlay)
- Headline + Subline (über Bild)
- Dual CTA: "Jetzt anrufen" + "WhatsApp schreiben"
- Trust-Signal: Sterne + "4,8/5 bei 300+ Bewertungen"
- Scroll-Down Indicator

**LeistungenPreview.tsx**
- 4-6 ServiceCards im Grid (md:2, lg:3)
- Kurze Beschreibung pro Leistung
- Link zu /leistungen für Details
- Stagger-Animation

**WarumWIGRO.tsx**
- 3 USP-Cards (Erfahrung, Qualität, Fairness)
- Zahlen prominent (30+ Jahre, 300+ Bewertungen, 4,8/5)
- Icons + kurze Texte

**TestimonialsSection.tsx**
- Google-Bewertungen Karussell oder Grid
- 3-5 echte Kundenstimmen
- Sterne-Rating pro Testimonial
- Google-Logo + Link zur Google-Seite

**PartnerSection.tsx**
- Reifenmarken-Logos (Hankook, Michelin, Continental, Nexen, Nokian)
- Headline: "Unsere Partner"
- Grayscale → Farbe bei Hover

**TeamTeaser.tsx**
- Gruppenfoto oder 2-3 Team-Highlights
- "Lernen Sie unser Team kennen" + Link zu /team

**AnfahrtSection.tsx**
- Google Maps (mit Consent) + Adresse + Öffnungszeiten
- "Route planen" Button (Google Maps Link)
- Kostenlose Parkplätze erwähnen

**CTASection.tsx**
- Finaler Call-to-Action Block
- Starke Headline + Subtext
- Dual CTA (Anrufen + WhatsApp)
- Hintergrundfarbe: Accent oder Dark

#### Leistungen-Sections:

**LeistungenHero.tsx**
- Headline: "Unsere Leistungen"
- Kurze Einführung

**LeistungDetail.tsx** (wiederverwendbar pro Leistung)
- Props: `title`, `description`, `features[]`, `image?`, `reversed?`
- Bild + Text nebeneinander (alternierend links/rechts)
- Feature-Liste mit Checkmarks
- CTA pro Leistung

Leistungen:
1. Reifenwechsel
2. Reifeneinlagerung
3. Rädermontage
4. Felgenreinigung
5. Reifenberatung / Profiltiefenmessung

#### Team-Sections:

**TeamHero.tsx**
- "Ihr Team bei WIGRO Reifen"

**GeschichteSection.tsx**
- Über WIGRO: Tradition, Werte, lokale Verwurzelung
- Inhaber Mario vorstellen

**TeamGrid.tsx**
- Grid mit TeamCards (md:2, lg:3 oder 4)
- Jeder Mitarbeiter: Foto, Name, Rolle
- 7 Mitarbeiter: Mario, Damian, Denise, Igor, Lukasz, MaxM, Pawlo

**WerkstattSection.tsx**
- Bilder der Werkstatt (Gallery / Grid)
- Werkstatt.01, Werkstatt.02, Werkstatt.03, Theke

#### Kontakt-Sections:

**KontaktHero.tsx**
- "So erreichen Sie uns"

**KontaktGrid.tsx**
- 3-4 Kontakt-Karten: Telefon, WhatsApp, E-Mail, Besuch vor Ort
- Jede Karte mit Icon, Titel, Info, Action-Button

**KontaktFormular.tsx**
- ContactForm-Komponente eingebettet
- Öffnungszeiten daneben

**AnfahrtKontakt.tsx**
- Google Maps (mit Consent)
- Detaillierte Anfahrt
- Parkplatz-Hinweis

#### Legal-Seiten:

**ImpressumPage.tsx**
- Vollständiges Impressum nach §5 TMG
- Kein index für Suchmaschinen

**DatenschutzPage.tsx**
- Vollständige DSGVO Datenschutzerklärung
- Kein index für Suchmaschinen

### 2. Pages zusammenbauen (`src/pages/`)

Jede Page importiert ihre Sections in der richtigen Reihenfolge:

```typescript
// src/pages/Home.tsx
export default function Home() {
  return (
    <>
      <HeroSection />
      <LeistungenPreview />
      <WarumWIGRO />
      <TestimonialsSection />
      <PartnerSection />
      <TeamTeaser />
      <AnfahrtSection />
      <CTASection />
    </>
  )
}
```

### 3. App.tsx aktualisieren

Router mit allen Pages, SharedLayout (Header + Footer + StickyCTABar), ScrollToTop-Komponente (bei Route-Wechsel nach oben scrollen).

### 4. FAQ-Section

FAQ auf Startseite oder als eigene Section auf Kontakt-Seite:
- 8-10 Fragen mit Accordion
- Schema.org FAQPage Markup vorbereiten (wird in PROMPT_07 implementiert)

---

## Erwartetes Ergebnis

```
src/
├── sections/
│   ├── HeroSection.tsx
│   ├── LeistungenPreview.tsx
│   ├── WarumWIGRO.tsx
│   ├── TestimonialsSection.tsx
│   ├── PartnerSection.tsx
│   ├── TeamTeaser.tsx
│   ├── AnfahrtSection.tsx
│   ├── CTASection.tsx
│   ├── LeistungenHero.tsx
│   ├── LeistungDetail.tsx
│   ├── TeamHero.tsx
│   ├── GeschichteSection.tsx
│   ├── TeamGrid.tsx
│   ├── WerkstattSection.tsx
│   ├── KontaktHero.tsx
│   ├── KontaktGrid.tsx
│   ├── KontaktFormular.tsx
│   ├── AnfahrtKontakt.tsx
│   └── FAQSection.tsx
├── pages/
│   ├── Home.tsx
│   ├── Leistungen.tsx
│   ├── Team.tsx
│   ├── Kontakt.tsx
│   ├── Impressum.tsx
│   ├── Datenschutz.tsx
│   └── NotFound.tsx
└── App.tsx (aktualisiert)
```

---

## Verification

- [ ] `npm run build` läuft fehlerfrei
- [ ] Alle 7 Routes erreichbar und zeigen korrekte Inhalte
- [ ] Navigation zwischen Seiten funktioniert (kein Seiten-Reload)
- [ ] ScrollToTop bei Route-Wechsel
- [ ] Alle Texte kommen aus `content.ts`
- [ ] Bilder laden korrekt (Team, Werkstatt, Logos)
- [ ] Mobile-Navigation funktioniert (Hamburger → Slide-Over → Link klick → schließt)
- [ ] CTAs auf jeder Seite sichtbar
- [ ] Responsive auf 375px, 768px, 1280px getestet
- [ ] Animationen laufen smooth (60fps)
- [ ] Keine Console-Errors
