import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './FAQPageRU.module.css'

type FaqItem = { q: string; a: string }

type FaqSection = {
  id: string
  heading: string
  items: FaqItem[]
}

function normalizeQuery(q: string) {
  return q.trim().toLowerCase()
}

function itemMatches(query: string, item: FaqItem) {
  if (!query) return true
  const hay = `${item.q} ${item.a}`.toLowerCase()
  return hay.includes(query)
}

export function FAQPageRU() {
  const { t, i18n } = useTranslation()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const isRu = i18n.language.startsWith('ru')

  const sections = useMemo((): FaqSection[] => {
    if (!isRu) return []
    const raw = t('faqPage.sections', { returnObjects: true })
    return Array.isArray(raw) ? (raw as FaqSection[]) : []
  }, [t, isRu])

  const query = normalizeQuery(search)

  const filteredSections = useMemo(() => {
    if (!query) return sections
    return sections
      .map((sec) => ({
        ...sec,
        items: sec.items.filter((item) => itemMatches(query, item)),
      }))
      .filter((sec) => sec.items.length > 0)
  }, [sections, query])

  const flatForLd = useMemo(() => sections.flatMap((s) => s.items), [sections])

  const faqJsonLd = useMemo(
    () =>
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
    [flatForLd],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  if (!isRu) {
    return <Navigate to="/ww" replace />
  }

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  const showEmpty = query.length > 0 && filteredSections.length === 0

  return (
    <>
      <SEOHead variant="ru" page="faq" />
      <Header />
      <main className={styles.root}>
        <section className={`section ${styles.section}`}>
          <div className="container">
            <h1 className={styles.title}>{t('faqPage.pageTitle')}</h1>
            <p className={styles.intro}>{t('faqPage.intro')}</p>
            <div className={styles.searchWrap}>
              <label className="sr-only" htmlFor="faq-search">
                {t('faqPage.searchPlaceholder')}
              </label>
              <input
                id="faq-search"
                type="search"
                className={styles.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('faqPage.searchPlaceholder')}
                autoComplete="off"
              />
            </div>
            {showEmpty ? (
              <p className={styles.empty} role="status">
                {t('faqPage.searchEmpty')}
              </p>
            ) : null}
            {filteredSections.map((sec) => (
              <div key={sec.id} className={styles.block}>
                <h2 className={styles.heading}>{sec.heading}</h2>
                <div className={styles.list}>
                  {sec.items.map((item, i) => {
                    const key = `${sec.id}-${i}`
                    const isOpen = openKey === key
                    return (
                      <div key={key} className={styles.item}>
                        <button
                          type="button"
                          className={styles.question}
                          onClick={() => toggle(key)}
                          aria-expanded={isOpen}
                        >
                          <span>{item.q}</span>
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
                            <p>{item.a}</p>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </>
  )
}
