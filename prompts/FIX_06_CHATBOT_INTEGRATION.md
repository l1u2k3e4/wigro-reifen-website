# FIX 06 — Chatbot vollständig in die Website integrieren

> **Lies zuerst `CLAUDE.md`** im Projektroot.
> **Lies dann den Skill:** `.claude/skills/n8n-rag-chatbot/SKILL.md` und die Referenz `.claude/skills/n8n-rag-chatbot/references/widget-template.md`

## Kontext

- Tech-Stack: Vite + React 18 + TypeScript + Tailwind CSS
- Der Chatbot nutzt das n8n Chat-Widget (Vanilla JS), das als React-Komponente eingebunden werden soll
- WIGRO Branding-Farben: `#2E3D56` (Navy Blue Primary), `#C8E632` (Lime Green Accent)
- Die n8n Webhook-URL muss als Platzhalter eingebaut werden (wird später vom Kunden konfiguriert)

## Aufgaben

### 1. React-Wrapper-Komponente erstellen

**Neue Datei:** `src/components/ChatWidget.tsx`

Erstelle eine React-Komponente, die das Vanilla-JS Chat-Widget sauber in den React-Lifecycle einbindet:

```tsx
// src/components/ChatWidget.tsx
// WIGRO Chat-Widget — React Wrapper für n8n Chat-Widget

import { useEffect } from 'react'

const CHAT_CONFIG = {
  webhook: {
    url: import.meta.env.VITE_CHATBOT_WEBHOOK_URL || '',
    route: 'general',
  },
  branding: {
    logo: '',
    name: 'WIGRO Reifen',
    welcomeText: 'Willkommen bei WIGRO Reifen! 👋 Wie können wir Ihnen helfen?',
    responseTimeText: 'Ihr Reifenhändler in Witten',
  },
  style: {
    primaryColor: '#2E3D56',
    secondaryColor: '#C8E632',
    position: 'right',
    backgroundColor: '#f4f5f7',
    fontColor: '#2E3D56',
  },
}

export default function ChatWidget() {
  useEffect(() => {
    // Nur laden wenn Webhook-URL konfiguriert ist
    if (!CHAT_CONFIG.webhook.url) {
      console.info('[ChatWidget] Keine Webhook-URL konfiguriert — Chatbot deaktiviert')
      return
    }

    // Config global setzen für das Widget-Script
    ;(window as any).ChatWidgetConfig = CHAT_CONFIG

    // Widget-Script dynamisch laden
    // Den kompletten Widget-Code aus dem n8n-rag-chatbot Skill übernehmen
    // (siehe .claude/skills/n8n-rag-chatbot/references/widget-template.md)
    // und als Self-Executing Function hier einfügen

    // WICHTIG: Den Widget-Code aus widget-template.md KOMPLETT hier einfügen
    // Der Code erstellt eigenständig alle DOM-Elemente und Event-Listener

    return () => {
      // Cleanup: Widget-DOM entfernen bei Unmount
      const widgetRoot = document.querySelector('.af-chat')
      if (widgetRoot) widgetRoot.remove()

      // Style-Element entfernen
      const styles = document.querySelectorAll('style')
      styles.forEach((s) => {
        if (s.textContent?.includes('.af-chat')) s.remove()
      })
    }
  }, [])

  return null // Widget fügt sich selbst in den DOM ein
}
```

### 2. Widget-Code aus dem Skill übernehmen

Lies die komplette Widget-Implementierung aus `.claude/skills/n8n-rag-chatbot/references/widget-template.md`. Der Code ab `(function () { "use strict";` bis zum schließenden `})();` muss in den `useEffect` der `ChatWidget`-Komponente eingefügt werden.

**Anpassungen nötig:**
- Entferne die `<script>`-Tags (ist jetzt JS innerhalb von React)
- Entferne die separate `ChatWidgetConfig`-Zuweisung (wird im `useEffect` gesetzt)
- Entferne die Google Fonts `<link>`-Tags — Jost Font muss stattdessen in `index.css` als `@import` hinzugefügt werden ODER als `<link>` in `index.html`

### 3. ChatWidget in SharedLayout einbinden

**Datei:** `src/components/layout/SharedLayout.tsx`

Importiere und rendere die `ChatWidget`-Komponente:

```tsx
import ChatWidget from '@/components/ChatWidget'

// Im return, nach dem Footer:
<Footer />
<ChatWidget />
```

### 4. Umgebungsvariable anlegen

**Datei:** `.env.example` (neu erstellen)

```
# n8n Chatbot Webhook URL
VITE_CHATBOT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/xxxxx
```

**Datei:** `.env` (neu erstellen, in .gitignore aufnehmen)

```
VITE_CHATBOT_WEBHOOK_URL=
```

### 5. Jost Font für Widget laden

**Datei:** `index.html` oder `src/index.css`

Füge den Google Fonts Import für Jost hinzu (nur falls noch nicht vorhanden):

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 6. TypeScript-Typen

**Datei:** `src/vite-env.d.ts`

Ergänze die Umgebungsvariable:

```ts
interface ImportMetaEnv {
  readonly VITE_CHATBOT_WEBHOOK_URL: string
}
```

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Ohne `VITE_CHATBOT_WEBHOOK_URL` → kein Chat-Button sichtbar, Console zeigt Info-Meldung
- Mit gültiger URL → FAB-Button unten rechts, Panel öffnet sich mit WIGRO-Branding
- Farben: Navy Blue Header, Lime Green Akzentlinie
- Mobile: Panel nimmt 50% Viewhöhe ein, Tastatur-Support
- Cleanup bei Route-Wechsel (kein Memory Leak)
