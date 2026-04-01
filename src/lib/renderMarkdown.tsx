// src/lib/renderMarkdown.tsx
// Einfacher Markdown-Renderer für Impressum und Datenschutz
// Unterstützt: ## h2, ### h3, **bold**, --- Trennlinie, Absätze

import type { ReactNode } from 'react'

function parseBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function renderMarkdown(content: string): ReactNode {
  const lines = content.split('\n')
  const elements: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-display font-semibold text-xl text-brand-heading mt-6 mb-2">
          {parseBold(line.slice(4))}
        </h3>,
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-display font-bold text-2xl text-brand-heading mt-8 mb-3 pb-2 border-b border-brand-border">
          {parseBold(line.slice(3))}
        </h2>,
      )
    } else if (line.trim() === '---') {
      elements.push(<hr key={i} className="border-brand-border my-6" />)
    } else if (line.trim() === '') {
      // leere Zeile — kein Element
    } else {
      elements.push(
        <p key={i} className="text-brand-body text-sm leading-relaxed mb-3">
          {parseBold(line)}
        </p>,
      )
    }

    i++
  }

  return <>{elements}</>
}
