# FIX_24 — Performance: Flüssige Animationen, saubere Bilder, Smooth Buttons

## Ziel
Die Website ruckelt auf Mobile — Bilder laden nicht sauber, Animationen stocken, Buttons/Transitions fühlen sich nicht smooth an. Ursachen identifizieren und beheben.

---

## Tech-Stack & Konventionen
- Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.4 + Framer Motion 12+
- Bilder: WebP-Format, im `public/`-Ordner
- CSS-Animationen + Framer Motion parallel im Einsatz

---

## Problem-Analyse: Warum ruckelt die Seite?

### 1. `backdrop-blur` ist extrem GPU-intensiv auf Mobile
Die StickyCTABar, HeroSection und andere Elemente nutzen `backdrop-blur-sm` oder `backdrop-blur-md`. Auf älteren iPhones und Android-Geräten erzeugt das starkes Ruckeln, weil jeder Frame den Blur-Effekt neu berechnen muss.

### 2. Bilder ohne feste Dimensionen → Layout-Shift
Hero-Bilder, Team-Bilder und Werkstatt-Bilder haben keine `width`/`height`-Attribute (außer HeroSection). Das erzeugt CLS (Cumulative Layout Shift) beim Laden.

### 3. Zu viele gleichzeitige Framer Motion Observers
Jede Section mit `whileInView` registriert einen IntersectionObserver. Bei 10+ Sections auf der Startseite sind das 10+ Observer gleichzeitig — auf Mobile teuer.

### 4. CSS `transition-all` ist zu breit
`GlowButton` und andere Komponenten nutzen `transition-all duration-200`. Das animiert JEDE CSS-Property, auch solche die nicht animiert werden müssen (wie `background-color`, `box-shadow` gleichzeitig). Besser: nur die nötigen Properties angeben.

### 5. `box-shadow` Animationen sind Paint-intensive
`shadow-glow` → `shadow-glow-lg` auf Hover triggert einen Repaint statt eines Compositing-only Layer.

---

## Datei-übergreifende Änderungen

---

## Änderung 1: `will-change` für animierte Elemente

### Datei: `src/index.css`

Füge am Ende des `@layer base`-Blocks (vor dem schließenden `}`, ca. Zeile 113) hinzu:

```css
/* GPU-Beschleunigung für animierte Elemente */
.animate-marquee,
[data-framer-component] {
  will-change: transform;
}

/* Bilder in Sections mit contain für bessere Paint-Performance */
section img {
  content-visibility: auto;
}
```

---

## Änderung 2: Hero-Bilder mit festen Dimensionen + contain

### Datei: `src/sections/HeroSection.tsx`

Das Hero-Bild hat bereits `width="1920" height="1080"` — gut.

### Datei: `src/sections/LeistungenHero.tsx`

Aktuell (Zeile 16–23):
```tsx
<img
  src="/Logo Sonstige/Werkstatt.01.webp"
  alt=""
  className="w-full h-full object-cover"
  loading="eager"
  fetchPriority="high"
  aria-hidden="true"
/>
```

**Ergänze `width` und `height` sowie `decoding="async"`:**
```tsx
<img
  src="/Logo Sonstige/Werkstatt.01.webp"
  alt=""
  className="w-full h-full object-cover"
  loading="eager"
  fetchPriority="high"
  decoding="async"
  width="1920"
  height="1080"
  aria-hidden="true"
/>
```

### Datei: `src/sections/KontaktHero.tsx`

Gleiche Änderung — füge `decoding="async"` + `width="1920" height="1080"` hinzu:
```tsx
<img
  src="/Logo Sonstige/Theke.webp"
  alt=""
  className="w-full h-full object-cover"
  loading="eager"
  fetchPriority="high"
  decoding="async"
  width="1920"
  height="1080"
  aria-hidden="true"
/>
```

---

## Änderung 3: Framer Motion — `viewport.margin` und `once` optimieren

### Dateien: Alle Sections die `whileInView` nutzen

Das aktuelle Pattern:
```tsx
whileInView="visible"
viewport={{ once: true, margin: '-48px' }}
```

Der negative Margin `-48px` triggert die Animation erst, wenn das Element 48px im Viewport ist. Das ist gut. Aber `once: true` ist ZWINGEND — andernfalls wird der Observer nie entfernt.

**Prüfe alle Sections** und stelle sicher, dass JEDE `whileInView`-Instanz `once: true` hat:

Suche in allen `.tsx`-Dateien nach `whileInView` und prüfe ob `viewport={{ once: true` vorhanden ist. Falls irgendwo `once: true` fehlt, ergänze es.

---

## Änderung 4: GlowButton — `transition-all` durch spezifische Transitions ersetzen

### Datei: `src/components/ui/GlowButton.tsx`

### Aktueller Code (Zeile 51):
```tsx
'inline-flex items-center justify-center font-body transition-all duration-200 select-none',
```

### Neuer Code:
```tsx
'inline-flex items-center justify-center font-body transition-[background-color,color,box-shadow,transform] duration-200 select-none',
```

### Variant-Klassen (Zeile 29–35):

**Primary — aktuell:**
```tsx
primary:
  'bg-brand-cta text-brand-ctaText font-semibold rounded-btn shadow-glow hover:bg-brand-ctaHover hover:shadow-glow-lg active:scale-[0.98] transition-all',
```

**Primary — neu:**
```tsx
primary:
  'bg-brand-cta text-brand-ctaText font-semibold rounded-btn shadow-glow hover:bg-brand-ctaHover hover:shadow-glow-lg active:scale-[0.98] transition-[background-color,box-shadow,transform] duration-200',
```

**Secondary — aktuell:**
```tsx
secondary:
  'border-2 border-brand-blue text-brand-blue font-semibold rounded-btn hover:bg-brand-blue hover:text-white active:scale-[0.98] transition-colors',
```

**Secondary — neu (transition-colors ist schon gut, nur `duration` ergänzen):**
```tsx
secondary:
  'border-2 border-brand-blue text-brand-blue font-semibold rounded-btn hover:bg-brand-blue hover:text-white active:scale-[0.98] transition-[background-color,color,transform] duration-200',
```

**Ghost — aktuell:**
```tsx
ghost:
  'bg-white/10 backdrop-blur-sm text-white font-semibold rounded-btn border border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-[0.98] transition-all',
```

**Ghost — neu (backdrop-blur entfernen für Mobile-Performance):**
```tsx
ghost:
  'bg-white/15 text-white font-semibold rounded-btn border border-white/30 hover:bg-white/25 hover:border-white/50 active:scale-[0.98] transition-[background-color,border-color,transform] duration-200',
```

**Kernänderung bei Ghost:** `backdrop-blur-sm` entfernt, stattdessen `bg-white/15` (etwas höhere Opacity für Kontrast ohne Blur). Blur ist der #1 Performance-Killer auf Mobile.

---

## Änderung 5: Bilder in PartnerLogos — `loading="lazy"` + `decoding="async"` ist schon gesetzt

Prüfe, dass alle Bilder die NICHT above-the-fold sind `loading="lazy"` haben. Bilder die above-the-fold sind müssen `loading="eager"` + `fetchPriority="high"` haben:

- Hero-Bild: `loading="eager"` ✅
- LeistungenHero: `loading="eager"` ✅
- KontaktHero: `loading="eager"` ✅
- Partner-Logos: `loading="lazy"` ✅
- Team-Bilder: `loading="lazy"` ✅

---

## Änderung 6: Framer Motion Animationen vereinfachen

### Problem
Die `LeistungDetail.tsx` hat verschachtelte Stagger-Animationen (Container → Icon + Text → Vorteile-Liste → einzelne Items). Das sind 4 Ebenen an verschachtelten Animationen — auf Mobile zu teuer.

### Datei: `src/sections/LeistungDetail.tsx`

### Aufgabe
Die Vorteile-Liste braucht keinen eigenen Stagger. Entferne den verschachtelten `containerVariants` von der `<motion.ul>`:

**Aktuell (Zeile 128–130):**
```tsx
<motion.ul
  variants={containerVariants}
  className="flex flex-col gap-2.5"
>
```

**Neu:**
```tsx
<ul className="flex flex-col gap-2.5">
```

**Und ändere die `<motion.li>` (Zeile 132–142) zu normalen `<li>`:**
```tsx
{vorteile.map((vorteil) => (
  <li
    key={vorteil}
    className="flex items-start gap-3"
  >
    <div className="w-5 h-5 rounded-full bg-brand-accentLight flex items-center justify-center shrink-0 mt-0.5">
      <Check size={12} className="text-brand-accent" aria-hidden />
    </div>
    <span className="text-brand-body text-sm leading-relaxed">{vorteil}</span>
  </li>
))}
```

**Und den CTA-Wrapper (Zeile 147–158):**
```tsx
<div>
  <GlowButton
    label={cta.label}
    href={cta.href}
    variant="primary"
    size="md"
    icon={Phone}
    iconPosition="left"
    className="w-fit"
    ariaLabel={cta.label}
  />
</div>
```

**Ergebnis:** Nur noch 1 Animationsebene (Container staggert Icon-Spalte + Text-Spalte). Kein verschachtelter Stagger mehr für einzelne Listenelemente und CTA.

---

## Änderung 7: `LeistungenPreview.tsx` — Mobile-Animation vereinfachen

### Datei: `src/sections/LeistungenPreview.tsx`

Die `mobileLeftVariants` und `mobileRightVariants` nutzen `scale: 0.95 → 1`. Scale-Animationen auf Mobile können ruckeln, wenn viele Elemente gleichzeitig animiert werden.

**Ersetze die Mobile-Variants (Zeile 28–53):**

```tsx
// Mobile: Einfache, schnelle Fade-Animationen für flüssiges Scrollen
const mobileVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}
```

**Und im Mobile-Render-Block (Zeile 109–129):**
```tsx
{COPY.leistungenOverview.items.map((item) => (
  <motion.div
    key={item.title}
    variants={prefersReduced ? reducedVariants : mobileVariants}
  >
    <ServiceCard
      title={item.title}
      description={item.description}
      icon={item.icon}
      href={item.href}
    />
  </motion.div>
))}
```

**Warum:** Einfache Opacity + Y-Translation ist der schnellste Animationstyp (Compositor-only). Kein Scale, kein X-Shift, keine Spring-Kurven.

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Mobile: Seite scrollt flüssig — kein Ruckeln beim Scrollen durch Sections
3. Mobile: Bilder laden ohne Layout-Shift (kein Springen)
4. Mobile: Buttons reagieren sofort auf Tap — kein Delay, kein Flackern
5. Mobile: Animationen fühlen sich schnell und smooth an
6. Lighthouse Performance Score: Verbesserung gegenüber aktuellem Stand
7. Desktop: Keine visuellen Änderungen — alles sieht gleich aus
