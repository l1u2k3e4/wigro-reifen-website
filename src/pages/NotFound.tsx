import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-brand-heading text-5xl mb-4">
        404 — Seite nicht gefunden
      </h1>
      <p className="text-brand-body text-lg mb-8">
        Die gesuchte Seite existiert nicht.
      </p>
      <Link to="/" className="btn-primary">
        Zurück zur Startseite
      </Link>
    </main>
  )
}
