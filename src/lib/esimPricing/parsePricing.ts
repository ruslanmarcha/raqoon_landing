import { parseDisplayPrices } from './money'
import type { CountryGroup, Market, Package, Pricing } from './types'

function parseMarket(raw: unknown): Market | null {
  if (!raw || typeof raw !== 'object') return null
  const row = raw as Record<string, unknown>
  if (typeof row.customerCountry !== 'string' || !row.customerCountry) return null
  if (typeof row.currency !== 'string' || !row.currency) return null
  if (typeof row.currencyScale !== 'number' || row.currencyScale !== 100) return null
  const paymentMethods = Array.isArray(row.paymentMethods)
    ? row.paymentMethods.filter((m): m is string => typeof m === 'string')
    : []
  return {
    customerCountry: row.customerCountry,
    currency: row.currency,
    currencyScale: row.currencyScale,
    paymentMethods,
  }
}

function parsePackage(raw: unknown): Package | null {
  if (!raw || typeof raw !== 'object') return null
  const row = raw as Record<string, unknown>
  // Legacy `prices` is not accepted — the owner rejected compatibility.
  if ('prices' in row && row.prices !== undefined) return null
  if (typeof row.id !== 'string' || !row.id) return null
  if (typeof row.name !== 'string') return null
  if (typeof row.dataBytes !== 'number' || !Number.isFinite(row.dataBytes)) return null
  if (typeof row.durationDays !== 'number' || !Number.isFinite(row.durationDays)) return null

  const byMarketRaw = row.pricesByMarket
  if (!byMarketRaw || typeof byMarketRaw !== 'object') return null
  const pricesByMarket: Package['pricesByMarket'] = {}
  for (const [country, pairRaw] of Object.entries(byMarketRaw as Record<string, unknown>)) {
    const pair = parseDisplayPrices(pairRaw)
    if (!pair) return null
    pricesByMarket[country] = pair
  }
  if (Object.keys(pricesByMarket).length === 0) return null

  return {
    id: row.id,
    name: row.name,
    countries: Array.isArray(row.countries)
      ? row.countries.filter((c): c is string => typeof c === 'string')
      : [],
    dataBytes: row.dataBytes,
    durationDays: row.durationDays,
    networkTypes: Array.isArray(row.networkTypes)
      ? row.networkTypes.filter((n): n is string => typeof n === 'string')
      : [],
    supportsTopUp: Boolean(row.supportsTopUp),
    pricesByMarket,
  }
}

function parseCountryGroup(raw: unknown): CountryGroup | null {
  if (!raw || typeof raw !== 'object') return null
  const row = raw as Record<string, unknown>
  if (typeof row.code !== 'string' || !row.code) return null
  if (!Array.isArray(row.packages)) return null
  const packages: Package[] = []
  for (const pkgRaw of row.packages) {
    const pkg = parsePackage(pkgRaw)
    if (pkg) packages.push(pkg)
  }
  return { code: row.code, packages }
}

/**
 * Parse and validate the public pricing catalog (ESIM-95).
 * Throws if the top-level document is not a usable catalog.
 * Packages that fail money validation are omitted rather than shown at 0.
 */
export function parsePricing(raw: unknown): Pricing {
  if (!raw || typeof raw !== 'object') throw new Error('Pricing response is not an object')
  const row = raw as Record<string, unknown>
  if (typeof row.version !== 'string' || !row.version) throw new Error('Pricing version missing')
  if (typeof row.generatedAt !== 'string' || typeof row.validUntil !== 'string') {
    throw new Error('Pricing timestamps missing')
  }
  if (!Array.isArray(row.markets) || !Array.isArray(row.countries)) {
    throw new Error('Pricing markets/countries missing')
  }

  const markets = row.markets.map(parseMarket).filter((m): m is Market => m !== null)
  if (!markets.length) throw new Error('Pricing has no markets')

  const countries = row.countries
    .map(parseCountryGroup)
    .filter((g): g is CountryGroup => g !== null && g.packages.length > 0)

  return {
    version: row.version,
    generatedAt: row.generatedAt,
    validUntil: row.validUntil,
    markets,
    countries,
  }
}
