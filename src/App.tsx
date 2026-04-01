import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ComingSoonProvider } from './contexts/ComingSoonContext'
import { LocalePolicyProvider } from './contexts/LocalePolicyContext'
import { ConsentCookieBanner } from './components/ConsentCookieBanner/ConsentCookieBanner'
import { TurkeyAvailabilityNotice } from './components/TurkeyAvailabilityNotice/TurkeyAvailabilityNotice'

const LandingRU = lazy(() => import('./pages/LandingRU').then((m) => ({ default: m.LandingRU })))
const LandingWW = lazy(() => import('./pages/LandingWW').then((m) => ({ default: m.LandingWW })))
const MigrationRU = lazy(() => import('./pages/MigrationRU').then((m) => ({ default: m.MigrationRU })))
const AboutCompany = lazy(() => import('./pages/AboutCompany').then((m) => ({ default: m.AboutCompany })))
const DownloadPage = lazy(() => import('./pages/DownloadPage').then((m) => ({ default: m.DownloadPage })))
const ReferralPage = lazy(() => import('./pages/ReferralPage').then((m) => ({ default: m.ReferralPage })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const FAQPageRU = lazy(() => import('./pages/FAQPageRU').then((m) => ({ default: m.FAQPageRU })))
const PaymentOkPage = lazy(() =>
  import('./pages/PaymentOkPage').then((m) => ({ default: m.PaymentOkPage }))
)
const PaymentFailPage = lazy(() =>
  import('./pages/PaymentFailPage').then((m) => ({ default: m.PaymentFailPage }))
)

/** Сохраняем query (если платёжка дописала ?…), ведём на единую страницу успеха. */
function RedirectToPaymentOk() {
  const { search } = useLocation()
  return <Navigate to={`/payment_ok${search}`} replace />
}

function RedirectToPaymentFail() {
  const { search } = useLocation()
  return <Navigate to={`/payment_fail${search}`} replace />
}

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
  isEUVisitor: boolean
}

export function App({ allowLanguageSwitch, countryCode, allowedLanguages, isEUVisitor }: AppProps) {
  return (
    <HelmetProvider>
      <ComingSoonProvider>
        <LocalePolicyProvider
          allowLanguageSwitch={allowLanguageSwitch}
          countryCode={countryCode}
          allowedLanguages={allowedLanguages}
          isEUVisitor={isEUVisitor}
        >
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <>
                <Routes>
                  <Route path="/" element={<LandingRU />} />
                  <Route path="/ww" element={<LandingWW />} />
                  <Route path="/migration" element={<MigrationRU />} />
                  <Route path="/download" element={<DownloadPage />} />
                  <Route path="/referral" element={<ReferralPage />} />
                  <Route path="/about" element={<AboutCompany />} />
                  <Route path="/privacy" element={<LegalPage legalKey="privacy" />} />
                  <Route path="/terms" element={<LegalPage legalKey="terms" />} />
                  <Route path="/contact" element={<LegalPage legalKey="contact" />} />
                  <Route path="/refund" element={<LegalPage legalKey="refund" />} />
                  <Route path="/faq" element={<FAQPageRU />} />
                  <Route path="/app" element={<FAQPageRU />} />
                  <Route path="/payment_ok" element={<PaymentOkPage />} />
                  <Route path="/apple/payment_ok" element={<RedirectToPaymentOk />} />
                  <Route path="/android/payment_ok" element={<RedirectToPaymentOk />} />
                  <Route path="/payment_fail" element={<PaymentFailPage />} />
                  <Route path="/apple/payment_fail" element={<RedirectToPaymentFail />} />
                  <Route path="/android/payment_fail" element={<RedirectToPaymentFail />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ConsentCookieBanner />
                <TurkeyAvailabilityNotice />
              </>
            </Suspense>
          </BrowserRouter>
        </LocalePolicyProvider>
      </ComingSoonProvider>
    </HelmetProvider>
  )
}
