// src/pages/Kontakt.tsx
// Kontakt-Seite — Hero, Kontakt-Karten, Formular, Anfahrt + SEO

import { COPY } from '@/data/content'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import KontaktHero from '@/sections/KontaktHero'
import KontaktGrid from '@/sections/KontaktGrid'
import KontaktFormular from '@/sections/KontaktFormular'
import AnfahrtKontakt from '@/sections/AnfahrtKontakt'

export default function Kontakt() {
  useDocumentMeta({
    title: COPY.meta.kontakt.title,
    description: COPY.meta.kontakt.description,
    canonical: COPY.meta.kontakt.canonical,
  })

  return (
    <main id="main-content">
      <KontaktHero />
      <KontaktGrid />
      <KontaktFormular />
      <AnfahrtKontakt />
    </main>
  )
}
