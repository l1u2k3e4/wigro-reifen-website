# FIX_16 — Mobile Fixes: StickyCTABar heller + Burger-Menü + Footer-Logo linksbündig

## Ziel
3 Mobile/Layout-Fixes: StickyCTABar mit helleren, besser lesbaren Farben, Burger-Menü-Funktionalität debuggen, Footer-Logo wirklich linksbündig ausrichten.

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.4 + Framer Motion 12+
- Design-Tokens: `brand-blue: #2E3D56`, `brand-cta: #C8E632`, `brand-ctaText: #1F2B3D`
- Mobile-First, `lg:` Breakpoint für Desktop

---

## Änderung 1: StickyCTABar — Hellere, besser lesbare Farben

### Datei
- `src/components/layout/StickyCTABar.tsx`

### Problem
Die Sticky-Bar am unteren Bildschirmrand ist zu dunkel, WhatsApp-Button nicht gut lesbar. Aktuell verwendet:
- Anrufen: `btn-primary` (lime green + dark text → OK)
- WhatsApp: `btn-secondary` (border + text in brand-blue, hover→blue bg + white text → schlecht lesbar im Normalzustand auf dunklem Hintergrund)

### Aktueller Code (Zeile 46–65)
```tsx
<a
  href={COPY.stickyCta.anrufen.href}
  className="flex-1 flex items-center justify-center gap-2 btn-primary min-h-[44px]"
  aria-label="WIGRO Reifen anrufen"
>
  <Phone size={18} aria-hidden />
  <span className="font-semibold text-sm">{COPY.stickyCta.anrufen.label}</span>
</a>
<a
  href={COPY.stickyCta.whatsapp.href}
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 flex items-center justify-center gap-2 btn-secondary min-h-[44px]"
  aria-label="WIGRO Reifen auf WhatsApp schreiben"
>
  <MessageCircle size={18} aria-hidden />
  <span className="font-semibold text-sm">{COPY.stickyCta.whatsapp.label}</span>
</a>
```

### Aufgabe
Ersetze die Button-Klassen mit expliziten, hellen Farben. Die Bar selbst soll einen leicht hellen Hintergrund bekommen:

```tsx
<motion.div
  variants={slideUp}
  initial="hidden"
  animate="visible"
  exit="exit"
  className="sticky-cta lg:hidden bg-white/95 backdrop-blur-md border-t border-brand-border shadow-lg"
  role="complementary"
  aria-label="Schnellkontakt"
>
  <a
    href={COPY.stickyCta.anrufen.href}
    className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-btn font-semibold text-sm transition-colors bg-brand-cta text-brand-ctaText hover:brightness-105"
    aria-label="WIGRO Reifen anrufen"
  >
    <Phone size={18} aria-hidden />
    <span>{COPY.stickyCta.anrufen.label}</span>
  </a>
  <a
    href={COPY.stickyCta.whatsapp.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-btn font-semibold text-sm transition-colors bg-[#25D366] text-white hover:bg-[#20BD5A]"
    aria-label="WIGRO Reifen auf WhatsApp schreiben"
  >
    <MessageCircle size={18} aria-hidden />
    <span>{COPY.stickyCta.whatsapp.label}</span>
  </a>
</motion.div>
```

### Was sich ändert
- **Bar-Hintergrund**: Von der CSS-Klasse `sticky-cta` (evtl. dunkel) zu `bg-white/95 backdrop-blur-md` mit `border-t` und `shadow-lg` → hell und klar
- **Anrufen-Button**: Lime-Green (`bg-brand-cta`) mit dunklem Text → gut lesbar
- **WhatsApp-Button**: Offizielles WhatsApp-Grün (`#25D366`) mit weißem Text → sofort erkennbar als WhatsApp
- Beide Buttons haben `min-h-[44px]` für Touch-Target-Compliance (WCAG)

### Prüfe die `sticky-cta` CSS-Klasse
Falls die `sticky-cta` Klasse in `src/styles/` oder `tailwind.config.ts` definiert ist und eigene Hintergrund-Styles hat, müssen diese ggf. angepasst werden. Die neue Klasse überschreibt den Hintergrund inline mit Tailwind.

Suche nach `sticky-cta` in der CSS-Datei und stelle sicher, dass dort KEIN `background` gesetzt ist, der die Tailwind-Klassen überschreibt. Falls doch, entferne das `background` aus der CSS-Definition und nutze nur die Tailwind-Klassen.

---

## Änderung 2: Burger-Menü — Funktionalität debuggen

### Dateien
- `src/components/layout/Header.tsx`
- `src/components/layout/MobileMenu.tsx`

### Problem
Das Burger-Menü funktioniert nicht korrekt auf Mobile. Mögliche Ursachen:

#### Check 1: z-index Konflikte
- Header nutzt `z-nav` → Prüfe in `tailwind.config.ts` ob `z-nav` höher ist als `z-overlay` und `z-modal`
- MobileMenu nutzt `z-overlay` (Backdrop) und `z-modal` (Panel)
- **Erforderliche Reihenfolge**: `z-nav` < `z-overlay` < `z-modal`

Prüfe in `tailwind.config.ts` die `zIndex`-Konfiguration:
```ts
zIndex: {
  nav: '100',
  overlay: '200',
  modal: '300',
  toast: '400',
}
```

Falls `z-nav` >= `z-overlay`, ändere die Werte so, dass die Reihenfolge stimmt.

#### Check 2: Event-Propagation
Der Hamburger-Button in Header.tsx (Zeile 95–108):
```tsx
<button
  type="button"
  onClick={() => setIsMenuOpen(true)}
  ...
>
```

Prüfe, ob der `onClick` korrekt feuert. Falls der Button im Header von einem `<a>`-Tag oder einem anderen klickbaren Element überlappt wird, könnte der Klick verschluckt werden.

#### Check 3: AnimatePresence
Die `MobileMenu`-Komponente nutzt `AnimatePresence` mit bedingtem Rendering. Stelle sicher:
- `isOpen` wird korrekt als `true` gesetzt
- Die `exit`-Animation verhindert nicht das erneute Öffnen
- `key="panel"` und `key="overlay"` sind vorhanden (sind sie: Zeile 42 + 53)

#### Check 4: body overflow
MobileMenu setzt `document.body.style.overflow = 'hidden'` bei Open. Falls das Menü nicht richtig schließt, bleibt der Body gesperrt. Prüfe ob der Cleanup-Effect (Zeile 28–33) korrekt greift.

### Empfohlene Debug-Schritte
1. Öffne die Seite auf Mobile (oder Chrome DevTools → Mobile-Simulation)
2. Klicke auf den Hamburger-Button
3. Prüfe in den DevTools:
   - Wird der `isMenuOpen`-State auf `true` gesetzt?
   - Wird das MobileMenu-Panel im DOM gerendert?
   - Hat das Panel den korrekten z-index?
   - Überdeckt ein anderes Element den Button?

### Falls das Problem ein z-index-Konflikt ist
Ändere in `tailwind.config.ts`:
```ts
extend: {
  zIndex: {
    nav: '50',
    overlay: '100',
    modal: '150',
    toast: '200',
  }
}
```

---

## Änderung 3: Footer-Logo — linksbündig positionieren

### Datei
- `src/components/layout/Footer.tsx`

### Problem
Das Logo im Footer ist zentriert statt linksbündig. Die erste Spalte hat zwar `flex flex-col gap-4`, aber das `<img>` hat kein `self-start` oder Ähnliches.

### Aktueller Code (Zeile 17–23)
```tsx
<div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
  <img
    src={COPY.nav.logo.src}
    alt={COPY.nav.logo.alt}
    className="h-12 w-auto object-contain rounded-md"
    loading="lazy"
  />
```

### Problem-Analyse
`object-contain` auf einem Bild ohne feste Breite + `w-auto` in einem Flex-Container: Das Bild nimmt die volle Breite des Containers ein und zentriert den Inhalt visuell innerhalb des Elements.

### Aufgabe
Füge `self-start` hinzu, damit das Logo linksbündig am Flex-Start sitzt:

```tsx
<img
  src={COPY.nav.logo.src}
  alt={COPY.nav.logo.alt}
  className="h-12 w-auto object-contain rounded-md self-start"
  loading="lazy"
/>
```

Falls `self-start` nicht ausreicht (weil der Flex-Container `items-center` hat), füge alternativ `max-w-[160px]` hinzu, damit das Bild nicht die volle Breite einnimmt:

```tsx
<img
  src={COPY.nav.logo.src}
  alt={COPY.nav.logo.alt}
  className="h-12 w-auto max-w-[160px] object-contain rounded-md self-start"
  loading="lazy"
/>
```

### Zusätzlich: Auf `sm:col-span-2` achten
Die erste Spalte hat `sm:col-span-2 lg:col-span-1`. Auf Tablet (sm) nimmt sie 2 Spalten ein, was das Logo optisch zentrierter erscheinen lässt. Prüfe ob das gewollt ist. Falls nicht:
```tsx
<div className="lg:col-span-1 flex flex-col gap-4">
```

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Mobile: StickyCTABar hat hellen Hintergrund, Anrufen-Button lime-green, WhatsApp-Button grün mit weißem Text
3. Mobile: Burger-Menü öffnet und schließt korrekt
4. Footer: Logo ist linksbündig (nicht zentriert)
5. Touch-Targets: Alle Buttons mindestens 44×44px
