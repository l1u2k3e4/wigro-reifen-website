# FIX_25 — Chatbot: Grünen Puls-Ring um den FAB-Button wiederherstellen

## Ziel
Der grüne pulsierende Ring um den Chat-FAB-Button ist nicht mehr sichtbar. Er soll wieder klar erkennbar pulsieren, um Aufmerksamkeit auf den Chat zu ziehen.

---

## Problem-Analyse

### Aktueller CSS-Code im ChatWidget (ca. Zeile 133–151):
```css
.wigro-chat .wg-fab::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--wg-accent);
  opacity: 0;
  animation: wgPulse 2.5s ease-out infinite;
}

.wigro-chat .wg-fab.active::before {
  animation: none;
  opacity: 0;
}

@keyframes wgPulse {
  0%   { transform: scale(1);    opacity: 0.6; }
  100% { transform: scale(1.35); opacity: 0; }
}
```

### Warum der Puls nicht sichtbar ist:

**Mögliche Ursache 1:** Die `opacity: 0` Initial-Deklaration auf dem `::before` Element konkurriert mit der Keyframe-Animation. Manche Browser (besonders Mobile Safari) ignorieren die `animation`-Override wenn `opacity: 0` direkt auf dem Element gesetzt ist.

**Mögliche Ursache 2:** Auf Mobile (≤500px) wird der FAB auf `position: fixed` gesetzt. Durch die Neupositionierung und den geänderten Stacking-Context kann der `::before`-Pseudo-Element abgeschnitten werden, besonders wenn ein Eltern-Element `overflow: hidden` hat.

**Mögliche Ursache 3:** Die `body.menu-open .wigro-chat { display: none !important; }` Regel blendet den gesamten Widget aus. Nach dem Schließen des Menüs wird `display` wieder auf den Default zurückgesetzt — aber manche Browser starten CSS-Animationen nach `display: none → display: block` nicht automatisch neu.

---

## Datei
- `src/components/ChatWidget.tsx`

---

## Lösung: Puls-Animation robuster machen

### Schritt 1: `::before` Puls-CSS korrigieren

Suche im CSS-String (innerhalb der Template-Literal-Variable `css`) den Block `.wigro-chat .wg-fab::before` und ersetze ihn:

**Alt (ca. Zeile 133–141):**
```css
.wigro-chat .wg-fab::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--wg-accent);
  opacity: 0;
  animation: wgPulse 2.5s ease-out infinite;
}
```

**Neu:**
```css
.wigro-chat .wg-fab::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--wg-accent);
  pointer-events: none;
  animation: wgPulse 2.5s ease-out infinite;
  will-change: transform, opacity;
}
```

### Änderungen:
- `opacity: 0` **entfernt** — die Animation steuert die Opacity selbst (startet bei 0.6, endet bei 0)
- `pointer-events: none` hinzugefügt — verhindert, dass der Puls-Ring Klicks abfängt
- `will-change: transform, opacity` hinzugefügt — erzwingt GPU-Layer für flüssige Animation

### Schritt 2: Keyframes anpassen für bessere Sichtbarkeit

**Alt (ca. Zeile 148–151):**
```css
@keyframes wgPulse {
  0%   { transform: scale(1);    opacity: 0.6; }
  100% { transform: scale(1.35); opacity: 0; }
}
```

**Neu:**
```css
@keyframes wgPulse {
  0%   { transform: scale(1);    opacity: 0.7; }
  70%  { transform: scale(1.25); opacity: 0.3; }
  100% { transform: scale(1.4);  opacity: 0; }
}
```

### Änderungen:
- Start-Opacity von `0.6` → `0.7` — etwas sichtbarer
- Zusätzlicher Keyframe bei `70%` — der Ring bleibt länger sichtbar bevor er verschwindet
- End-Scale von `1.35` → `1.4` — etwas größerer Puls-Radius

### Schritt 3: Active-State beibehalten (Puls stoppen wenn Chat offen)

Der bestehende Code ist korrekt:
```css
.wigro-chat .wg-fab.active::before {
  animation: none;
  opacity: 0;
}
```

Dieser bleibt unverändert — wenn der Chat geöffnet ist, wird der Puls gestoppt.

### Schritt 4: Mobile FAB — sicherstellen dass `overflow` nicht schneidet

Prüfe den Mobile-CSS-Block für den FAB (ca. Zeile 449–456):
```css
.wigro-chat .wg-fab {
  position: fixed;
  bottom: 96px;
  right: 16px;
  width: 56px;
  height: 56px;
  z-index: 2147483647;
}
```

Füge `overflow: visible` explizit hinzu, damit der `::before`-Ring nicht abgeschnitten wird:

```css
.wigro-chat .wg-fab {
  position: fixed;
  bottom: 96px;
  right: 16px;
  width: 56px;
  height: 56px;
  z-index: 2147483647;
  overflow: visible;
}
```

### Schritt 5: Desktop FAB — auch `overflow: visible` sicherstellen

Im Haupt-FAB-CSS (ca. Zeile 91–103), füge hinzu:

```css
.wigro-chat .wg-fab {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  display: grid;
  place-items: center;
  background: var(--wg-primary);
  box-shadow: 0 6px 24px rgba(30, 45, 77, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: visible;
}
```

---

## Zusammenfassung der CSS-Änderungen im ChatWidget

1. `::before` — `opacity: 0` entfernen, `pointer-events: none` + `will-change` hinzufügen
2. `@keyframes wgPulse` — 3 Keyframes statt 2, höhere Start-Opacity
3. FAB Desktop — `overflow: visible` hinzufügen
4. FAB Mobile — `overflow: visible` hinzufügen

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. Desktop: Grüner Puls-Ring pulsiert sichtbar um den FAB-Button
3. Mobile: Grüner Puls-Ring ist auch über der StickyCTABar sichtbar
4. Chat öffnen → Puls stoppt
5. Chat schließen → Puls startet wieder
6. MobileMenu öffnen → Chat verschwindet → Menü schließen → Chat + Puls erscheinen wieder
7. Puls-Farbe ist lime-grün (`var(--wg-accent)` = `#c5e030`)
