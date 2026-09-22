/**
 * Same-origin proxy for the public eSIM pricing catalog.
 * Browser CORS only allows https://raqoon.app by default; production is on www
 * and previews/localhost also fail. Server-side fetch needs no CORS.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'

const UPSTREAM =
  process.env.ESIM_PRICING_UPSTREAM_URL?.trim() ||
  'https://tech-raqoon-esim.izirocks.store/api/v1/public/pricing'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const headers: Record<string, string> = { Accept: 'application/json' }
  const ifNoneMatch = req.headers['if-none-match']
  if (typeof ifNoneMatch === 'string' && ifNoneMatch) {
    headers['If-None-Match'] = ifNoneMatch
  }

  try {
    const upstream = await fetch(UPSTREAM, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(10_000),
    })

    const etag = upstream.headers.get('etag')
    if (etag) res.setHeader('ETag', etag)

    const cacheControl = upstream.headers.get('cache-control')
    if (cacheControl) res.setHeader('Cache-Control', cacheControl)

    const expose = upstream.headers.get('access-control-expose-headers')
    if (expose) res.setHeader('Access-Control-Expose-Headers', expose)
    else res.setHeader('Access-Control-Expose-Headers', 'ETag, Cache-Control')

    if (upstream.status === 304) {
      res.status(304).end()
      return
    }

    const contentType = upstream.headers.get('content-type') || 'application/json'
    res.setHeader('Content-Type', contentType)

    const body = Buffer.from(await upstream.arrayBuffer())
    res.status(upstream.status).send(body)
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    res.status(503).json({
      error: { code: 'CATALOG_UNAVAILABLE', message: 'Upstream pricing unavailable' },
    })
  }
}
