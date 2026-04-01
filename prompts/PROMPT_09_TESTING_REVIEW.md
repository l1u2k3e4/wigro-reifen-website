# PROMPT_09: Testing & Review

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/frontend-design` — Code-Qualität, TypeScript, Accessibility
- `/website-seo` — SEO-Audit Checkliste
- `/website-ux-ui-design` — UX-Prüfung, Conversion-Check

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**

---

## Ziel

Am Ende existiert ein vollständiger Review-Report unter `docs/review-report.md`. Alle 4 Sub-Agents wurden durchlaufen, alle kritischen Findings sind gefixt, und die Website ist deployment-ready.

---

## Kontext

Die komplette Website ist gebaut (PROMPT_01-08). Jetzt wird sie systematisch von 4 spezialisierten Sub-Agents geprüft. Jeder Agent hat eigene Prüfkriterien (definiert in `.claude/agents/`). Findings werden gesammelt, priorisiert und gefixt.

---

## Aufgaben

### Phase 1: Code Review

**Agent:** `.claude/agents/code-reviewer.md`

Führe den vollständigen Code Review durch:

1. **Strukturanalyse** — Dateien, Größen, Imports
2. **Code-Qualität** — DRY, Namensgebung, Funktionslänge, Error Handling
3. **TypeScript** — `npx tsc --noEmit`, keine `any`, vollständige Types
4. **Bundle** — Größen prüfen, unnötige Dependencies identifizieren
5. **Konsistenz** — Patterns, Farb-Tokens, Content-Source, Button-Style

**Prüfbefehle:**

```bash
# TypeScript Check
npx tsc --noEmit

# Unused imports finden
grep -r "import.*from" src/ | sort

# Bundle analysieren
npm run build && ls -lh dist/assets/

# console.log Reste finden
grep -rn "console\." src/
```

### Phase 2: Security & DSGVO Review

**Agent:** `.claude/agents/security-reviewer.md`

Führe den vollständigen Security & DSGVO Audit durch:

1. **XSS-Check** — dangerouslySetInnerHTML, eval, Secrets im Code
2. **Impressum** — vollständig nach §5 TMG
3. **Datenschutzerklärung** — vollständig nach Art. 13 DSGVO
4. **Cookie-Consent** — Opt-In, keine Dark Patterns
5. **Kontaktformular** — DSGVO-Checkbox, Honeypot, Validierung
6. **Externe Einbindungen** — Google Fonts lokal?, Maps mit Consent?, CDN SRI?

**Prüfbefehle:**

```bash
# dangerouslySetInnerHTML suchen
grep -rn "dangerouslySetInnerHTML" src/

# eval() suchen
grep -rn "eval(" src/

# Secrets suchen
grep -rn "API_KEY\|SECRET\|PASSWORD\|TOKEN" src/

# target="_blank" ohne rel
grep -rn 'target="_blank"' src/ | grep -v "noopener"
```

### Phase 3: SEO Audit

**Agent:** `.claude/agents/seo-auditor.md`

Führe den vollständigen SEO Audit durch:

1. **Meta-Tags** — jede Seite: Title, Description, Canonical
2. **Structured Data** — JSON-LD Validierung (LocalBusiness, AutoRepair, FAQPage, Service)
3. **Semantisches HTML** — H1 pro Seite, Heading-Hierarchie, Landmarks
4. **Bilder-SEO** — alt-Tags, optimierte Dateinamen, WebP
5. **Technisches SEO** — sitemap.xml, robots.txt, Canonical URLs
6. **Lokales SEO** — NAP-Konsistenz, Stadtname in Title/H1, Einzugsgebiet

**Prüfbefehle:**

```bash
# H1-Tags pro Seite zählen
grep -rn "<h1" src/pages/ src/sections/

# Alt-Tags prüfen
grep -rn "<img" src/ | grep -v "alt="

# JSON-LD Blöcke finden
grep -rn "application/ld+json" src/
```

### Phase 4: UX Design Review

**Agent:** `.claude/agents/ux-design-advisor.md`

Führe den vollständigen UX Review durch:

1. **5-Sekunden-Test** — Versteht man sofort was WIGRO macht, wo sie sind, wie man sie kontaktiert?
2. **CTA-Check** — Above-the-fold, nach jedem Block, Sticky Bar
3. **Trust-Signale** — Bewertungen, Team-Fotos, Partner-Logos sichtbar?
4. **Mobile UX** — Touch-Targets 44px, Click-to-Call, Navigation
5. **Visuelle Hierarchie** — Scanbar, klare Struktur, kein Clutter

### Phase 5: Fixes implementieren

1. **Kritische Findings** sofort fixen
2. **Warnungen** priorisieren und fixen
3. **Verbesserungen** dokumentieren (für Post-Launch)
4. Nach jedem Fix: `npx tsc --noEmit` und `npm run build` prüfen

### Phase 6: Finaler Check

```bash
# Kompletter Build
npm run build

# TypeScript Check
npx tsc --noEmit

# Preview starten
npm run preview
```

Manuell prüfen:
- Alle Routes erreichbar
- Mobile (375px) testen
- Tablet (768px) testen
- Desktop (1280px) testen
- Alle CTAs klickbar
- Bilder laden
- Animationen smooth
- Formulare funktionieren
- Impressum/Datenschutz erreichbar
- Cookie-Banner funktioniert

---

## Erwartetes Ergebnis

`docs/review-report.md` mit:

```markdown
# Website V2 — Review Report

## Datum: [Datum]

## 1. Code Review
### Bewertung: [A/B/C/D]
[Findings + Status (gefixt/offen)]

## 2. Security & DSGVO Review
### Risiko: [NIEDRIG/MITTEL/HOCH]
[Findings + Status]

## 3. SEO Audit
### Score: [X/100]
[Findings + Status]

## 4. UX Design Review
### Bewertung: [A/B/C/D]
[Findings + Status]

## 5. Offene Punkte (Post-Launch)
[Nicht-kritische Verbesserungen für später]

## 6. Deployment-Freigabe
[JA / NEIN — mit Begründung]
```

---

## Verification

- [ ] `docs/review-report.md` existiert und ist vollständig
- [ ] Alle kritischen Findings sind gefixt
- [ ] `npx tsc --noEmit` — 0 Fehler
- [ ] `npm run build` — fehlerfrei
- [ ] Keine console.log im Code
- [ ] DSGVO-Prüfung bestanden (Impressum + Datenschutz + Consent)
- [ ] SEO-Prüfung bestanden (Meta-Tags + Structured Data + Sitemap)
- [ ] Website auf allen 3 Breakpoints getestet
- [ ] Deployment-Freigabe erteilt (JA)
