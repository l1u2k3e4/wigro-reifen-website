// src/pages/Home.tsx
// Startseite — alle Home-Sections + SEO (Meta-Tags, JSON-LD LocalBusiness + FAQPage)

import { COPY } from '@/data/content'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import JsonLd from '@/components/JsonLd'
import HeroSection from '@/sections/HeroSection'
import LeistungenPreview from '@/sections/LeistungenPreview'
import WarumWIGRO from '@/sections/WarumWIGRO'
import TestimonialsSection from '@/sections/TestimonialsSection'
import PartnerSection from '@/sections/PartnerSection'
import TeamTeaser from '@/sections/TeamTeaser'
import AnfahrtSection from '@/sections/AnfahrtSection'
import FAQSection from '@/sections/FAQSection'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'AutoRepair'],
  name: 'WIGRO Räder und Reifen',
  description:
    'Reifenhändler und Kfz-Werkstatt in Witten. Reifenwechsel, Einlagerung, Rädermontage und Felgenreinigung — schnell, sauber, fair.',
  url: 'https://wigro-reifen.de',
  telephone: '+49-2302-54951',
  email: 'info@wigro-reifen.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cörmannstr. 25',
    addressLocality: 'Witten',
    postalCode: '58455',
    addressRegion: 'NRW',
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '51.4447',
    longitude: '7.3189',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '12:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '13:00',
      closes: '17:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '300',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.google.com/maps/place/Wigro+Reifen/@51.4447147,7.318914',
  ],
  image: 'https://wigro-reifen.de/Logo%20Sonstige/Werkstatt.01.webp',
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  areaServed: {
    '@type': 'City',
    name: 'Witten',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: COPY.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.frage,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.antwort,
    },
  })),
}

export default function Home() {
  useDocumentMeta({
    title: COPY.meta.home.title,
    description: COPY.meta.home.description,
    canonical: COPY.meta.home.canonical,
  })

  return (
    <main id="main-content">
      <JsonLd id="ld-local-business" data={localBusinessSchema} />
      <JsonLd id="ld-faq" data={faqSchema} />
      <HeroSection />
      <LeistungenPreview />
      <WarumWIGRO />
      <TestimonialsSection />
      <PartnerSection />
      <TeamTeaser />
      <AnfahrtSection />
      <FAQSection />
    </main>
  )
}
