import { beforeEach, describe, expect, it } from 'vitest'
import { formatDataBytes } from './formatDataBytes'
import { DISPLAY_CURRENCY_KEY } from './displayCurrency'
import {
  formatPrice,
  formatPriceForLocale,
  packageHasPriceForLocale,
  resolveMarketForLocale,
  resolveUnitPriceForLocale,
} from './formatPrice'
import type { Market, Package } from './types'

const markets: Market[] = [
  { customerCountry: 'RU', currency: 'RUB', currencyScale: 100, paymentMethods: ['SBP'] },
  { customerCountry: 'US', currency: 'USD', currencyScale: 100, paymentMethods: ['CARD'] },
]

const pair = {
  USD: { amountMinor: 1290, currencyCode: 'USD' as const, scale: 100 as const },
  RUB: { amountMinor: 129000, currencyCode: 'RUB' as const, scale: 100 as const },
}

const pkg: Package = {
  id: 'pkg_example',
  name: 'Turkey 5GB 30 days',
  countries: ['TR'],
  dataBytes: 5_000_000_000,
  durationDays: 30,
  networkTypes: ['4G', '5G'],
  supportsTopUp: true,
  pricesByMarket: { RU: pair },
}

function ensureStorage(): Storage {
  const existing = (globalThis as { localStorage?: Storage }).localStorage
  if (existing) return existing
  const data = new Map<string, string>()
  const memory: Storage = {
    get length() {
      return data.size
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => {
      data.delete(key)
    },
    setItem: (key, value) => {
      data.set(key, String(value))
    },
  }
  Object.defineProperty(globalThis, 'localStorage', { value: memory, configurable: true })
  return memory
}

beforeEach(() => {
  ensureStorage().clear()
})

describe('formatPrice', () => {
  it('formats minor units from the server pair', () => {
    const market = resolveMarketForLocale(markets, 'ru')!
    const formatted = formatPrice(pkg, market, 'en-US', 'USD')
    expect(formatted).not.toBeNull()
    expect(formatted!.replace(/\s/g, '')).toMatch(/12\.90/)
  })

  it('returns null when the buyer market is missing', () => {
    const withoutRu: Package = { ...pkg, pricesByMarket: {} }
    const market = resolveMarketForLocale(markets, 'ru')!
    expect(formatPrice(withoutRu, market, 'ru-RU')).toBeNull()
  })
})

describe('formatPriceForLocale', () => {
  it('defaults to USD even for the RU market and ru locale', () => {
    const formatted = formatPriceForLocale(pkg, markets, 'ru')
    expect(formatted).not.toBeNull()
    expect(formatted!).toMatch(/\$|USD/)
    expect(resolveUnitPriceForLocale(pkg, markets, 'ru')?.currency).toBe('USD')
    expect(resolveUnitPriceForLocale(pkg, markets, 'ru')?.minor).toBe(1290)
  })

  it('uses stored RUB preference without client FX', () => {
    ensureStorage().setItem(DISPLAY_CURRENCY_KEY, 'RUB')
    expect(resolveUnitPriceForLocale(pkg, markets, 'en')?.currency).toBe('RUB')
    expect(resolveUnitPriceForLocale(pkg, markets, 'en')?.minor).toBe(129000)
    const formatted = formatPriceForLocale(pkg, markets, 'ru-RU')
    expect(formatted).not.toBeNull()
    expect(formatted!).toMatch(/₽|RUB|руб/i)
  })

  it('treats a missing market as unpriced', () => {
    const other: Package = { ...pkg, pricesByMarket: {} }
    expect(packageHasPriceForLocale(other, markets, 'ru')).toBe(false)
    expect(formatPriceForLocale(other, markets, 'ru')).toBeNull()
  })
})

describe('resolveMarketForLocale', () => {
  it('picks RU for Russian UI', () => {
    expect(resolveMarketForLocale(markets, 'ru')?.customerCountry).toBe('RU')
  })

  it('still picks the RU buyer market for English UI', () => {
    expect(resolveMarketForLocale(markets, 'en')?.customerCountry).toBe('RU')
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
