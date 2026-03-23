/**
 * Google Play: localized badge PNGs from Google’s CDN (official artwork).
 * @see https://play.google.com/intl/en_us/badges/
 *
 * Apple App Store / Mac App Store: English SVGs bundled under /public/badges/
 * (localized “Download on the …” artwork ships only in Apple’s marketing ZIP;
 * replace files in public/badges/ if you add RU/DE/… from App Store Connect resources).
 */

const GOOGLE_PLAY_BADGE_BASE =
  'https://play.google.com/intl' as const

type GoogleBadgeSpec = {
  intlPath: string
  /** Filename prefix before `_badge_web_generic.png` */
  filePrefix: string
}

/**
 * Maps i18next `language` (e.g. `ru`, `pt-BR`) to Google Play badge URL.
 */
export function getGooglePlayBadgeUrl(language: string): string {
  const spec = resolveGoogleBadgeSpec(language)
  return `${GOOGLE_PLAY_BADGE_BASE}/${spec.intlPath}/badges/static/images/badges/${spec.filePrefix}_badge_web_generic.png`
}

function resolveGoogleBadgeSpec(language: string): GoogleBadgeSpec {
  const raw = language.trim()
  const lower = raw.toLowerCase()

  if (lower.startsWith('ru')) return { intlPath: 'ru_ru', filePrefix: 'ru' }
  if (lower.startsWith('de')) return { intlPath: 'de_de', filePrefix: 'de' }
  if (lower.startsWith('fr')) return { intlPath: 'fr_fr', filePrefix: 'fr' }
  if (lower.startsWith('pl')) return { intlPath: 'pl_pl', filePrefix: 'pl' }
  if (lower.startsWith('cs')) return { intlPath: 'cs_cz', filePrefix: 'cs' }
  if (lower.startsWith('ar')) return { intlPath: 'ar', filePrefix: 'ar' }
  if (lower.startsWith('tr')) return { intlPath: 'tr_tr', filePrefix: 'tr' }
  if (lower.startsWith('id')) return { intlPath: 'id_id', filePrefix: 'id' }
  if (lower.startsWith('th')) return { intlPath: 'th_th', filePrefix: 'th' }
  if (lower.startsWith('ja')) return { intlPath: 'ja_jp', filePrefix: 'ja' }
  if (lower.startsWith('ko')) return { intlPath: 'ko_kr', filePrefix: 'ko' }
  if (lower.startsWith('pt')) return { intlPath: 'pt-br_pt-br', filePrefix: 'pt' }
  /** Tagalog: Google provides Filipino badge */
  if (lower.startsWith('tl')) return { intlPath: 'fil_ph', filePrefix: 'fil' }
  if (lower.startsWith('zh-cn') || lower === 'zh') {
    return { intlPath: 'zh-cn_cn', filePrefix: 'zh-cn' }
  }

  return { intlPath: 'en_us', filePrefix: 'en' }
}

/**
 * Локализованные PNG Google Play с CDN имеют разное «воздушное» поле в файле.
 * ru / tr сверены визуально; остальным языкам нужен чуть больший scale, чтобы высота
 * совпадала с эталоном (как в русской локали).
 */
export function getGooglePlayBadgeVisualScale(language: string): {
  sm: number
  md: number
} {
  const lower = language.trim().toLowerCase()
  if (lower.startsWith('ru') || lower.startsWith('tr')) {
    return { sm: 1.32, md: 1.28 }
  }
  return { sm: 1.42, md: 1.38 }
}

/** Default: US/UK English black SVG from Apple marketing guidelines (see /public/badges/). */
export const APPLE_APP_STORE_BADGE_SRC = '/badges/app-store.svg' as const
export const APPLE_MAC_APP_STORE_BADGE_SRC = '/badges/mac-app-store.svg' as const

/** Extend when you add localized SVGs from Apple’s marketing resource ZIP (folders RU, DE, …). */
export function getAppleAppStoreBadgeSrc(_language: string): string {
  return APPLE_APP_STORE_BADGE_SRC
}

export function getMacAppStoreBadgeSrc(_language: string): string {
  return APPLE_MAC_APP_STORE_BADGE_SRC
}
