import type { Market, Package } from './types'

/** Format package price for a market. Returns null when the market price is missing (≠ 0). */
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
