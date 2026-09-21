import type { Pricing } from './types'

const TR = 'TR'

function isTurkeyCode(code: string): boolean {
  return code.toUpperCase() === TR
}

/**
 * Visitors from Turkey must not see Turkish destination SIMs.
 * Uses geo `countryCode` from LocalePolicy / geoLocale (ipapi + storage).
 * Filters destination `countries[].code` and packages listing TR — not buyer markets.
 */
export function filterTurkeyDestinationSims(
  pricing: Pricing,
  visitorCountryCode: string | null | undefined,
): Pricing {
  if (!visitorCountryCode || !isTurkeyCode(visitorCountryCode)) {
    return pricing
  }

  return {
    ...pricing,
    countries: pricing.countries
      .filter((group) => !isTurkeyCode(group.code))
      .map((group) => ({
        ...group,
        packages: group.packages.filter(
          (pkg) => !pkg.countries.some((code) => isTurkeyCode(code)),
        ),
      }))
      .filter((group) => group.packages.length > 0),
  }
}
