# FIX_17 — Chatbot Mobile: Panel obere Bildschirmhälfte + FAB höher positionieren

## Ziel
Den n8n Chat-Widget auf Mobile optimieren: (1) Chat-Panel in der oberen Hälfte des Bildschirms öffnen, damit es nicht von der Sticky-Bar überdeckt wird, (2) FAB-Button höher positionieren, damit er nicht hinter der StickyCTABar verschwindet.

---

## Tech-Stack & Konventionen
- n8n Chat Widget v2.3 (Vanilla JS, in React `useEffect` eingebettet)
- Webhook: `https://n8n.srv1233417.hstgr.cloud/webhook/6c6aa35e-d0fe-4162-9389-94e29a14864e/chat`
- CSS-Prefix: `wigro-chat` / `wg-*` (CSS-Custom-Klassen)
- Chat-Widget wird in `src/components/ChatWidget.tsx` initialisiert
- StickyCTABar ist ca. 56–64px hoch, erscheint nur unter `lg` Breakpoint

---

## Datei
- `src/components/ChatWidget.tsx`

---

## Änderung 1: FAB-Button höher positionieren

### Problem
Der FAB (Floating Action Button) sitzt bei `bottom: 88px`. Die StickyCTABar hat ca. 56–64px Höhe + Padding. Der FAB muss noch etwas höher, damit er komplett über der Sticky-Bar sichtbar ist.

### Aufgabe
Suche im ChatWidget.tsx nach der CSS-Regel, die die FAB-Position steuert. Sie sieht wahrscheinlich so aus:

```css
@media (max-width: 1023px) {
  .n8n-chat .chat-container.chat-closed {
    bottom: 88px !important;
  }
}
```

Ändere den `bottom`-Wert auf **96px** für etwas mehr Abstand:

```css
@media (max-width: 1023px) {
  .n8n-chat .chat-container.chat-closed {
    bottom: 96px !important;
  }
}
```

**Warum 96px?** StickyCTABar (~64px) + 16px Padding + 16px Sicherheitsabstand = 96px.

---

## Änderung 2: Chat-Panel in oberer Bildschirmhälfte öffnen

### Problem
Wenn der Chat geöffnet wird, nimmt das Panel standardmäßig den unteren Bereich des Bildschirms ein. Auf Mobile wird es von der StickyCTABar teilweise überdeckt oder der Input-Bereich ist schwer erreichbar.

### Aufgabe
Füge CSS-Regeln hinzu, die das geöffnete Chat-Panel auf Mobile in die obere Hälfte des Bildschirms positionieren:

```css
/* === MOBILE: Chat-Panel in oberer Hälfte === */
@media (max-width: 1023px) {
  /* Panel-Position wenn geöffnet */
  .n8n-chat .chat-container.chat-open {
    position: fixed !important;
    top: 80px !important;          /* Unter dem Header (h-20 = 80px) */
    bottom: auto !important;       /* Bottom-Positionierung aufheben */
    left: 8px !important;
    right: 8px !important;
    width: auto !important;
    max-width: none !important;
    height: calc(50vh - 40px) !important;  /* Obere Hälfte minus halber Header */
    max-height: calc(50vh - 40px) !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
    z-index: 9998 !important;
  }

  /* Chat-Messages Bereich scrollbar machen */
  .n8n-chat .chat-container.chat-open .chat-messages-list {
    overflow-y: auto !important;
    flex: 1 !important;
    min-height: 0 !important;
  }

  /* Input-Bereich am unteren Rand des Panels fixieren */
  .n8n-chat .chat-container.chat-open .chat-input {
    flex-shrink: 0 !important;
    border-top: 1px solid #e5e7eb !important;
  }
}

/* === DESKTOP: Standard-Verhalten beibehalten === */
@media (min-width: 1024px) {
  .n8n-chat .chat-container.chat-open {
    bottom: 24px !important;
    right: 24px !important;
    height: 600px !important;
    max-height: 70vh !important;
    width: 400px !important;
  }
}
```

### Wichtige Hinweise zur Implementation

1. **CSS-Selektor prüfen**: Die exakten Klassen-Namen hängen von der n8n Chat Widget Version ab. Prüfe im Browser-DevTools (F12) die tatsächlichen Klassen des Chat-Containers:
   - Geschlossen: `.chat-container` mit einer Closed-Klasse
   - Geöffnet: `.chat-container` mit einer Open-Klasse
   - Die Klassen könnten auch `is-open`, `is-closed`, oder durch das `data-*` Attribut gesteuert sein

2. **Fallback**: Falls die exakten Selektoren nicht greifen, nutze den generischen Ansatz über den Chat-Container-Wrapper:
```css
@media (max-width: 1023px) {
  /* n8n Chat Widget — geöffneter Zustand */
  .n8n-chat [class*="chat-container"]:not([class*="closed"]) {
    position: fixed !important;
    top: 80px !important;
    bottom: auto !important;
    left: 8px !important;
    right: 8px !important;
    width: auto !important;
    height: calc(50vh - 40px) !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
  }
}
```

3. **Wo die CSS-Regeln einfügen**: Im ChatWidget.tsx gibt es einen `<style>` Block oder die Styles werden in der `useEffect`-Funktion per `document.createElement('style')` eingefügt. Füge die neuen Regeln dort ein.

4. **Test-Szenario**:
   - iPhone SE (375×667) → Chat öffnen → Panel sollte im oberen Bereich sitzen
   - iPhone 14 (390×844) → Chat öffnen → mehr Platz, aber immer noch obere Hälfte
   - iPad → Chat öffnen → Standard-Desktop-Verhalten ab 1024px

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Mobile: FAB-Button ist über der StickyCTABar sichtbar (kein Überlappen)
3. Mobile: Chat-Panel öffnet in der oberen Bildschirmhälfte
4. Mobile: Chat-Nachrichten sind scrollbar
5. Mobile: Input-Feld ist erreichbar und nicht abgeschnitten
6. Desktop: Chat-Verhalten unverändert (rechts unten, normale Größe)
7. Die StickyCTABar bleibt unter dem Chat-Panel sichtbar und nutzbar
