# WIGRO Reifen Witten — Website V2

> **Diese Datei wird von Claude Code vor JEDER Aktion gelesen.**
> Sie definiert Projektkontext, Tech-Stack, Konventionen und Qualitätsziele.

---

## 1. Projektübersicht

**Kunde:** WIGRO — Räder und Reifen, Witten
**Inhaber:** Mario Rampérez y Carrasco
**Projekt:** Kompletter Website-Relaunch — von WordPress/Elementor zu einer modernen Vite + React + TypeScript Anwendung
**Ziel:** Lokale Marktdominanz in Witten & Umgebung — SEO-Platz 1 für alle relevanten Suchbegriffe, Conversion-optimiert für Anrufe, WhatsApp und Terminbuchungen

### Geschäftsdaten

| Feld | Wert |
|---|---|
| Firma | WIGRO Räder und Reifen |
| Adresse | Cörmannstr. 25, 58455 Witten |
| Telefon | 02302 54951 |
| E-Mail | info@wigro-reifen.de |
| Website | wigro-reifen.de |
| Öffnungszeiten | Mo–So 09:00–17:00 Uhr |
| Google-Bewertung | 4,8 / 5 (300+ Bewertungen) |
| Partner | Hankook, Michelin, Continental, Nexen, Nokian |

### Team

Mario (Inhaber), Damian, Denise, Igor, Lukasz, MaxM, Pawlo

### Leistungen

Reifenwechsel, Reifeneinlagerung, Rädermontage, Felgenreinigung, Reifenberatung, Profiltiefenmessung

---

## 2. Ordnerstruktur

```
Website.v2/
├── CLAUDE.md                        ← DU BIST HIER — lies mich IMMER zuerst
├── .claude/
│   └── agents/                      ← Sub-Agents für spezialisierte Reviews
│       ├── code-reviewer.md
│       ├── frontend-developer.md
│       ├── security-reviewer.md
│       ├── seo-auditor.md
│       └── ux-design-advisor.md
├── prompts/                         ← 10 nummerierte Prompt-Dateien (eigenständig ausführbar)
│   ├── PROMPT_01_ANALYSE.md
│   ├── PROMPT_02_CONTENT_STRATEGIE.md
│   ├── PROMPT_03_DESIGN_SYSTEM.md
│   ├── PROMPT_04_TECH_STACK_SETUP.md
│   ├── PROMPT_05_KOMPONENTEN.md
│   ├── PROMPT_06_PAGES_SECTIONS.md
│   ├── PROMPT_07_SEO_IMPLEMENTIERUNG.md
│   ├── PROMPT_08_PERFORMANCE.md
│   ├── PROMPT_09_TESTING_REVIEW.md
│   └── PROMPT_10_DEPLOYMENT.md
├── docs/                            ← Analyse, Review-Reports, Dokumentation
├── src/                             ← React-Quellcode (wird ab PROMPT_04 erstellt)
├── public/                          ← Statische Assets (Bilder, Favicon, OG-Image)
│   └── Public/                      ← Bestehende Bilder aus V1 (Logos, Team, Werkstatt)
├── dist/                            ← Production Build (wird in PROMPT_10 erstellt)
└── ...
```

### Referenz-Ordner (NUR LESEN!)

```
Website.v1/                          ← Alte WordPress/Elementor-Daten
├── Backups/                         ← WordPress-Backup (DB, Uploads, Themes, Plugins)
└── Chatbot/                         ← Chatbot-Code (n8n Integration)
```

**REGEL:** `Website.v1/` wird NIEMALS verändert. Nur als Content- und Bildquelle nutzen.

---

## 3. Tech-Stack

| Technologie | Version | Verwendung |
|---|---|---|
| **Vite** | latest | Build-Tool, Dev-Server |
| **React** | 18+ | UI-Framework |
| **TypeScript** | strict mode | Typsicherheit |
| **Tailwind CSS** | v3.4+ | Styling (Utility-First) |
| **Framer Motion** | 12+ | Animationen, Scroll-Transitions |
| **React Router** | v6+ | Client-side Routing (Home, Leistungen, Team, Kontakt, Impressum, Datenschutz) |
| **Lucide React** | latest | Icon-Bibliothek |
| **clsx + tailwind-merge** | latest | Conditional CSS Klassen |

### Verboten

- **KEIN Next.js** — kein `"use client"`, kein `<Image>`, kein `next/link`
- **KEIN Redux** — React State + Context reichen aus
- **KEINE CSS-Dateien pro Komponente** — nur Tailwind Klassen
- **KEIN jQuery** — modernes React

---

## 4. Code-Konventionen

### Allgemein

- **Functional Components only** — keine Class Components
- **TypeScript strict** — alle Props getypt, keine `any` Types
- **Content aus `src/data/content.ts`** — KEINE Texte direkt in JSX
- **Alle Farben über `brand-*` Tokens** — nie Hex-Codes direkt im JSX
- **Ein Button-Stil = Ein Component** — GlowButton für alle CTAs

### Namensgebung

- **Deutsche Namen** für Content-Variablen: `heroHeadline`, `leistungenItems`, `kontaktAdresse`
- **Englische Namen** für Code-Logik: `useState`, `handleClick`, `isMenuOpen`
- **Dateien:** PascalCase für Components (`GlowButton.tsx`), camelCase für Utils (`cn.ts`)

### Datei-Struktur pro Component

```typescript
// 1. Imports
import { motion } from 'framer-motion'
import { COPY } from '@/data/content'

// 2. Types/Interfaces
interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

// 3. Component
export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  // 4. Hooks, State, Logic
  // 5. Return JSX
}
```

---

## 5. Pflicht-Skills

**Vor JEDER Aufgabe diese Skills ausführen:**

- `/frontend-design` — für Layout, Komponenten, responsive Design
- `/web-design-guidelines` — für professionelle Web-Standards
- `/ui-ux-pro-max` — für Conversion-Optimierung und UX Best Practices

**Zusätzlich je nach Aufgabe:**

- `/seo-audit` — bei Änderungen an HTML-Struktur, Meta-Tags, Semantik
- `/ai-seo` — für KI-gestützte SEO-Optimierung
- `/find-skill` — wenn ein benötigter Skill noch nicht installiert ist

### Regel: Skill nicht installiert?

Falls ein Skill nicht gefunden wird → mit `/find-skill` suchen und installieren.
Falls auch das nicht funktioniert → dem Nutzer den Skill-Namen nennen.

### Regel: JEDE Prompt-Datei muss Skills referenzieren

Jede `PROMPT_*.md` Datei enthält am Anfang einen "WICHTIG: Vor dem Start"-Block, der die relevanten Skills auflistet. Diese Regeln sind **VERBINDLICH** — kein Prompt startet ohne Skill-Check.

---

## 6. Sub-Agents

Spezialisierte Agents liegen unter `.claude/agents/`. Sie werden für Reviews und Qualitätssicherung eingesetzt:

| Agent | Datei | Wann einsetzen |
|---|---|---|
| **Frontend Developer** | `frontend-developer.md` | Bei jeder Komponenten-Entwicklung |
| **Code Reviewer** | `code-reviewer.md` | Nach jeder größeren Implementierung |
| **Security Reviewer** | `security-reviewer.md` | Vor Deployment, bei Formularen |
| **SEO Auditor** | `seo-auditor.md` | Bei HTML-Struktur-Änderungen, Meta-Tags |
| **UX Design Advisor** | `ux-design-advisor.md` | Bei Layout-Entscheidungen, CTA-Platzierung |

**Workflow:** Sub-Agents nutzen frische Kontextfenster für optimale Leistung pro Aufgabe. In PROMPT_09 werden alle Agents nacheinander durchlaufen.

---

## 7. Qualitätsziele

### SEO — Lokale Dominanz

- **Platz 1** bei Google für: "Reifenhändler Witten", "Reifenwechsel Witten", "Werkstatt Witten", "Reifen einlagern Witten", "Felgenreinigung Witten"
- **JSON-LD Structured Data:** LocalBusiness, AutoRepair, Service, FAQPage
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Google Business Profile** Integration und NAP-Konsistenz

### UX/UI — Wettbewerber übertreffen

- **Mobile-first** Design — 70%+ der Nutzer kommen mobil
- **Sub-2s Ladezeit** auf 4G-Mobilfunk
- **Intuitive Navigation** — Hamburger-Menü mit Slide-Over von rechts
- **Visuell überlegen** gegenüber jedem Reifenhändler in der Region

### Conversion — Jede Seite verkauft

- **CTA above-the-fold** auf jeder Seite (Anruf, WhatsApp, Termin)
- **Sticky CTA-Bar** auf Mobile nach 30% Scroll
- **Click-to-Call** Button immer sichtbar
- **WhatsApp-Integration** als sekundärer Kontaktkanal

### Trust — Vertrauen aufbauen

- **Google-Bewertungen** (4,8/5 bei 300+ Bewertungen) prominent platziert
- **Echte Teamfotos** — 7 Mitarbeiterfotos vorhanden
- **Echte Werkstattbilder** — 3 Werkstattfotos + Theke
- **Partnerlogos** — Hankook, Michelin, Continental, Nexen, Nokian
- **Transparente Informationen** — Öffnungszeiten, Anfahrt, Leistungen klar dargestellt

### DSGVO — Rechtlich korrekt

- **Impressum** — vollständig nach TMG
- **Datenschutzerklärung** — vollständig nach DSGVO
- **Cookie-Consent** — Banner mit Accept/Decline Optionen
- **Kontaktformular** — Einwilligungserklärung, keine unnötigen Daten

---

## 8. Bilder-Inventar (bereits vorhanden)

### Team-Fotos (`Public/Mitarbeiter Bilder/`)
Damian.jpeg, Denise.jpeg, Igor.jpeg, Lukasz.jpeg, Mario.jpeg, MaxM.jpeg, Pawlo.jpeg

### Werkstatt & Geschäft (`Public/Logo Sonstige/`)
Logo.jpg, Flavicon-6.png, Team.01.jpeg, Team.02.jpg, Theke.jpeg, Werkstatt.01.jpeg, Werkstatt.02.jpeg, Werkstatt.03.jpeg

### Reifenmarken-Logos (`Public/Bilder Reifenmarken/`)
Hankook_logo.png, Michelin_Logo.svg.png, continental-logo.jpg, NEXEN TIRE_Portrait_Emphasis on the symbol.png, Nokian_Tyres-logo.jpg

---

## 9. Prompt-Reihenfolge

Die 10 Prompts werden nacheinander ausgeführt. Jeder Prompt ist eigenständig — keine Abhängigkeit auf Chat-Kontext aus vorherigen Prompts:

1. **PROMPT_01** — Analyse (Bestandsaufnahme, Wettbewerb, Keywords)
2. **PROMPT_02** — Content-Strategie (Texte, Seitenstruktur, content.ts)
3. **PROMPT_03** — Design-System (Farben, Fonts, Spacing, Tailwind-Config)
4. **PROMPT_04** — Tech-Stack Setup (Vite + React + TS + Tailwind initialisieren)
5. **PROMPT_05** — Komponenten (Header, Footer, CTA, Cards, etc.)
6. **PROMPT_06** — Pages & Sections (Seiten zusammenbauen, Routing)
7. **PROMPT_07** — SEO-Implementierung (Meta-Tags, JSON-LD, Sitemap)
8. **PROMPT_08** — Performance (Lazy Loading, Bildoptimierung, Bundle)
9. **PROMPT_09** — Testing & Review (alle Sub-Agents durchlaufen)
10. **PROMPT_10** — Deployment (Build, finale Checks, Übergabe)

---

## 10. Wichtige Regeln

1. **Alle Arbeit findet in `Website.v2/` statt** — niemals Dateien in `Website.v1/` verändern
2. **`Website.v1/` ist NUR Referenz** — Bilder und Inhalte dürfen kopiert, aber nie dort bearbeitet werden
3. **Jeder Prompt ist eigenständig** — bei frischem Kontext diese CLAUDE.md erneut lesen
4. **Sub-Agents nutzen frische Kontextfenster** — genau dafür sind sie da
5. **Skills werden IMMER zuerst gelesen** — kein Prompt startet ohne Skill-Check
6. **Kein Prompt ohne Verification** — jeder Prompt endet mit einer Prüfung
7. **Content NIEMALS erfinden** — alle Texte basieren auf echten WIGRO-Daten
8. **TypeScript strict** — keine `any` Types, keine `@ts-ignore`
