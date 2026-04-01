// src/pages/Impressum.tsx
// Impressum nach §5 TMG — noindex, follow

import { COPY } from '@/data/content'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { renderMarkdown } from '@/lib/renderMarkdown'

export default function Impressum() {
  useDocumentMeta({
    title: COPY.meta.impressum.title,
    description: COPY.meta.impressum.description,
    canonical: COPY.meta.impressum.canonical,
    robots: COPY.meta.impressum.robots,
  })

  return (
    <main id="main-content" className="section">
      <div className="container-narrow">
        <h1 className="font-display font-bold text-4xl text-brand-heading mb-8">
          {COPY.impressum.headline}
        </h1>
        <article className="prose-wigro">
          {renderMarkdown(COPY.impressum.inhalt)}
        </article>
      </div>
    </main>
  )
}
