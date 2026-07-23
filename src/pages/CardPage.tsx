import { useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { FeatureList } from '../components/FeatureList/FeatureList'
import type { FeatureItemData } from '../components/FeatureItem/FeatureItem'
import downloadStyles from './DownloadPage.module.css'
import walletStyles from './WalletPage.module.css'
import pricingStyles from '../components/Pricing/Pricing.module.css'
import styles from './CardPage.module.css'

const CARD_CTA_HREF = 'https://t.me/raqoonwalletbot?start=17510'
const CARD_HERO_SRC = '/card-hero.png'

type TermRow = { label: string; value: string }

function ProductTerms({ terms }: { terms: TermRow[] }) {
  return (
    <ul className={styles.termsList}>
      {terms.map((term) => (
        <li key={term.label} className={styles.termRow}>
          <span className={styles.termLabel}>{term.label}</span>
          <span className={styles.termValue}>{term.value}</span>
        </li>
      ))}
    </ul>
  )
}

export function CardPage() {
  const { i18n } = useTranslation()
  const isRu = i18n.language.startsWith('ru')
  const t = useMemo(() => i18n.getFixedT('ru'), [i18n])

  const quickStartItems = useMemo(
    () => t('cardPage.quickStart.items', { returnObjects: true }) as FeatureItemData[],
    [t],
  )

  const stepLines = useMemo(() => t('cardPage.steps.items', { returnObjects: true }) as string[], [t])
  const stepItems: FeatureItemData[] = useMemo(() => stepLines.map((label) => ({ label })), [stepLines])

  const subscriptionTerms = useMemo(
    () => t('cardPage.products.subscription.terms', { returnObjects: true }) as TermRow[],
    [t],
  )
  const premiumTerms = useMemo(
    () => t('cardPage.products.premium.terms', { returnObjects: true }) as TermRow[],
    [t],
  )

  const heroTitleLines = t('cardPage.hero.title').split('\n')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  if (!isRu) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <SEOHead variant="ru" page="card" metaLocale="ru" />
      <Header />
      <main className={downloadStyles.root}>
        <section className={downloadStyles.hero}>
          <div className="container">
            <div className={downloadStyles.heroInner}>
              <div className={downloadStyles.mascot} aria-hidden="true">
                <img
                  src={CARD_HERO_SRC}
                  alt=""
                  className={downloadStyles.mascotImg}
                  width={560}
                  height={560}
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
              <p className={downloadStyles.heroLead}>{t('cardPage.hero.subtitle')}</p>
              <a
                href={CARD_CTA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-secondary btn-lg ${walletStyles.cta}`}
              >
                {t('cardPage.hero.cta')}
              </a>
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock}`}>
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('cardPage.quickStart.title')}</h2>
            <div className={`${downloadStyles.featuresCard} ${downloadStyles.featuresCardPlain}`}>
              <FeatureList items={quickStartItems} className={downloadStyles.featureList} />
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock} ${walletStyles.sectionExtraTop}`}>
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('cardPage.steps.title')}</h2>
            <div className={`${downloadStyles.featuresCard} ${downloadStyles.featuresCardPlain}`}>
              <FeatureList items={stepItems} className={downloadStyles.featureList} />
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.sectionBlock} ${walletStyles.sectionExtraTop}`}>
          <div className="container">
            <h2 className={downloadStyles.sectionHeading}>{t('cardPage.products.title')}</h2>
            <div className={pricingStyles.grid}>
              <div className={`${pricingStyles.card} ${pricingStyles.cardBase}`}>
                <div className={pricingStyles.cardHeader}>
                  <span className={pricingStyles.badge}>{t('cardPage.products.subscription.name')}</span>
                  <p className={pricingStyles.price}>{t('cardPage.products.subscription.price')}</p>
                  <p className={styles.productDesc}>{t('cardPage.products.subscription.description')}</p>
                </div>
                <ProductTerms terms={subscriptionTerms} />
                <a
                  href={CARD_CTA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-primary ${pricingStyles.ctaBtn}`}
                >
                  {t('cardPage.hero.cta')}
                </a>
              </div>

              <div className={`${pricingStyles.card} ${pricingStyles.cardPremium}`}>
                <div className={pricingStyles.cardHeader}>
                  <span className={pricingStyles.badge}>{t('cardPage.products.premium.name')}</span>
                  <p className={pricingStyles.price}>{t('cardPage.products.premium.price')}</p>
                  <p className={styles.productDesc}>{t('cardPage.products.premium.description')}</p>
                </div>
                <ProductTerms terms={premiumTerms} />
                <a
                  href={CARD_CTA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-primary ${pricingStyles.ctaBtn}`}
                >
                  {t('cardPage.hero.cta')}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${downloadStyles.finalWrap} ${walletStyles.sectionExtraTop}`}>
          <div className="container">
            <div className={downloadStyles.finalCard}>
              <p className={downloadStyles.finalText}>{t('cardPage.final.text')}</p>
              <a
                href={CARD_CTA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${downloadStyles.finalCta}`}
              >
                {t('cardPage.final.cta')}
              </a>
            </div>
            <p className={walletStyles.disclaimer}>{t('cardPage.final.disclaimer')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
