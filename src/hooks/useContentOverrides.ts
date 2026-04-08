// src/hooks/useContentOverrides.ts
// Hook to access dashboard content overrides

import { useContext } from 'react'
import { ContentOverridesContext } from '@/context/ContentOverridesContext'

export function useContentOverrides() {
  return useContext(ContentOverridesContext)
}

export function useModuleOverrides<T>(module: string): Partial<T> | null {
  const overrides = useContentOverrides()
  if (!overrides || !overrides[module]) return null
  return overrides[module] as Partial<T>
}
