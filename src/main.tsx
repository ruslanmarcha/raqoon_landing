import React from 'react'
import ReactDOM from 'react-dom/client'
import i18next from './i18n/index'
import './design-system/tokens.css'
import './design-system/base.css'
import { App } from './App'
import { bootstrapGoogleTagForRegion } from './analytics/googleTagConsent'
import { fetchGeoConsentFlags } from './i18n/fetchGeoConsentFlags'
import { resolveLocalePolicy } from './i18n/geoLocale'

type AppMountProps = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  allowedLanguages: string[]
  isEUVisitor: boolean
}

function applyDocumentLanguageDirection(locale: string) {
  const normalized = locale.toLowerCase()
  const isArabic = normalized === 'ar' || normalized.startsWith('ar-')
  document.documentElement.lang = locale
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
}

let appMounted = false

function renderApp(rootEl: HTMLElement, props: AppMountProps) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App
        allowLanguageSwitch={props.allowLanguageSwitch}
        countryCode={props.countryCode}
        allowedLanguages={props.allowedLanguages}
        isEUVisitor={props.isEUVisitor}
      />
    </React.StrictMode>,
  )
  appMounted = true
}

function defaultMountProps(): AppMountProps {
  const supportedLngs = (i18next.options.supportedLngs ?? ['en']) as string[]
  return {
    allowLanguageSwitch: true,
    countryCode: null,
    allowedLanguages: supportedLngs.filter((l: string) => l !== 'cimode'),
    isEUVisitor: false,
  }
}

async function bootstrap() {
  const supportedLngs = (i18next.options.supportedLngs ?? ['en']) as string[]
  const rootEl = document.getElementById('root')
  if (!rootEl) return

  let localePolicy: Awaited<ReturnType<typeof resolveLocalePolicy>>
  let geoFlags: Awaited<ReturnType<typeof fetchGeoConsentFlags>>

  try {
    localePolicy = await resolveLocalePolicy(supportedLngs)
    geoFlags = await fetchGeoConsentFlags()
  } catch {
    localePolicy = {
      locale: 'en',
      allowLanguageSwitch: true,
      countryCode: null,
      allowedLanguages: supportedLngs.filter((l: string) => l !== 'cimode'),
    }
    geoFlags = { countryCode: null, isEUUser: false }
  }

  try {
    await i18next.changeLanguage(localePolicy.locale)
  } catch {
    await i18next.changeLanguage('en')
  }
  applyDocumentLanguageDirection(i18next.language)
  i18next.on('languageChanged', applyDocumentLanguageDirection)

  try {
    await bootstrapGoogleTagForRegion({ isEUUser: geoFlags.isEUUser })
  } catch {
    // Analytics must not block first paint.
  }

  renderApp(rootEl, {
    allowLanguageSwitch: localePolicy.allowLanguageSwitch,
    countryCode: localePolicy.countryCode,
    allowedLanguages: localePolicy.allowedLanguages,
    isEUVisitor: geoFlags.isEUUser,
  })
}

void bootstrap().catch((err) => {
  console.error('[bootstrap]', err)
  if (appMounted) return
  const rootEl = document.getElementById('root')
  if (!rootEl) return
  void (async () => {
    try {
      await i18next.changeLanguage('en')
    } catch {
      /* ignore */
    }
    applyDocumentLanguageDirection(i18next.language)
    try {
      renderApp(rootEl, defaultMountProps())
    } catch {
      /* ignore */
    }
  })()
})
