# FIX_12 — Kontaktseite: Button-Hover-Fix + E-Mail-Versand + Anfahrt 1:1 wie Startseite

## Ziel
3 Korrekturen auf der Kontaktseite: Button-Hover-States lesbar machen, Kontaktformular direkt an info@wigro-reifen.de senden, und "So finden Sie uns" 1:1 identisch zur Startseite gestalten.

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.4 + Framer Motion 12+
- Content zentral in `src/data/content.ts` (COPY-Objekt)
- Tailwind Design-Tokens: `brand-blue: #2E3D56`, `brand-cta: #C8E632`, `brand-ctaText: #1F2B3D`
- `btn-primary` Klasse wird für CTA-Buttons verwendet

---

## Änderung 1: KontaktGrid Buttons — Hover-State fix

### Datei
- `src/sections/KontaktGrid.tsx`

### Problem
Die 4 Kontakt-Karten (Telefon, WhatsApp, E-Mail, Adresse) verwenden `className="btn-primary"` auf den CTA-Links (Zeile 41). Beim Hover verschwindet der Text / wird unlesbar, weil die `btn-primary` Klasse den Hover-Hintergrund ändert, aber die Textfarbe nicht ausreichend kontrastiert.

### Aktueller Code (Zeile 37–44)
```tsx
<a
  href={kanal.href}
  target={kanal.href.startsWith('http') ? '_blank' : undefined}
  rel={kanal.href.startsWith('http') ? 'noopener noreferrer' : undefined}
  className="btn-primary text-sm text-center py-2.5 px-4 inline-flex items-center justify-center"
  aria-label={`${kanal.cta} — ${kanal.wert}`}
>
  {kanal.cta}
</a>
```

### Aufgabe
Ersetze die Button-Klasse durch eine explizite Styling-Klasse, die sowohl im Normalzustand als auch beim Hover lesbar bleibt:

```tsx
<a
  href={kanal.href}
  target={kanal.href.startsWith('http') ? '_blank' : undefined}
  rel={kanal.href.startsWith('http') ? 'noopener noreferrer' : undefined}
  className="text-sm text-center py-2.5 px-4 inline-flex items-center justify-center rounded-btn font-semibold transition-colors bg-brand-cta text-brand-ctaText hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
  aria-label={`${kanal.cta} — ${kanal.wert}`}
>
  {kanal.cta}
</a>
```

**Erklärung:**
- Normalzustand: Lime-Green Hintergrund (`bg-brand-cta`) + dunkler Text (`text-brand-ctaText`) = gut lesbar
- Hover: Blauer Hintergrund (`hover:bg-brand-blue`) + weißer Text (`hover:text-white`) = gut lesbar
- Focus-Ring für Keyboard-Navigation

---

## Änderung 2: Kontaktformular — direkt an info@wigro-reifen.de senden

### Datei
- `src/components/ContactForm.tsx`

### Problem
Das Formular nutzt Web3Forms mit dem Platzhalter `access_key: 'DEIN_WEB3FORMS_KEY'` (Zeile 92). Es funktioniert nicht, weil der echte Key fehlt.

### Aufgabe
Ersetze den Web3Forms-API-Call durch einen `mailto:`-Ansatz, der die Formular-Daten als vorausgefüllte E-Mail öffnet. Das ist die einfachste Lösung, die sofort funktioniert, ohne API-Key.

Ersetze den gesamten `handleSubmit`-Inhalt (ab Zeile 76):

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  // Honeypot-Prüfung
  if (form.honeypot) return

  if (!validate()) return

  setStatus('submitting')

  try {
    // mailto: Link mit Formular-Daten erstellen
    const subject = encodeURIComponent('Neue Anfrage über die Website — WIGRO Reifen')
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `E-Mail: ${form.email}\n` +
      `Telefon: ${form.telefon || 'nicht angegeben'}\n\n` +
      `Nachricht:\n${form.nachricht}`
    )

    window.location.href = `mailto:info@wigro-reifen.de?subject=${subject}&body=${body}`

    // Kurz warten, dann Success anzeigen
    await new Promise(resolve => setTimeout(resolve, 500))
    setStatus('success')
    setForm(INITIAL_STATE)
  } catch {
    setStatus('error')
  }
}
```

**Hinweis:** Der `fetch`-Import zu `web3forms.com` wird komplett entfernt. Der Kommentar `// Web3Forms` ebenfalls.

### Alternative (falls mailto nicht gewünscht)
Falls der Kunde einen Web3Forms Account hat, muss lediglich `'DEIN_WEB3FORMS_KEY'` durch den echten Key ersetzt werden. Den Key bekommt man bei https://web3forms.com nach Anmeldung mit info@wigro-reifen.de.

---

## Änderung 3: Kontaktseite "So finden Sie uns" — 1:1 wie Startseite

### Dateien
- `src/sections/AnfahrtKontakt.tsx` (komplett ersetzen)
- `src/pages/Kontakt.tsx` (Import anpassen)

### Problem
Die Kontaktseite nutzt `AnfahrtKontakt.tsx` mit einer anderen Darstellung als die Startseite (`AnfahrtSection.tsx`). Gewünscht: identisches Layout wie auf der Startseite.

### Aktuelles Startseite-Layout (`AnfahrtSection.tsx`)
Zweispaltiges Grid:
- **Links**: 4 Info-Blöcke (Adresse + Parkplatz, Telefon, E-Mail, Öffnungszeiten) in Cards mit Icons
- **Rechts**: Google Maps iframe direkt geladen + "Route planen" Button darunter

### Aufgabe
Ersetze den gesamten Inhalt von `src/sections/AnfahrtKontakt.tsx` mit einer **exakten Kopie** der Startseite-Version. Einziger Unterschied: Das Section-Tag nutzt `id="anfahrt-kontakt"` statt `id="anfahrt"`:

```tsx
// src/sections/AnfahrtKontakt.tsx
// Anfahrt auf Kontaktseite — 1:1 identisch mit Startseite-Version

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, ExternalLink } from 'lucide-react'
import { COPY } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowButton from '@/components/ui/GlowButton'
import { fadeInUp } from '@/lib/animations'

export default function AnfahrtKontakt() {
  return (
    <section id="anfahrt-kontakt" className="section" aria-labelledby="anfahrt-kontakt-heading">
      <div className="container-content">
        <SectionHeading
          title={COPY.anfahrt.headline}
          subtitle={COPY.anfahrt.subline}
          tag="h2"
          alignment="center"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          {/* Links: Kontaktinfos als gestaltete Blöcke */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
            className="flex flex-col gap-6"
          >
            {/* Adresse */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-0.5">Adresse</p>
                <p className="text-brand-body text-sm">{COPY.anfahrt.adresse}</p>
                <p className="text-brand-muted text-xs mt-1">{COPY.anfahrt.parkplatz}</p>
              </div>
            </div>

            {/* Telefon */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <Phone size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-0.5">Telefon</p>
                <a
                  href={COPY.anfahrt.telefonHref}
                  className="text-brand-blue text-sm hover:text-brand-blueLight transition-colors font-medium"
                >
                  {COPY.anfahrt.telefon}
                </a>
              </div>
            </div>

            {/* E-Mail */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <Mail size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-0.5">E-Mail</p>
                <a
                  href={COPY.anfahrt.emailHref}
                  className="text-brand-blue text-sm hover:text-brand-blueLight transition-colors font-medium"
                >
                  {COPY.anfahrt.email}
                </a>
              </div>
            </div>

            {/* Öffnungszeiten */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="w-10 h-10 rounded-icon bg-brand-accentLight flex items-center justify-center shrink-0">
                <Clock size={20} className="text-brand-blue" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-brand-heading text-sm mb-1">Öffnungszeiten</p>
                {COPY.anfahrt.oeffnungszeiten.map((row, i) => (
                  <div key={i} className="flex gap-4 text-sm text-brand-body">
                    <span className="min-w-[120px]">{row.tag}</span>
                    <span>{row.zeiten}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rechts: Google Maps direkt eingebettet */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-48px' }}
            variants={fadeInUp}
            className="flex flex-col gap-4"
          >
            <div className="rounded-xl overflow-hidden shadow-card border border-brand-border h-72 md:h-96">
              <iframe
                src="https://maps.google.com/maps?q=WIGRO+Reifen+Witten&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps — WIGRO Reifen Witten"
              />
            </div>

            {/* Route planen Button */}
            <GlowButton
              label="Route planen"
              href={COPY.anfahrt.routenplanerUrl}
              variant="secondary"
              size="md"
              icon={ExternalLink}
              iconPosition="right"
              ariaLabel="Route zu WIGRO Reifen in Google Maps planen"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### Import-Check in Kontakt.tsx
Der Import in `src/pages/Kontakt.tsx` bleibt unverändert:
```tsx
import AnfahrtKontakt from '@/sections/AnfahrtKontakt'
```
Da der Dateiname gleich bleibt, ist keine Anpassung nötig.

### Aufräumen
Die `GoogleMapsEmbed`-Komponente wird nicht mehr von `AnfahrtKontakt` importiert. Prüfe, ob `GoogleMapsEmbed` noch von anderen Dateien verwendet wird. Falls nicht, kann die Datei belassen werden (schadet nicht).

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Kontaktseite → Buttons: Text bleibt bei Hover lesbar (lime→blue Übergang)
3. Kontaktformular → "Absenden" öffnet E-Mail-Client mit vorausgefüllter Mail an info@wigro-reifen.de
4. Kontaktseite → "So finden Sie uns" sieht identisch aus wie auf der Startseite (4 Info-Blocks links, Maps rechts)
