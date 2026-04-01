# FIX_18 — FAQ: 4 Fragen entfernen + 2 Fragen inhaltlich anpassen

## Ziel
Im Bereich „Häufig gestellte Fragen" 4 Fragen komplett entfernen und 2 bestehende Fragen inhaltlich überarbeiten.

---

## Tech-Stack & Konventionen
- Content zentral in `src/data/content.ts` (COPY-Objekt)
- FAQ-Section rendert aus `COPY.faq.items` — keine Änderungen an Komponenten nötig
- JSON-LD FAQPage Schema in `src/pages/Home.tsx` generiert sich automatisch aus `COPY.faq.items`

---

## Datei
- `src/data/content.ts`

---

## Änderung 1: 4 Fragen komplett entfernen

Entferne die folgenden 4 FAQ-Einträge aus dem `COPY.faq.items`-Array:

### Frage 1 (aktuell Index 0):
```ts
{
  frage: 'Wann sollte ich Reifen wechseln?',
  antwort: 'Die bekannte Faustregel lautet „O bis O": Von Oktober bis Ostern Winterreifen, danach Sommerreifen. Entscheidend ist die Temperatur: Unter 7°C greifen Sommerreifen schlechter — Winterreifen sind dann deutlich sicherer. Ganzjahresreifen sind ein Kompromiss, der für stadtnahe Fahrer mit wenig winterlichen Einsatz eine Option sein kann.',
},
```

### Frage 2 (aktuell Index 3):
```ts
{
  frage: 'Was kostet die Reifeneinlagerung?',
  antwort: 'Die Einlagerungspreise in Witten liegen typischerweise ab ca. 25–35 € pro Saison für vier Reifen. Für unser aktuelles Angebot rufen Sie uns an oder schreiben Sie uns — wir beraten Sie gerne.',
},
```

### Frage 3 (aktuell Index 6):
```ts
{
  frage: 'Montieren Sie auch Reifen, die ich woanders gekauft habe?',
  antwort: 'Ja, das ist kein Problem. Bringen Sie die Reifen einfach mit, und wir montieren sie fachgerecht auf Ihre Felgen.',
},
```

### Frage 4 (aktuell Index 9):
```ts
{
  frage: 'Haben Sie auch an Wochenenden geöffnet?',
  antwort: 'Wir sind Montag bis Freitag von 08:00 bis 12:30 Uhr und von 13:00 bis 17:00 Uhr für Sie da.',
},
```

---

## Änderung 2: „Welche Reifenmarken führen Sie?" — Text anpassen

### Aktuelle Version (nach Entfernung von Fragen wird dies ungefähr Index 2):
```ts
{
  frage: 'Welche Reifenmarken führen Sie?',
  antwort: 'Wir führen und montieren Reifen der führenden Hersteller: Hankook, Michelin, Continental, Nexen und Nokian. Natürlich montieren wir auch Reifen anderer Marken, die Sie mitbringen.',
},
```

### Neue Version:
```ts
{
  frage: 'Welche Reifenmarken führen Sie?',
  antwort: 'Wir führen Reifen namhafter Hersteller wie Hankook, Michelin, Continental, Nexen und Nokian. Darüber hinaus können wir auf Wunsch auch andere Reifenmarken für Sie bestellen und montieren — sprechen Sie uns einfach an.',
},
```

**Kernänderung:** Es wird klar kommuniziert, dass WIGRO nicht nur bestimmte Marken führt, sondern grundsätzlich auch andere Marken auf Wunsch bestellen und montieren kann.

---

## Änderung 3: „Brauche ich einen Termin für den Reifenwechsel?" — Erster Satz anpassen

### Aktuelle Version (wird nach Entfernung ungefähr Index 0):
```ts
{
  frage: 'Brauche ich einen Termin für den Reifenwechsel?',
  antwort: 'Einen Termin zu vereinbaren ist sinnvoll, besonders in der Hochsaison (Oktober und April). Rufen Sie uns an oder schreiben Sie uns auf WhatsApp — wir finden schnell einen passenden Termin für Sie.',
},
```

### Neue Version:
```ts
{
  frage: 'Brauche ich einen Termin für den Reifenwechsel?',
  antwort: 'Ja, ein Termin ist erforderlich. Besonders in der Hochsaison (Oktober und April) ist eine Terminvereinbarung wichtig, damit wir genug Zeit für Ihr Fahrzeug einplanen können. Rufen Sie uns an oder schreiben Sie uns auf WhatsApp — wir finden schnell einen passenden Termin für Sie.',
},
```

**Kernänderung:** Der erste Satz ist jetzt eindeutig: „Ja, ein Termin ist erforderlich." statt dem weicheren „Einen Termin zu vereinbaren ist sinnvoll".

---

## Ergebnis: Neues FAQ-Array nach allen Änderungen

Das `COPY.faq.items`-Array sollte danach genau **6 Einträge** enthalten (vorher 10, minus 4):

```ts
items: [
  {
    frage: 'Brauche ich einen Termin für den Reifenwechsel?',
    antwort: 'Ja, ein Termin ist erforderlich. Besonders in der Hochsaison (Oktober und April) ist eine Terminvereinbarung wichtig, damit wir genug Zeit für Ihr Fahrzeug einplanen können. Rufen Sie uns an oder schreiben Sie uns auf WhatsApp — wir finden schnell einen passenden Termin für Sie.',
  },
  {
    frage: 'Was kostet ein Reifenwechsel bei WIGRO?',
    antwort: 'Die Kosten hängen von der Reifengröße und dem Umfang ab. Für eine genaue Preisauskunft rufen Sie uns einfach an: 02302 54951. Wir nennen Ihnen ehrlich und ohne versteckte Kosten den Preis.',
  },
  {
    frage: 'Welche Reifenmarken führen Sie?',
    antwort: 'Wir führen Reifen namhafter Hersteller wie Hankook, Michelin, Continental, Nexen und Nokian. Darüber hinaus können wir auf Wunsch auch andere Reifenmarken für Sie bestellen und montieren — sprechen Sie uns einfach an.',
  },
  {
    frage: 'Wie finde ich die richtige Reifengröße?',
    antwort: 'Die Reifengröße steht in Ihrem Fahrzeugschein (Zulassungsbescheinigung Teil I, Feld 15.1) oder in der Tankklappe / Fahrertür. Alternativ steht sie auf dem Reifen selbst, z.B. „205/55 R16". Kommen Sie einfach vorbei — wir schauen gemeinsam, was passt.',
  },
  {
    frage: 'Wie lange dauert ein Reifenwechsel?',
    antwort: 'In der Regel 30–45 Minuten für ein komplettes Fahrzeug. In der Hochsaison kann es etwas länger dauern — deshalb empfehlen wir einen Termin vorab.',
  },
  {
    frage: 'Messen Sie kostenlos die Profiltiefe?',
    antwort: 'Ja. Wenn Sie unsicher sind, ob Ihre Reifen noch sicher sind, kommen Sie einfach vorbei — wir messen kostenlos nach und geben Ihnen eine ehrliche Einschätzung.',
  },
],
```

---

## Achtung: JSON-LD Schema
Das FAQPage Schema in `src/pages/Home.tsx` (Zeile 73–84) generiert sich automatisch aus `COPY.faq.items`. Es sind **keine manuellen Schema-Änderungen** nötig — das Schema aktualisiert sich beim nächsten Build automatisch.

---

## Verifikation
1. `npx tsc --noEmit` → keine TypeScript-Fehler
2. FAQ-Section zeigt nur noch 6 Fragen (nicht 10)
3. „Brauche ich einen Termin..." beginnt mit „Ja, ein Termin ist erforderlich."
4. „Welche Reifenmarken..." erwähnt, dass auch andere Marken bestellt werden können
5. Die 4 entfernten Fragen erscheinen weder auf der Seite noch im JSON-LD Schema
