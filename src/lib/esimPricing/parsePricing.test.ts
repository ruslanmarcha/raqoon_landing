import { describe, expect, it } from 'vitest'
import { parsePricing } from './parsePricing'

const validPair = {
  USD: { amountMinor: 1290, currencyCode: 'USD', scale: 100 },
  RUB: { amountMinor: 129000, currencyCode: 'RUB', scale: 100 },
}

describe('parsePricing', () => {
  it('parses the ESIM-95 public catalog shape', () => {
    const pricing = parsePricing({
      version: 'v1',
      generatedAt: '2026-10-17T10:00:00Z',
      validUntil: '2026-10-17T16:00:00Z',
      markets: [{ customerCountry: 'RU', currency: 'RUB', currencyScale: 100, paymentMethods: ['SBP'] }],
      countries: [
        {
          code: 'TR',
          packages: [
            {
              id: 'pkg_example',
              name: 'Turkey 5GB 30 days',
              countries: ['TR'],
              dataBytes: 5_000_000_000,
              durationDays: 30,
              networkTypes: ['4G', '5G'],
              supportsTopUp: true,
              pricesByMarket: { RU: validPair },
            },
          ],
        },
      ],
    })
    expect(pricing.countries[0].packages[0].pricesByMarket.RU.USD.amountMinor).toBe(1290)
  })

  it('rejects legacy prices and drops incomplete pairs', () => {
    const pricing = parsePricing({
      version: 'v1',
      generatedAt: 'a',
      validUntil: 'b',
      markets: [{ customerCountry: 'RU', currency: 'RUB', currencyScale: 100, paymentMethods: [] }],
      countries: [
        {
          code: 'TR',
          packages: [
            {
              id: 'legacy',
              name: 'x',
              countries: ['TR'],
              dataBytes: 1,
              durationDays: 1,
              networkTypes: [],
              supportsTopUp: false,
              prices: { RU: 100 },
            },
            {
              id: 'incomplete',
              name: 'y',
              countries: ['TR'],
              dataBytes: 1,
              durationDays: 1,
              networkTypes: [],
              supportsTopUp: false,
              pricesByMarket: { RU: { USD: validPair.USD } },
            },
            {
              id: 'ok',
              name: 'z',
              countries: ['TR'],
              dataBytes: 1,
              durationDays: 1,
              networkTypes: [],
              supportsTopUp: false,
              pricesByMarket: { RU: validPair },
            },
          ],
        },
      ],
    })
    expect(pricing.countries[0].packages.map((p) => p.id)).toEqual(['ok'])
  })
})
