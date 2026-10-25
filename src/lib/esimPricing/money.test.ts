import { describe, expect, it } from 'vitest'
import { formatOfferMoney, parseDisplayPrices, parseOfferMoney } from './money'

describe('parseOfferMoney', () => {
  it('accepts a valid USD row', () => {
    expect(parseOfferMoney({ amountMinor: 1290, currencyCode: 'USD', scale: 100 }, 'USD')).toEqual({
      amountMinor: 1290,
      currencyCode: 'USD',
      scale: 100,
    })
  })

  it('rejects mismatched currency, bad scale, or non-integer', () => {
    expect(parseOfferMoney({ amountMinor: 1290, currencyCode: 'RUB', scale: 100 }, 'USD')).toBeNull()
    expect(parseOfferMoney({ amountMinor: 1290, currencyCode: 'USD', scale: 1 }, 'USD')).toBeNull()
    expect(parseOfferMoney({ amountMinor: 12.9, currencyCode: 'USD', scale: 100 }, 'USD')).toBeNull()
    expect(parseOfferMoney({ amountMinor: -1, currencyCode: 'USD', scale: 100 }, 'USD')).toBeNull()
  })
})

describe('parseDisplayPrices', () => {
  it('requires both USD and RUB', () => {
    expect(
      parseDisplayPrices({
        USD: { amountMinor: 1290, currencyCode: 'USD', scale: 100 },
        RUB: { amountMinor: 129000, currencyCode: 'RUB', scale: 100 },
      }),
    ).toEqual({
      USD: { amountMinor: 1290, currencyCode: 'USD', scale: 100 },
      RUB: { amountMinor: 129000, currencyCode: 'RUB', scale: 100 },
    })
    expect(
      parseDisplayPrices({
        USD: { amountMinor: 1290, currencyCode: 'USD', scale: 100 },
      }),
    ).toBeNull()
  })

  it('formats $12.90 and 1290 ₽ from the same pair', () => {
    const pair = parseDisplayPrices({
      USD: { amountMinor: 1290, currencyCode: 'USD', scale: 100 },
      RUB: { amountMinor: 129000, currencyCode: 'RUB', scale: 100 },
    })!
    expect(formatOfferMoney(pair.USD, 'en-US')).toMatch(/12\.90/)
    expect(formatOfferMoney(pair.RUB, 'ru-RU')).toMatch(/1[\u00a0\u202f ]?290/)
  })
})
