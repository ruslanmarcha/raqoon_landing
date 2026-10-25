import type { Currency, DisplayPrices, OfferMoney } from './types'

export const CURRENCIES: readonly Currency[] = ['USD', 'RUB'] as const
export const MONEY_SCALE = 100 as const

export function isCurrency(value: unknown): value is Currency {
  return value === 'USD' || value === 'RUB'
}

/** Runtime check for one OfferMoney entry. Invalid → null (never invent amounts). */
export function parseOfferMoney<C extends Currency>(
  raw: unknown,
  expected: C,
): OfferMoney<C> | null {
  if (!raw || typeof raw !== 'object') return null
  const row = raw as Record<string, unknown>
  const amountMinor = row.amountMinor
  const currencyCode = row.currencyCode
  const scale = row.scale
  if (typeof amountMinor !== 'number' || !Number.isSafeInteger(amountMinor) || amountMinor < 0) {
    return null
  }
  if (currencyCode !== expected) return null
  if (scale !== MONEY_SCALE) return null
  return { amountMinor, currencyCode: expected, scale: MONEY_SCALE }
}

/** Both USD and RUB must be present and valid; otherwise the offer is unusable. */
export function parseDisplayPrices(raw: unknown): DisplayPrices | null {
  if (!raw || typeof raw !== 'object') return null
  const row = raw as Record<string, unknown>
  const USD = parseOfferMoney(row.USD, 'USD')
  const RUB = parseOfferMoney(row.RUB, 'RUB')
  if (!USD || !RUB) return null
  return { USD, RUB }
}

export function formatOfferMoney(money: OfferMoney, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currencyCode,
  }).format(money.amountMinor / money.scale)
}
