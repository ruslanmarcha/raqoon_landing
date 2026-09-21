import type { Pricing, PricingResult } from './types'

export const DEFAULT_ESIM_PRICING_URL =
  'https://tech-raqoon-esim.izirocks.store/api/v1/public/pricing'

export function getEsimPricingUrl(): string {
  const fromEnv = import.meta.env.VITE_ESIM_PRICING_URL?.trim()
  return fromEnv || DEFAULT_ESIM_PRICING_URL
}

export class PricingHttpError extends Error {
  readonly status: number

  constructor(status: number, message?: string) {
    super(message ?? `Pricing HTTP ${status}`)
    this.name = 'PricingHttpError'
    this.status = status
  }
}

/**
 * Public pricing catalog client (landing-public-pricing.md).
 * credentials omit; optional If-None-Match; 10s timeout.
 */
export async function fetchPricing(etag?: string): Promise<PricingResult> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (etag) {
    headers['If-None-Match'] = etag
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10_000)

  try {
    const response = await fetch(getEsimPricingUrl(), {
      method: 'GET',
      credentials: 'omit',
      headers,
      signal: controller.signal,
    })

    if (response.status === 304) {
      return { kind: 'unchanged' }
    }

    if (!response.ok) {
      throw new PricingHttpError(response.status)
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
      throw new Error('Pricing response is not JSON')
    }

    const data = (await response.json()) as Pricing
    return {
      kind: 'snapshot',
      etag: response.headers.get('ETag'),
      data,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
