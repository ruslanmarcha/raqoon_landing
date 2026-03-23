import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LandingRU } from './pages/LandingRU'
import { LandingWW } from './pages/LandingWW'
import { MigrationRU } from './pages/MigrationRU'
import { AboutCompany } from './pages/AboutCompany'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ComingSoonProvider } from './contexts/ComingSoonContext'
import { LocalePolicyProvider } from './contexts/LocalePolicyContext'
import { TurkeyAvailabilityNotice } from './components/TurkeyAvailabilityNotice/TurkeyAvailabilityNotice'

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
}

export function App({ allowLanguageSwitch, countryCode }: AppProps) {
  return (
    <HelmetProvider>
      <ComingSoonProvider>
        <LocalePolicyProvider allowLanguageSwitch={allowLanguageSwitch} countryCode={countryCode}>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <>
                <Routes>
                  <Route path="/" element={<LandingRU />} />
                  <Route path="/ww" element={<LandingWW />} />
                  <Route path="/migration" element={<MigrationRU />} />
                  <Route path="/about" element={<AboutCompany />} />
                  <Route path="/privacy" element={<LegalPage legalKey="privacy" />} />
                  <Route path="/terms" element={<LegalPage legalKey="terms" />} />
                  <Route path="/contact" element={<LegalPage legalKey="contact" />} />
                  <Route path="/refund" element={<LegalPage legalKey="refund" />} />
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
