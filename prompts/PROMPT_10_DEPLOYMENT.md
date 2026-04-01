# PROMPT_10: Deployment & Übergabe

## WICHTIG: Vor dem Start

**Lies folgende Skills bevor du anfängst:**
- `/frontend-design` — Build-Prozess, Deployment-Varianten

**Lies die CLAUDE.md im Projekt-Root für Kontext und Konventionen.**
**Lies `docs/review-report.md` — Deployment-Freigabe muss "JA" sein.**

---

## Ziel

Am Ende existiert ein produktionsfertiger Build in `dist/`, eine vollständige Deployment-Anleitung, und die Übergabe-Dokumentation für den Kunden.

---

## Kontext

Die Website hat alle Reviews (PROMPT_09) bestanden. Jetzt wird der Production Build erstellt, final getestet, und die Deployment-Dokumentation geschrieben.

---

## Aufgaben

### 1. Pre-Build Checks

```bash
# Sicherstellen dass alles clean ist
npx tsc --noEmit
npm run build

# Keine Entwicklungs-Artefakte
grep -rn "console\." src/ --include="*.tsx" --include="*.ts"
grep -rn "TODO\|FIXME\|HACK" src/
grep -rn "localhost" src/

# Dependencies prüfen
npm audit
```

### 2. Production Build erstellen

```bash
# Clean Build
rm -rf dist/
npm run build

# Build-Größe prüfen
echo "=== Build Output ==="
du -sh dist/
echo "=== JS Bundles ==="
ls -lh dist/assets/*.js
echo "=== CSS ==="
ls -lh dist/assets/*.css
echo "=== HTML ==="
ls -lh dist/index.html
```

### 3. Build verifizieren

```bash
# Preview Server starten
npm run preview
```

Manuell verifizieren (Checkliste):

#### Funktionalität
- [ ] Startseite lädt korrekt
- [ ] Alle 6 Seiten erreichbar
- [ ] Navigation funktioniert (Desktop + Mobile)
- [ ] Alle CTAs funktionieren (Anrufen, WhatsApp, Route planen)
- [ ] Kontaktformular funktioniert
- [ ] FAQ Accordion öffnet/schließt
- [ ] Cookie-Banner erscheint und funktioniert
- [ ] Sticky CTA-Bar erscheint auf Mobile

#### Responsive
- [ ] 375px (iPhone SE) — alles lesbar und bedienbar
- [ ] 768px (iPad) — Layouts korrekt
- [ ] 1280px (Desktop) — volle Darstellung
- [ ] 1920px (großer Monitor) — kein Stretch

#### Performance
- [ ] Ladezeit < 2s (4G Throttling)
- [ ] Keine Layout-Shifts beim Laden
- [ ] Bilder laden lazy (unterhalb Fold)
- [ ] Animationen smooth (60fps)

#### SEO
- [ ] Seitentitel korrekt in Browser-Tab
- [ ] View-Source: Meta-Tags vorhanden
- [ ] View-Source: JSON-LD vorhanden
- [ ] sitemap.xml erreichbar (/sitemap.xml)
- [ ] robots.txt erreichbar (/robots.txt)

#### Legal
- [ ] Impressum erreichbar und vollständig
- [ ] Datenschutzerklärung erreichbar und vollständig
- [ ] Cookie-Consent funktional

### 4. Hosting-Empfehlung dokumentieren

Empfohlene Hosting-Optionen für eine statische Vite/React-Website:

#### Option A: Vercel (Empfohlen)
- Kostenlos für kleine Projekte
- Automatisches HTTPS
- Globales CDN
- Einfaches Deployment via Git

#### Option B: Netlify
- Kostenlos für kleine Projekte
- Automatisches HTTPS
- Form Handling (für Kontaktformular)
- Redirect-Regeln für SPA

#### Option C: Eigener Server (Apache/Nginx)
- Volle Kontrolle
- Erfordert manuelle HTTPS-Einrichtung
- Erfordert SPA-Redirect-Konfiguration

### 5. SPA Routing-Konfiguration

Für Client-Side Routing muss der Server alle Requests auf `index.html` umleiten:

#### Vercel (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Netlify (`public/_redirects`)
```
/*    /index.html   200
```

#### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Apache (`.htaccess`)
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### 6. Domain-Konfiguration

Dokumentiere die Schritte für den DNS-Umzug:
1. DNS A-Record oder CNAME auf neuen Host zeigen
2. SSL-Zertifikat einrichten (Let's Encrypt)
3. www → non-www Redirect (oder umgekehrt)
4. Alte WordPress-Site vom Server nehmen
5. Google Search Console: Neue Property verifizieren
6. Google Business Profile: Website-URL aktualisieren

### 7. Post-Launch Checkliste

- [ ] Website unter `wigro-reifen.de` erreichbar
- [ ] HTTPS aktiv und kein Mixed Content
- [ ] Alle Seiten erreichbar (keine 404)
- [ ] Google Search Console: Sitemap einreichen
- [ ] Google Search Console: Indexierung prüfen
- [ ] Google PageSpeed Insights: Scores prüfen
- [ ] Google Business Profile aktualisieren
- [ ] Alte WordPress-URLs 301-Redirects (falls nötig)
- [ ] Browser-Cache der alten Seite prüfen

### 8. Übergabe-Dokumentation erstellen

Erstelle `docs/deployment-guide.md` mit:

```markdown
# WIGRO Reifen — Website V2 Deployment Guide

## 1. Projekt-Info
- Tech-Stack: Vite + React + TypeScript + Tailwind CSS
- Node.js Version: [X.X]
- Build-Befehl: `npm run build`
- Output: `dist/` Ordner

## 2. Entwicklung
```bash
npm install        # Dependencies installieren
npm run dev        # Dev Server starten (localhost:5173)
npm run build      # Production Build
npm run preview    # Build lokal testen
```

## 3. Content ändern
- Alle Texte in `src/data/content.ts`
- Bilder in `public/images/`
- Nach Änderungen: `npm run build`

## 4. Hosting Setup
[Gewählte Option dokumentieren]

## 5. Domain & DNS
[Schritte für DNS-Umzug]

## 6. Kontakt
Entwicklung: Luke ([E-Mail])
```

---

## Erwartetes Ergebnis

1. `dist/` — Production Build, fehlerfrei
2. `docs/deployment-guide.md` — Vollständige Deployment-Anleitung
3. Hosting-spezifische Config-Dateien (vercel.json ODER _redirects ODER .htaccess)
4. Alle Checks bestanden

---

## Verification

- [ ] `dist/` Ordner existiert und enthält alle Assets
- [ ] Build-Größe dokumentiert (JS, CSS, Bilder)
- [ ] `docs/deployment-guide.md` existiert und ist vollständig
- [ ] SPA Routing-Config vorhanden
- [ ] Keine TODO/FIXME/console.log im Code
- [ ] Keine TypeScript-Fehler
- [ ] Pre-Build Checks alle bestanden
- [ ] Post-Launch Checkliste dokumentiert
- [ ] Website ist bereit für Deployment
