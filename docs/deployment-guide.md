# WIGRO Reifen — Website V2 Deployment Guide

> Erstellt: 2026-03-31 | Status: Deployment-ready (Soft-Launch)

---

## 1. Projekt-Info

| Feld | Wert |
|---|---|
| **Kunde** | WIGRO Räder und Reifen, Witten |
| **Inhaber** | Mario Rampérez y Carrasco |
| **Domain** | wigro-reifen.de |
| **Tech-Stack** | Vite 6 + React 18 + TypeScript + Tailwind CSS v3 |
| **Node.js Version** | v24.11.0 (getestet) — empfohlen: Node 20 LTS+ |
| **Build-Befehl** | `npm run build` |
| **Output** | `dist/` Ordner |
| **Build-Größe** | ~2.9 MB total (gzipped JS ~132 KB) |

---

## 2. Lokale Entwicklung

```bash
# 1. Repository klonen / entpacken
cd Website.v2

# 2. Dependencies installieren
npm install

# 3. Dev Server starten (http://localhost:5173)
npm run dev

# 4. Production Build erstellen
npm run build

# 5. Build lokal testen (http://localhost:4173)
npm run preview

# 6. TypeScript prüfen
npx tsc --noEmit
```

---

## 3. Content ändern

**Alle Texte** befinden sich in einer einzigen Datei:

```
src/data/content.ts
```

- Seitentitel, Meta-Descriptions, Headlines, CTAs → `COPY.meta`, `COPY.hero`, etc.
- Leistungen → `COPY.leistungen`
- Team-Mitglieder → `COPY.team`
- FAQ → `COPY.faq`
- Öffnungszeiten, Adresse → `COPY.kontakt` + `COPY.jsonLd`
- Impressum / Datenschutz → `COPY.impressum`, `COPY.datenschutz`

**Nach jeder Änderung:**
```bash
npm run build
```

**Bilder** liegen in `public/`:
- Mitarbeiter: `public/Mitarbeiter Bilder/*.webp`
- Logos & Werkstatt: `public/Logo Sonstige/*.webp`
- Reifenmarken: `public/Bilder Reifenmarken/*.webp`

---

## 4. Build-Ergebnis (Stand 2026-03-31)

| Datei | Größe | Gzip |
|---|---|---|
| `react-vendor.js` | 163 KB | 53 KB |
| `framer-motion.js` | 127 KB | 42 KB |
| `index.js` (App-Code) | 67 KB | 22 KB |
| `Home.js` | 17 KB | 4 KB |
| `Kontakt.js` | 13 KB | 3 KB |
| `lucide-react.js` | 12 KB | 3 KB |
| `index.css` | 38 KB | 7 KB |
| **Gesamt JS (gzip)** | — | **~132 KB** |
| **Gesamt Build** | — | **~2.9 MB** |

---

## 5. Hosting

### Option A: Vercel (Empfohlen)

Einfachste Option — kostenlos, automatisches HTTPS, globales CDN.

```bash
# 1. Vercel CLI installieren
npm install -g vercel

# 2. In Website.v2/ Ordner: Deployment starten
vercel

# Oder: GitHub Repo verbinden → Vercel Dashboard
# → Automatisches Re-Deployment bei jedem Push
```

Die `vercel.json` ist bereits im Projekt enthalten — SPA-Routing funktioniert automatisch.

### Option B: Netlify

```bash
# 1. Netlify CLI installieren
npm install -g netlify-cli

# 2. Deployment starten
netlify deploy --prod --dir=dist
```

Die `public/_redirects` Datei ist bereits im Projekt — wird bei Build in `dist/` kopiert.

**Netlify Forms** für Kontaktformular aktivieren:
- In `src/components/sections/KontaktFormular.tsx` das `<form>`-Element um `data-netlify="true"` ergänzen
- Kein separates Backend nötig

### Option C: Eigener Server (Apache)

Die `public/.htaccess` Datei ist bereits im Projekt — wird bei Build in `dist/` kopiert.

```nginx
# Nginx-Konfiguration (falls Nginx statt Apache)
location / {
  root /var/www/wigro-reifen;
  try_files $uri $uri/ /index.html;
}
```

Für Apache: Die `.htaccess` im `dist/`-Ordner ist bereits korrekt konfiguriert.

---

## 6. Domain & DNS-Umzug

Schritte für den Wechsel von der alten WordPress-Site:

1. **Neuen Host einrichten** und `dist/`-Ordner hochladen
2. **DNS A-Record** (oder CNAME) auf neuen Host umstellen
   - Bei Vercel/Netlify: CNAME auf `*.vercel.app` / `*.netlify.app`
   - Propagation dauert 0–48h
3. **SSL-Zertifikat** einrichten
   - Vercel/Netlify: automatisch (Let's Encrypt)
   - Eigener Server: `certbot --nginx` oder `certbot --apache`
4. **www → non-www Redirect** konfigurieren (oder umgekehrt)
   - Empfehlung: `wigro-reifen.de` (ohne www) als primäre Domain
5. **Alte WordPress-Site** deaktivieren (erst nach DNS-Propagation!)
6. **Google Search Console**: Neue Property anlegen, Sitemap einreichen
7. **Google Business Profile**: Website-URL auf `https://wigro-reifen.de` aktualisieren

---

## 7. Post-Launch Checkliste

- [ ] Website unter `wigro-reifen.de` erreichbar
- [ ] HTTPS aktiv, kein Mixed Content (Browser-Schloss grün)
- [ ] Alle 6 Seiten erreichbar (/, /leistungen, /team, /kontakt, /impressum, /datenschutz)
- [ ] Direkte URL-Eingabe funktioniert (z.B. `wigro-reifen.de/leistungen` direkt aufrufen)
- [ ] Kontaktformular mit echtem Backend verbunden (n8n / Netlify Forms / Formspree)
- [ ] `wigro-reifen.de/sitemap.xml` erreichbar
- [ ] `wigro-reifen.de/robots.txt` erreichbar
- [ ] Google Search Console: Sitemap einreichen
- [ ] Google PageSpeed Insights prüfen (Ziel: >90 Mobile)
- [ ] Google Business Profile aktualisieren
- [ ] OG-Image erstellen (`/public/og-image.jpg`, 1200×630px) für Social-Media-Vorschau

---

## 8. Vor dem Live-Gang (Pflicht!)

**Diese zwei Punkte MÜSSEN vor dem Produktivgang erledigt werden:**

### 8.1 Öffnungszeiten verifizieren

Mit Mario Rampérez y Carrasco die aktuellen Öffnungszeiten bestätigen.
Aktuell in `content.ts` und JSON-LD: **Mo–Fr 08:00–12:30 & 13:00–17:00**

Nach Bestätigung anpassen in:
- `src/data/content.ts` → `COPY.kontakt.oeffnungszeiten`
- `src/data/content.ts` → `COPY.jsonLd.openingHoursSpecification`

### 8.2 Kontaktformular Backend einbinden

Das Formular ist aktuell nur simuliert (setTimeout). Optionen:

**Option 1: n8n Webhook** (empfohlen — n8n läuft bereits für WIGRO)
```typescript
// In KontaktFormular.tsx — handleSubmit ersetzen:
const response = await fetch('https://[n8n-url]/webhook/kontakt-wigro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, telefon, nachricht }),
})
```

**Option 2: Netlify Forms** (nur wenn Netlify als Host)
- `<form>` Tag um `data-netlify="true" name="kontakt"` ergänzen
- Submissions erscheinen im Netlify Dashboard

**Option 3: Formspree** (einfachste Lösung)
- Account auf formspree.io anlegen
- `action="https://formspree.io/f/[ID]"` zum `<form>` hinzufügen

---

## 9. Bekannte Post-Launch Todos (niedrige Priorität)

| Priorität | Aufgabe |
|---|---|
| 🟡 Mittel | OG-Image erstellen (1200×630px) für Social-Media-Vorschau |
| 🟡 Mittel | Google Fonts lokal hosten (DSGVO-Optimierung) |
| 🟡 Mittel | Google Maps Consent-Wrapper (2-Klick für DSGVO-kritische Nutzer) |
| 🟢 Niedrig | Heatmap / Analytics einbinden (nach Cookie-Consent) |
| 🟢 Niedrig | Service-Schema JSON-LD pro Leistungsseite |

---

## 10. Kontakt & Support

| Rolle | Kontakt |
|---|---|
| **Entwicklung** | Luke Kozik |
| **Inhaber / Kunde** | Mario Rampérez y Carrasco — 02302 54951 |
| **E-Mail Kunde** | info@wigro-reifen.de |

---

*Dokumentation erstellt von Claude Code | PROMPT_10 Deployment | 2026-03-31*
