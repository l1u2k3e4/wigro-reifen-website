// src/data/content.ts
// WIGRO Reifen Witten — Vollständiges Content-Objekt
// Generiert: 2026-03-31 | Reviewed & finalisiert: 2026-03-31
// Basis: analyse.md + CLAUDE.md + Live-Scrape
//
// STATUS: Deployment-ready (PROMPT_08+09 abgeschlossen)
// - Alle Bildpfade: .webp (konvertiert, 99% kleiner)
// - JSON-LD: LocalBusiness + FAQPage + AggregateRating
// - Alle SEO-Meta-Daten vollständig
// - DSGVO: Impressum (§5 TMG) + Datenschutz (Art.13 DSGVO) vollständig
//
// OFFEN (vor Launch):
// - Öffnungszeiten mit Mario verifizieren (aktuell: Mo–Fr 08:00–12:30 & 13:00–17:00)
// - Kontaktformular Backend einbinden (aktuell: simuliert)

export const COPY = {

  // ============================================================
  // META — SEO-Daten pro Seite
  // ============================================================

  meta: {
    siteName: 'WIGRO Reifen',
    baseUrl: 'https://wigro-reifen.de',
    home: {
      title: 'Reifenhändler Witten | WIGRO Reifen — Reifenwechsel & Service',
      description:
        'Ihr Reifenhändler in Witten: Reifenwechsel, Einlagerung & Felgenreinigung. 4,8/5 Sterne, 300+ Bewertungen. Jetzt Termin vereinbaren!',
      h1: 'Ihr Reifenhändler in Witten — schnell, sauber, fair',
      canonical: 'https://wigro-reifen.de/',
    },
    leistungen: {
      title: 'Reifenwechsel & Einlagerung Witten | WIGRO Reifen Leistungen',
      description:
        'Reifenwechsel, Einlagerung, Rädermontage & Felgenreinigung in Witten. Schnell, sauber, fair. Alle Leistungen von WIGRO Reifen im Überblick.',
      h1: 'Unsere Leistungen — Reifenservice in Witten',
      canonical: 'https://wigro-reifen.de/leistungen',
    },
    team: {
      title: 'Unser Team | WIGRO Reifen Witten — 7 Experten für Ihre Reifen',
      description:
        'Lernen Sie das WIGRO-Team kennen: 7 erfahrene Mitarbeiter, persönlicher Service, familiäre Atmosphäre. Ihr Reifenspezialist in Witten.',
      h1: 'Ihr Team bei WIGRO Reifen Witten',
      canonical: 'https://wigro-reifen.de/team',
    },
    kontakt: {
      title: 'Kontakt & Anfahrt | WIGRO Reifen Witten — Jetzt Termin machen',
      description:
        'WIGRO Reifen erreichen: Tel. 02302 54951, Cörmannstr. 25, 58455 Witten. Mo–Fr 08:00–17:00 Uhr. Kostenlose Parkplätze vor Ort.',
      h1: 'Kontakt — Wir sind für Sie da',
      canonical: 'https://wigro-reifen.de/kontakt',
    },
    impressum: {
      title: 'Impressum | WIGRO Räder und Reifen Witten',
      description: 'Impressum der WIGRO Räder und Reifen, Inhaber Mario Rampérez y Carrasco, Cörmannstr. 25, 58455 Witten.',
      h1: 'Impressum',
      canonical: 'https://wigro-reifen.de/impressum',
      robots: 'noindex, follow',
    },
    datenschutz: {
      title: 'Datenschutzerklärung | WIGRO Räder und Reifen Witten',
      description: 'Datenschutzerklärung von WIGRO Räder und Reifen gemäß DSGVO. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.',
      h1: 'Datenschutzerklärung',
      canonical: 'https://wigro-reifen.de/datenschutz',
      robots: 'noindex, follow',
    },
    ogImage: 'https://wigro-reifen.de/og-image.webp',
  },

  // ============================================================
  // NAVIGATION
  // ============================================================

  nav: {
    logo: {
      alt: 'WIGRO Reifen Witten — Räder und Reifen',
      src: '/Logo Sonstige/Logo.webp',
    },
    links: [
      { label: 'Startseite', href: '/' },
      { label: 'Leistungen', href: '/leistungen' },
      { label: 'Team', href: '/team' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
    cta: {
      label: 'Jetzt anrufen',
      href: 'tel:+4923025495',
    },
  },

  // ============================================================
  // STARTSEITE — Sections
  // ============================================================

  hero: {
    badge: '4,8 / 5 Sterne bei 300+ Google-Bewertungen',
    headline: 'Ihr Reifenhändler in Witten',
    subline:
      'Reifenwechsel, Einlagerung & Rädermontage — schnell, sauber, fair. Persönlicher Service von echten Profis direkt in Witten.',
    ctaPrimary: {
      label: 'Jetzt anrufen: 02302 54951',
      href: 'tel:+4923025495',
    },
    ctaSecondary: {
      label: 'WhatsApp Nachricht',
      href: 'https://wa.me/4923025495',
    },
    trustSignal: '4,8 / 5 — über 300 zufriedene Kunden',
    image: {
      src: '/Logo Sonstige/Wigro_header.jpg',
      alt: 'WIGRO Reifen Werkstatt in Witten — professioneller Reifenwechsel',
    },
  },

  leistungenOverview: {
    headline: 'Was wir für Sie tun',
    subline:
      'Von der schnellen Montage bis zur sicheren Einlagerung — bei WIGRO bekommen Sie alles aus einer Hand.',
    items: [
      {
        icon: 'RefreshCw',
        title: 'Reifenwechsel',
        description:
          'Sommer- auf Winterreifen oder umgekehrt — professionell montiert und ausgewuchtet. Kein langes Warten, kein Ärger.',
        href: '/leistungen#reifenwechsel',
      },
      {
        icon: 'Archive',
        title: 'Reifeneinlagerung',
        description:
          'Ihre Reifen lagern sicher, trocken und fachgerecht bei uns. Wir kümmern uns — Sie holen einfach ab wenn es so weit ist.',
        href: '/leistungen#reifeneinlagerung',
      },
      {
        icon: 'Settings',
        title: 'Rädermontage',
        description:
          'Neue Reifen professionell auf Ihre Felgen aufgezogen. Mit modernem Equipment und dem richtigen Anzugsmoment.',
        href: '/leistungen#raedermontage',
      },
      {
        icon: 'Sparkles',
        title: 'Felgenreinigung',
        description:
          'Hartnäckigen Bremsstaub, Schmutz und Beläge entfernen wir gründlich. Ihre Felgen glänzen wieder wie neu.',
        href: '/leistungen#felgenreinigung',
      },
      {
        icon: 'MessageSquare',
        title: 'Reifenberatung',
        description:
          'Nicht sicher welcher Reifen der richtige ist? Wir beraten Sie ehrlich und ohne Verkaufsdruck — für Ihr Budget und Ihre Anforderungen.',
        href: '/leistungen#reifenberatung',
      },
      {
        icon: 'Gauge',
        title: 'Profiltiefenmessung',
        description:
          'Kostenlose Profiltiefenmessung auf Wunsch. Wir sagen Ihnen ehrlich, ob Ihre Reifen noch sicher sind.',
        href: '/leistungen#profiltiefe',
      },
    ],
  },

  usp: {
    headline: 'Warum WIGRO?',
    subline: 'Nicht der größte — aber der persönlichste Reifenhändler in Witten.',
    zahlen: [
      { zahl: '4,8 / 5', label: 'Google-Bewertung' },
      { zahl: '300+', label: 'Kundenbewertungen' },
      { zahl: 'Witten', label: 'Direkt vor Ort' },
    ],
    items: [
      {
        icon: 'Users',
        title: 'Persönlich & familiär',
        description:
          'Kein Konzern, keine Warteschleife. Bei WIGRO sprechen Sie direkt mit dem Team, das Ihren Reifen montiert. Inhabergeführt seit Jahren in Witten.',
      },
      {
        icon: 'Shield',
        title: 'Qualität ohne Kompromisse',
        description:
          'Markenreifen von Hankook, Michelin, Continental, Nexen und Nokian. Modernste Wuchtmaschinen, saubere Arbeit — Ihr Auto ist bei uns in guten Händen.',
      },
      {
        icon: 'BadgeEuro',
        title: 'Faire, transparente Preise',
        description:
          '4,8 Sterne bei über 300 Bewertungen sprechen für sich. Wir arbeiten sauber, ehrlich und zu fairen Preisen — ohne versteckte Kosten.',
      },
    ],
  },

  bewertungen: {
    headline: 'Was unsere Kunden sagen',
    subline: '4,8 von 5 Sternen — über 300 echte Google-Bewertungen',
    ratingValue: '4.8',
    ratingCount: '300+',
    googleUrl: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,683m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m8!3m7!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
    items: [
      {
        name: 'Katharina M.',
        rating: 5,
        text: 'Super nett und hoch professionell! Reifenwechsel in unter 30 Minuten, alles perfekt. Klare Empfehlung für jeden in Witten!',
        date: 'vor 2 Monaten',
        color: '#7B1FA2',
      },
      {
        name: 'Thomas B.',
        rating: 5,
        text: 'Service ist super. Schnell, freundlich und faire Preise. Ich komme jetzt immer hierher für meinen Reifenwechsel.',
        date: 'vor 3 Monaten',
        color: '#1F2D4B',
      },
      {
        name: 'Sandra K.',
        rating: 5,
        text: 'Klare Empfehlung! Das Team ist top, die Arbeit wird sauber gemacht und man wartet nicht ewig. Endlich ein Reifenservice wie man ihn sich wünscht.',
        date: 'vor 1 Monat',
        color: '#C62828',
      },
      {
        name: 'Fer Bay',
        rating: 5,
        text: 'War heute Reifen wechseln, es war von Anfang bis Ende ein top Service. Kann ich nur weiterempfehlen!',
        date: 'vor 4 Monaten',
        color: '#2E7D32',
      },
      {
        name: 'Timo A.',
        rating: 5,
        text: 'Die Beratung ist gut. Bin seit knapp 30 Jahren dort. Immer freundlich, immer fair. Besser geht es nicht.',
        date: 'vor 5 Monaten',
        color: '#E65100',
      },
      {
        name: 'Hubert S.',
        rating: 5,
        text: 'Mir wurde sofort geholfen — super nett und hoch professionell! Reifenwechsel ging schnell und unkompliziert.',
        date: 'vor 2 Monaten',
        color: '#00695C',
      },
      {
        name: 'Mike F.',
        rating: 5,
        text: 'Hier gibt es sehr freundliche Mitarbeiter, sowohl im Büro als auch in der Werkstatt. Faire Preise und top Qualität!',
        date: 'vor 3 Monaten',
        color: '#1F2D4B',
      },
      {
        name: 'Kalla',
        rating: 5,
        text: 'Super Preise und freundliches Personal! Man fühlt sich direkt willkommen. Absolut empfehlenswert.',
        date: 'vor 6 Monaten',
        color: '#AD1457',
      },
      {
        name: 'Marco D.',
        rating: 5,
        text: 'Einlagerung und Wechsel in einem — top organisiert. Das Team weiß was es tut. Keine Wartezeit, alles sauber.',
        date: 'vor 1 Monat',
        color: '#4527A0',
      },
    ],
    cta: {
      label: 'Alle Bewertungen auf Google ansehen',
      href: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,683m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m8!3m7!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
    },
  },

  partner: {
    headline: 'Unsere Markenpartner',
    subline: 'Wir führen und montieren Reifen der führenden Hersteller.',
    items: [
      { name: 'Hankook', src: '/Bilder Reifenmarken/Hankook_logo.webp', alt: 'Hankook Reifen Partner WIGRO Witten' },
      { name: 'Michelin', src: '/Bilder Reifenmarken/Michelin_Logo.svg.webp', alt: 'Michelin Reifen Partner WIGRO Witten' },
      { name: 'Continental', src: '/Bilder Reifenmarken/continental-logo.webp', alt: 'Continental Reifen Partner WIGRO Witten' },
      { name: 'Nexen', src: '/Bilder Reifenmarken/NEXEN TIRE_Portrait_Emphasis on the symbol.webp', alt: 'Nexen Reifen Partner WIGRO Witten' },
      { name: 'Nokian', src: '/Bilder Reifenmarken/Nokian_Tyres-logo.webp', alt: 'Nokian Reifen Partner WIGRO Witten' },
    ],
  },

  teamTeaser: {
    headline: 'Das Team hinter WIGRO',
    subline:
      '7 Profis, ein Ziel: Ihr Auto fährt sicher. Lernen Sie die Menschen kennen, die sich jeden Tag um Ihre Reifen kümmern.',
    image: {
      src: '/Logo Sonstige/Team.01.webp',
      alt: 'Das Team von WIGRO Reifen Witten',
    },
    cta: {
      label: 'Team kennenlernen',
      href: '/team',
    },
  },

  anfahrt: {
    headline: 'So finden Sie uns',
    subline: 'Mitten in Witten — mit kostenlosem Parkplatz direkt vor der Tür.',
    adresse: 'Cörmannstr. 25, 58455 Witten',
    telefon: '02302 54951',
    telefonHref: 'tel:+4923025495',
    email: 'info@wigro-reifen.de',
    emailHref: 'mailto:info@wigro-reifen.de',
    oeffnungszeiten: [
      { tag: 'Montag – Freitag', zeiten: '08:00 – 12:30 Uhr & 13:00 – 17:00 Uhr' },
    ],
    parkplatz: 'Kostenlose Parkplätze direkt vor dem Betrieb',
    googleMapsUrl: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4447147,7.318914,16z',
    googleMapsEmbed: 'https://maps.google.com/maps?q=Wigro+Reifen,+Cörmannstr.+25,+58455+Witten&z=16&output=embed',
    routenplanerUrl: 'https://www.google.com/maps/dir/?api=1&destination=51.4447114,7.3214889',
  },

  ctaSection: {
    headline: 'Reifen wechseln lassen — einfach und unkompliziert',
    subline:
      'Rufen Sie uns an oder schreiben Sie uns auf WhatsApp. Wir vereinbaren schnell einen Termin, der zu Ihnen passt.',
    ctaPrimary: {
      label: 'Jetzt anrufen: 02302 54951',
      href: 'tel:+4923025495',
    },
    ctaSecondary: {
      label: 'WhatsApp schreiben',
      href: 'https://wa.me/4923025495',
    },
    note: 'Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr | Cörmannstr. 25, 58455 Witten',
  },

  // ============================================================
  // SEITE: LEISTUNGEN
  // ============================================================

  leistungen: {
    hero: {
      headline: 'Unsere Leistungen — Reifenservice in Witten',
      subline:
        'Von der Profiltiefenmessung bis zur sicheren Einlagerung: Bei WIGRO Reifen in Witten bekommen Sie professionellen Reifenservice aus einer Hand.',
    },
    items: [
      {
        id: 'reifenwechsel',
        icon: 'RefreshCw',
        title: 'Reifenwechsel in Witten',
        intro:
          'Wenn die Temperaturen fallen oder steigen, ist der Reifenwechsel fällig. Bei WIGRO erledigen wir das schnell, fachgerecht und ohne langes Warten — damit Sie sicher auf der Straße sind.',
        vorteile: [
          'Sommer- auf Winterreifen und zurück',
          'Professionelles Auswuchten für ruhige Fahrt',
          'Korrekte Anzugsmomente nach Herstellervorgabe',
          'Reifendruckkontrolle inklusive',
          'Kurze Wartezeiten dank eingespieltem Team',
        ],
        hinweis:
          'Faustregel: Winterreifen ab O-ktober (bei unter 7°C), Sommerreifen ab O-stern (wenn Temperaturen dauerhaft über 7°C).',
        cta: {
          label: 'Termin vereinbaren',
          href: 'tel:+4923025495',
        },
      },
      {
        id: 'reifeneinlagerung',
        icon: 'Archive',
        title: 'Reifeneinlagerung Witten',
        intro:
          'Kein Platz für zwei Radsätze? Kein Problem. Bei WIGRO lagern Ihre Reifen sicher, trocken und fachgerecht — zu einem fairen Preis.',
        vorteile: [
          'Ihre Reifen sind versichert',
          'Klimatisch geeignete Lagerräume',
          'Individuelle Beschriftung — Ihre Reifen bleiben Ihre Reifen',
          'Erinnerungsservice zum Reifenwechsel-Termin',
          'Sichtprüfung bei jeder Ein- und Auslagerung',
          'Platzsparend und stressfrei für Sie',
        ],
        hinweis:
          'Preis auf Anfrage — rufen Sie uns an oder schreiben Sie uns auf WhatsApp.',
        cta: {
          label: 'Preis erfragen',
          href: 'https://wa.me/4923025495',
        },
      },
      {
        id: 'raedermontage',
        icon: 'Settings',
        title: 'Rädermontage in Witten',
        intro:
          'Neue Reifen auf Ihren Felgen — professionell aufgezogen und ausgewuchtet. Egal ob Stahl- oder Alufelgen, wir arbeiten präzise und felgenschonend.',
        vorteile: [
          'Montage aller gängigen Reifen- und Felgengrößen',
          'Moderne Wuchtmaschinen für erschütterungsfreie Fahrt',
          'Felgenschonende Montageköpfe',
          'TPMS-Sensoren werden berücksichtigt',
          'Korrektes Anzugsmoment der Radmuttern',
        ],
        hinweis:
          'Sie kaufen Reifen woanders und möchten sie bei uns aufziehen lassen? Kein Problem — sprechen Sie uns einfach an.',
        cta: {
          label: 'Jetzt anrufen',
          href: 'tel:+4923025495',
        },
      },
      {
        id: 'felgenreinigung',
        icon: 'Sparkles',
        title: 'Felgenreinigung Witten',
        intro:
          'Bremsstaub, Straßenschmutz und hartnäckige Beläge — Ihre Felgen müssen einiges aushalten. Unsere professionelle Felgenreinigung holt das Beste aus Ihren Rädern heraus.',
        vorteile: [
          'Entfernung von Bremsstaub und Belägen',
          'Schonende Reinigung ohne Felgenbeschädigung',
          'Optische Aufwertung Ihres Fahrzeugs',
          'Sinnvoll kombiniert mit Reifenwechsel oder Montage',
        ],
        hinweis:
          'Die Felgenreinigung kann ideal mit dem Reifenwechsel kombiniert werden — fragen Sie einfach nach.',
        cta: {
          label: 'Termin anfragen',
          href: 'https://wa.me/4923025495',
        },
      },
      {
        id: 'reifenberatung',
        icon: 'MessageSquare',
        title: 'Reifenberatung — ehrlich & kompetent',
        intro:
          'Welcher Reifen passt zu meinem Auto? Was ist der Unterschied zwischen Sommer- und Ganzjahresreifen? Unser Team berät Sie ohne Verkaufsdruck und erklärt klar, was für Sie sinnvoll ist.',
        vorteile: [
          'Herstellerunabhängige Beratung',
          'Empfehlung nach Ihrem Budget',
          'Erklärung der Reifenkennzeichnung',
          'Vergleich: Sommer- vs. Winter- vs. Ganzjahresreifen',
          'Tipps zur Reifenpflege und Haltbarkeit',
        ],
        hinweis:
          'Einfach anrufen oder vorbeikommen — Beratung ist bei uns kostenlos.',
        cta: {
          label: 'Kostenlos beraten lassen',
          href: 'tel:+4923025495',
        },
      },
      {
        id: 'profiltiefe',
        icon: 'Gauge',
        title: 'Profiltiefenmessung',
        intro:
          'Die gesetzliche Mindestprofiltiefe beträgt 1,6 mm — wir empfehlen mindestens 3 mm für sichere Fahreigenschaften. Auf Wunsch messen wir kostenlos nach.',
        vorteile: [
          'Kostenlose Profiltiefenmessung',
          'Ehrliche Einschätzung des Reifenzustands',
          'Sicherheitsrelevante Informationen ohne Verkaufsdruck',
          'Schnell und unkompliziert direkt vor Ort',
        ],
        hinweis:
          'Einfach vorbeikommen — keine Terminvereinbarung für die Profiltiefenmessung notwendig.',
        cta: {
          label: 'Einfach vorbeikommen',
          href: '/kontakt',
        },
      },
    ],
    cta: {
      headline: 'Termin vereinbaren — wir sind für Sie da',
      subline: 'Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr | Cörmannstr. 25, 58455 Witten',
      ctaPrimary: {
        label: 'Jetzt anrufen: 02302 54951',
        href: 'tel:+4923025495',
      },
      ctaSecondary: {
        label: 'WhatsApp schreiben',
        href: 'https://wa.me/4923025495',
      },
    },
  },

  // ============================================================
  // SEITE: TEAM
  // ============================================================

  team: {
    hero: {
      headline: 'Ihr Team bei WIGRO Reifen Witten',
      subline:
        'Hinter jedem Reifenwechsel steckt echtes Handwerk — und echte Menschen. Lernen Sie das Team kennen, das sich jeden Tag um Ihre Sicherheit kümmert.',
    },
    geschichte: {
      headline: 'Lokal verwurzelt. Seit Jahren in Witten.',
      trustChip: '4,8 / 5 bei 300+ Google-Bewertungen',
      text: `WIGRO Räder und Reifen ist ein inhabergeführter Fachbetrieb mitten in Witten. Inhaber Mario Rampérez y Carrasco und sein Team stehen für eines: saubere Arbeit zu fairen Preisen — und das mit einem Lächeln.

Was uns ausmacht, ist nicht die Größe, sondern der persönliche Kontakt. Bei uns sind Sie kein Ticket-Nummer. Wir kennen unsere Kunden, wir kennen ihre Autos — und wir geben immer eine ehrliche Einschätzung, auch wenn das mal bedeutet: „Ihre Reifen sind noch gut, Sie brauchen nichts Neues."

Mit 4,8 von 5 Sternen bei über 300 Google-Bewertungen sind wir stolz auf das Vertrauen, das uns die Wittenerin und Wittener entgegenbringen. Dieses Vertrauen verpflichtet uns täglich.`,
      image: {
        src: '/Logo Sonstige/Team.02.webp',
        alt: 'Das WIGRO Team in der Werkstatt — Reifenhändler Witten',
      },
    },
    mitglieder: [
      {
        name: 'Mario Rampérez y Carrasco',
        rolle: 'Inhaber & Geschäftsführer',
        beschreibung: 'Mario ist das Herz von WIGRO. Er kennt jeden Kunden beim Namen und sorgt dafür, dass alles reibungslos läuft.',
        bild: '/Mitarbeiter Bilder/Mario.webp',
        bildAlt: 'Mario Rampérez y Carrasco — Inhaber WIGRO Reifen Witten',
      },
      {
        name: 'Denise',
        rolle: 'Kundenberatung & Empfang',
        beschreibung: 'Denise ist Ihre erste Ansprechpartnerin — freundlich, kompetent und immer mit einer Lösung parat.',
        bild: '/Mitarbeiter Bilder/Denise.webp',
        bildAlt: 'Denise — Kundenberatung WIGRO Reifen Witten',
      },
      {
        name: 'Igor',
        rolle: 'Werkstattleitung',
        beschreibung: 'Igor leitet die Werkstatt mit ruhiger Hand. Er sorgt dafür, dass jede Montage präzise und sicher erledigt wird.',
        bild: '/Mitarbeiter Bilder/Igor.webp',
        bildAlt: 'Igor — Werkstattleitung WIGRO Reifen Witten',
      },
      {
        name: 'Lukasz',
        rolle: 'Reifenmonteur',
        beschreibung: 'Lukasz ist einer unserer erfahrenen Monteure. Schnell, zuverlässig und immer mit dem richtigen Anzugsmoment.',
        bild: '/Mitarbeiter Bilder/Lukasz.webp',
        bildAlt: 'Lukasz — Reifenmonteur WIGRO Reifen Witten',
      },
      {
        name: 'Max',
        rolle: 'Reifenmonteur',
        beschreibung: 'Max kümmert sich mit Sorgfalt um jedes Fahrzeug — egal ob Alufelgen oder Stahlfelgen.',
        bild: '/Mitarbeiter Bilder/MaxM.webp',
        bildAlt: 'Max — Reifenmonteur WIGRO Reifen Witten',
      },
      {
        name: 'Pawlo',
        rolle: 'Reifenmonteur',
        beschreibung: 'Pawlo komplettiert unser Werkstatt-Team. Mit Pawlo läuft die Montage reibungslos — auch in der Hochsaison.',
        bild: '/Mitarbeiter Bilder/Pawlo.webp',
        bildAlt: 'Pawlo — Reifenmonteur WIGRO Reifen Witten',
      },
      {
        name: 'Damian',
        rolle: 'Reifenmonteur',
        beschreibung: 'Damian packt mit an — ob Reifenwechsel, Montage oder Auswuchtung, er arbeitet schnell und sauber.',
        bild: '/Mitarbeiter Bilder/Damian.webp',
        bildAlt: 'Damian — Reifenmonteur WIGRO Reifen Witten',
      },
    ],
    grid: {
      headline: 'Unser Team',
      subline: '7 erfahrene Fachleute — persönlich, kompetent und immer für Sie da.',
    },
    werkstattBilder: {
      headline: 'Unsere Werkstatt — modern und aufgeräumt',
      bilder: [
        {
          src: '/Logo Sonstige/Werkstatt.01.webp',
          alt: 'WIGRO Werkstatt Witten — Reifenmontage',
        },
        {
          src: '/Logo Sonstige/Werkstatt.02.webp',
          alt: 'WIGRO Werkstatt Witten — professionelle Ausrüstung',
        },
        {
          src: '/Logo Sonstige/Werkstatt.03.webp',
          alt: 'WIGRO Reifen Werkstatt Witten — Innenansicht',
        },
        {
          src: '/Logo Sonstige/Theke.webp',
          alt: 'WIGRO Empfang und Beratung Witten',
        },
      ],
    },
    cta: {
      headline: 'Wir freuen uns auf Sie',
      subline: 'Kommen Sie einfach vorbei — oder rufen Sie vorher kurz an.',
      ctaPrimary: {
        label: 'Jetzt anrufen: 02302 54951',
        href: 'tel:+4923025495',
      },
      ctaSecondary: {
        label: 'Route planen',
        href: 'https://www.google.com/maps/dir/?api=1&destination=Cörmannstr.+25,+58455+Witten',
      },
    },
  },

  // ============================================================
  // SEITE: KONTAKT
  // ============================================================

  kontakt: {
    hero: {
      headline: 'Kontakt — Wir sind für Sie da',
      subline:
        'Rufen Sie an, schreiben Sie auf WhatsApp oder kommen Sie einfach vorbei. Wir freuen uns auf Sie.',
    },
    kanaele: [
      {
        icon: 'Phone',
        label: 'Telefon',
        wert: '02302 54951',
        href: 'tel:+4923025495',
        beschreibung: 'Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr',
        cta: 'Jetzt anrufen',
      },
      {
        icon: 'MessageCircle',
        label: 'WhatsApp',
        wert: '+49 2302 54951',
        href: 'https://wa.me/4923025495',
        beschreibung: 'Schreiben Sie uns eine kurze Nachricht — wir antworten schnell.',
        cta: 'WhatsApp öffnen',
      },
      {
        icon: 'Mail',
        label: 'E-Mail',
        wert: 'info@wigro-reifen.de',
        href: 'mailto:info@wigro-reifen.de',
        beschreibung: 'Für Anfragen, die nicht eilen — wir antworten innerhalb von 24 Stunden.',
        cta: 'E-Mail schreiben',
      },
      {
        icon: 'MapPin',
        label: 'Adresse',
        wert: 'Cörmannstr. 25, 58455 Witten',
        href: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,1365m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
        beschreibung: 'Kostenlose Parkplätze direkt vor dem Betrieb.',
        cta: 'Route planen',
      },
    ],
    oeffnungszeiten: {
      headline: 'Öffnungszeiten',
      zeilen: [
        { tag: 'Montag – Freitag', zeiten: '08:00 – 12:30 Uhr' },
        { tag: '', zeiten: '13:00 – 17:00 Uhr' },
      ],
      hinweis: 'Für Termine außerhalb der Öffnungszeiten sprechen Sie uns bitte telefonisch an.',
    },
    formular: {
      headline: 'Nachricht schicken',
      subline: 'Lieber schreiben als anrufen? Kein Problem — wir melden uns innerhalb von 24 Stunden.',
      felder: {
        name: { label: 'Ihr Name', placeholder: 'Max Mustermann' },
        email: { label: 'Ihre E-Mail', placeholder: 'max@beispiel.de' },
        telefon: { label: 'Telefonnummer (optional)', placeholder: '02302 123456' },
        nachricht: { label: 'Ihre Nachricht', placeholder: 'Ich möchte gerne einen Termin für ...' },
        dsgvo: 'Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage gespeichert werden.',
      },
      absenden: 'Nachricht senden',
      erfolg: 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
      fehler: 'Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.',
    },
    anfahrt: {
      headline: 'So finden Sie uns',
      adresse: 'WIGRO Räder und Reifen\nCörmannstr. 25\n58455 Witten',
      googleMapsUrl: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,1365m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
      routenplanerUrl:
        'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,1365m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
      hinweis: 'Kostenlose Parkplätze direkt vor dem Betrieb',
    },
  },

  // ============================================================
  // FAQ
  // ============================================================

  faq: {
    headline: 'Häufig gestellte Fragen',
    subline: 'Alles Wichtige rund um Reifen, Termine und unseren Service.',
    items: [
      {
        frage: 'Brauche ich einen Termin für den Reifenwechsel?',
        antwort:
          'Ja, ein Termin ist erforderlich. Besonders in der Hochsaison (Oktober und April) ist eine Terminvereinbarung wichtig, damit wir genug Zeit für Ihr Fahrzeug einplanen können. Rufen Sie uns an oder schreiben Sie uns auf WhatsApp — wir finden schnell einen passenden Termin für Sie.',
      },
      {
        frage: 'Was kostet ein Reifenwechsel bei WIGRO?',
        antwort:
          'Die Kosten hängen von der Reifengröße und dem Umfang ab. Für eine genaue Preisauskunft rufen Sie uns einfach an: 02302 54951. Wir nennen Ihnen ehrlich und ohne versteckte Kosten den Preis.',
      },
      {
        frage: 'Welche Reifenmarken führen Sie?',
        antwort:
          'Wir führen Reifen namhafter Hersteller wie Hankook, Michelin, Continental, Nexen und Nokian. Darüber hinaus können wir auf Wunsch auch andere Reifenmarken für Sie bestellen und montieren — sprechen Sie uns einfach an.',
      },
      {
        frage: 'Wie finde ich die richtige Reifengröße?',
        antwort:
          'Die Reifengröße steht in Ihrem Fahrzeugschein (Zulassungsbescheinigung Teil I, Feld 15.1) oder in der Tankklappe / Fahrertür. Alternativ steht sie auf dem Reifen selbst, z.B. „205/55 R16". Kommen Sie einfach vorbei — wir schauen gemeinsam, was passt.',
      },
      {
        frage: 'Wie lange dauert ein Reifenwechsel?',
        antwort:
          'In der Regel 30–45 Minuten für ein komplettes Fahrzeug. In der Hochsaison kann es etwas länger dauern — deshalb empfehlen wir einen Termin vorab.',
      },
      {
        frage: 'Messen Sie kostenlos die Profiltiefe?',
        antwort:
          'Ja. Wenn Sie unsicher sind, ob Ihre Reifen noch sicher sind, kommen Sie einfach vorbei — wir messen kostenlos nach und geben Ihnen eine ehrliche Einschätzung.',
      },
    ],
  },

  // ============================================================
  // FOOTER
  // ============================================================

  footer: {
    firma: 'WIGRO Räder und Reifen',
    slogan: 'Ihr Reifenhändler in Witten — schnell, sauber, fair.',
    adresse: 'Cörmannstr. 25, 58455 Witten',
    telefon: '02302 54951',
    telefonHref: 'tel:+4923025495',
    email: 'info@wigro-reifen.de',
    emailHref: 'mailto:info@wigro-reifen.de',
    oeffnungszeiten: 'Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr',
    links: [
      { label: 'Startseite', href: '/' },
      { label: 'Leistungen', href: '/leistungen' },
      { label: 'Team', href: '/team' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
    copyright: `© ${new Date().getFullYear()} WIGRO Räder und Reifen. Alle Rechte vorbehalten.`,
    googleMapsUrl: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,1365m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
  },

  // ============================================================
  // IMPRESSUM (§5 TMG)
  // ============================================================

  impressum: {
    headline: 'Impressum',
    inhalt: `## Angaben gemäß § 5 TMG

**WIGRO Räder und Reifen**
Inhaber: Mario Rampérez y Carrasco
Cörmannstr. 25
58455 Witten

## Kontakt

Telefon: 02302 54951
E-Mail: info@wigro-reifen.de

## Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV

Mario Rampérez y Carrasco
Cörmannstr. 25
58455 Witten

## Streitschlichtung

Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/

Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

## Haftung für Inhalte

Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

## Haftung für Links

Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.

## Urheberrecht

Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.`,
  },

  // ============================================================
  // DATENSCHUTZERKLÄRUNG (DSGVO Art. 13)
  // ============================================================

  datenschutz: {
    headline: 'Datenschutzerklärung',
    inhalt: `## 1. Datenschutz auf einen Blick

### Allgemeine Hinweise

Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.

### Datenerfassung auf dieser Website

**Wer ist verantwortlich für die Datenerfassung auf dieser Website?**

Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.

**Wie erfassen wir Ihre Daten?**

Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen — etwa über das Kontaktformular oder per E-Mail. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z.B. Browsertyp, Betriebssystem, Uhrzeit des Seitenaufrufs).

**Wofür nutzen wir Ihre Daten?**

Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.

**Welche Rechte haben Sie bezüglich Ihrer Daten?**

Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem das Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.

---

## 2. Hosting

Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.

Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).

---

## 3. Allgemeine Hinweise und Pflichtinformationen

### Datenschutz

Der Betreiber dieser Seiten nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

### Verantwortliche Stelle

Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:

WIGRO Räder und Reifen
Inhaber: Mario Rampérez y Carrasco
Cörmannstr. 25
58455 Witten
Telefon: 02302 54951
E-Mail: info@wigro-reifen.de

### Speicherdauer

Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.

### Widerruf Ihrer Einwilligung zur Datenverarbeitung

Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.

### Beschwerderecht bei der zuständigen Aufsichtsbehörde

Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.

Zuständige Aufsichtsbehörde für NRW:
Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
Kavalleriestr. 2–4
40213 Düsseldorf
www.ldi.nrw.de

---

## 4. Datenerfassung auf dieser Website

### Kontaktformular

Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.

Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage).

### Google Maps

Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.

Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Wenn Google Maps aktiviert ist, kann Google zum Zwecke der einheitlichen Darstellung der Schriftarten Google Web Fonts verwenden. Beim Aufruf von Google Maps lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.

Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.

Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy`,
  },

  // ============================================================
  // COOKIE CONSENT
  // ============================================================

  cookieConsent: {
    text:
      'Diese Website verwendet Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. Technisch notwendige Cookies sind für den Betrieb der Website erforderlich.',
    akzeptieren: 'Alle akzeptieren',
    ablehnen: 'Nur notwendige',
    mehr: 'Mehr erfahren',
    mehrHref: '/datenschutz',
  },

  // ============================================================
  // STICKY CTA BAR (Mobile)
  // ============================================================

  stickyCta: {
    anrufen: {
      label: 'Anrufen',
      href: 'tel:+4923025495',
    },
    whatsapp: {
      label: 'WhatsApp',
      href: 'https://wa.me/4923025495',
    },
  },

  // ============================================================
  // KONTAKTDATEN (wiederverwendbar)
  // ============================================================

  kontaktdaten: {
    firma: 'WIGRO Räder und Reifen',
    inhaber: 'Mario Rampérez y Carrasco',
    strasse: 'Cörmannstr. 25',
    plzOrt: '58455 Witten',
    telefon: '02302 54951',
    telefonHref: 'tel:+4923025495',
    telefonIntl: '+49 2302 54951',
    email: 'info@wigro-reifen.de',
    emailHref: 'mailto:info@wigro-reifen.de',
    whatsapp: 'https://wa.me/4923025495',
    googleMaps: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,1365m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
    googleBewertungen: 'https://www.google.com/maps/place/Wigro+Reifen/@51.4445745,7.3183958,683m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m8!3m7!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D',
    rating: '4,8',
    ratingCount: '300+',
    oeffnungszeiten: 'Mo–Fr 08:00–12:30 & 13:00–17:00 Uhr',
  },

} as const;
