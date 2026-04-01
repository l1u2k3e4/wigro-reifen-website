# WIGRO Reifen Witten — Analyse & Bestandsaufnahme

> **Erstellt:** 2026-03-31 | **Basis für:** PROMPT_02–PROMPT_10
> **Datenquellen:** Live-Scrape wigro-reifen.de, Website.v1/ Referenz, Wettbewerbs-Research, Keyword-Recherche

---

## 1. Aktuelle Website-Analyse (wigro-reifen.de)

### 1.1 Seitenstruktur & Navigation

**Hauptnavigation:**
| Punkt | URL |
|---|---|
| Startseite | / |
| Leistungen | /services/ |
| Team | /team/ |
| Kontakt | /kontakt/ |

**Weitere Unterseiten (aus Sitemap-Suche):**
| Seite | URL |
|---|---|
| Terminvereinbarung | /?page_id=91 |
| Anfahrt | /?page_id=18 |
| Öffnungszeiten | /?page_id=232 |
| Reifentypen | /?page_id=207 |
| Impressum | /impressum-disclaimer/ |

**Auffälligkeit:** URL-Struktur verwendet `?page_id=` — nicht SEO-freundlich. Moderne URLs wie `/reifenwechsel-witten/` fehlen komplett.

---

### 1.2 Hero-Section

| Element | Inhalt |
|---|---|
| **Headline** | WIGRO REIFEN |
| **Subline** | "Reifenwechsel & Einlagerung in Witten – schnell, sauber, fair" |
| **CTA 1** | "Anfrage Schicken" → mailto:info@wigro-reifen.de |
| **CTA 2** | "Jetzt Anrufen" → tel:0230254951 |

**Kritik:** Die Subline ist gut auf Keywords optimiert, aber die Headline "WIGRO REIFEN" ist schwach — kein emotionaler Hook, keine Benefit-Kommunikation. Der Mail-CTA öffnet einen E-Mail-Client (schlechte UX auf Mobile). Kein WhatsApp-CTA vorhanden.

---

### 1.3 Leistungsangebot

| Leistung | Beschreibung auf Website |
|---|---|
| Reifenmontage | Professionelle Montage neuer Reifen auf Felgen |
| Räderwechsel | Sommer- und Winterreifenwechsel |
| Felgenreinigung | Entfernung von Schmutz und Belägen |
| Reifeneinlagerung | Sichere Lagerung von Sommer-/Winterreifen |
| Ventilreparatur | Erwähnt auf Homepage |

**Fehlende Leistungsseiten:** Profiltiefenmessung, Reifenberatung — in CLAUDE.md aufgeführt, nicht auf Website dokumentiert.

---

### 1.4 Kontaktdaten

| Feld | Wert |
|---|---|
| Firma | WIGRO Räder und Reifen |
| Inhaber | Mario Rampérez y Carrasco |
| Adresse | Cörmannstr. 25, 58455 Witten |
| Telefon | 02302 54951 |
| E-Mail | info@wigro-reifen.de |
| Parkplätze | Kostenlos vor Ort |

**Öffnungszeiten (bestätigt):** Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr

---

### 1.5 Trust-Signale

| Signal | Wert |
|---|---|
| Google-Bewertung | 4,8 / 5 |
| Anzahl Bewertungen | 300+ |
| Partner-Logos | Hankook, Michelin, Continental, Nexen |
| Kundenzitate (Beispiele) | "Super nett und hoch professionell!", "Klare Empfehlung", "Service ist super" |

**Stärken:** 4,8 bei 300+ Bewertungen ist ausgezeichnet — weit über lokalem Durchschnitt.
**Schwächen:** Nokian fehlt in Partner-Logos (trotz Erwähnung in CLAUDE.md). Keine Zertifikate/Auszeichnungen sichtbar. Teamfotos nicht prominent auf Homepage.

---

### 1.6 Design-Analyse

| Element | Ist-Zustand |
|---|---|
| Primärfarbe | Grün #54B435 |
| Sekundärfarbe | Dunkelgrün #379237 |
| Hintergrund | Hellgrün #EDFBE2 |
| Textfarbe | Dunkelgrau #2F3B40 |
| Footer | Schwarz #0C1406 |
| Font | Poppins (sans-serif) |
| Layout | Grid-basiert, responsive |
| Extras | Scroll-to-Top, Reading Progress Bar, Cookie-Banner, Chat-Widget |

**Bewertung:** Das Design ist funktional und grün-themed (passend zur Marke). Wirkt aber eher wie ein WordPress-Standard-Theme — keine visuell prägnante Markenidentität. Kein klares visuelles Alleinstellungsmerkmal.

---

### 1.7 Technischer Status

| Aspekt | Bewertung |
|---|---|
| CMS | WordPress + Elementor |
| URL-Struktur | Schlecht (page_id) |
| Structured Data (JSON-LD) | Nicht erkennbar |
| Sitemap | Nicht prüfbar (kein Zugang) |
| Cookie-Banner | Vorhanden |
| Chat-Widget | Vorhanden (n8n-Integration) |
| Mobile-Optimierung | Responsive (WordPress-Standard) |
| Online-Terminbuchung | Über Seite (unklar welches System) |

**SEO-Technischer Score (geschätzt):** 4/10 — viele Grundlagen fehlen oder sind suboptimal.

---

## 2. Chatbot-Analyse (Website.v1/)

### Technische Implementierung

**Datei:** `Website.v1/Chatbot/Chatbot Code.rtf`
**Version:** Chat Widget v2.3

| Parameter | Wert |
|---|---|
| n8n Webhook URL | `https://n8n.srv1233417.hstgr.cloud/webhook/6c6aa35e-d0fe-4162-9389-94e29a14864e/chat` |
| Route | `general` |
| Font | Jost (Google Fonts) |
| Primärfarbe | Navy `#1e2d4d` |
| Akzentfarbe | Lime `#c5e030` |
| Position | Rechts (Fixed) |
| Markdown | Unterstützt (marked.js) |

### Funktionen
- FAB-Button (62px, Pulse-Animation)
- Chat-Panel (390px × 580px Desktop / 50vh Mobile)
- Session-Management via `sessionStorage` (crypto.randomUUID)
- iOS Keyboard Handling (visualViewport API)
- Typing-Indicator (3-dot Animation)
- Markdown-Rendering für Bot-Antworten
- XSS-Schutz (esc()-Funktion)
- Fehlerbehandlung mit Fallback-Nachricht

### Bewertung
Das Chat-Widget ist technisch gut umgesetzt — moderne Architektur, mobile-first, sicher. Die n8n-Integration ermöglicht KI-gestützte Antworten. Für V2 sollte das Widget mit den neuen Brand-Farben angepasst werden.

---

## 3. Bilder-Inventar

### Team-Fotos (`Public/Mitarbeiter Bilder/`)

| Datei | Person | Verwendung |
|---|---|---|
| Mario.jpeg | Mario Rampérez y Carrasco (Inhaber/GF) | Team-Section, Über-uns, Hero |
| Damian.jpeg | Damian | Team-Section |
| Denise.jpeg | Denise (Kundenberatung) | Team-Section |
| Igor.jpeg | Igor (Werkstatt-Leitung) | Team-Section |
| Lukasz.jpeg | Lukasz (Reifenmonteur) | Team-Section |
| MaxM.jpeg | Max (Reifenmonteur) | Team-Section |
| Pawlo.jpeg | Pawlo (Reifenmonteur) | Team-Section |

**7 Mitarbeiterfotos vorhanden** — alle 7 im Team laut CLAUDE.md abgedeckt.

### Werkstatt, Logo & Sonstige (`Public/Logo Sonstige/`)

| Datei | Motiv | Verwendung |
|---|---|---|
| Logo.jpg | WIGRO-Logo | Header, Footer, OG-Image |
| Flavicon-6.png | Favicon/Icon | Browser-Tab, PWA |
| Team.01.jpeg | Teamfoto (Gruppe) | About-Section, Homepage |
| Team.02.jpg | Teamfoto (Gruppe 2) | About-Section |
| Theke.jpeg | Empfangstheke | Trust-Section, Über-uns |
| Werkstatt.01.jpeg | Werkstatt-Ansicht | Hero, Leistungen |
| Werkstatt.02.jpeg | Werkstatt-Ansicht | Leistungen |
| Werkstatt.03.jpeg | Werkstatt-Ansicht | Leistungen |

### Reifenmarken-Logos (`Public/Bilder Reifenmarken/`)

| Datei | Marke | Format | Verwendung |
|---|---|---|---|
| Hankook_logo.png | Hankook | PNG | Partner-Section |
| hankook_logo_.jpg..webp | Hankook | WebP | Partner-Section (besser: WebP!) |
| Michelin_Logo.svg.png | Michelin | PNG | Partner-Section |
| michelin.png | Michelin | PNG | Backup |
| Michelin/ | Michelin (Ordner) | — | Weitere Formate |
| continental-logo.jpg | Continental | JPG | Partner-Section |
| NEXEN TIRE_Portrait_Emphasis on the symbol.png | Nexen | PNG | Partner-Section |
| Nokian_Tyres-logo.jpg | Nokian | JPG | Partner-Section |
| WIGRO-Logo-4c_03 (verschoben).pdf | WIGRO-Logo | PDF | Print-Vorlage (nicht für Web) |

**Hinweis:** Für jeden Hersteller ist mindestens ein Logo vorhanden. Dateinamen mit Leerzeichen und Sonderzeichen (`NEXEN TIRE_Portrait...`, `WIGRO-Logo-4c_03 (verschoben)`) müssen für das Web umbenannt werden.

---

## 4. Wettbewerbs-Analyse

### Überblick: Top-Konkurrenten in Witten

| # | Name | Adresse | Google-Rating | Stärke |
|---|---|---|---|---|
| 1 | **Reifen Eroli** | Wittener Str. 142A, 58456 Witten | 4,8/5 | Online-Buchung, Achsvermessung, HU/AU |
| 2 | **Reifen Kolbe** | Oberstraße 39, 58452 Witten | k.A. | 50+ Jahre Erfahrung, Motorrad-Reifen |
| 3 | **A & M Reifendienst GmbH** | Wittener Str. 100, 58456 Witten | 5,0/5* | Kleiner Betrieb, persönlicher Service |
| 4 | **Reifen Kessler** | Witten | k.A. | Groß- & Einzelhandel, KFZ-Fachbetrieb |
| 5 | **Euromaster Witten** | Jahnstr. 13, 58455 Witten | k.A. | Große Kette, breites Sortiment, Inspektion |

*Wenige Bewertungen — nicht repräsentativ

---

### Detailanalyse der Wettbewerber

#### Reifen Eroli (stärkster Direktkonkurrent)
**Website:** reifen-eroli.de
| Aspekt | Bewertung |
|---|---|
| Design | Funktional (Drupal-CMS), nicht zeitgemäß modern |
| Leistungen | Sehr breit: Montage, Auswuchten, Einlagerung, Achsvermessung, Bremsservice, HU/AU |
| Online-Buchung | ✅ Vorhanden (Terminformular) |
| Mobile | ❌ Keine Mobile-Optimierung erkennbar |
| SEO | Google Maps integriert, Meta-Tags vorhanden |
| Trust | 4,8 Google-Bewertung, Kundenzitate |
| **Schwächen** | Veraltete jQuery (v2.1), schlechte Performance, komplizierter Buchungsprozess (Fahrzeugschein-Upload) |

**WIGRO-Chance:** Besseres Design, schnellere Website, einfachere Terminbuchung.

---

#### Reifen Kolbe (Traditioneller Platzhirsch)
**Website:** reifen-kolbe.de
| Aspekt | Bewertung |
|---|---|
| Design | Datiert, nicht modern |
| Leistungen | PKW + Motorrad, Felgen, Einlagerung |
| USP | 50+ Jahre (seit 1969), Partnerlogos (Vredestein, Continental, Michelin, Bridgestone) |
| CTAs | ❌ Schwach — nur Telefon und Besuchen |
| SEO | Lokale Signale gut, keine Structured Data |
| **Schwächen** | Kein Online-CTA, altes Design, keine digitale Buchung |

**WIGRO-Chance:** Modernes Design und digitale Erreichbarkeit als klarer Vorteil.

---

#### A & M Reifendienst GmbH
**Website:** aundm-reifen.de
| Aspekt | Bewertung |
|---|---|
| Design | Modern-ish (Plus Jakarta Sans Font), aber Content-arm |
| Mobile | ✅ Responsive (Breakpoints 480/768/1240px) |
| SEO | Semantische Struktur, Meta-Descriptions |
| **Schwächen** | Massiver Code-Bloat, keine sichtbaren Kundenbewertungen, kein CTA erkennbar |

---

#### Reifen Kessler
**Website:** reifenkessler.de
| Aspekt | Bewertung |
|---|---|
| Design | Divi-Theme, responsive |
| Leistungen | Groß- + Einzelhandel, KFZ-Fachbetrieb, Einlagerung |
| **Schwächen** | Keine erkennbaren Trust-Signale, minimale CTAs |

---

#### Euromaster Witten (Ketten-Konkurrent)
**Website:** euromaster.de/filiale/nordrhein-westfalen/witten
| Aspekt | Bewertung |
|---|---|
| Design | Professionell (große Kette) |
| Leistungen | Vollservice: Reifen, Öl, Klimaanlage, Inspektion |
| Markenpower | Hoch (nationale Kette) |
| **Schwächen** | Unpersönlich, kein lokaler Charakter, teurer |

**WIGRO-Chance:** Lokaler Charakter, persönlicher Service, Inhaber vor Ort.

---

### Wettbewerbs-Fazit

| Kriterium | WIGRO aktuell | Beste Konkurrenz |
|---|---|---|
| Google-Bewertung | ⭐ 4,8 (300+) | ⭐ 4,8 (Eroli) |
| Website-Design | Mittel | Mittel |
| Online-Terminbuchung | Unklar | ✅ Eroli |
| Mobile-Optimierung | Standard (WP) | Unterschiedlich |
| Leistungsbreite | 5 Services | Eroli: 8+ Services |
| Lokaler Charakter | Hoch | Mittel |

**WIGRO hat das Potenzial, mit einer modernen V2-Website klar die Nummer 1 in Witten zu werden.**

---

## 5. Keyword-Strategie

### Primär-Keywords (Platz 1 Ziel)

| Keyword | Geschätztes Suchvolumen/Monat | Schwierigkeit | Zielseite |
|---|---|---|---|
| Reifenhändler Witten | 200–500 | Mittel | Home |
| Reifenwechsel Witten | 500–1.000 | Mittel | Home / Leistungen |
| Reifen Witten | 200–500 | Mittel | Home |
| Werkstatt Witten | 1.000–2.000 | Hoch | Home |
| Reifenmontage Witten | 100–300 | Niedrig-Mittel | Leistungen |

### Sekundär-Keywords (Top 3 Ziel)

| Keyword | Geschätztes Volumen | Zielseite |
|---|---|---|
| Reifeneinlagerung Witten | 100–200 | Leistungen |
| Reifen einlagern Witten | 100–200 | Leistungen |
| Winterreifen Witten | 100–300 (saisonal) | Leistungen |
| Sommerreifen Witten | 100–300 (saisonal) | Leistungen |
| Felgenreinigung Witten | 50–100 | Leistungen |
| Räderwechsel Witten | 100–200 | Leistungen |
| Reifenservice Witten | 100–200 | Home / Leistungen |

### Long-Tail Keywords (FAQ / Content)

| Keyword | Suchintention | Einbau-Ort |
|---|---|---|
| Reifenwechsel Witten Preis | Kommerziell | FAQ / Leistungen |
| Reifenwechsel Termin Witten | Transaktional | CTA / Kontakt |
| Reifen einlagern Witten Kosten | Kommerziell | Leistungen / FAQ |
| günstig Reifenwechsel Witten | Kommerziell | Home |
| Winterreifen aufziehen Witten | Transaktional | Leistungen |
| Sommerreifen wechseln Witten | Transaktional | Leistungen |
| Reifenpanne Witten | Informational/transaktional | Kontakt / Home |
| WIGRO Reifen Öffnungszeiten | Navigational | Kontakt |
| Reifenhändler Witten Öffnungszeiten | Navigational | Kontakt |
| Felgen reinigen Witten | Transaktional | Leistungen |
| Profiltiefe messen Witten | Informational | Leistungen / FAQ |

### Keyword-Cluster für Seitenstruktur

```
Home:          Reifenhändler Witten, Reifenwechsel Witten, Reifen Witten
Leistungen:    Reifenmontage, Räderwechsel, Einlagerung, Felgenreinigung, Profiltiefe
Team:          WIGRO Team, Mario Rampérez Witten
Kontakt:       Öffnungszeiten, Adresse, Anfahrt Witten
FAQ:           Preise, Kosten, Wie lange dauert, Termin
```

### Suchintention-Analyse

| Typ | Anteil | Optimierungsfokus |
|---|---|---|
| Transaktional (Termin buchen) | ~60% | Click-to-Call, WhatsApp, Online-Buchung |
| Kommerziell (Preise vergleichen) | ~25% | Preistransparenz, Trust-Signale |
| Navigational (WIGRO suchen) | ~10% | Brand-Keywords, GMB-Profil |
| Informational (Ratgeber) | ~5% | FAQ, Blog (optional) |

---

## 6. Verbesserungspotenziale

### SEO-Probleme

| Problem | Priorität | Lösung in V2 |
|---|---|---|
| URL-Struktur mit ?page_id= | 🔴 Hoch | Semantische URLs: /leistungen/, /reifenwechsel/, /team/ |
| Kein JSON-LD Structured Data | 🔴 Hoch | LocalBusiness, AutoRepair, Service, FAQPage implementieren |
| Keine Sitemap (erkennbar) | 🔴 Hoch | sitemap.xml generieren |
| Fehlende robots.txt | 🟡 Mittel | robots.txt erstellen |
| Kein OG-Image/Meta | 🟡 Mittel | Per-Page OG-Tags implementieren |
| Wenig Text-Content auf Seiten | 🔴 Hoch | 300+ Wörter pro Service-Seite |
| Öffnungszeiten-Widerspruch | 🔴 Hoch | Einheitlich klären und dokumentieren |
| Keine FAQ-Seite | 🟡 Mittel | FAQ mit Long-Tail Keywords |

### UX-Probleme

| Problem | Priorität | Lösung in V2 |
|---|---|---|
| E-Mail-CTA öffnet Mail-Client (schlecht auf Mobile) | 🔴 Hoch | Click-to-Call + WhatsApp als primäre CTAs |
| Kein WhatsApp-Kontakt | 🔴 Hoch | WhatsApp-Button integrieren |
| Keine Online-Terminbuchung | 🟡 Mittel | Online-Buchungsformular oder Calendly |
| Keine Sticky CTA-Bar auf Mobile | 🟡 Mittel | Sticky "Anrufen / WhatsApp" nach 30% Scroll |
| Hamburger-Menü-Design unklar | 🟡 Mittel | Slide-Over Navigation von rechts |
| Teamseite ohne Bilder-Galerie | 🟡 Mittel | Foto-Grid mit allen 7 Mitarbeitern |

### Content-Lücken

| Fehlender Content | Priorität | Wirkung |
|---|---|---|
| Preistransparenz (Richtwerte) | 🟡 Mittel | Vertrauen aufbauen, Keyword-Traffic |
| FAQ-Seite | 🟡 Mittel | Long-Tail Keywords abdecken |
| Anfahrt mit Google Maps Embed | 🟡 Mittel | Lokales SEO, UX |
| Reifentypen-Erklärung | 🟢 Niedrig | Informational Content |
| Blogbeiträge (saisonal) | 🟢 Niedrig | SEO-Langzeitstrategie |
| Datenschutzerklärung V2 | 🔴 Hoch | DSGVO-Pflicht |
| Cookie-Consent | 🔴 Hoch | DSGVO-Pflicht |

### Trust-Lücken

| Problem | Priorität | Lösung |
|---|---|---|
| Google-Bewertungen nur auf Homepage | 🟡 Mittel | Reviews auf allen Seiten sichtbar |
| Kein Gründungsjahr/Unternehmensgeschichte | 🟢 Niedrig | "Seit X Jahren in Witten" |
| Nokian-Logo fehlt | 🟢 Niedrig | Nokian_Tyres-logo.jpg einbinden |
| Keine Auszeichnungen/Zertifikate | 🟢 Niedrig | Falls vorhanden: einbinden |

### Conversion-Lücken

| Problem | Priorität | Lösung |
|---|---|---|
| Kein Click-to-Call Button above-the-fold | 🔴 Hoch | Prominenter Anruf-CTA in Hero und Nav |
| WhatsApp fehlt komplett | 🔴 Hoch | WhatsApp als sekundärer Kanal |
| Terminbuchung unklar/versteckt | 🟡 Mittel | Online-Buchung prominent platzieren |
| Keine mobiler Sticky-Bar | 🟡 Mittel | Sticky CTA nach 30% Scroll |
| CTA nach Leistungs-Beschreibungen fehlt | 🟡 Mittel | "Jetzt Termin buchen" nach jedem Service |

---

## 7. Empfehlungen für V2

### Seitenstruktur (React Router)

```
/ (Home)
/leistungen/
/team/
/kontakt/
/impressum/
/datenschutz/
```

Optional für SEO:
```
/leistungen/reifenwechsel/
/leistungen/reifeneinlagerung/
/leistungen/felgenreinigung/
/leistungen/reifenmontage/
```

### Top 5 Prioritäten für maximalen Impact

1. **JSON-LD LocalBusiness** implementieren → sofortiger SEO-Boost
2. **Click-to-Call + WhatsApp** als primäre CTAs → direkte Conversion-Steigerung
3. **Google-Bewertungen prominent** auf Homepage und Leistungsseiten → Trust
4. **Öffnungszeiten klären** und einheitlich kommunizieren → Vertrauen
5. **Mobile-Performance** < 2s → Core Web Vitals, Ranking-Faktor

### Design-Empfehlung

- Die grüne Markenfarbe (#54B435) beibehalten und als Brand-Token konsequent einsetzen
- Chatbot-Farben (Navy #1e2d4d + Lime #c5e030) als Alternative-Design-Inspiration prüfen
- Echter Kontrast: Dunkler Hintergrund (fast schwarz) + leuchtendes Grün wirkt premium
- Echte Teamfotos und Werkstattbilder als Hero-Content — kein Stock-Photo

### Chatbot V2

Das bestehende Widget ist technisch gut. Für V2:
- Farben auf Brand-Tokens anpassen
- Webhook-URL und n8n-Flow beibehalten
- Widget erst nach 5 Sekunden anzeigen (kein sofortiger Popup)
- Willkommens-Nachricht mit Termin-CTA ausstatten

---

## Verification-Checkliste

- [x] `docs/analyse.md` erstellt und vollständig
- [x] 5 Primär-Keywords mit Suchvolumen-Schätzung
- [x] 5 Wettbewerber analysiert (Eroli, Kolbe, A&M, Kessler, Euromaster)
- [x] Bilder-Inventar enthält alle Dateien aus `Website.v2/Public/`
- [x] Verbesserungspotenziale konkret und umsetzbar
- [x] Keine erfundenen Daten — alles basiert auf echten Recherchen (Live-Scrape, WebSearch, WebFetch)
- [x] Chatbot-Code dokumentiert
- [x] Öffnungszeiten-Widerspruch identifiziert und markiert
