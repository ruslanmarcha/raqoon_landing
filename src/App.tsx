import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ComingSoonProvider } from './contexts/ComingSoonContext'
import { LocalePolicyProvider } from './contexts/LocalePolicyContext'
import { ConsentCookieBanner } from './components/ConsentCookieBanner/ConsentCookieBanner'

const LandingRU = lazy(() => import('./pages/LandingRU').then((m) => ({ default: m.LandingRU })))
const MigrationRU = lazy(() => import('./pages/MigrationRU').then((m) => ({ default: m.MigrationRU })))
const AboutCompany = lazy(() => import('./pages/AboutCompany').then((m) => ({ default: m.AboutCompany })))
const DownloadPage = lazy(() => import('./pages/DownloadPage').then((m) => ({ default: m.DownloadPage })))
const ReferralPage = lazy(() => import('./pages/ReferralPage').then((m) => ({ default: m.ReferralPage })))
const RosVpnPage = lazy(() => import('./pages/RosVpnPage').then((m) => ({ default: m.RosVpnPage })))
const TurkiyePage = lazy(() => import('./pages/TurkiyePage').then((m) => ({ default: m.TurkiyePage })))
const BetaPage = lazy(() => import('./pages/BetaPage').then((m) => ({ default: m.BetaPage })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const FAQPageRU = lazy(() => import('./pages/FAQPageRU').then((m) => ({ default: m.FAQPageRU })))
const PaymentOkPage = lazy(() =>
  import('./pages/PaymentOkPage').then((m) => ({ default: m.PaymentOkPage }))
)
const PaymentFailPage = lazy(() =>
  import('./pages/PaymentFailPage').then((m) => ({ default: m.PaymentFailPage }))
)

/** `VITE_ENABLE_TURKEY_GEOLOCK=true` — для посетителей из TR только `/turkiye`, остальные URL редиректятся туда. Без переменной или `false` — ограничение выключено. */
const TURKEY_GEOLOCK_ENABLED = import.meta.env.VITE_ENABLE_TURKEY_GEOLOCK === 'true'

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
  const isTurkeyVisitor = countryCode === 'TR'
  const turkeyOnlyMode = isTurkeyVisitor && TURKEY_GEOLOCK_ENABLED

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
                  {turkeyOnlyMode ? (
                    <>
                      <Route path="/turkiye" element={<TurkiyePage />} />
                      <Route path="/beta" element={<BetaPage />} />
                      <Route path="/faq" element={<FAQPageRU />} />
                      <Route path="/app" element={<FAQPageRU />} />
                      <Route path="*" element={<Navigate to="/turkiye" replace />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<LandingRU />} />
                      <Route path="/ww" element={<Navigate to="/" replace />} />
                      <Route path="/migration" element={<MigrationRU />} />
                      <Route path="/download" element={<DownloadPage />} />
                      <Route path="/referral" element={<ReferralPage />} />
                      <Route path="/rosvpn" element={<RosVpnPage />} />
                      <Route path="/beta" element={<BetaPage />} />
                      <Route path="/turkiye" element={<TurkiyePage />} />
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
                    </>
                  )}
                </Routes>
                <ConsentCookieBanner />
              </>
            </Suspense>
          </BrowserRouter>
        </LocalePolicyProvider>
      </ComingSoonProvider>
    </HelmetProvider>
  )
}
