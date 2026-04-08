// src/context/ContentOverridesContext.tsx
// Fetches /data/content-overrides.json and provides it to all components

import { createContext, useEffect, useState, type ReactNode } from 'react'

type Overrides = Record<string, unknown> | null

export const ContentOverridesContext = createContext<Overrides>(null)

export function ContentOverridesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>(null)

  useEffect(() => {
    fetch('/data/content-overrides.json')
      .then((res) => {
        if (!res.ok) return null
        return res.json()
      })
      .then((data) => {
        if (data) setOverrides(data)
      })
      .catch(() => {
        // No overrides file → use defaults
      })
  }, [])

  return (
    <ContentOverridesContext.Provider value={overrides}>
      {children}
    </ContentOverridesContext.Provider>
  )
}
