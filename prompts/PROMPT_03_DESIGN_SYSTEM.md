# PROMPT_03: Design-System

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/website-ux-ui-design` — Farbsystem, Typografie, Spacing, Komponenten-Design, Animationen
- `/frontend-design` — Tailwind-Config, responsive Patterns, Accessibility

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**

---

## Ziel

Am Ende existiert ein vollständiges Design-System: `tailwind.config.ts` mit allen Brand-Farben, Fonts, Shadows und Keyframes, plus eine Design-Dokumentation unter `docs/design-system.md`.

---

## Kontext

WIGRO Reifen ist ein vertrauenswürdiger Familienbetrieb. Das Design muss professionell und modern sein, aber nicht kalt oder corporate. Die aktuelle Website nutzt Grün (#54B435) als Primärfarbe — diese Markenfarbe soll beibehalten und professionell weiterentwickelt werden.

### Design-Anforderungen
- **Branchen-Passung:** Automotive/Werkstatt — Vertrauen, Verlässlichkeit, Kompetenz
- **Zielgruppe:** 25-65 Jahre, 70% mobil, pragmatisch
- **Wettbewerbs-Abhebung:** Deutlich moderner als typische Werkstatt-Websites
- **Markenfarbe:** Grün beibehalten (steht für Verlässlichkeit und Frische)

---

## Aufgaben

### 1. Farbpalette definieren

Entwickle eine vollständige Farbpalette basierend auf dem WIGRO-Grün:

```typescript
colors: {
  brand: {
    // Hintergründe
    bg:            '#FFFFFF',    // Haupthintergrund
    surface:       '#F0F7EC',    // Alternierender Section-Hintergrund (leichtes Grün)

    // Akzentfarben (CTA, Highlights)
    accent:        '#...',       // Primäre Aktionsfarbe — WIGRO-Grün weiterentwickelt
    accentHover:   '#...',       // 15-20% dunkler
    accentLight:   '#...',       // Für Badges, Tags, Highlights
    success:       '#...',       // Bestätigungen

    // Textfarben
    heading:       '#...',       // Überschriften — dunkel, hoher Kontrast
    body:          '#...',       // Fließtext — gut lesbar
    muted:         '#...',       // Sekundärtext, Labels
    white:         '#FFFFFF',

    // UI-Elemente
    border:        '#...',       // Subtile Trennlinien
    light:         '#...',       // Helle Hintergründe für Cards
    callout:       '#...',       // Highlight-Boxen
    calloutBorder: '#...',       // Rahmen für Callouts
    tableHeader:   '#...',       // Tabellenkopf
  }
}
```

**Regeln:**
- Akzentfarbe MUSS WCAG AA Kontrast auf Weiß haben (4.5:1 für Text)
- Kein reines Schwarz (#000) als Textfarbe
- Section-Hintergründe alternieren: Weiß → Surface → Weiß
- Maximal 2 Akzentfarben (primär + sekundär)

### 2. Typografie wählen

Wähle ein Font-Pairing das zur Automotive/Handwerk-Branche passt:

- **Display Font:** Kraftvoll, maskulin, gut lesbar (z.B. Oswald, Barlow Condensed, Montserrat)
- **Body Font:** Gut lesbar, neutral, professionell (z.B. DM Sans, Inter, Nunito)

Definiere die komplette Typografie-Scale in der Tailwind-Config.

### 3. Spacing-System

Definiere konsistentes Spacing:
- Section-Padding: `py-16 md:py-24`
- Content-Breite: `max-w-[1200px]`
- Card-Padding: `p-6 md:p-8`
- Grid-Gaps: `gap-6 md:gap-8`

### 4. Schatten & Border-Radius

```typescript
boxShadow: {
  card:         '...',
  'card-hover': '...',
  glow:         '...',    // Accent-Glow für CTAs
  'glow-lg':    '...',
  nav:          '...',
},
borderRadius: {
  card: '12px',
}
```

### 5. Animationen & Keyframes

Definiere wiederverwendbare Animationen:
- **fadeInUp:** Standard Scroll-Animation
- **pulse_glow:** CTA-Button Puls
- **slideInRight:** Mobile-Menü

### 6. tailwind.config.ts erstellen

Erstelle die vollständige Konfiguration mit allen oben definierten Werten.

### 7. CSS-Basis erstellen

Erstelle `src/index.css` mit:
- Tailwind Directives (@tailwind base/components/utilities)
- Smooth Scroll
- Base Styles (Body Font, Textfarbe, Antialiasing)
- Custom @layer Definitionen

### 8. Design-Dokumentation

Erstelle `docs/design-system.md` mit:
- Farbpalette mit Hex-Codes und Verwendungszweck
- Font-Pairing mit Begründung
- Spacing-Regeln
- Komponenten-Styles (Buttons, Cards, Sections)
- Animationen (wann welche Animation)
- Accessibility-Regeln

---

## Erwartetes Ergebnis

1. `tailwind.config.ts` — Vollständige Tailwind-Konfiguration
2. `src/index.css` — CSS-Basis mit Tailwind Directives
3. `docs/design-system.md` — Design-Dokumentation

---

## Verification

- [ ] Alle `brand-*` Farben sind definiert und haben WCAG AA Kontrast
- [ ] Google Fonts sind korrekt referenziert (display=swap, preconnect)
- [ ] Tailwind-Config enthält alle Farben, Fonts, Shadows, Keyframes
- [ ] `index.css` hat korrekte Tailwind Directives
- [ ] Design-Dokumentation ist vollständig und verständlich
- [ ] Farbpalette passt zur Automotive-Branche (Vertrauen, Kompetenz)
- [ ] Kein reines Schwarz als Textfarbe
