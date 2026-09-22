import type { Package, Pricing } from './types'

/** Drop 1-day packs from the public catalog (everywhere). */
export function isOneDayPackage(pkg: Package): boolean {
  return pkg.durationDays === 1
}

export function excludeOneDayPackages(pricing: Pricing): Pricing {
  return {
    ...pricing,
    countries: pricing.countries
      .map((group) => ({
        ...group,
        packages: group.packages.filter((pkg) => !isOneDayPackage(pkg)),
      }))
      .filter((group) => group.packages.length > 0),
  }
}
