import React from 'react'
import ReactDOM from 'react-dom/client'
import i18next from './i18n/index'
import './design-system/tokens.css'
import './design-system/base.css'
import { App } from './App'
import { resolveLocalePolicy } from './i18n/geoLocale'

async function bootstrap() {
  const supportedLngs = i18next.options.supportedLngs ?? ['en']
  const localePolicy = await resolveLocalePolicy(supportedLngs as string[])

  await i18next.changeLanguage(localePolicy.locale)

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App
        allowLanguageSwitch={localePolicy.allowLanguageSwitch}
        countryCode={localePolicy.countryCode}
      />
    </React.StrictMode>,
  )
}

void bootstrap()
