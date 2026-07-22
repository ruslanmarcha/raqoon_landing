import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { FeatureList } from '../components/FeatureList/FeatureList'
import type { FeatureItemData } from '../components/FeatureItem/FeatureItem'
import downloadStyles from './DownloadPage.module.css'
import styles from './WalletPage.module.css'
import faqStyles from '../components/FAQ/FAQ.module.css'

type CompareRow = { label: string; values: string[] }
type FaqItem = { q: string; a: string }

const WALLET_CTA_HREF = 'https://t.me/raqoonwalletbot'
const WALLET_HERO_MASCOT = '/wallet-hero-mascot.png'
const WALLET_HERO_TRANSFER = '/wallet-hero-transfer.png'
const WALLET_HERO_EXCHANGE = '/wallet-hero-exchange.png'

export function WalletPage() {
  const { i18n } = useTranslation()
  const isRu = i18n.language.startsWith('ru')
  const t = useMemo(() => i18n.getFixedT('ru'), [i18n])
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const stepLines = useMemo(() => t('walletPage.steps.items', { returnObjects: true }) as string[], [t])
  const stepItems: FeatureItemData[] = useMemo(() => stepLines.map((label) => ({ label })), [stepLines])

  const whyItems = useMemo(
    () => t('walletPage.why.items', { returnObjects: true }) as FeatureItemData[],
    [t],
  )

  const referralLines = useMemo(
    () => t('walletPage.referral.items', { returnObjects: true }) as string[],
    [t],
  )
  const referralItems: FeatureItemData[] = useMemo(
    () => referralLines.map((label) => ({ label })),
    [referralLines],
  )

  const compareHeaders = useMemo(
    () => t('walletPage.compare.headers', { returnObjects: true }) as string[],
    [t],
  )
  const compareRows = useMemo(
    () => t('walletPage.compare.rows', { returnObjects: true }) as CompareRow[],
    [t],
  )

  const faqItems = useMemo(() => t('walletPage.faq.items', { returnObjects: true }) as FaqItem[], [t])

  const heroTitleLines = t('walletPage.hero.title').split('\n')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  if (!isRu) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <SEOHead variant="ru" page="wallet" metaLocale="ru" />
      <Header />
      <main className={downloadStyles.root}>
        <section className={downloadStyles.hero}>
          <div className="container">
            <div className={downloadStyles.heroInner}>
              <div className={styles.heroVisual} aria-hidden="true">
                <img
                  src={WALLET_HERO_TRANSFER}
                  alt=""
                  className={`${styles.heroCard} ${styles.heroCardLeft}`}
                  width={343}
                  height={341}
                />
                <img
                  src={WALLET_HERO_MASCOT}
                  alt=""
                  className={styles.heroMascot}
                  width={512}
                  height={512}
                />
                <img
                  src={WALLET_HERO_EXCHANGE}
                  alt=""
                  className={`${styles.heroCard} ${styles.heroCardRight}`}
                  width={343}
                  height={359}
                />
              </div>
              <h1 className={downloadStyles.heroTitle}>
                {heroTitleLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < heroTitleLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h1>
              <p className={downloadStyles.heroLead}>{t('walletPage.hero.subtitle')}</p>
              <a
                href={WALLET_CTA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-secondary btn-lg ${styles.cta}`}
              >
                {t('walletPage.hero.cta')}
              </a>
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock}`} id="how">
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('walletPage.steps.title')}</h2>
            <div className={`${downloadStyles.featuresCard} ${downloadStyles.featuresCardPlain}`}>
              <FeatureList items={stepItems} className={downloadStyles.featureList} />
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock} ${styles.sectionExtraTop}`}>
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('walletPage.compare.title')}</h2>
            <div className={styles.compareWrap}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    {compareHeaders.map((header, i) => (
                      <th key={i} scope="col" className={i === 1 ? styles.compareHighlight : undefined}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, i) => (
                        <td key={i} className={i === 0 ? styles.compareHighlight : undefined}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock} ${styles.sectionExtraTop}`}>
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('walletPage.why.title')}</h2>
            <div className={`${downloadStyles.featuresCard} ${downloadStyles.featuresCardPlain}`}>
              <FeatureList items={whyItems} className={downloadStyles.featureList} />
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock} ${styles.sectionExtraTop}`}>
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('walletPage.referral.title')}</h2>
            <p className={`${downloadStyles.prose} ${styles.sectionLead}`}>{t('walletPage.referral.subtitle')}</p>
            <div className={`${downloadStyles.featuresCard} ${downloadStyles.featuresCardPlain}`}>
              <FeatureList items={referralItems} className={downloadStyles.featureList} />
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock} ${styles.sectionExtraTop}`} id="faq">
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('walletPage.faq.title')}</h2>
            <div className={faqStyles.list}>
              {faqItems.map((item, i) => (
                <div
                  key={item.q}
                  className={`${faqStyles.item} ${openFaq === i ? faqStyles.itemOpen : ''}`}
                >
                  <button
                    type="button"
                    className={faqStyles.question}
                    onClick={() => setOpenFaq((prev) => (prev === i ? null : i))}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.q}</span>
                    <span className={faqStyles.icon} aria-hidden="true">
                      {openFaq === i ? (
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
                  {openFaq === i ? (
                    <div className={faqStyles.answer}>
                      <p>{item.a}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.finalWrap} ${styles.sectionExtraTop}`}>
          <div className="container">
            <div className={downloadStyles.finalCard}>
              <p className={downloadStyles.finalText}>{t('walletPage.final.text')}</p>
              <a
                href={WALLET_CTA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${downloadStyles.finalCta}`}
              >
                {t('walletPage.final.cta')}
              </a>
            </div>
            <p className={styles.disclaimer}>{t('walletPage.final.disclaimer')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
