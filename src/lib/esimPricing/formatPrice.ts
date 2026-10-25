import { preferredDisplayCurrency } from './displayCurrency'
import { formatOfferMoney, isCurrency } from './money'
import type { Currency, DisplayPrices, Market, OfferMoney, Package } from './types'

export function isRuUiLocale(locale: string): boolean {
  return locale.trim().toLowerCase().startsWith('ru')
}

/** Buyer market (customerCountry), not display currency. */
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
  return markets.find((m) => m.customerCountry === 'RU') ?? markets[0]
}

export function displayPricesForMarket(pkg: Package, market: Market): DisplayPrices | null {
  return pkg.pricesByMarket[market.customerCountry] ?? null
}

export function offerMoneyFor(
  pkg: Package,
  market: Market,
  currency: Currency = preferredDisplayCurrency(),
): OfferMoney | null {
  const pair = displayPricesForMarket(pkg, market)
  return pair?.[currency] ?? null
}

/** True when the package has a complete USD+RUB pair for this buyer market. */
export function packageHasPriceForLocale(
  pkg: Package,
  markets: Market[],
  locale: string,
): boolean {
  const market = resolveMarketForLocale(markets, locale)
  return Boolean(market && displayPricesForMarket(pkg, market))
}

export type ResolvedUnitPrice = {
  minor: number
  currency: Currency
  currencyScale: 100
}

/** Catalog unit price — server pair only, no client FX. */
export function resolveUnitPriceForLocale(
  pkg: Package,
  markets: Market[],
  locale: string,
  currency: Currency = preferredDisplayCurrency(),
): ResolvedUnitPrice | null {
  const market = resolveMarketForLocale(markets, locale)
  if (!market) return null
  const money = offerMoneyFor(pkg, market, currency)
  if (!money) return null
  return {
    minor: money.amountMinor,
    currency: money.currencyCode,
    currencyScale: money.scale,
  }
}

export function formatPrice(
  pkg: Package,
  market: Market,
  locale = 'ru-RU',
  currency: Currency = preferredDisplayCurrency(),
): string | null {
  const money = offerMoneyFor(pkg, market, currency)
  return money ? formatOfferMoney(money, locale) : null
}

export function formatMinorAmount(
  minor: number,
  currency: string,
  currencyScale: number,
  locale: string,
): string {
  const code = isCurrency(currency) ? currency : currency.toUpperCase()
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
  }).format(minor / currencyScale)
}

export function formatPriceForLocale(
  pkg: Package,
  markets: Market[],
  locale: string,
  currency: Currency = preferredDisplayCurrency(),
): string | null {
  const unit = resolveUnitPriceForLocale(pkg, markets, locale, currency)
  if (!unit) return null
  return formatMinorAmount(unit.minor, unit.currency, unit.currencyScale, locale)
}
