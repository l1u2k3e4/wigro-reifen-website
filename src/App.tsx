import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ContentOverridesProvider } from '@/context/ContentOverridesContext'
import SharedLayout from '@/components/layout/SharedLayout'
import PageLoader from '@/components/ui/PageLoader'

const Home = lazy(() => import('@/pages/Home'))
const Leistungen = lazy(() => import('@/pages/Leistungen'))
const Team = lazy(() => import('@/pages/Team'))
const Kontakt = lazy(() => import('@/pages/Kontakt'))
const Impressum = lazy(() => import('@/pages/Impressum'))
const Datenschutz = lazy(() => import('@/pages/Datenschutz'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ContentOverridesProvider>
      <BrowserRouter basename="/wigro-reifen-website">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<SharedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/leistungen" element={<Leistungen />} />
              <Route path="/team" element={<Team />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ContentOverridesProvider>
  )
}
