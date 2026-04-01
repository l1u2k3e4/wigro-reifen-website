// src/lib/maps.ts
// Cross-platform Navigations-Utility für WIGRO Reifen
// iOS → Apple Maps, Android → native Karten-App, Desktop → Google Maps

const LAT = 51.4447114
const LNG = 7.3214889
const ADDRESS = 'Cörmannstr. 25, 58455 Witten'

export const GOOGLE_MAPS_PLACE_URL =
  'https://www.google.com/maps/place/Wigro+Reifen/@51.444711,7.321489,1459m/data=!3m2!1e3!5s0x47b921e58b259341:0x96779a4b5498a90a!4m16!1m9!3m8!1s0x47b921e58b3195b3:0xe1997beaafe19292!2sWigro+Reifen!8m2!3d51.4447114!4d7.3214889!9m1!1b1!16s%2Fg%2F1ttpf_6s!3m5!1s0x47b921e58b3195b3:0xe1997beaafe19292!8m2!3d51.4447114!4d7.3214889!16s%2Fg%2F1ttpf_6s?hl=de-DE&entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D'

export function openMapsRoute(): void {
  const ua = navigator.userAgent

  if (/Android/i.test(ua)) {
    // Android: geo: URI öffnet die Standard-Navigations-App (Google Maps, Waze, HERE, etc.)
    window.location.href = `geo:${LAT},${LNG}?q=${encodeURIComponent(ADDRESS)}`
  } else if (/iPad|iPhone|iPod/i.test(ua)) {
    // iOS: Apple Maps (immer vorhanden, kein Google Maps nötig)
    window.location.href = `maps://maps.apple.com/?daddr=${LAT},${LNG}&dirflg=d`
  } else {
    // Desktop: Google Maps in neuem Tab
    window.open(GOOGLE_MAPS_PLACE_URL, '_blank', 'noopener,noreferrer')
  }
}
