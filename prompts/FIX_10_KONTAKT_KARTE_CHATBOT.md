# FIX 10 — Kontaktseite Karte Auto-Load + WhatsApp durch Chatbot ersetzen

> **Lies zuerst `CLAUDE.md`** im Projektroot.

## Kontext

- Kontaktseite: `src/pages/Kontakt.tsx` → nutzt `AnfahrtKontakt.tsx` → nutzt `GoogleMapsEmbed.tsx`
- `GoogleMapsEmbed.tsx` hat aktuell DSGVO-Click-to-Load (Nutzer muss „Karte laden" klicken)
- WhatsApp-Button: `src/components/WhatsAppButton.tsx` — floating Button unten rechts
- Chatbot: `src/components/ChatWidget.tsx` — bereits implementiert, nutzt `VITE_CHATBOT_WEBHOOK_URL`
- Layout: `src/components/layout/SharedLayout.tsx` — bindet WhatsApp + ChatWidget ein

---

## Aufgabe 1: Karte auf Kontaktseite automatisch laden

**Datei:** `src/sections/AnfahrtKontakt.tsx`

Die Kontakt-Seite nutzt `<GoogleMapsEmbed>`, das eine Click-to-Load-Mechanik hat. Auf der Kontaktseite soll die Karte SOFORT geladen werden.

**Option A — Prop an GoogleMapsEmbed:**

Ändere `GoogleMapsEmbed` damit es einen `autoLoad`-Prop akzeptiert:

**Datei:** `src/components/GoogleMapsEmbed.tsx`

```tsx
interface GoogleMapsEmbedProps {
  address?: string
  embedUrl?: string
  mapsUrl?: string
  height?: number
  autoLoad?: boolean  // NEU
}

export default function GoogleMapsEmbed({
  address = COPY.anfahrt.adresse,
  embedUrl = COPY.anfahrt.googleMapsEmbed,
  mapsUrl = COPY.anfahrt.googleMapsUrl,
  height = 400,
  autoLoad = false,  // NEU — default false (DSGVO-konform auf Startseite)
}: GoogleMapsEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(autoLoad)  // NEU — startet geladen wenn autoLoad=true

  // ... Rest bleibt gleich
```

**Datei:** `src/sections/AnfahrtKontakt.tsx` — Zeile 30

```tsx
// ALT:
<GoogleMapsEmbed height={420} />

// NEU:
<GoogleMapsEmbed height={420} autoLoad />
```

Die Startseite (`AnfahrtSection.tsx`) verwendet ein direktes iframe und ist davon nicht betroffen.

---

## Aufgabe 2: WhatsApp-Button entfernen

**Datei:** `src/components/layout/SharedLayout.tsx`

Entferne den WhatsApp-Button komplett aus dem Layout:

```tsx
// ALT:
import WhatsAppButton from '@/components/WhatsAppButton'

// NEU: Import entfernen

// Im return:
// ALT:
<WhatsAppButton />

// NEU: Zeile komplett entfernen
```

Die Datei `src/components/WhatsAppButton.tsx` kann optional gelöscht werden (nicht zwingend).

**SharedLayout wird zu:**
```tsx
import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StickyCTABar from '@/components/layout/StickyCTABar'
import CookieConsent from '@/components/CookieConsent'
import ChatWidget from '@/components/ChatWidget'
import ScrollToHash from '@/components/ScrollToHash'

export default function SharedLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      <ScrollToHash />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <StickyCTABar />
      <CookieConsent />
      <ChatWidget />
    </div>
  )
}
```

---

## Aufgabe 3: Chatbot-Widget mit korrekter Webhook-URL konfigurieren

**Datei:** `src/components/ChatWidget.tsx`

Der ChatWidget existiert bereits mit dem kompletten WIGRO Widget v2.3 Code. Aktuell nutzt er eine Umgebungsvariable `VITE_CHATBOT_WEBHOOK_URL`. Für die direkte Funktionsfähigkeit, hardcode die Webhook-URL:

Ändere die Config (Zeile 6-24):

```tsx
const CHAT_CONFIG = {
  webhook: {
    url: 'https://n8n.srv1233417.hstgr.cloud/webhook/6c6aa35e-d0fe-4162-9389-94e29a14864e/chat',
    route: 'general',
  },
  branding: {
    logo: '',
    name: 'WIGRO-Reifen',
    welcomeText: 'Willkommen bei WIGRO-Reifen Witten! 🚗 Wie können wir Ihnen helfen?',
    responseTimeText: 'Montage · Verkauf · Service',
  },
  style: {
    primaryColor: '#1e2d4d',
    secondaryColor: '#c5e030',
    position: 'right' as const,
    backgroundColor: '#f4f5f7',
    fontColor: '#1e2d4d',
  },
}
```

**Wichtige Änderungen gegenüber aktuellem Stand:**
- `url`: Hardcoded Webhook-URL statt `import.meta.env.VITE_CHATBOT_WEBHOOK_URL || ''`
- `name`: `'WIGRO-Reifen'` (mit Bindestrich, wie im Kunden-Widget)
- `welcomeText`: Emoji 🚗 + „Witten" wie im Kunden-Widget
- `responseTimeText`: `'Montage · Verkauf · Service'` statt generischem Text
- `primaryColor`: `'#1e2d4d'` (Original-Kundenfarbe) statt `'#2E3D56'`
- `secondaryColor`: `'#c5e030'` (Original-Kundenfarbe) statt `'#C8E632'`

Entferne auch die Prüfung auf leere URL (Zeile 28-31), da die URL jetzt immer gesetzt ist:

```tsx
// ALT:
if (!CHAT_CONFIG.webhook.url) {
  console.info('[ChatWidget] Keine Webhook-URL konfiguriert — Chatbot deaktiviert')
  return
}

// NEU: Entfernen (oder als Sicherheits-Fallback behalten — schadet nicht)
```

---

## Aufgabe 4: Jost Font sicherstellen

Prüfe ob in `index.html` oder `src/index.css` der Jost Font geladen wird. Der Chatbot braucht Jost. Falls noch nicht vorhanden, füge in `index.html` vor `</head>` hinzu:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Aufgabe 5: marked.js für Markdown-Support einbinden

Der Chatbot nutzt `marked.js` für Markdown-Rendering. Füge in `index.html` vor `</body>` hinzu:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

---

## Validierung

- `npx tsc --noEmit` — 0 Errors
- Kontaktseite: Karte lädt sofort ohne Klick
- Startseite Anfahrt: Karte lädt weiterhin direkt (separates iframe, nicht betroffen)
- Kein WhatsApp-Button mehr sichtbar auf der ganzen Website
- Chatbot-FAB-Button unten rechts sichtbar (blauer Kreis mit grünem Chat-Icon)
- Chatbot Panel öffnet sich: Header zeigt „WIGRO-Reifen", grüner Akzent-Streifen
- Nachricht senden → Antwort kommt vom n8n Backend
- Mobile: Panel nimmt 50vh ein, iOS-Keyboard-Fix funktioniert
