# FIX_21 — Chatbot bei offenem Mobile-Menü ausblenden

## Ziel
Wenn das Mobile-Menü (Slide-Over von rechts) geöffnet ist, soll der Chatbot (FAB-Button + Panel) nicht sichtbar sein und das Menü nicht überlagern. Sobald das Menü geschlossen wird, erscheint der Chatbot wieder.

---

## Tech-Stack & Konventionen
- ChatWidget: Vanilla JS Widget im DOM (`.wigro-chat` Wrapper)
- MobileMenu: React-Komponente mit `isOpen` Prop + Framer Motion AnimatePresence
- Header: React State `isMenuOpen` steuert das MobileMenu
- z-Index-Hierarchie: `z-nav`, `z-overlay`, `z-modal`
- Chat-Widget z-index: `2147483647` (maximaler Wert — überlagert ALLES)

---

## Problem
Der Chatbot nutzt `z-index: 2147483647` (höchster möglicher Wert). Das MobileMenu nutzt `z-overlay` / `z-modal` (typisch 100–300). Daher überlagert der Chatbot IMMER das Mobile-Menü, egal was.

---

## Lösung: Custom Event von Header → ChatWidget

### Konzept
1. Header dispatched ein Custom Event `wigro-menu-toggle` wenn das Menü öffnet/schließt
2. ChatWidget lauscht auf das Event und blendet sich via CSS-Klasse aus/ein

---

## Änderung 1: Header.tsx — Custom Event dispatchen

### Datei
- `src/components/layout/Header.tsx`

### Aufgabe
Füge einen `useEffect` hinzu, der bei jeder Änderung von `isMenuOpen` ein Custom Event feuert:

Nach dem bestehenden `useEffect` für den Scroll-Handler (Zeile 17–21), füge hinzu:

```tsx
// Chatbot bei offenem Menü ausblenden
useEffect(() => {
  window.dispatchEvent(
    new CustomEvent('wigro-menu-toggle', { detail: { isOpen: isMenuOpen } })
  )
}, [isMenuOpen])
```

### Vollständige Header.tsx Imports (Zeile 4):
```tsx
import { useState, useEffect, useCallback } from 'react'
```
(`useCallback` ist bereits importiert laut aktuellem Stand.)

---

## Änderung 2: ChatWidget.tsx — Auf Event reagieren

### Datei
- `src/components/ChatWidget.tsx`

### Aufgabe
Im bestehenden `useEffect` (der den Chat-Widget initialisiert), **nach** `document.body.appendChild(root)` (ca. Zeile 505) und **vor** den Event-Listener-Registrierungen, füge folgenden Code ein:

```tsx
/* ── Mobile-Menü: Chat ausblenden wenn Menü offen ── */
function handleMenuToggle(e: Event) {
  const customEvent = e as CustomEvent<{ isOpen: boolean }>
  const chatRoot = document.querySelector('.wigro-chat') as HTMLElement
  if (!chatRoot) return

  if (customEvent.detail.isOpen) {
    chatRoot.style.display = 'none'
  } else {
    chatRoot.style.display = ''
  }
}

window.addEventListener('wigro-menu-toggle', handleMenuToggle)
```

### Cleanup erweitern
Im `return`-Block des useEffect (Zeile 623–629), **vor** dem letzten `}`, füge hinzu:

```tsx
window.removeEventListener('wigro-menu-toggle', handleMenuToggle)
```

**Problem:** `handleMenuToggle` ist innerhalb des useEffect definiert und nicht im Cleanup-Scope verfügbar. **Lösung:** Definiere die Funktion VOR dem IIFE oder nutze eine Ref:

### Alternative (einfacher): CSS-basierte Lösung ohne Events

Falls die Event-Lösung zu komplex ist, gibt es eine einfachere CSS-Alternative:

Füge in den CSS-String des ChatWidget (`const css = ...`) eine Regel hinzu, die den Chat-Wrapper versteckt, wenn eine CSS-Klasse auf dem `<body>` gesetzt ist:

**Im CSS-String hinzufügen (am Ende, vor dem schließenden Backtick):**
```css
/* Chat ausblenden wenn Mobile-Menü offen */
body.menu-open .wigro-chat {
  display: none !important;
}
```

**In MobileMenu.tsx** den Body-Klassen-Toggle ergänzen:

### Datei: `src/components/layout/MobileMenu.tsx`

### Aktueller Code (Zeile 25–33):
```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  return () => {
    document.body.style.overflow = ''
  }
}, [isOpen])
```

### Neuer Code:
```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    document.body.classList.add('menu-open')
  } else {
    document.body.style.overflow = ''
    document.body.classList.remove('menu-open')
  }
  return () => {
    document.body.style.overflow = ''
    document.body.classList.remove('menu-open')
  }
}, [isOpen])
```

---

## Empfohlene Lösung: CSS-Variante (einfacher, robuster)

Die CSS-basierte Lösung ist bevorzugt, weil:
- Kein Custom-Event-System nötig
- Kein Timing-Problem (CSS greift sofort)
- Cleanup ist einfach (Body-Klasse wird entfernt)
- Funktioniert auch wenn der Chat-Widget-useEffect nach dem MobileMenu-Mount läuft

### Zusammenfassung der CSS-Lösung:

1. **ChatWidget.tsx**: Im CSS-String am Ende hinzufügen:
```css
body.menu-open .wigro-chat {
  display: none !important;
}
```

2. **MobileMenu.tsx**: `document.body.classList.add('menu-open')` / `.remove('menu-open')` im `useEffect`

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Mobile: Menü öffnen → Chatbot (FAB + Panel) verschwindet komplett
3. Mobile: Menü schließen → Chatbot FAB erscheint wieder
4. Mobile: Chat war geöffnet → Menü öffnen → Chat+FAB verschwinden → Menü schließen → Chat erscheint wieder geschlossen
5. Desktop: Kein Effekt (Menü wird auf Desktop nicht angezeigt)
6. Body-Scroll ist weiterhin gesperrt bei offenem Menü
