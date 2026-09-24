import type { Market, Package } from './types'

/** Display-only RUB→USD until the public catalog exposes a USD market. */
export const FALLBACK_RUB_PER_USD = Number(import.meta.env.VITE_ESIM_RUB_PER_USD) || 90

export function isRuUiLocale(locale: string): boolean {
  return locale.trim().toLowerCase().startsWith('ru')
}

/** Pick buyer market: RU UI → RUB market; otherwise prefer USD/US. */
export function resolveMarketForLocale(
  markets: Market[],
  locale: string,
  preferred: string | null = null,
): Market | null {
  if (!markets.length) return null
  if (preferred) {
    const match = markets.find((m) => m.customerCountry === preferred)
    if (match) return match
  }
  if (isRuUiLocale(locale)) {
    return markets.find((m) => m.customerCountry === 'RU') ?? markets[0]
  }
  return (
    markets.find((m) => m.currency.toUpperCase() === 'USD') ??
    markets.find((m) => m.customerCountry === 'US') ??
    markets.find((m) => m.customerCountry !== 'RU') ??
    null
  )
}

/** True when the package can be priced for this UI locale. */
export function packageHasPriceForLocale(
  pkg: Package,
  markets: Market[],
  locale: string,
): boolean {
  const market = resolveMarketForLocale(markets, locale)
  if (market && pkg.prices[market.customerCountry] !== undefined) return true
  if (!isRuUiLocale(locale)) {
    return pkg.prices.RU !== undefined
  }
  return false
}

/** Format package price for the active UI locale (RUB only for RU). */
export function formatPrice(
  pkg: Package,
  market: Market,
  locale = 'ru-RU',
): string | null {
  const minor = pkg.prices[market.customerCountry]
  if (minor === undefined) return null
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: market.currency,
  }).format(minor / market.currencyScale)
}

/**
 * Locale-aware price string: RUB for `ru*`, USD otherwise.
 * If the catalog has no USD market yet, converts RUB for display only.
 */
export function formatPriceForLocale(
  pkg: Package,
  markets: Market[],
  locale: string,
): string | null {
  const market = resolveMarketForLocale(markets, locale)
  if (market && pkg.prices[market.customerCountry] !== undefined) {
    return formatPrice(pkg, market, locale)
  }

  if (isRuUiLocale(locale)) return null

  const ruMarket = markets.find((m) => m.customerCountry === 'RU')
  const minorRu = pkg.prices.RU
  if (!ruMarket || minorRu === undefined) return null

  const rub = minorRu / ruMarket.currencyScale
  const usd = rub / FALLBACK_RUB_PER_USD
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(usd)
}
