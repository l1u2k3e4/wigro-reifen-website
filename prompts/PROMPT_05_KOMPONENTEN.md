# PROMPT_05: Wiederverwendbare Komponenten

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/frontend-design` — Komponenten-Architektur, Tailwind Best Practices, Accessibility
- `/website-ux-ui-design` — Button-Design, Card-Design, Animationen, Trust-Signale

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**
**Lies `docs/design-system.md` für Farben, Fonts, Spacing, Schatten.**

---

## Ziel

Am Ende existieren alle wiederverwendbaren UI-Komponenten unter `src/components/`. Jede Komponente ist voll getypt, responsive, accessible und nutzt das Design-System aus PROMPT_03.

---

## Kontext

Alle Komponenten folgen dem Atomic Design Prinzip: kleine, wiederverwendbare Einheiten die in Sections und Pages zusammengesetzt werden. Texte kommen IMMER aus `content.ts` — nie direkt im JSX.

---

## Aufgaben

### 1. Basis-Komponenten (`src/components/ui/`)

#### GlowButton.tsx
- **Primärer CTA-Button** mit Glow-Effekt
- Props: `label`, `href`, `variant` ('primary' | 'secondary' | 'ghost'), `size` ('sm' | 'md' | 'lg'), `icon?`
- Primary: Accent-Farbe, weiße Schrift, Glow-Shadow, hover:scale
- Secondary: Border + Accent-Text, hover:fill
- Ghost: Nur Text + Underline
- `motion.a` oder `motion.button` je nach `href` Prop

#### SectionHeading.tsx
- Zentrierte Überschrift + Subtext für jede Section
- Props: `title`, `subtitle?`, `tag?` (h1 | h2 | h3), `alignment?` ('center' | 'left')
- Max-Width 700px, responsive Font-Sizes

#### ServiceCard.tsx
- Service-Karte für Leistungen-Grid
- Props: `title`, `description`, `icon` (Lucide Icon Name)
- Hover: Shadow-Elevation + translate-y
- Framer Motion fadeInUp Animation

#### TestimonialCard.tsx
- Kundenbewertung-Karte
- Props: `quote`, `name`, `rating` (Sternezahl)
- Sterne-Anzeige, Anführungszeichen-Icon
- Variante: Normal und Featured (größer)

#### TeamCard.tsx
- Mitarbeiter-Karte mit Foto
- Props: `name`, `role`, `image`
- Bild oben, Name + Rolle darunter
- Hover: leichter Zoom auf Bild

#### FAQItem.tsx
- Aufklappbarer FAQ-Eintrag (Accordion)
- Props: `question`, `answer`
- AnimatePresence für smooth Open/Close
- Chevron-Icon rotiert bei Open

#### StarRating.tsx
- Sterne-Anzeige für Bewertungen
- Props: `rating` (number), `maxStars?` (default 5)
- Gefüllte und leere Sterne

### 2. Layout-Komponenten (`src/components/layout/`)

#### Header.tsx
- **Desktop (ab lg):** Sticky, weiß, Logo links, Nav-Links rechts, CTA-Button ganz rechts
- **Mobile (unter lg):** Sticky, Logo links, Hamburger rechts
- Scroll-Effekt: Shadow erscheint beim Scrollen
- Active Link Highlighting
- Skip-Link: "Zum Inhalt springen" als erstes Element

#### MobileMenu.tsx
- **Slide-Over Panel von RECHTS** (nicht von oben!)
- Framer Motion Animation: x: 0 → '100%'
- Backdrop-Blur + dunkler Overlay
- Max-Width: 320px / 80vw
- Volle Höhe
- Close-Button + Tap-Outside-to-Close
- Nav-Links + CTA + Kontaktdaten

#### Footer.tsx
- 3-4 Spalten: Kontakt, Leistungen, Rechtliches, Öffnungszeiten
- Logo, Adresse, Telefon (klickbar), E-Mail (klickbar)
- Social Media Links
- Copyright + Jahreszahl dynamisch
- Links zu Impressum und Datenschutz

#### StickyCTABar.tsx
- **Nur auf Mobile sichtbar** (unter lg)
- Fixiert am unteren Bildschirmrand
- Erscheint nach 30% Scroll-Tiefe
- 2 Buttons: Anrufen (Phone Icon) + WhatsApp (WhatsApp Icon)
- Framer Motion: slideUp Animation

### 3. Spezial-Komponenten

#### WhatsAppButton.tsx
- Floating WhatsApp-Button (unten rechts)
- Grünes WhatsApp-Icon
- Hover: Scale + Tooltip "WhatsApp schreiben"
- Link: `https://wa.me/49230254951`

#### PartnerLogos.tsx
- Logo-Reihe der Reifenmarken
- Responsive: 3 Spalten mobil, 5 Spalten desktop
- Grayscale im Default, Farbe bei Hover
- Bilder aus `Public/Bilder Reifenmarken/`

#### GoogleMapsEmbed.tsx
- Google Maps Einbettung mit Consent
- Zeigt zunächst statisches Bild + "Karte laden" Button
- Erst nach Klick wird iframe geladen (DSGVO!)
- Props: `address`, `lat`, `lng`

#### CookieConsent.tsx
- Cookie-Banner am unteren Rand
- "Akzeptieren" und "Ablehnen" Buttons (gleich prominent!)
- Speichert Entscheidung im State (kein localStorage in Artifacts)
- Kein Dark Pattern

#### ContactForm.tsx
- Kontaktformular mit Validierung
- Felder: Name, E-Mail, Telefon (optional), Nachricht
- DSGVO-Checkbox: "Ich habe die Datenschutzerklärung gelesen..."
- Honeypot-Feld für Spam-Schutz
- Visuelles Feedback bei Success/Error
- Client-seitige Validierung (E-Mail Format, Pflichtfelder)

### 4. Animation-Utilities

Erstelle `src/lib/animations.ts` mit wiederverwendbaren Framer Motion Variants:

```typescript
export const fadeInUp = { ... }
export const fadeIn = { ... }
export const staggerContainer = { ... }
export const slideInRight = { ... }
export const scaleIn = { ... }
```

---

## Erwartetes Ergebnis

```
src/components/
├── ui/
│   ├── GlowButton.tsx
│   ├── SectionHeading.tsx
│   ├── ServiceCard.tsx
│   ├── TestimonialCard.tsx
│   ├── TeamCard.tsx
│   ├── FAQItem.tsx
│   └── StarRating.tsx
├── layout/
│   ├── Header.tsx
│   ├── MobileMenu.tsx
│   ├── Footer.tsx
│   └── StickyCTABar.tsx
├── WhatsAppButton.tsx
├── PartnerLogos.tsx
├── GoogleMapsEmbed.tsx
├── CookieConsent.tsx
└── ContactForm.tsx

src/lib/
├── utils.ts
└── animations.ts
```

---

## Verification

- [ ] Alle Komponenten existieren und kompilieren fehlerfrei (`npx tsc --noEmit`)
- [ ] Jede Komponente hat vollständige TypeScript Props
- [ ] Keine `any` Types
- [ ] Farben nur über `brand-*` Tokens
- [ ] Texte kommen aus Props (nicht hardcoded)
- [ ] Alle Buttons haben `aria-label` wenn Icon-only
- [ ] `alt`-Texte auf allen Bildern
- [ ] Mobile-Menü: Slide-Over von RECHTS
- [ ] Sticky CTA-Bar: nur unter `lg`, erscheint nach 30% Scroll
- [ ] `prefers-reduced-motion` wird respektiert
- [ ] Touch-Targets mindestens 44x44px
