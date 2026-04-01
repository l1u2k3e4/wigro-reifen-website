// src/pages/Datenschutz.tsx
// Datenschutzerklärung nach DSGVO — noindex, follow

import { COPY } from '@/data/content'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { renderMarkdown } from '@/lib/renderMarkdown'

export default function Datenschutz() {
  useDocumentMeta({
    title: COPY.meta.datenschutz.title,
    description: COPY.meta.datenschutz.description,
    canonical: COPY.meta.datenschutz.canonical,
    robots: COPY.meta.datenschutz.robots,
  })

  return (
    <main id="main-content" className="section">
      <div className="container-narrow">
        <h1 className="font-display font-bold text-4xl text-brand-heading mb-8">
          {COPY.datenschutz.headline}
        </h1>
        <article className="prose-wigro">
          {renderMarkdown(COPY.datenschutz.inhalt)}
        </article>
      </div>
    </main>
  )
}
