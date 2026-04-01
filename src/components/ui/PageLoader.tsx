// src/components/ui/PageLoader.tsx
// Suspense-Fallback beim Lazy-Loading von Routes — minimal, CLS-neutral

export default function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-brand-bg"
      aria-label="Seite wird geladen"
      role="status"
    >
      <div className="w-10 h-10 rounded-full border-4 border-brand-accentLight border-t-brand-accent animate-spin" />
    </div>
  )
}
