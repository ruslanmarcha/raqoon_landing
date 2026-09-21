export type Market = {
  customerCountry: string
  currency: string
  currencyScale: number
  paymentMethods: string[]
}

export type Package = {
  id: string
  name: string
  countries: string[]
  dataBytes: number
  durationDays: number
  networkTypes: string[]
  supportsTopUp: boolean
  prices: Record<string, number>
}

export type CountryGroup = {
  code: string
  packages: Package[]
}

export type Pricing = {
  version: string
  generatedAt: string
  validUntil: string
  markets: Market[]
  countries: CountryGroup[]
}

export type PricingResult =
  | { kind: 'unchanged' }
  | { kind: 'snapshot'; etag: string | null; data: Pricing }
