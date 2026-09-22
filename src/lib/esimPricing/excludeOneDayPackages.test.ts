import { describe, expect, it } from 'vitest'
import { excludeOneDayPackages, isOneDayPackage } from './excludeOneDayPackages'
import type { Package, Pricing } from './types'

const basePkg = (over: Partial<Package>): Package => ({
  id: 'p',
  name: 'Pack',
  countries: ['TR'],
  dataBytes: 1024 ** 3,
  durationDays: 30,
  networkTypes: ['4G'],
  supportsTopUp: false,
  prices: { RU: 100 },
  ...over,
})

describe('excludeOneDayPackages', () => {
  it('flags 1-day packs', () => {
    expect(isOneDayPackage(basePkg({ durationDays: 1 }))).toBe(true)
    expect(isOneDayPackage(basePkg({ durationDays: 7 }))).toBe(false)
  })

  it('removes 1-day packs and empty countries', () => {
    const pricing: Pricing = {
      version: '1',
      generatedAt: '',
      validUntil: '',
      markets: [],
      countries: [
        {
          code: 'TR',
          packages: [
            basePkg({ id: 'day', durationDays: 1 }),
            basePkg({ id: 'week', durationDays: 7 }),
          ],
        },
        {
          code: 'GR',
          packages: [basePkg({ id: 'only-day', durationDays: 1, countries: ['GR'] })],
        },
      ],
    }

    const next = excludeOneDayPackages(pricing)
    expect(next.countries).toHaveLength(1)
    expect(next.countries[0].code).toBe('TR')
    expect(next.countries[0].packages.map((p) => p.id)).toEqual(['week'])
  })
})
