import { describe, expect, it } from 'vitest'
import { formatPackageTitle, packageRegionKey } from './formatPackageTitle'
import type { Package } from './types'

const pkg = (over: Partial<Package>): Package => ({
  id: '1',
  name: 'Balkans (5+ areas) 3GB 30Days',
  countries: ['AL', 'BA', 'ME', 'MK', 'RS', 'XK', 'XK'],
  dataBytes: 3 * 1024 ** 3,
  durationDays: 30,
  networkTypes: ['4G'],
  supportsTopUp: true,
  prices: { RU: 100 },
  ...over,
})

describe('formatPackageTitle', () => {
  it('parses region and premium', () => {
    expect(packageRegionKey('Balkans (5+ areas) 3GB 30Days')).toEqual({
      region: 'Balkans (5+ areas)',
      premium: false,
    })
    expect(packageRegionKey('Turkey 10GB 30Days Premium')).toEqual({
      region: 'Turkey',
      premium: true,
    })
  })

  it('localizes multi-country region via map', () => {
    const t = ((key: string, opts?: Record<string, unknown>) => {
      if (key === 'esimPage.pricing.regions' && opts?.returnObjects) {
        return { 'Balkans (5+ areas)': 'Балканы (5+ направлений)' }
      }
      if (key === 'esimPage.pricing.days') return `${opts?.count} дн.`
      if (key === 'esimPage.pricing.premium') return 'Премиум'
      return key
    }) as Parameters<typeof formatPackageTitle>[2]

    expect(formatPackageTitle(pkg({ countries: ['AL', 'BA', 'RS'] }), 'ru', t)).toBe(
      'Балканы (5+ направлений) · 3 GB · 30 дн.',
    )
  })

  it('uses DisplayNames for single-country packs', () => {
    const t = ((key: string, opts?: Record<string, unknown>) => {
      if (key === 'esimPage.pricing.days') return `${opts?.count} days`
      return key
    }) as Parameters<typeof formatPackageTitle>[2]

    const title = formatPackageTitle(
      pkg({ name: 'Greece 3GB 30Days', countries: ['GR'], dataBytes: 3 * 1024 ** 3 }),
      'ru',
      t,
    )
    expect(title.startsWith('Греция')).toBe(true)
    expect(title).toContain('3 GB')
  })
})
