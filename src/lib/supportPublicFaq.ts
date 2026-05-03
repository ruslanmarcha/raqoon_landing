import { fetchWithTimeout } from './fetchWithTimeout'

export type FaqApiLocale = 'ru' | 'en'

/** ru → API ru; любая другая локаль сайта → API en (ТЗ п. 4–5). */
export function resolveFaqApiLocale(i18nLanguage: string): FaqApiLocale {
  return i18nLanguage.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export type SiteFaqCategory = {
  slug: string
  title: string
  items: { id: string; question: string; answer: string }[]
}

const CLIENT_CACHE_TTL_MS = 10 * 60 * 1000
const cache = new Map<string, { at: number; data: SiteFaqCategory[] }>()

/** Прод-адрес публичного FAQ на портале Support. Используется, если `VITE_SUPPORT_PUBLIC_API_BASE` не задан. */
const DEFAULT_PUBLIC_BASE = 'https://help.raqoon.app/api/public'

function getPublicBase(): string {
  const b = import.meta.env.VITE_SUPPORT_PUBLIC_API_BASE
  const v = typeof b === 'string' && b.trim() ? b.trim() : DEFAULT_PUBLIC_BASE
  return v.replace(/\/$/, '')
}

export function isSupportPublicFaqConfigured(): boolean {
  return Boolean(getPublicBase())
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
    },
    12_000,
  )
  if (!res.ok) {
    const err = new Error(`FAQ HTTP ${res.status}`)
    ;(err as Error & { status?: number }).status = res.status
    throw err
  }
  return res.json() as Promise<T>
}

/**
 * Категории и вопросы с публичного API Support (`/api/public/faq/*`).
 * Клиентский кеш ~10 мин на ключ locale.
 */
export async function fetchSiteFaq(apiLocale: FaqApiLocale): Promise<SiteFaqCategory[]> {
  const base = getPublicBase()

  const ck = apiLocale
  const hit = cache.get(ck)
  if (hit && Date.now() - hit.at < CLIENT_CACHE_TTL_MS) {
    return hit.data
  }

  const { categories } = await fetchJson<{ categories: { id: string; slug: string; title: string }[] }>(
    `${base}/faq/categories?locale=${encodeURIComponent(apiLocale)}`,
  )

  if (!Array.isArray(categories) || categories.length === 0) {
    cache.set(ck, { at: Date.now(), data: [] })
    return []
  }

  const settled = await Promise.allSettled(
    categories.map((c) =>
      fetchJson<{
        category: { slug: string; title: string }
        items: { id: string; question: string; answer: string }[]
      }>(`${base}/faq/category/${encodeURIComponent(c.slug)}?locale=${encodeURIComponent(apiLocale)}`),
    ),
  )

  const blocks: SiteFaqCategory[] = []
  for (let i = 0; i < settled.length; i++) {
    const r = settled[i]
    const slug = categories[i]?.slug
    if (r.status === 'fulfilled') {
      const { category, items } = r.value
      blocks.push({
        slug: category.slug,
        title: category.title,
        items: Array.isArray(items) ? items : [],
      })
    } else {
      console.error('[supportPublicFaq] category failed', slug, r.reason)
    }
  }

  cache.set(ck, { at: Date.now(), data: blocks })
  return blocks
}
