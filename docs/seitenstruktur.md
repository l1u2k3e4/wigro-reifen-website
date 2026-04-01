# WIGRO Reifen — Seitenstruktur & Sales-Dramaturgie

> **Erstellt:** 2026-03-31 | **Basis für:** PROMPT_05–PROMPT_06
> **Prinzip:** Jede Seite folgt der AIDA-Logik (Attention → Interest → Desire → Action)

---

## Routing-Übersicht

```
/ .............. Startseite (Home)
/leistungen .... Leistungsübersicht mit Details
/team .......... Team & Über uns
/kontakt ....... Kontakt, Formular, Karte
/impressum ..... Impressum (§5 TMG)
/datenschutz ... Datenschutzerklärung (DSGVO)
```

---

## 1. Startseite `/`

**Ziel:** Sofortiges Vertrauen → Anruf oder WhatsApp

**Dramaturgie:** Besucher kommt skeptisch. Hook mit 4,8/5 Stars. Zeige was wir machen. Beweise Vertrauen mit echten Reviews. Zeige echte Menschen. Mach den nächsten Schritt einfach.

```
┌─────────────────────────────────────────────────┐
│ 1. NAVIGATION (sticky)                          │
│    Logo | Links: Startseite, Leistungen,        │
│    Team, Kontakt | CTA: "Jetzt anrufen"         │
├─────────────────────────────────────────────────┤
│ 2. HERO                                         │
│    Badge: "4,8 / 5 Sterne — 300+ Bewertungen"  │
│    H1: "Ihr Reifenhändler in Witten"            │
│    Subline: Reifenwechsel, Einlagerung,         │
│    Rädermontage — schnell, sauber, fair         │
│    CTA 1: 📞 Jetzt anrufen: 02302 54951        │
│    CTA 2: 💬 WhatsApp Nachricht                 │
│    Hintergrundbild: Werkstatt.01.jpeg           │
├─────────────────────────────────────────────────┤
│ 3. LEISTUNGEN-ÜBERSICHT (6 Cards)               │
│    H2: "Was wir für Sie tun"                    │
│    Icons + Titel + kurze Beschreibung           │
│    → Link zu /leistungen#{id}                   │
├─────────────────────────────────────────────────┤
│ 4. WARUM WIGRO (3 USPs)                         │
│    H2: "Warum WIGRO?"                           │
│    USP 1: Persönlich & familiär                 │
│    USP 2: Qualität ohne Kompromisse             │
│    USP 3: Faire, transparente Preise            │
├─────────────────────────────────────────────────┤
│ 5. KUNDENSTIMMEN (Karussell)                    │
│    H2: "Was unsere Kunden sagen"                │
│    Rating: ⭐ 4,8 / 5 — über 300 Bewertungen   │
│    3 Zitate mit Name + Sterne                   │
│    Link: "Alle Bewertungen auf Google"          │
├─────────────────────────────────────────────────┤
│ 6. PARTNER-LOGOS                                │
│    H2: "Unsere Markenpartner"                   │
│    Logos: Hankook, Michelin, Continental,       │
│    Nexen, Nokian — horizontal scrollend         │
├─────────────────────────────────────────────────┤
│ 7. TEAM-TEASER                                  │
│    H2: "Das Team hinter WIGRO"                  │
│    Gruppenfoto (Team.01.jpeg)                   │
│    Subline + CTA: "Team kennenlernen"           │
├─────────────────────────────────────────────────┤
│ 8. ANFAHRT                                      │
│    H2: "So finden Sie uns"                      │
│    Google Maps Embed (links)                    │
│    Adresse, Telefon, E-Mail,                    │
│    Öffnungszeiten, Parkplatz-Info (rechts)      │
├─────────────────────────────────────────────────┤
│ 9. CTA-SECTION (finaler Abschluss)              │
│    H2: "Reifen wechseln lassen..."              │
│    CTA 1 + CTA 2 + Öffnungszeiten-Note         │
├─────────────────────────────────────────────────┤
│ 10. FOOTER                                      │
│     Firma, Adresse, Links, Copyright            │
└─────────────────────────────────────────────────┘

Mobile: Sticky CTA-Bar nach 30% Scroll
(Anrufen | WhatsApp)
```

**Keywords auf dieser Seite:**
- H1: "Reifenhändler Witten"
- H2s: "Reifenwechsel", "Reifeneinlagerung" (in Leistungen-Cards)
- JSON-LD: LocalBusiness + AutoRepair

---

## 2. Leistungen `/leistungen`

**Ziel:** Informieren → Vertrauen aufbauen → Anruf

**Dramaturgie:** Besucher sucht spezifischen Service. Klarer Überblick, dann Detail pro Leistung. Nach jedem Service ein CTA. Seite endet mit starkem CTA-Block.

```
┌─────────────────────────────────────────────────┐
│ 1. NAVIGATION                                   │
├─────────────────────────────────────────────────┤
│ 2. HERO                                         │
│    H1: "Unsere Leistungen — Reifenservice       │
│    in Witten"                                   │
│    Subline: professionell, aus einer Hand       │
├─────────────────────────────────────────────────┤
│ 3. LEISTUNG: REIFENWECHSEL (#reifenwechsel)     │
│    H2: "Reifenwechsel in Witten"               │
│    Intro-Text (SEO-optimiert)                   │
│    Vorteile-Liste (5 Punkte)                    │
│    Hinweis (Faustregel O bis O)                 │
│    CTA: "Termin vereinbaren"                    │
├─────────────────────────────────────────────────┤
│ 4. LEISTUNG: REIFENEINLAGERUNG                  │
│    (#reifeneinlagerung)                         │
│    H2, Intro, Vorteile, Hinweis, CTA           │
├─────────────────────────────────────────────────┤
│ 5. LEISTUNG: RÄDERMONTAGE (#raedermontage)      │
│    H2, Intro, Vorteile, Hinweis, CTA           │
├─────────────────────────────────────────────────┤
│ 6. LEISTUNG: FELGENREINIGUNG (#felgenreinigung) │
│    H2, Intro, Vorteile, Hinweis, CTA           │
├─────────────────────────────────────────────────┤
│ 7. LEISTUNG: REIFENBERATUNG (#reifenberatung)  │
│    H2, Intro, Vorteile, Hinweis, CTA           │
├─────────────────────────────────────────────────┤
│ 8. LEISTUNG: PROFILTIEFENMESSUNG (#profiltiefe) │
│    H2, Intro, Vorteile, Hinweis, CTA           │
├─────────────────────────────────────────────────┤
│ 9. FAQ (10 Fragen)                              │
│    H2: "Häufig gestellte Fragen"               │
│    Accordion-Format                             │
├─────────────────────────────────────────────────┤
│ 10. CTA-SECTION                                 │
│     Telefon + WhatsApp + Öffnungszeiten         │
├─────────────────────────────────────────────────┤
│ 11. FOOTER                                      │
└─────────────────────────────────────────────────┘
```

**Keywords auf dieser Seite:**
- H1: "Reifenservice Witten"
- H2s: "Reifenwechsel Witten", "Reifeneinlagerung Witten", etc.
- JSON-LD: Service (je Leistung), FAQPage

---

## 3. Team `/team`

**Ziel:** Vertrauen durch echte Menschen → Hemmschwelle senken → Kontakt

**Dramaturgie:** "Wer steht hinter WIGRO?" Der Besucher will wissen, mit wem er es zu tun hat. Persönlichkeit zeigen — echter Text, echte Fotos. Kein Corporate-Sprech.

```
┌─────────────────────────────────────────────────┐
│ 1. NAVIGATION                                   │
├─────────────────────────────────────────────────┤
│ 2. HERO                                         │
│    H1: "Ihr Team bei WIGRO Reifen Witten"       │
│    Subline: echtes Handwerk, echte Menschen     │
├─────────────────────────────────────────────────┤
│ 3. GESCHICHTE                                   │
│    H2: "Lokal verwurzelt. Seit Jahren in        │
│    Witten."                                     │
│    Text: Inhabergeführt, 4,8 Sterne, Vertrauen  │
│    Bild: Team.02.jpg (rechts)                   │
├─────────────────────────────────────────────────┤
│ 4. TEAM-GRID (7 Mitarbeiter-Cards)              │
│    H2: "Unser Team"                             │
│    3 Spalten (Desktop) / 2 Spalten (Tablet) /   │
│    1 Spalte (Mobile)                            │
│    Pro Card: Foto + Name + Rolle + Beschreibung │
│    Mario → Denise → Damian → Igor →             │
│    Lukasz → Max → Pawlo                         │
├─────────────────────────────────────────────────┤
│ 5. WERKSTATT-IMPRESSIONEN                       │
│    H2: "Unsere Werkstatt — modern und           │
│    aufgeräumt"                                  │
│    4-Bild-Grid: Werkstatt.01/02/03 + Theke      │
├─────────────────────────────────────────────────┤
│ 6. BEWERTUNGS-TEASER                            │
│    "4,8/5 Sterne — was unsere Kunden sagen"     │
│    2-3 Zitate + Google-Link                     │
├─────────────────────────────────────────────────┤
│ 7. CTA-SECTION                                  │
│    "Wir freuen uns auf Sie"                     │
│    Anrufen + Route planen                       │
├─────────────────────────────────────────────────┤
│ 8. FOOTER                                       │
└─────────────────────────────────────────────────┘
```

**Keywords auf dieser Seite:**
- H1: "Team WIGRO Reifen Witten"
- Natürliche Erwähnungen: "Reifenhändler Witten", "Reifenwechsel Witten"
- JSON-LD: LocalBusiness (Person-Array)

---

## 4. Kontakt `/kontakt`

**Ziel:** Reibungsloser Kontakt — jeder Weg möglich

**Dramaturgie:** Besucher ist bereit zu handeln. Alle Kontaktmöglichkeiten sofort sichtbar. Formular als Alternative für scheue Kunden. Karte für die Anfahrt.

```
┌─────────────────────────────────────────────────┐
│ 1. NAVIGATION                                   │
├─────────────────────────────────────────────────┤
│ 2. HERO                                         │
│    H1: "Kontakt — Wir sind für Sie da"          │
│    Subline: Anrufen, WhatsApp, vorbeikommen     │
├─────────────────────────────────────────────────┤
│ 3. KONTAKT-GRID (4 Kanäle)                      │
│    📞 Telefon: 02302 54951                      │
│    💬 WhatsApp: +49 2302 54951                  │
│    ✉️ E-Mail: info@wigro-reifen.de              │
│    📍 Adresse: Cörmannstr. 25                   │
│    Je: Icon + Label + Wert + Beschreibung + CTA │
├─────────────────────────────────────────────────┤
│ 4. ÖFFNUNGSZEITEN-BOX                           │
│    Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr                        │
│    + Hinweis für Sondertermine                  │
├─────────────────────────────────────────────────┤
│ 5. KONTAKTFORMULAR                              │
│    H2: "Nachricht schicken"                     │
│    Felder: Name*, E-Mail*, Telefon (opt.),      │
│    Nachricht*, DSGVO-Checkbox*                  │
│    Button: "Nachricht senden"                   │
│    Erfolgs- / Fehlermeldung                     │
├─────────────────────────────────────────────────┤
│ 6. ANFAHRT                                      │
│    H2: "So finden Sie uns"                      │
│    Google Maps Embed (full-width)               │
│    Adresse + Route planen Link                  │
│    Hinweis: Kostenlose Parkplätze               │
├─────────────────────────────────────────────────┤
│ 7. FOOTER                                       │
└─────────────────────────────────────────────────┘
```

**Keywords auf dieser Seite:**
- H1: "Kontakt WIGRO Reifen Witten"
- "Öffnungszeiten Witten" (suchintentional)
- JSON-LD: LocalBusiness (Kontaktdaten, Öffnungszeiten)

---

## 5. Impressum `/impressum`

**Ziel:** Rechtssicherheit (pflichtgemäß, keine Conversion-Ziele)

```
Einfache Seite:
- H1: Impressum
- Statischer Markdown-Text aus content.ts
- Keine CTAs erforderlich
- Navigation + Footer
```

---

## 6. Datenschutz `/datenschutz`

**Ziel:** DSGVO-Compliance (pflichtgemäß, keine Conversion-Ziele)

```
Einfache Seite:
- H1: Datenschutzerklärung
- Statischer Markdown-Text aus content.ts
- Navigation + Footer
```

---

## Globale UI-Elemente

### Navigation (alle Seiten)

```
Desktop:
[Logo]  Startseite | Leistungen | Team | Kontakt  [Jetzt anrufen]

Mobile:
[Logo]  [Hamburger-Icon]
→ Slide-Over von rechts mit allen Links + CTA
```

### Sticky CTA-Bar (nur Mobile, nach 30% Scroll)

```
[ 📞 Anrufen ]  [ 💬 WhatsApp ]
```

Ausblenden auf: /impressum, /datenschutz

### Chat-Widget (alle Seiten)

```
FAB rechts unten — erscheint nach 5 Sekunden
Navy #1e2d4d + Lime #c5e030
n8n Webhook-Integration
```

### Footer (alle Seiten)

```
4-spaltig (Desktop) / 2-spaltig (Tablet) / 1-spaltig (Mobile):
- Spalte 1: Logo + Slogan + Soziale Links
- Spalte 2: Navigation
- Spalte 3: Kontakt (Adresse, Telefon, E-Mail)
- Spalte 4: Öffnungszeiten + Google Maps Link

Unterzeile: Copyright | Impressum | Datenschutz
```

---

## JSON-LD Schema Übersicht

| Seite | Schema-Typen |
|---|---|
| Home | LocalBusiness, AutoRepair, Organization |
| Leistungen | Service (×6), FAQPage |
| Team | LocalBusiness (mit Employee-Array) |
| Kontakt | LocalBusiness (Kontaktdaten, OpeningHoursSpecification) |

---

## Conversion-Hierarchie

```
Primär:   Telefon (02302 54951) — sofortiger Kontakt
Sekundär: WhatsApp — niedrigschwellig, asynchron
Tertiär:  Kontaktformular — für schreibfreudige Kunden
Quartär:  E-Mail — für formelle Anfragen
```

**Regel:** Telefonieren ist das Ziel. WhatsApp ist der sanfte Einstieg.
Niemals mehr als 2 CTAs nebeneinander zeigen.

---

## Responsive Breakpoints

| Breakpoint | Breite | Verhalten |
|---|---|---|
| Mobile | < 640px | 1 Spalte, Sticky CTA-Bar |
| Tablet | 640–1024px | 2 Spalten, kein Sticky |
| Desktop | > 1024px | 3+ Spalten, Nav mit Links |
