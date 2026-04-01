# WIGRO Reifen — Projekt-Kontext für neues Kontextfenster

> **Stand:** 2026-03-31
> **Abgeschlossen:** PROMPT_01 – PROMPT_05
> **Nächster Schritt:** PROMPT_06 (Pages & Sections)

---

## Wichtig: Vor dem Start in einem neuen Kontextfenster

**Immer zuerst lesen:**
1. `CLAUDE.md` — Projektkontext, Tech-Stack, Konventionen
2. `docs/CONTEXT.md` — **DIESE DATEI** — aktueller Stand
3. `src/data/content.ts` — alle Website-Texte (COPY-Objekt)
4. `docs/design-system.md` — Farben, Fonts, Spacing, Animationen

---

## Projektstatus

| Prompt | Titel | Status | Output |
|---|---|---|---|
| PROMPT_01 | Analyse & Bestandsaufnahme | ✅ Fertig | `docs/analyse.md` |
| PROMPT_02 | Content-Strategie | ✅ Fertig | `src/data/content.ts`, `docs/seitenstruktur.md` |
| PROMPT_03 | Design-System | ✅ Fertig | `tailwind.config.ts`, `src/index.css`, `docs/design-system.md` |
| PROMPT_04 | Tech-Stack Setup | ✅ Fertig | `package.json`, `vite.config.ts`, `tsconfig*.json`, alle Seiten-Platzhalter, `App.tsx`, `SharedLayout.tsx` |
| PROMPT_05 | Komponenten | ✅ Fertig | `src/components/`, `src/lib/animations.ts` |
| PROMPT_06 | Pages & Sections | ✅ Fertig | `src/sections/`, `src/pages/` (alle befüllt), `App.tsx` (ScrollToTop) |
| PROMPT_07 | SEO-Implementierung | ⏳ Offen | — |
| PROMPT_08 | Performance | ⏳ Offen | — |
| PROMPT_09 | Testing & Review | ⏳ Offen | — |
| PROMPT_10 | Deployment | ⏳ Offen | — |

---

## Geschäftsdaten (verifiziert)

| Feld | Wert |
|---|---|
| Firma | WIGRO Räder und Reifen |
| Inhaber | Mario Rampérez y Carrasco |
| Adresse | Cörmannstr. 25, 58455 Witten |
| Telefon | 02302 54951 |
| Tel-Href | `tel:+4923025495` |
| WhatsApp | `https://wa.me/4923025495` |
| E-Mail | info@wigro-reifen.de |
| **Öffnungszeiten** | **Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr** |
| Google-Bewertung | 4,8 / 5 (300+ Bewertungen) |
| Google Maps | `https://www.google.com/maps/place/Wigro+Reifen/@51.4447147,7.318914` |

> **Öffnungszeiten-Hinweis:** Vom Inhaber bestätigt: Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr. Nicht Mo–So 09:00–17:00 wie in CLAUDE.md steht — `content.ts` hat die korrekten Zeiten.

---

## Tech-Stack (installiert & konfiguriert)

| Technologie | Version | Status |
|---|---|---|
| Vite | ^6.0.5 | ✅ konfiguriert |
| React | ^18.3.1 | ✅ installiert |
| TypeScript | ^5.7.2 (strict) | ✅ konfiguriert |
| Tailwind CSS | ^3.4.17 | ✅ konfiguriert |
| Framer Motion | ^12.0.0 | ✅ installiert |
| React Router | ^6.28.1 | ✅ konfiguriert |
| Lucide React | ^0.469.0 | ✅ installiert |
| clsx + tailwind-merge | latest | ✅ installiert |

**Verboten:** Next.js, Redux, CSS-Dateien pro Komponente, jQuery

---

## Vollständige Ordnerstruktur (aktueller Stand)

```
Website.v2/
├── CLAUDE.md                          ← Immer zuerst lesen
├── index.html                         ← ✅ lang="de", Fonts Preconnect, OG-Tags
├── package.json                       ← ✅ alle Dependencies
├── vite.config.ts                     ← ✅ @/-Alias, Manual Chunks
├── tailwind.config.ts                 ← ✅ vollständiges Design-System
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json  ← ✅ strict mode
├── postcss.config.js                  ← ✅ Tailwind + Autoprefixer
├── .gitignore                         ← ✅
├── .claude/agents/                    ← Sub-Agents für PROMPT_09
│   ├── code-reviewer.md
│   ├── frontend-developer.md
│   ├── security-reviewer.md
│   ├── seo-auditor.md
│   └── ux-design-advisor.md
├── prompts/                           ← PROMPT_01 bis PROMPT_10
├── docs/
│   ├── CONTEXT.md                     ← DIESE DATEI
│   ├── analyse.md                     ← ✅ PROMPT_01
│   ├── seitenstruktur.md              ← ✅ PROMPT_02
│   └── design-system.md              ← ✅ PROMPT_03
├── src/
│   ├── vite-env.d.ts                  ← ✅ Vite CSS/Asset-Typen
│   ├── main.tsx                       ← ✅ Entry Point
│   ├── App.tsx                        ← ✅ BrowserRouter + alle Routes
│   ├── index.css                      ← ✅ Tailwind Directives + Base Styles + Components
│   ├── components/
│   │   ├── ui/
│   │   │   ├── GlowButton.tsx         ← ✅ Primärer CTA-Button mit Glow
│   │   │   ├── SectionHeading.tsx     ← ✅ Überschrift + Subtitle
│   │   │   ├── ServiceCard.tsx        ← ✅ Leistungs-Karte
│   │   │   ├── TestimonialCard.tsx    ← ✅ Kundenbewertungs-Karte
│   │   │   ├── TeamCard.tsx           ← ✅ Mitarbeiter-Karte
│   │   │   ├── FAQItem.tsx            ← ✅ Accordion FAQ
│   │   │   └── StarRating.tsx         ← ✅ Sterne-Anzeige
│   │   ├── layout/
│   │   │   ├── SharedLayout.tsx       ← ✅ Echte Komponenten
│   │   │   ├── Header.tsx             ← ✅ Desktop + Mobile + Skip-Link
│   │   │   ├── MobileMenu.tsx         ← ✅ Slide-Over von rechts
│   │   │   ├── Footer.tsx             ← ✅ 4-Spalten Footer
│   │   │   └── StickyCTABar.tsx       ← ✅ Mobile Sticky (nach 30% Scroll)
│   │   ├── WhatsAppButton.tsx         ← ✅ Floating Button
│   │   ├── PartnerLogos.tsx           ← ✅ Grayscale → Farbe on Hover
│   │   ├── GoogleMapsEmbed.tsx        ← ✅ DSGVO-konform (erst nach Klick)
│   │   ├── CookieConsent.tsx          ← ✅ Kein Dark Pattern
│   │   └── ContactForm.tsx            ← ✅ Validierung + Honeypot + DSGVO
│   ├── sections/                      ← ✅ 19 Sections (PROMPT_06)
│   ├── pages/
│   │   ├── Home.tsx                   ← ✅ Platzhalter
│   │   ├── Leistungen.tsx             ← ✅ Platzhalter
│   │   ├── Team.tsx                   ← ✅ Platzhalter
│   │   ├── Kontakt.tsx                ← ✅ Platzhalter
│   │   ├── Impressum.tsx              ← ✅ Platzhalter
│   │   ├── Datenschutz.tsx            ← ✅ Platzhalter
│   │   └── NotFound.tsx               ← ✅ 404-Seite
│   ├── data/
│   │   └── content.ts                 ← ✅ PROMPT_02 — NIEMALS direkt im JSX texten
│   ├── lib/
│   │   ├── utils.ts                   ← ✅ cn() Utility
│   │   └── animations.ts              ← ✅ Framer Motion Variants (fadeInUp, staggerContainer, slideInRight, scaleIn, slideUp)
│   ├── styles/                        ← Leer (Tailwind übernimmt alles)
│   ├── hooks/                         ← Leer — wird in PROMPT_06 befüllt
│   └── types/                         ← Leer — wird in PROMPT_06 befüllt
└── Public/
    ├── Mitarbeiter Bilder/            ← 7 Teamfotos
    ├── Logo Sonstige/                 ← Logos, Werkstatt, Team
    └── Bilder Reifenmarken/           ← 5 Partner-Logos
```

---

## Design-System (PROMPT_03 — Zusammenfassung)

### Farbpalette (`tailwind.config.ts`)

| Token | Hex | Einsatz | WCAG auf Weiß |
|---|---|---|---|
| `brand-bg` | `#FFFFFF` | Haupthintergrund | — |
| `brand-surface` | `#F0F7EC` | Alternierende Sections | — |
| `brand-wigro` | `#54B435` | **NUR Dekoration** (Icons, Checkmarks) | 2.47:1 ⚠️ |
| `brand-accent` | `#2A7318` | Buttons, Links, CTAs | **5.28:1 ✓ AA** |
| `brand-accentHover` | `#1E5510` | Hover-State | **7.42:1 ✓ AAA** |
| `brand-accentLight` | `#EAF5E4` | Badges, Chips | — |
| `brand-success` | `#16A34A` | Bestätigungen | **4.54:1 ✓ AA** |
| `brand-heading` | `#1A1A1A` | Überschriften | **17.1:1 ✓ AAA** |
| `brand-body` | `#374151` | Fließtext | **9.0:1 ✓ AAA** |
| `brand-muted` | `#6B7280` | Sekundärtext | **4.6:1 ✓ AA** |
| `brand-white` | `#FFFFFF` | Text auf Dunkel | — |
| `brand-border` | `#E5E7EB` | Trennlinien | — |
| `brand-light` | `#F9FAFB` | Card-Hintergründe | — |
| `brand-callout` | `#EAF5E4` | Callout-Boxen | — |
| `brand-calloutBorder` | `#86EFAC` | Callout-Rahmen | — |
| `brand-tableHeader` | `#D1FAE5` | Tabellenkopf | — |

> **Kritische Regel:** `brand-wigro` (#54B435) hat nur 2.47:1 Kontrast — NIEMALS als Textfarbe auf Weiß. Nur Dekoration.

### Typografie

| Font | Klasse | Gewichte | Einsatz |
|---|---|---|---|
| **Oswald** | `font-display` | 400–700 | h1, h2, h3, Hero, Section-Titel |
| **DM Sans** | `font-body` / `font-sans` | 400–700 | Fließtext, Labels, Buttons |

Google Fonts sind in `index.html` mit Preconnect eingebunden (`display=swap`).

### Schatten

| Klasse | Einsatz |
|---|---|
| `shadow-card` | Standard Cards |
| `shadow-card-hover` | Cards beim Hover |
| `shadow-glow` | CTA-Buttons (grüner Glow) |
| `shadow-glow-lg` | Hero-Buttons |
| `shadow-nav` | Navigationsleiste |
| `shadow-float` | Modals, Sticky-Bar |

### CSS-Klassen (`src/index.css` — @layer components)

| Klasse | Beschreibung |
|---|---|
| `.btn-primary` | Grüner CTA-Button (44px min, white text) |
| `.btn-secondary` | Outline-Button |
| `.btn-ghost` | Für Hero-Bereich (auf dunklem BG) |
| `.card` | Standard Card |
| `.card-hover` | Card mit Hover-Lift |
| `.section` | Section mit weißem BG + Padding |
| `.section-surface` | Section mit Surface-BG |
| `.container-content` | max-w-[1200px] zentriert |
| `.container-narrow` | max-w-[800px] für Impressum etc. |
| `.badge` | Grüner Badge/Chip |
| `.badge-white` | Weißer Badge (auf dunklem BG) |
| `.trust-chip` | Trust-Signal Pill |
| `.callout` | Highlight-Box grün |
| `.section-headline` | Standard Section-Headline |
| `.section-subline` | Section-Untertitel |
| `.sticky-cta` | Mobile Sticky CTA-Bar (bottom) |
| `.table-wigro` | WIGRO-Tabellenstil |
| `.grid-services` | 1→2→3 Spalten Grid |
| `.grid-team` | 2→3→4 Spalten Grid |

### Animationen (Keyframes)

| Animation | Klasse | Einsatz |
|---|---|---|
| fadeInUp | `animate-fade-in-up` | Standard Scroll-Animation |
| fadeInUp slow | `animate-fade-in-up-slow` | Hero-Headline |
| pulseGlow | `animate-pulse-glow` | Haupt-CTA-Button |
| slideInRight | `animate-slide-in-right` | Mobile-Menü öffnen |
| slideOutRight | `animate-slide-out-right` | Mobile-Menü schließen |

**Framer Motion bevorzugt** für Scroll-Animationen. Immer `viewport={{ once: true }}`.

---

## App.tsx — Routing-Konfiguration

```typescript
// Alle Routes konfiguriert:
/              → <Home />
/leistungen    → <Leistungen />
/team          → <Team />
/kontakt       → <Kontakt />
/impressum     → <Impressum />
/datenschutz   → <Datenschutz />
*              → <NotFound />

// Alle Seiten wrappen sich in <SharedLayout> (Header + Footer + Sticky CTA)
```

---

## SharedLayout.tsx — aktueller Stand (PROMPT_05 fertig)

`src/components/layout/SharedLayout.tsx` nutzt echte Komponenten:
- **Header:** Sticky, Logo, Desktop-Nav mit Active-Highlighting, Hamburger → MobileMenu
- **MobileMenu:** Slide-Over von rechts, Framer Motion, Backdrop, Close on navigate
- **Footer:** 4 Spalten, Logo, Nav, Kontakt (klickbar), Öffnungszeiten
- **StickyCTABar:** Nur Mobile (`lg:hidden`), erscheint nach 30% Scroll
- **WhatsAppButton:** Floating, erscheint nach 5s Delay
- **CookieConsent:** DSGVO-konform, localStorage, kein Dark Pattern

---

## content.ts — COPY-Objekt Struktur

```typescript
COPY.meta              // SEO: title, description, h1 pro Seite + ogImage
COPY.nav               // Navigation: logo, links[], cta
COPY.hero              // Hero: badge, headline, subline, cta×2, image, trustSignal
COPY.leistungenOverview // 6 Service-Cards für Homepage
COPY.usp               // 3 USPs ("Warum WIGRO?")
COPY.bewertungen       // 3 Kundenzitate + Rating + Google-URL
COPY.partner           // 5 Partner-Logos (src + alt)
COPY.teamTeaser        // Team-Teaser auf Homepage
COPY.anfahrt           // Adresse, Öffnungszeiten, Maps-Links
COPY.ctaSection        // Finaler CTA-Block (Homepage)
COPY.leistungen        // Leistungsseite: hero + 6 items[] + cta
COPY.team              // Teamseite: hero, geschichte, 7 mitglieder[], werkstattBilder, cta
COPY.kontakt           // Kontaktseite: hero, 4 kanaele[], oeffnungszeiten, formular, anfahrt
COPY.faq               // 10 FAQ-Einträge
COPY.footer            // Footer: alle Daten + links[]
COPY.impressum         // Vollständiger Impressum-Text
COPY.datenschutz       // Vollständige Datenschutzerklärung
COPY.cookieConsent     // Cookie-Banner Texte
COPY.stickyCta         // Mobile Sticky CTA-Bar Texte
COPY.kontaktdaten      // Single Source of Truth für Kontaktdaten
```

**Import:** `import { COPY } from '@/data/content'`

---

## Bilder-Inventar

### Team (`/Public/Mitarbeiter Bilder/`)
| Datei | Person | Rolle |
|---|---|---|
| `Mario.jpeg` | Mario Rampérez y Carrasco | Inhaber & Geschäftsführer |
| `Denise.jpeg` | Denise | Kundenberatung & Empfang |
| `Damian.jpeg` | Damian | Kundenberatung |
| `Igor.jpeg` | Igor | Werkstattleitung |
| `Lukasz.jpeg` | Lukasz | Reifenmonteur |
| `MaxM.jpeg` | Max | Reifenmonteur |
| `Pawlo.jpeg` | Pawlo | Reifenmonteur |

### Werkstatt & Logo (`/Public/Logo Sonstige/`)
| Datei | Verwendung |
|---|---|
| `Logo.jpg` | Header, Footer |
| `Flavicon-6.png` | Favicon (bereits in index.html) |
| `Werkstatt.01.jpeg` | Hero-Hintergrundbild |
| `Werkstatt.02.jpeg` | Leistungen-Section |
| `Werkstatt.03.jpeg` | Werkstatt-Impressionen |
| `Theke.jpeg` | Team-Seite |
| `Team.01.jpeg` | Homepage Team-Teaser |
| `Team.02.jpg` | Team-Seite |

### Partner-Logos (`/Public/Bilder Reifenmarken/`)
| Datei | Marke |
|---|---|
| `Hankook_logo.png` | Hankook |
| `Michelin_Logo.svg.png` | Michelin |
| `continental-logo.jpg` | Continental |
| `NEXEN TIRE_Portrait_Emphasis on the symbol.png` | Nexen ⚠️ Leerzeichen im Dateinamen |
| `Nokian_Tyres-logo.jpg` | Nokian |

> ⚠️ **Nexen-Dateiname** enthält Leerzeichen → in PROMPT_08 umbenennen oder per encodeURIComponent referenzieren.

---

## Chatbot (aus Website.v1 übernehmen)

- **Webhook:** `https://n8n.srv1233417.hstgr.cloud/webhook/6c6aa35e-d0fe-4162-9389-94e29a14864e/chat`
- **Route:** `general`
- **Version:** Chat Widget v2.3
- **Features:** Markdown, Session-Management, iOS Keyboard Fix, Typing-Indicator, XSS-Schutz
- **Für V2:** Farben auf `brand-accent` / `brand-heading` anpassen. Erst nach 5s anzeigen.

---

## Konventionen (aus CLAUDE.md — Pflicht)

```
✅ Functional Components only — kein Class-Component
✅ TypeScript strict — kein any, kein @ts-ignore
✅ Alle Texte aus COPY — nie direkt im JSX
✅ Alle Farben über brand-* Tokens — nie Hex direkt
✅ Deutsche Namen für Content-Variablen (heroHeadline, leistungenItems)
✅ Englische Namen für Logik (useState, handleClick, isMenuOpen)
✅ PascalCase für Components (GlowButton.tsx), camelCase für Utils (cn.ts)
✅ Keine CSS-Dateien — nur Tailwind + @layer in index.css
✅ Website.v1/ nur lesen, NIEMALS verändern
✅ Import-Alias: @/ → ./src/ (konfiguriert in vite.config.ts + tsconfig.app.json)
```

---

## Qualitätsziele

- **Core Web Vitals:** LCP < 2,5s | INP < 200ms | CLS < 0,1
- **Ladezeit:** < 2s auf 4G-Mobilfunk
- **SEO:** JSON-LD LocalBusiness + AutoRepair + Service + FAQPage
- **Mobile-first** (70%+ der Nutzer)
- **CTAs:** immer above-the-fold, Sticky Bar nach 30% Scroll auf Mobile
- **DSGVO:** Cookie-Banner + Kontaktformular-Einwilligung

---

## Build-Status

```bash
# Letzte erfolgreiche Runs nach PROMPT_05 (2026-03-31):
npx tsc --noEmit   → 0 Fehler ✅
npm run build      → dist/ in 1.30s ✅

# Chunks:
dist/assets/react-vendor-*.js     163 KB  (React + ReactDOM + React Router)
dist/assets/framer-motion-*.js    129 KB  (Framer Motion — vollständig genutzt)
dist/assets/index-*.js             41 KB  (App-Code inkl. alle Komponenten)
dist/assets/index-*.css            32 KB  (Tailwind-Output)
```

---

## Build-Status nach PROMPT_06 (2026-03-31)

```bash
npx tsc --noEmit   → 0 Fehler ✅
npm run build      → dist/ in 1.50s ✅

# Chunks:
dist/assets/react-vendor-*.js     163 KB  (React + ReactDOM + React Router)
dist/assets/framer-motion-*.js    129 KB  (Framer Motion)
dist/assets/index-*.js            883 KB  ⚠️ groß — Code-Splitting in PROMPT_08
dist/assets/index-*.css            39 KB  (Tailwind-Output)
```

> **Hinweis:** Der große index.js-Chunk (883KB) entsteht durch die vielen Sections auf einer Seite.
> Code-Splitting mit `React.lazy()` / `dynamic import()` wird in PROMPT_08 implementiert.

## Nächster Schritt: PROMPT_07 — SEO-Implementierung

**Datei öffnen:** `prompts/PROMPT_07_SEO_IMPLEMENTIERUNG.md`

Meta-Tags, JSON-LD Structured Data, Sitemap, robots.txt, noindex für Impressum/Datenschutz.
