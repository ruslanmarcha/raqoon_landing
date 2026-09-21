import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice'
import { formatDataBytes } from './formatDataBytes'
import type { Market, Package } from './types'

const marketRu: Market = {
  customerCountry: 'RU',
  currency: 'RUB',
  currencyScale: 100,
  paymentMethods: ['SBP'],
}

const pkg: Package = {
  id: 'pkg_example',
  name: 'Turkey 5GB 30 days',
  countries: ['TR'],
  dataBytes: 5_000_000_000,
  durationDays: 30,
  networkTypes: ['4G', '5G'],
  supportsTopUp: true,
  prices: { RU: 129_000 },
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

describe('formatDataBytes', () => {
  it('formats gigabytes', () => {
    expect(formatDataBytes(5 * 1024 ** 3, 'en')).toBe('5 GB')
  })

  it('formats megabytes', () => {
    expect(formatDataBytes(500 * 1024 ** 2, 'en')).toBe('500 MB')
  })
})
