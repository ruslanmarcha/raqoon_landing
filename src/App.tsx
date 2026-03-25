import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ComingSoonProvider } from './contexts/ComingSoonContext'
import { LocalePolicyProvider } from './contexts/LocalePolicyContext'
import { TurkeyAvailabilityNotice } from './components/TurkeyAvailabilityNotice/TurkeyAvailabilityNotice'

const LandingRU = lazy(() => import('./pages/LandingRU').then((m) => ({ default: m.LandingRU })))
const LandingWW = lazy(() => import('./pages/LandingWW').then((m) => ({ default: m.LandingWW })))
const MigrationRU = lazy(() => import('./pages/MigrationRU').then((m) => ({ default: m.MigrationRU })))
const AboutCompany = lazy(() => import('./pages/AboutCompany').then((m) => ({ default: m.AboutCompany })))
const DownloadPage = lazy(() => import('./pages/DownloadPage').then((m) => ({ default: m.DownloadPage })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const FAQPageRU = lazy(() => import('./pages/FAQPageRU').then((m) => ({ default: m.FAQPageRU })))

function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
      }}
    />
  )
}

type AppProps = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  allowedLanguages: string[]
}

export function App({ allowLanguageSwitch, countryCode, allowedLanguages }: AppProps) {
  return (
    <HelmetProvider>
      <ComingSoonProvider>
        <LocalePolicyProvider
          allowLanguageSwitch={allowLanguageSwitch}
          countryCode={countryCode}
          allowedLanguages={allowedLanguages}
        >
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <>
                <Routes>
                  <Route path="/" element={<LandingRU />} />
                  <Route path="/ww" element={<LandingWW />} />
                  <Route path="/migration" element={<MigrationRU />} />
                  <Route path="/download" element={<DownloadPage />} />
                  <Route path="/about" element={<AboutCompany />} />
                  <Route path="/privacy" element={<LegalPage legalKey="privacy" />} />
                  <Route path="/terms" element={<LegalPage legalKey="terms" />} />
                  <Route path="/contact" element={<LegalPage legalKey="contact" />} />
                  <Route path="/refund" element={<LegalPage legalKey="refund" />} />
                  <Route path="/faq" element={<FAQPageRU />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <TurkeyAvailabilityNotice />
              </>
            </Suspense>
          </BrowserRouter>
        </LocalePolicyProvider>
      </ComingSoonProvider>
    </HelmetProvider>
  )
}
