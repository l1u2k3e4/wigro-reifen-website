// src/components/GoogleMapsEmbed.tsx
// DSGVO-konformes Google Maps: Erst nach Klick laden

import { useState } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'
import { COPY } from '@/data/content'

interface GoogleMapsEmbedProps {
  address?: string
  embedUrl?: string
  mapsUrl?: string
  height?: number
  autoLoad?: boolean
}

export default function GoogleMapsEmbed({
  address = COPY.anfahrt.adresse,
  embedUrl = COPY.anfahrt.googleMapsEmbed,
  mapsUrl = COPY.anfahrt.googleMapsUrl,
  height = 400,
  autoLoad = false,
}: GoogleMapsEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(autoLoad)

  return (
    <div
      className="w-full rounded-card overflow-hidden border border-brand-border"
      style={{ height }}
    >
      {isLoaded ? (
        <iframe
          src={embedUrl}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Google Maps — ${address}`}
        />
      ) : (
        <div
          className="w-full h-full bg-brand-light flex flex-col items-center justify-center gap-4 p-6 text-center"
          style={{ height }}
        >
          <div className="w-16 h-16 rounded-full bg-brand-accentLight flex items-center justify-center">
            <MapPin size={28} className="text-brand-accent" aria-hidden />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-brand-heading">{address}</p>
            <p className="text-sm text-brand-muted max-w-xs">
              Mit dem Laden der Karte akzeptieren Sie die Datenschutzrichtlinien von Google.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setIsLoaded(true)}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Karte laden
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm px-5 py-2.5 inline-flex items-center gap-2"
              aria-label="Google Maps in neuem Tab öffnen"
            >
              <ExternalLink size={14} aria-hidden />
              <span>In Google Maps öffnen</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
