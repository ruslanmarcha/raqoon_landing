/** Trimmed production origin, no trailing slash (e.g. https://raqoon.app). */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL
  if (typeof fromEnv === 'string' && fromEnv.trim()) return fromEnv.replace(/\/$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

export function absoluteUrl(path: string): string {
  const origin = getSiteOrigin()
  const p = path.startsWith('/') ? path : `/${path}`
  return origin ? `${origin}${p}` : p
}
