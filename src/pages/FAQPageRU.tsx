import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import {
  fetchSiteFaq,
  isSupportPublicFaqConfigured,
  resolveFaqApiLocale,
  type FaqApiLocale,
  type SiteFaqCategory,
} from '../lib/supportPublicFaq'
import styles from './FAQPageRU.module.css'
import { FAQPageHelmet } from './FAQPageHelmet'

type CategoryChip = { id: string; label: string }

function normalizeQuery(q: string) {
  return q.trim().toLowerCase()
}

function itemMatches(query: string, question: string, answer: string) {
  if (!query) return true
  const hay = `${question} ${answer}`.toLowerCase()
  return hay.includes(query)
}

function escapeJsonLd(json: string) {
  return json.replace(/</g, '\\u003c')
}

export function FAQPageRU() {
  const { t, i18n } = useTranslation()
  const apiLocale: FaqApiLocale = useMemo(() => resolveFaqApiLocale(i18n.language), [i18n.language])

  const [openKey, setOpenKey] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<'config' | 'network' | null>(null)
  const [blocks, setBlocks] = useState<SiteFaqCategory[]>([])

  const load = useCallback(async () => {
    if (!isSupportPublicFaqConfigured()) {
      setError('config')
      setLoading(false)
      setBlocks([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSiteFaq(apiLocale)
      setBlocks(data)
    } catch (e) {
      console.error('[FAQPage] fetch failed', e)
      setError('network')
      setBlocks([])
    } finally {
      setLoading(false)
    }
  }, [apiLocale])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const query = normalizeQuery(search)

  const filteredBlocks = useMemo(() => {
    if (!query) return blocks
    return blocks
      .map((sec) => ({
        ...sec,
        items: sec.items.filter((item) => itemMatches(query, item.question, item.answer)),
      }))
      .filter((sec) => sec.items.length > 0)
  }, [blocks, query])

  const categories = useMemo((): CategoryChip[] => {
    if (blocks.length === 0) return []
    const chips: CategoryChip[] = [{ id: 'all', label: t('faqPage.categoryAll') }]
    for (const b of blocks) {
      chips.push({ id: b.slug, label: b.title || b.slug })
    }
    return chips
  }, [blocks, t])

  const visibleBlocks = useMemo(() => {
    if (query) return filteredBlocks
    if (category === 'all') return filteredBlocks
    return filteredBlocks.filter((b) => b.slug === category)
  }, [filteredBlocks, category, query])

  const showEmpty = query.length > 0 && filteredBlocks.length === 0

  const flatForLd = useMemo(() => {
    const out: { q: string; a: string }[] = []
    for (const b of blocks) {
      for (const it of b.items) {
        if (it.question || it.answer) out.push({ q: it.question, a: it.answer })
      }
    }
    return out
  }, [blocks])

  const faqJsonLd = useMemo(() => {
    if (flatForLd.length === 0) return ''
    return escapeJsonLd(
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: flatForLd.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }),
    )
  }, [flatForLd])

  const showUnavailable =
    !loading && !error && blocks.length > 0 && blocks.every((b) => b.items.length === 0)
  const showNoCategories = !loading && !error && blocks.length === 0

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <>
      <FAQPageHelmet apiLocale={apiLocale} />
      <Header showLanguageSelector />
      <main className={styles.root}>
        <section className={`section ${styles.section}`}>
          <div className="container">
            <h1 className={styles.title}>{t('faqPage.pageTitle')}</h1>
            <p className={styles.intro}>{t('faqPage.intro')}</p>

            {error === 'config' ? (
              <p className={styles.empty} role="alert">
                {t('faqPage.configError')}
              </p>
            ) : null}
            {error === 'network' ? (
              <p className={styles.empty} role="alert">
                {t('faqPage.loadError')}
              </p>
            ) : null}

            {loading ? (
              <div className={styles.skeleton} aria-busy="true" aria-live="polite">
                <span className="sr-only">{t('faqPage.skeletonAria')}</span>
                <div className={styles.skeletonBar} />
                <div className={styles.skeletonBar} />
                <div className={styles.skeletonBarShort} />
              </div>
            ) : null}

            {!loading && !error ? (
              <>
                {showNoCategories || showUnavailable ? (
                  <p className={styles.empty} role="status">
                    {t('faqPage.unavailable', { defaultValue: 'FAQ is not available' })}
                  </p>
                ) : null}
                {!showNoCategories && !showUnavailable ? (
                  <>
                    <div className={styles.searchWrap}>
                      <label className="sr-only" htmlFor="faq-search">
                        {t('faqPage.searchPlaceholder')}
                      </label>
                      <input
                        id="faq-search"
                        type="search"
                        className={styles.search}
                        value={search}
                        onChange={(e) => {
                          const v = e.target.value
                          setSearch(v)
                          if (v.trim()) setCategory('all')
                        }}
                        placeholder={t('faqPage.searchPlaceholder')}
                        autoComplete="off"
                      />
                    </div>
                    {categories.length > 1 ? (
                      <div className={styles.categories} role="tablist" aria-label={t('faqPage.categoryTabsLabel')}>
                        {categories.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            role="tab"
                            aria-selected={category === c.id}
                            className={`${styles.categoryBtn} ${category === c.id ? styles.categoryBtnActive : ''}`}
                            onClick={() => setCategory(c.id)}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    ) : null}
                    {showEmpty ? (
                      <p className={styles.empty} role="status">
                        {t('faqPage.searchEmpty')}
                      </p>
                    ) : null}
                    {visibleBlocks.map((sec) => (
                      <div key={sec.slug} className={styles.block}>
                        <h2 className={styles.heading}>{sec.title}</h2>
                        <div className={styles.list}>
                          {sec.items.map((item) => {
                            const key = `${sec.slug}-${item.id}`
                            const isOpen = openKey === key
                            return (
                              <div key={key} className={styles.item}>
                                <button
                                  type="button"
                                  className={styles.question}
                                  onClick={() => toggle(key)}
                                  aria-expanded={isOpen}
                                >
                                  <span>{item.question}</span>
                                  <span className={styles.icon} aria-hidden="true">
                                    {isOpen ? (
                                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path
                                          d="M5 12.5L10 7.5L15 12.5"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    ) : (
                                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path
                                          d="M5 7.5L10 12.5L15 7.5"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    )}
                                  </span>
                                </button>
                                {isOpen ? (
                                  <div className={styles.answer}>
                                    <p className={styles.answerBody}>{item.answer}</p>
                                  </div>
                                ) : null}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      ) : null}
    </>
  )
}
