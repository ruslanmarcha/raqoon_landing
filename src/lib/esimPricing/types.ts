export type Currency = 'USD' | 'RUB'

export type OfferMoney<C extends Currency = Currency> = {
  amountMinor: number
  currencyCode: C
  scale: 100
}

/** Both currencies are required by the public catalog contract (ESIM-95). */
export type DisplayPrices = {
  USD: OfferMoney<'USD'>
  RUB: OfferMoney<'RUB'>
}

export type Market = {
  customerCountry: string
  /** Settlement currency for this buyer market — not the catalog display default. */
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
  /** pricesByMarket[customerCountry] → USD + RUB pair. Field `prices` is gone. */
  pricesByMarket: Record<string, DisplayPrices>
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
