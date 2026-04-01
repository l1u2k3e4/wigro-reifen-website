// src/pages/Leistungen.tsx
// Leistungsseite — Hero + alle 6 Leistungen im Detail + SEO (Meta-Tags + Service JSON-LD)

import { COPY } from '@/data/content'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import JsonLd from '@/components/JsonLd'
import LeistungenHero from '@/sections/LeistungenHero'
import LeistungDetail from '@/sections/LeistungDetail'


const serviceSchemas = COPY.leistungen.items.map((item) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: item.title,
  description: item.intro,
  provider: {
    '@type': 'LocalBusiness',
    name: 'WIGRO Räder und Reifen',
    url: 'https://wigro-reifen.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cörmannstr. 25',
      addressLocality: 'Witten',
      postalCode: '58455',
      addressCountry: 'DE',
    },
  },
  areaServed: {
    '@type': 'City',
    name: 'Witten',
  },
  url: `https://wigro-reifen.de/leistungen#${item.id}`,
}))

export default function Leistungen() {
  useDocumentMeta({
    title: COPY.meta.leistungen.title,
    description: COPY.meta.leistungen.description,
    canonical: COPY.meta.leistungen.canonical,
  })

  return (
    <main id="main-content">
      {serviceSchemas.map((schema, i) => (
        <JsonLd key={COPY.leistungen.items[i].id} id={`ld-service-${COPY.leistungen.items[i].id}`} data={schema} />
      ))}

      <LeistungenHero />

      {COPY.leistungen.items.map((item, index) => (
        <LeistungDetail
          key={item.id}
          id={item.id}
          icon={item.icon}
          title={item.title}
          intro={item.intro}
          vorteile={item.vorteile}
          cta={item.cta}
          reversed={index % 2 !== 0}
          surface={index % 2 !== 0}
        />
      ))}

    </main>
  )
}
