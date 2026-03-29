import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { InstructionTextModal } from '../components/InstructionTextModal/InstructionTextModal'
import { getInstructionSteps } from '../faq/thirdPartyInstructionSteps'
import styles from './FAQPageRU.module.css'
import { FAQPageHelmet } from './FAQPageHelmet'

type FaqItem = { q: string; a: string }

type FaqSection = {
  id: string
  heading: string
  items: FaqItem[]
}

type CategoryChip = { id: string; label: string }

type ThirdPartyApp = {
  name: string
  subtitle: string
  description: string
  downloadUrl: string
  instructionKey?: string
}

type ThirdPartyPlatform = { title: string; apps: ThirdPartyApp[] }

type InstructionWarningPayload = {
  title: string
  lines: string[]
}

type ThirdPartyAppsPayload = {
  heading: string
  disclaimer: string
  supportLine: string
  btnDownload: string
  btnInstruction: string
  btnOpenApp: string
  btnOpenBot: string
  modalClose: string
  instructionWarning?: InstructionWarningPayload
  platforms: ThirdPartyPlatform[]
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
  const { i18n } = useTranslation()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [instructionModal, setInstructionModal] = useState<{
    title: string
    steps: readonly string[]
    appUrl: string
  } | null>(null)

  const tRu = useMemo(() => i18n.getFixedT('ru'), [i18n])

  const sections = useMemo((): FaqSection[] => {
    const raw = tRu('faqPage.sections', { returnObjects: true })
    return Array.isArray(raw) ? (raw as FaqSection[]) : []
  }, [tRu])

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

  const categories = useMemo((): CategoryChip[] => {
    const raw = tRu('faqPage.categories', { returnObjects: true })
    return Array.isArray(raw) ? (raw as CategoryChip[]) : []
  }, [tRu])

  const thirdPartyApps = useMemo((): ThirdPartyAppsPayload | null => {
    const raw = tRu('faqPage.thirdPartyApps', { returnObjects: true })
    if (!raw || typeof raw !== 'object' || !('platforms' in raw)) return null
    return raw as ThirdPartyAppsPayload
  }, [tRu])

  const visibleSections = useMemo(() => {
    if (query) return filteredSections
    if (category === 'all') return filteredSections
    return filteredSections.filter((s) => s.id === category)
  }, [filteredSections, category, query])

  const showThirdPartyAppsGrid =
    !query && thirdPartyApps && (category === 'all' || category === 'thirdParty')

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

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  const showEmpty = query.length > 0 && filteredSections.length === 0

  return (
    <>
      <FAQPageHelmet />
      <Header showLanguageSelector={false} />
      <main className={styles.root}>
        <section className={`section ${styles.section}`}>
          <div className="container">
            <h1 className={styles.title}>{tRu('faqPage.pageTitle')}</h1>
            <p className={styles.intro}>{tRu('faqPage.intro')}</p>
            <div className={styles.searchWrap}>
              <label className="sr-only" htmlFor="faq-search">
                {tRu('faqPage.searchPlaceholder')}
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
                placeholder={tRu('faqPage.searchPlaceholder')}
                autoComplete="off"
              />
            </div>
            {categories.length > 0 ? (
              <div className={styles.categories} role="tablist" aria-label="Разделы FAQ">
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
                {tRu('faqPage.searchEmpty')}
              </p>
            ) : null}
            {visibleSections.map((sec) => (
              <Fragment key={sec.id}>
                <div className={styles.block}>
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
                {sec.id === 'thirdParty' && showThirdPartyAppsGrid && thirdPartyApps ? (
                  <div className={styles.appsBlock} id="third-party-apps">
                    <h3 className={styles.heading}>{thirdPartyApps.heading}</h3>
                    <p className={styles.appsDisclaimer}>{thirdPartyApps.disclaimer}</p>
                    <p className={styles.appsSupport}>{thirdPartyApps.supportLine}</p>
                    {thirdPartyApps.platforms.map((platform) => (
                      <Fragment key={platform.title}>
                        <h4 className={styles.appsPlatformTitle}>{platform.title}</h4>
                        <div className={styles.appsGrid}>
                          {platform.apps.map((app) => (
                            <div
                              key={`${platform.title}-${app.name}-${app.subtitle}`}
                              className={styles.appCard}
                            >
                              <div className={styles.appCardName}>{app.name}</div>
                              <div className={styles.appCardTitle}>{app.subtitle}</div>
                              <p className={styles.appCardDesc}>{app.description}</p>
                              <div className={styles.appCardActions}>
                                <a
                                  className={styles.appCardBtn}
                                  href={app.downloadUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {thirdPartyApps.btnDownload}
                                </a>
                                {(() => {
                                  const steps = getInstructionSteps(app.instructionKey)
                                  if (!steps?.length) return null
                                  return (
                                    <button
                                      type="button"
                                      className={styles.appCardBtnOutline}
                                      onClick={() =>
                                        setInstructionModal({
                                          title: `${app.name} — ${app.subtitle}`,
                                          steps,
                                          appUrl: app.downloadUrl,
                                        })
                                      }
                                    >
                                      {thirdPartyApps.btnInstruction}
                                    </button>
                                  )
                                })()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      {instructionModal && thirdPartyApps ? (
        <InstructionTextModal
          open
          onClose={() => setInstructionModal(null)}
          title={instructionModal.title}
          steps={instructionModal.steps}
          closeLabel={thirdPartyApps.modalClose}
          appUrl={instructionModal.appUrl}
          appUrlLabel={thirdPartyApps.btnOpenApp}
          botUrl="https://t.me/raqoonbot"
          botUrlLabel={thirdPartyApps.btnOpenBot}
          instructionWarning={
            thirdPartyApps.instructionWarning
              ? {
                  title: thirdPartyApps.instructionWarning.title,
                  lines: thirdPartyApps.instructionWarning.lines,
                }
              : undefined
          }
        />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </>
  )
}
