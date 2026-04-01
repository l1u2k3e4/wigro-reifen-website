# PROMPT_01: Analyse & Bestandsaufnahme

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/wigro-reifen` — Geschäftsdaten, Preise, Öffnungszeiten, Team-Infos
- `/website-seo` — Keyword-Recherche, lokales SEO, Wettbewerbs-Analyse
- `/website-content-strategie` — Content-Extraktion, Seitenstruktur-Analyse

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**

---

## Ziel

Am Ende dieser Prompt-Ausführung existiert eine vollständige Analyse-Datei unter `docs/analyse.md`, die als Grundlage für alle weiteren Prompts dient. Sie enthält: Bestandsaufnahme der aktuellen Website, Content-Inventar, Bilder-Inventar, Wettbewerbs-Research und Keyword-Strategie.

---

## Kontext

WIGRO Reifen ist ein Reifenhändler und Werkstatt-Betrieb in Witten (NRW). Die aktuelle Website läuft auf WordPress/Elementor und soll komplett neu als Vite + React + TypeScript Projekt gebaut werden. Unter `Website.v1/` liegt ein vollständiges WordPress-Backup. Unter `Website.v2/Public/` liegen bereits aufbereitete Bilder (Team, Werkstatt, Logos, Reifenmarken).

---

## Aufgaben

### 1. Aktuelle Website analysieren

Scrape `https://wigro-reifen.de/` und dokumentiere:

- **Seitenstruktur:** Welche Seiten/Unterseiten gibt es?
- **Navigation:** Wie ist die aktuelle Menüführung?
- **Hero-Section:** Headline, Subline, CTAs
- **Leistungen:** Welche Services werden angeboten?
- **Bewertungen:** Google-Rating, Anzahl Bewertungen, Beispiel-Zitate
- **Kontaktdaten:** Adresse, Telefon, E-Mail, Öffnungszeiten
- **Trust-Signale:** Partner, Bewertungen, Erfahrung
- **Design:** Farben, Fonts, Layout-Stil
- **Technischer Status:** WordPress-Version, Ladezeit, Mobile-Friendliness

### 2. Website.v1/ Referenz sichten

Untersuche den Inhalt von `Website.v1/`:

- **Backup-Dateien:** Was ist in den ZIP/GZ-Archiven enthalten?
- **Chatbot-Code:** Dokumentiere den vorhandenen Chatbot-Code (`Chatbot/Chatbot Code.rtf`)
- **Bilder-Inventar:** Katalogisiere alle vorhandenen Bilder in `Website.v2/Public/`

### 3. Bilder-Inventar erstellen

Erstelle eine vollständige Liste aller verfügbaren Bilder:

```markdown
### Team-Fotos (Website.v2/Public/Mitarbeiter Bilder/)
| Datei | Person | Verwendung |
|---|---|---|
| Mario.jpeg | Mario (Inhaber) | Team-Section, Über-uns |
| Damian.jpeg | Damian | Team-Section |
| ... | ... | ... |

### Werkstatt-Bilder (Website.v2/Public/Logo Sonstige/)
| Datei | Motiv | Verwendung |
|---|---|---|
| Werkstatt.01.jpeg | Werkstatt-Ansicht | Hero, Leistungen |
| ... | ... | ... |

### Reifenmarken-Logos (Website.v2/Public/Bilder Reifenmarken/)
| Datei | Marke | Format |
|---|---|---|
| Hankook_logo.png | Hankook | PNG |
| ... | ... | ... |
```

### 4. Wettbewerbs-Research

Recherchiere die Top-5 Reifenhändler/Werkstätten in der Region Witten:

- **Google-Suche:** "Reifenhändler Witten", "Reifenwechsel Witten", "Werkstatt Witten"
- **Pro Wettbewerber dokumentiere:**
  - Name und Website
  - Google-Bewertung
  - Website-Qualität (Design, Speed, Mobile)
  - Stärken und Schwächen
  - Keywords für die sie ranken

### 5. Keyword-Research

Erstelle eine Keyword-Strategie für lokale Dominanz:

```markdown
### Primär-Keywords (Platz 1 Ziel)
| Keyword | Geschätztes Suchvolumen | Schwierigkeit | Zielseite |
|---|---|---|---|
| Reifenhändler Witten | ... | ... | Home |
| Reifenwechsel Witten | ... | ... | Leistungen |
| ... | ... | ... | ... |

### Sekundär-Keywords (Top 3 Ziel)
| Keyword | ... |

### Long-Tail Keywords (für FAQ/Content)
| Keyword | Suchintention | Einbau-Ort |
```

### 6. Verbesserungspotenziale identifizieren

Basierend auf der Analyse, dokumentiere:

- **SEO-Probleme** der aktuellen Website
- **UX-Probleme** (Mobile, Navigation, CTAs)
- **Content-Lücken** (fehlende Seiten, fehlende Infos)
- **Trust-Lücken** (was fehlt für mehr Vertrauen?)
- **Conversion-Lücken** (wo gehen Besucher verloren?)

---

## Erwartetes Ergebnis

Datei: `Website.v2/docs/analyse.md`

Enthält:
1. Aktuelle Website-Analyse (Inhalt, Struktur, Design, Technik)
2. Vollständiges Bilder-Inventar
3. Wettbewerbs-Analyse (Top 5 Konkurrenten)
4. Keyword-Strategie (Primär, Sekundär, Long-Tail)
5. Verbesserungspotenziale (SEO, UX, Content, Trust, Conversion)
6. Empfehlungen für die V2 (konkrete To-Dos)

---

## Verification

- [ ] `docs/analyse.md` existiert und ist vollständig
- [ ] Mindestens 5 Primär-Keywords mit Suchvolumen-Schätzung
- [ ] Mindestens 5 Wettbewerber analysiert
- [ ] Bilder-Inventar enthält alle Dateien aus `Website.v2/Public/`
- [ ] Verbesserungspotenziale sind konkret und umsetzbar
- [ ] Keine erfundenen Daten — alles basiert auf echten Recherchen
