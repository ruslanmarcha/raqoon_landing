import { describe, expect, it } from 'vitest'
import {
  FALLBACK_RUB_PER_USD,
  formatPrice,
  formatPriceForLocale,
  resolveMarketForLocale,
} from './formatPrice'
import { formatDataBytes } from './formatDataBytes'
import type { Market, Package } from './types'

const marketRu: Market = {
  customerCountry: 'RU',
  currency: 'RUB',
  currencyScale: 100,
  paymentMethods: ['SBP'],
}

const marketUs: Market = {
  customerCountry: 'US',
  currency: 'USD',
  currencyScale: 100,
  paymentMethods: ['CARD'],
}

const pkg: Package = {
  id: 'pkg_example',
  name: 'Turkey 5GB 30 days',
  countries: ['TR'],
  dataBytes: 5_000_000_000,
  durationDays: 30,
  networkTypes: ['4G', '5G'],
  supportsTopUp: true,
  prices: { RU: 129_000, US: 1_500 },
}

describe('formatPrice', () => {
  it('formats minor units with market currencyScale', () => {
    const formatted = formatPrice(pkg, marketRu, 'ru-RU')
    expect(formatted).not.toBeNull()
    expect(formatted!.replace(/\s/g, '')).toMatch(/1.?290/)
  })

  it('returns null when market price is missing', () => {
    const withoutRu: Package = { ...pkg, prices: { US: 1000 } }
    expect(formatPrice(withoutRu, marketRu, 'ru-RU')).toBeNull()
  })
})

describe('formatPriceForLocale', () => {
  it('uses RUB for Russian UI', () => {
    const formatted = formatPriceForLocale(pkg, [marketRu, marketUs], 'ru')
    expect(formatted).not.toBeNull()
    expect(formatted!).toMatch(/₽|RUB|руб/i)
  })

  it('uses USD market for non-RU UI when available', () => {
    const formatted = formatPriceForLocale(pkg, [marketRu, marketUs], 'en')
    expect(formatted).not.toBeNull()
    expect(formatted!).toMatch(/\$|USD/)
    expect(formatted!).not.toMatch(/RUB|₽/)
  })

  it('converts RUB to USD for non-RU UI when USD market is missing', () => {
    const rubOnly: Package = { ...pkg, prices: { RU: FALLBACK_RUB_PER_USD * 100 } }
    const formatted = formatPriceForLocale(rubOnly, [marketRu], 'en')
    expect(formatted).not.toBeNull()
    expect(formatted!).toMatch(/\$|USD/)
    expect(formatted!.replace(/\s/g, '')).toMatch(/\$1(\.00)?|USD1/)
  })
})

describe('resolveMarketForLocale', () => {
  it('picks RU for Russian UI', () => {
    expect(resolveMarketForLocale([marketRu, marketUs], 'ru')?.customerCountry).toBe('RU')
  })

  it('picks USD for English UI', () => {
    expect(resolveMarketForLocale([marketRu, marketUs], 'en')?.currency).toBe('USD')
  })
})

describe('formatDataBytes', () => {
  it('formats gigabytes', () => {
    expect(formatDataBytes(5 * 1024 ** 3, 'en')).toBe('5 GB')
  })

  it('formats megabytes', () => {
    expect(formatDataBytes(500 * 1024 ** 2, 'en')).toBe('500 MB')
  })
})
