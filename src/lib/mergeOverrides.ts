// src/lib/mergeOverrides.ts
// Deep-merge utility: Dashboard overrides + COPY defaults
// - null/undefined values → use default
// - Arrays are replaced entirely (not merged)

type Obj = Record<string, unknown>

export function mergeOverrides<T extends Obj>(defaults: T, overrides: Partial<T> | null | undefined): T {
  if (!overrides) return defaults

  const result = { ...defaults }

  for (const key of Object.keys(overrides) as (keyof T)[]) {
    const val = overrides[key]

    if (val === null || val === undefined) continue

    if (Array.isArray(val)) {
      ;(result as Obj)[key as string] = val
    } else if (typeof val === 'object' && typeof defaults[key] === 'object' && !Array.isArray(defaults[key])) {
      ;(result as Obj)[key as string] = mergeOverrides(
        defaults[key] as Obj,
        val as Obj,
      )
    } else {
      ;(result as Obj)[key as string] = val
    }
  }

  return result
}
