import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './locales/ar.json'
import cs from './locales/cs.json'
import de from './locales/de.json'
import en from './locales/en.json'
import fr from './locales/fr.json'
import id from './locales/id.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import pl from './locales/pl.json'
import ptBR from './locales/pt-BR.json'
import ru from './locales/ru.json'
import th from './locales/th.json'
import tl from './locales/tl.json'
import tr from './locales/tr.json'

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      ar: { translation: ar },
      tl: { translation: tl },
      pl: { translation: pl },
      cs: { translation: cs },
      de: { translation: de },
      fr: { translation: fr },
      'pt-BR': { translation: ptBR },
      th: { translation: th },
      id: { translation: id },
      ja: { translation: ja },
      ko: { translation: ko },
      tr: { translation: tr },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'ar', 'tl', 'pl', 'cs', 'de', 'fr', 'pt-BR', 'th', 'id', 'ja', 'ko', 'tr'],
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
