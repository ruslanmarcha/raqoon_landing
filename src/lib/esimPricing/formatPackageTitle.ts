import type { Package } from './types'
import { formatDataBytes } from './formatDataBytes'

const NAME_TAIL =
  /\s+\d+(?:[.,]\d+)?\s*(?:MB|GB|TB)\s+\d+\s*Days$/i

/** English region label as it appears in catalog `name` (without data/days/Premium). */
export function packageRegionKey(name: string): { region: string; premium: boolean } {
  let rest = name.trim()
  const premium = /\s+Premium$/i.test(rest)
  if (premium) rest = rest.replace(/\s+Premium$/i, '').trim()
  const region = rest
    .replace(NAME_TAIL, '')
    .replace(/\s+\d+(?:[.,]\d+)?(?:MB|GB|TB)\s+\d+Days$/i, '')
    .trim()
  return { region: region || rest, premium }
}

function countryLabel(code: string, locale: string): string {
  try {
    const names = new Intl.DisplayNames([locale], { type: 'region' })
    return names.of(code.toUpperCase()) ?? code
  } catch {
    return code
  }
}

type Translate = {
  (key: string, options?: Record<string, unknown>): string
  (key: string, options: { returnObjects: true }): unknown
}

/**
 * Localized package title for the pricing list.
 * Single-country packs use DisplayNames; multi-country use i18n region map.
 */
export function formatPackageTitle(pkg: Package, locale: string, t: Translate): string {
  const { region, premium } = packageRegionKey(pkg.name)

  let regionLabel: string
  if (pkg.countries.length === 1) {
    regionLabel = countryLabel(pkg.countries[0], locale)
  } else {
    const regions = t('esimPage.pricing.regions', { returnObjects: true })
    regionLabel =
      regions && typeof regions === 'object' && !Array.isArray(regions) && region in regions
        ? String((regions as Record<string, string>)[region])
        : region
  }

  if (premium) {
    regionLabel = `${regionLabel} · ${t('esimPage.pricing.premium')}`
  }

  const data = formatDataBytes(pkg.dataBytes, locale)
  const days = t('esimPage.pricing.days', { count: pkg.durationDays })
  return `${regionLabel} · ${data} · ${days}`
}
