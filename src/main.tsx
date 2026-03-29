import React from 'react'
import ReactDOM from 'react-dom/client'
import i18next from './i18n/index'
import './design-system/tokens.css'
import './design-system/base.css'
import { App } from './App'
import { bootstrapGoogleTagForRegion } from './analytics/googleTagConsent'
import { fetchGeoConsentFlags } from './i18n/fetchGeoConsentFlags'
import { resolveLocalePolicy } from './i18n/geoLocale'

function applyDocumentLanguageDirection(locale: string) {
  const normalized = locale.toLowerCase()
  const isArabic = normalized === 'ar' || normalized.startsWith('ar-')
  document.documentElement.lang = locale
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
}

async function bootstrap() {
  const supportedLngs = i18next.options.supportedLngs ?? ['en']
  const geoFlags = await fetchGeoConsentFlags()
  const localePolicy = await resolveLocalePolicy(supportedLngs as string[], {
    countryCodeOverride: geoFlags.countryCode,
  })

  await i18next.changeLanguage(localePolicy.locale)
  applyDocumentLanguageDirection(i18next.language)
  i18next.on('languageChanged', applyDocumentLanguageDirection)

  await bootstrapGoogleTagForRegion({ isEUUser: geoFlags.isEUUser })

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App
        allowLanguageSwitch={localePolicy.allowLanguageSwitch}
        countryCode={localePolicy.countryCode}
        allowedLanguages={localePolicy.allowedLanguages}
        isEUVisitor={geoFlags.isEUUser}
      />
    </React.StrictMode>,
  )
}

void bootstrap()
