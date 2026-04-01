// src/components/layout/SharedLayout.tsx
// Haupt-Layout: Header + Main Content + Footer + Sticky CTA + WhatsApp + Cookie Consent

import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StickyCTABar from '@/components/layout/StickyCTABar'
import CookieConsent from '@/components/CookieConsent'
import ChatWidget from '@/components/ChatWidget'
import ScrollToHash from '@/components/ScrollToHash'

export default function SharedLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      <ScrollToHash />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <StickyCTABar />
      <CookieConsent />
      <ChatWidget />
    </div>
  )
}
