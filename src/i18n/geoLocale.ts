import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

const LANGUAGE_STORAGE_KEY = 'raqoon_lang'
const COUNTRY_STORAGE_KEY = 'raqoon_country'

type LocalePolicy = {
  locale: string
  allowLanguageSwitch: boolean
  countryCode: string | null
  allowedLanguages: string[]
}

const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  KG: 'ru',
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  FR: 'fr',
  BE: 'fr',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CL: 'es',
  IT: 'it',
  PT: 'pt',
  BR: 'pt-BR',
  NL: 'nl',
  PL: 'pl',
  CZ: 'cs',
  SK: 'sk',
  RO: 'ro',
  HU: 'hu',
  GR: 'el',
  TR: 'tr',
  UA: 'uk',
  CN: 'zh-CN',
  TW: 'en',
  HK: 'en',
  JP: 'ja',
  KR: 'ko',
  IL: 'he',
  IN: 'hi',
  ID: 'id',
  TH: 'th',
  VN: 'vi',
}

const ARABIC_SPEAKING_COUNTRIES = new Set([
  'DZ',
  'BH',
  'KM',
  'DJ',
  'EG',
  'IQ',
  'JO',
  'KW',
  'LB',
  'LY',
  'MR',
  'MA',
  'OM',
  'PS',
  'QA',
  'SA',
  'SO',
  'SD',
  'SY',
  'TN',
  'AE',
  'YE',
])

function isLocaleSupported(locale: string, supportedLngs: string[]): boolean {
  return supportedLngs.includes(locale)
}

function normalizeLanguageTag(languageTag: string): string {
  return languageTag.split('-')[0].toLowerCase()
}

function getCountryFromStorage(): string | null {
  try {
    return localStorage.getItem(COUNTRY_STORAGE_KEY)
  } catch {
    return null
  }
}

function setCountryToStorage(countryCode: string): void {
  try {
    localStorage.setItem(COUNTRY_STORAGE_KEY, countryCode)
  } catch {
    // Ignore storage errors in private mode or blocked storage.
  }
}

/** Страна посетителя (ipapi + localStorage), для политики локали и consent. */
export async function fetchVisitorCountryCode(): Promise<string | null> {
  const cachedCountry = getCountryFromStorage()
  if (cachedCountry) {
    return cachedCountry
  }

  try {
    const response = await fetchWithTimeout('https://ipapi.co/json/', { cache: 'no-store' })
    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { country_code?: string }
    const countryCode = data.country_code?.toUpperCase()
    if (!countryCode) {
      return null
    }

    setCountryToStorage(countryCode)
    return countryCode
  } catch {
    return null
  }
}

function getStoredLanguage(): string | null {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch {
    return null
  }
}

function detectBrowserLanguage(supportedLngs: string[]): string {
  const raw = navigator.language || 'en'
  const rawLower = raw.toLowerCase()
  /* 中国大陆常用：zh-CN、zh-Hans*、无地区的 zh */
  const prefersZhCn =
    rawLower.startsWith('zh-cn') ||
    rawLower.startsWith('zh-hans') ||
    rawLower === 'zh'
  if (prefersZhCn && isLocaleSupported('zh-CN', supportedLngs)) {
    return 'zh-CN'
  }
  const browserLanguage = normalizeLanguageTag(raw)
  return isLocaleSupported(browserLanguage, supportedLngs) ? browserLanguage : 'en'
}

function buildAllowedLanguages(
  supportedLngs: string[],
  primaryLocale: string,
  includeAll = false,
): string[] {
  if (includeAll) {
    return supportedLngs.filter((locale) => locale !== 'cimode')
  }

  const candidates = [primaryLocale, 'ru', 'tr']
  return candidates.filter(
    (locale, index, list) => list.indexOf(locale) === index && isLocaleSupported(locale, supportedLngs),
  )
}

export async function resolveLocalePolicy(supportedLngs: string[]): Promise<LocalePolicy> {
  const countryCode = await fetchVisitorCountryCode()

  if (countryCode === 'RU') {
    const locale = isLocaleSupported('ru', supportedLngs) ? 'ru' : 'en'
    return {
      locale,
      allowLanguageSwitch: true,
      countryCode,
      allowedLanguages: buildAllowedLanguages(supportedLngs, locale),
    }
  }

  if (countryCode === 'TR') {
    const preferred = getStoredLanguage()
    const locale =
      preferred && isLocaleSupported(preferred, supportedLngs)
        ? preferred
        : isLocaleSupported('tr', supportedLngs)
          ? 'tr'
          : 'en'

    return {
      locale,
      allowLanguageSwitch: true,
      countryCode,
      allowedLanguages: buildAllowedLanguages(supportedLngs, locale, true),
    }
  }

  if (countryCode && countryCode !== 'IL' && ARABIC_SPEAKING_COUNTRIES.has(countryCode)) {
    const locale = isLocaleSupported('ar', supportedLngs) ? 'ar' : 'en'
    return {
      locale,
      allowLanguageSwitch: true,
      countryCode,
      allowedLanguages: buildAllowedLanguages(supportedLngs, locale),
    }
  }

  if (countryCode) {
    const countryLanguage = COUNTRY_TO_LANGUAGE[countryCode] ?? 'en'
    const locale = isLocaleSupported(countryLanguage, supportedLngs) ? countryLanguage : 'en'
    return {
      locale,
      allowLanguageSwitch: true,
      countryCode,
      allowedLanguages: buildAllowedLanguages(supportedLngs, locale),
    }
  }

  const locale = detectBrowserLanguage(supportedLngs)
  return {
    locale,
    allowLanguageSwitch: true,
    countryCode: null,
    allowedLanguages: buildAllowedLanguages(supportedLngs, locale),
  }
}

export function persistSelectedLanguage(locale: string): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
  } catch {
    // Ignore storage errors in private mode or blocked storage.
  }
}
