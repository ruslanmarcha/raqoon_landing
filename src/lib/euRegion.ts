/**
 * EU + EEA (non-EU: IS, LI, NO) + UK — типичный набор для GDPR/PECR-стиля cookie consent.
 * При необходимости сузьте только до EU-27.
 */
const EU_EEA_UK = new Set([
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'GB',
])

export function isEUOrEEARegion(countryCode: string | null | undefined): boolean {
  if (!countryCode) return false
  return EU_EEA_UK.has(countryCode.toUpperCase())
}
