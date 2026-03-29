/** Google Analytics 4 — Consent Mode v2 + однократная загрузка gtag.js */

export const GTAG_MEASUREMENT_ID = import.meta.env.VITE_GTAG_ID ?? 'G-1S5CS8CFVZ'

const STORAGE_KEY = 'raqoon_cookie_consent'

export type StoredConsent = 'accepted' | 'rejected'

export type ConsentPayload = {
  consent: StoredConsent
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GRANTED = {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
} as const

const DENIED = {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const

export function readStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ConsentPayload>
    if (parsed.consent === 'accepted' || parsed.consent === 'rejected') return parsed.consent
  } catch {
    // ignore
  }
  return null
}

export function writeStoredConsent(consent: StoredConsent): void {
  try {
    const payload: ConsentPayload = { consent }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore
  }
}

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
  }
}

/** Вызывать после inline default в index.html (или самому выставить default до загрузки скрипта). */
export function gtagConsentUpdate(
  mode: 'granted' | 'denied',
): void {
  ensureGtag()
  const state = mode === 'granted' ? GRANTED : DENIED
  window.gtag!('consent', 'update', state)
}

let loadPromise: Promise<void> | null = null

/**
 * Подключает gtag.js один раз, затем config.
 * Consent уже должен быть выставлен (default/update) до вызова.
 */
export function loadGtagJsAndConfig(): Promise<void> {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      ensureGtag()
      window.gtag!('js', new Date())
      const debug =
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('gtag_debug') === '1'
      window.gtag!('config', GTAG_MEASUREMENT_ID, debug ? { debug_mode: true } : {})
      resolve()
      return
    }

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GTAG_MEASUREMENT_ID)}`
    s.onload = () => {
      ensureGtag()
      window.gtag!('js', new Date())
      const debug =
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('gtag_debug') === '1'
      window.gtag!('config', GTAG_MEASUREMENT_ID, debug ? { debug_mode: true } : {})
      resolve()
    }
    s.onerror = () => reject(new Error('gtag.js failed to load'))
    document.head.appendChild(s)
  })

  return loadPromise
}

export async function bootstrapGoogleTagForRegion(options: {
  isEUUser: boolean
}): Promise<void> {
  const stored = readStoredConsent()

  if (!options.isEUUser) {
    gtagConsentUpdate('granted')
    await loadGtagJsAndConfig()
    return
  }

  if (stored === 'accepted') {
    gtagConsentUpdate('granted')
    await loadGtagJsAndConfig()
    return
  }

  if (stored === 'rejected') {
    gtagConsentUpdate('denied')
    await loadGtagJsAndConfig()
    return
  }

  /* EU, выбор ещё не сделан — остаётся default denied из index.html */
  await loadGtagJsAndConfig()
}

export function applyUserConsentChoice(choice: StoredConsent): void {
  writeStoredConsent(choice)
  if (choice === 'accepted') {
    gtagConsentUpdate('granted')
  } else {
    gtagConsentUpdate('denied')
  }
}
