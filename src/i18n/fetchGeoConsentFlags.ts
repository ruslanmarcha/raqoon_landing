import { isEUOrEEARegion } from '@/lib/euRegion'
import { fetchVisitorCountryCode } from './geoLocale'

export type GeoConsentFlags = {
  countryCode: string | null
  isEUUser: boolean
}

/**
 * Предпочтительно: ответ бэкенда /api/geo (Vercel: IP → страна).
 * Иначе: тот же ipapi, что и для локали, + клиентская проверка EU/EEA.
 */
export async function fetchGeoConsentFlags(): Promise<GeoConsentFlags> {
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_FORCE_EU === '1') {
    return { countryCode: 'DE', isEUUser: true }
  }

  try {
    const r = await fetch('/api/geo', { cache: 'no-store' })
    if (r.ok) {
      const j = (await r.json()) as { countryCode?: string | null; isEUUser?: boolean }
      const code = j.countryCode ? String(j.countryCode).toUpperCase() : null
      // Если edge ответил 200, но страну не определил — не блокируем старую логику (ipapi + raqoon_country).
      if (code) {
        return {
          countryCode: code,
          isEUUser: Boolean(j.isEUUser),
        }
      }
    }
  } catch {
    // fallback
  }

  const countryCode = await fetchVisitorCountryCode()
  return {
    countryCode,
    isEUUser: isEUOrEEARegion(countryCode),
  }
}
