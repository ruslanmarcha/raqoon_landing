import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchPricing, PricingHttpError } from './fetchPricing'
import { filterTurkeyDestinationSims } from './filterTurkeySims'
import type { Pricing } from './types'

const samplePricing: Pricing = {
  version: 'v1',
  generatedAt: '2026-09-21T08:00:00Z',
  validUntil: '2026-09-21T14:00:00Z',
  markets: [
    {
      customerCountry: 'RU',
      currency: 'RUB',
      currencyScale: 100,
      paymentMethods: ['SBP'],
    },
  ],
  countries: [
    {
      code: 'TR',
      packages: [
        {
          id: 'pkg_tr',
          name: 'Turkey 5GB',
          countries: ['TR'],
          dataBytes: 5_000_000_000,
          durationDays: 30,
          networkTypes: ['4G'],
          supportsTopUp: true,
          prices: { RU: 129_000 },
        },
      ],
    },
    {
      code: 'DE',
      packages: [
        {
          id: 'pkg_de',
          name: 'Germany 3GB',
          countries: ['DE'],
          dataBytes: 3_000_000_000,
          durationDays: 15,
          networkTypes: ['4G', '5G'],
          supportsTopUp: false,
          prices: { RU: 99_000 },
        },
        {
          id: 'pkg_multi',
          name: 'EU+TR',
          countries: ['DE', 'TR'],
          dataBytes: 1_000_000_000,
          durationDays: 7,
          networkTypes: ['4G'],
          supportsTopUp: false,
          prices: { RU: 50_000 },
        },
      ],
    },
  ],
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('fetchPricing', () => {
  it('returns unchanged on 304', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 304,
        ok: false,
        headers: new Headers(),
      }),
    )

    await expect(fetchPricing('"abc"')).resolves.toEqual({ kind: 'unchanged' })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        credentials: 'omit',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'If-None-Match': '"abc"',
        }),
      }),
    )
  })

  it('returns snapshot on 200 JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        headers: new Headers({
          ETag: '"etag-1"',
          'content-type': 'application/json',
        }),
        json: async () => samplePricing,
      }),
    )

    await expect(fetchPricing()).resolves.toEqual({
      kind: 'snapshot',
      etag: '"etag-1"',
      data: samplePricing,
    })
  })

  it('throws PricingHttpError on 503', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 503,
        ok: false,
        headers: new Headers({ 'content-type': 'application/json' }),
      }),
    )

    await expect(fetchPricing()).rejects.toBeInstanceOf(PricingHttpError)
  })
})

describe('filterTurkeyDestinationSims', () => {
  it('removes TR destinations for Turkey visitors', () => {
    const filtered = filterTurkeyDestinationSims(samplePricing, 'TR')
    expect(filtered.countries.map((c) => c.code)).toEqual(['DE'])
    expect(filtered.countries[0].packages.map((p) => p.id)).toEqual(['pkg_de'])
  })

  it('leaves catalog unchanged for non-TR visitors', () => {
    expect(filterTurkeyDestinationSims(samplePricing, 'RU')).toEqual(samplePricing)
    expect(filterTurkeyDestinationSims(samplePricing, null)).toEqual(samplePricing)
  })
})
