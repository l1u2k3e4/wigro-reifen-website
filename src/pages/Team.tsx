// src/pages/Team.tsx
// Team-Seite — Hero, Geschichte, TeamGrid, CTA + SEO

import { COPY } from '@/data/content'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import GeschichteSection from '@/sections/GeschichteSection'
import TeamGrid from '@/sections/TeamGrid'


export default function Team() {
  useDocumentMeta({
    title: COPY.meta.team.title,
    description: COPY.meta.team.description,
    canonical: COPY.meta.team.canonical,
  })

  return (
    <main id="main-content">
      <GeschichteSection />
      <TeamGrid />
    </main>
  )
}
