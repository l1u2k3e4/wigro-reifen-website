// src/components/JsonLd.tsx
// Injiziert JSON-LD Structured Data als <script type="application/ld+json"> in den <head>

import { useEffect } from 'react'

interface JsonLdProps {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
}

export default function JsonLd({ id, data }: JsonLdProps) {
  const json = JSON.stringify(data)

  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = json

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [id, json])

  return null
}
