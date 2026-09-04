import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ComingSoonProvider } from './contexts/ComingSoonContext'
import { ProfilePortalProvider } from './contexts/ProfilePortalContext'
import { LocalePolicyProvider } from './contexts/LocalePolicyContext'
import { ConsentCookieBanner } from './components/ConsentCookieBanner/ConsentCookieBanner'

const LandingRU = lazy(() => import('./pages/LandingRU').then((m) => ({ default: m.LandingRU })))
const MigrationRU = lazy(() => import('./pages/MigrationRU').then((m) => ({ default: m.MigrationRU })))
const AboutCompany = lazy(() => import('./pages/AboutCompany').then((m) => ({ default: m.AboutCompany })))
const DownloadPage = lazy(() => import('./pages/DownloadPage').then((m) => ({ default: m.DownloadPage })))
const ReferralPage = lazy(() => import('./pages/ReferralPage').then((m) => ({ default: m.ReferralPage })))
const RosVpnPage = lazy(() => import('./pages/RosVpnPage').then((m) => ({ default: m.RosVpnPage })))
import { WalletPage } from './pages/WalletPage'
const TurkiyePage = lazy(() => import('./pages/TurkiyePage').then((m) => ({ default: m.TurkiyePage })))
const BetaPage = lazy(() => import('./pages/BetaPage').then((m) => ({ default: m.BetaPage })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const ContactPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.ContactPage })))
const DocumentsPage = lazy(() => import('./pages/DocumentsPage').then((m) => ({ default: m.DocumentsPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const FAQPageRU = lazy(() => import('./pages/FAQPageRU').then((m) => ({ default: m.FAQPageRU })))
const PaymentOkPage = lazy(() =>
  import('./pages/PaymentOkPage').then((m) => ({ default: m.PaymentOkPage }))
)
const PaymentFailPage = lazy(() =>
  import('./pages/PaymentFailPage').then((m) => ({ default: m.PaymentFailPage }))
)
const AccountHeaderPreviewPage = lazy(() =>
  import('./pages/AccountHeaderPreviewPage').then((m) => ({ default: m.AccountHeaderPreviewPage }))
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
        backgroundColor: '#00000a',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      Загрузка…
    </div>
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
      <ProfilePortalProvider>
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
                      <Route path="/documents" element={<DocumentsPage />} />
                      <Route path="/privacy" element={<LegalPage product="vpn" document="privacy" />} />
                      <Route path="/terms" element={<LegalPage product="vpn" document="terms" />} />
                      <Route path="/refund" element={<LegalPage product="vpn" document="refund" />} />
                      <Route path="/esim/privacy" element={<LegalPage product="esim" document="privacy" />} />
                      <Route path="/esim/terms" element={<LegalPage product="esim" document="terms" />} />
                      <Route path="/esim/refund" element={<LegalPage product="esim" document="refund" />} />
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
                      <Route path="/wallet" element={<WalletPage />} />
                      <Route path="/card" element={<Navigate to="/wallet" replace />} />
                      <Route path="/card/" element={<Navigate to="/wallet" replace />} />
                      <Route path="/beta" element={<BetaPage />} />
                      <Route path="/turkiye" element={<TurkiyePage />} />
                      <Route path="/about" element={<AboutCompany />} />
                      <Route path="/documents" element={<DocumentsPage />} />
                      <Route path="/privacy" element={<LegalPage product="vpn" document="privacy" />} />
                      <Route path="/terms" element={<LegalPage product="vpn" document="terms" />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/refund" element={<LegalPage product="vpn" document="refund" />} />
                      <Route path="/esim/privacy" element={<LegalPage product="esim" document="privacy" />} />
                      <Route path="/esim/terms" element={<LegalPage product="esim" document="terms" />} />
                      <Route path="/esim/refund" element={<LegalPage product="esim" document="refund" />} />
                      <Route path="/faq" element={<FAQPageRU />} />
                      <Route path="/app" element={<FAQPageRU />} />
                      <Route path="/preview/account-header" element={<AccountHeaderPreviewPage />} />
                      <Route path="/payment_ok" element={<PaymentOkPage />} />
                      <Route path="/ok" element={<RedirectToPaymentOk />} />
                      <Route path="/apple/payment_ok" element={<RedirectToPaymentOk />} />
                      <Route path="/android/payment_ok" element={<RedirectToPaymentOk />} />
                      <Route path="/payment_fail" element={<PaymentFailPage />} />
                      <Route path="/fail" element={<RedirectToPaymentFail />} />
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
      </ProfilePortalProvider>
    </HelmetProvider>
  )
}
