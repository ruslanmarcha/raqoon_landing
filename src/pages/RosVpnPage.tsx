import { useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { FeatureList } from '../components/FeatureList/FeatureList'
import type { FeatureItemData } from '../components/FeatureItem/FeatureItem'
import styles from './DownloadPage.module.css'
import pricingStyles from '../components/Pricing/Pricing.module.css'

const ROSVPN_HERO_SRC = '/rosvpn-hero.png'
const HELP_URL = 'https://help.raqoon.app'

export function RosVpnPage() {
  const { i18n } = useTranslation()
  const isRu = i18n.language.startsWith('ru')
  const t = useMemo(() => i18n.getFixedT('ru'), [i18n])

  const stepLines = useMemo(() => t('rosVpnPage.steps.items', { returnObjects: true }) as string[], [t])
  const stepItems: FeatureItemData[] = useMemo(() => stepLines.map((label) => ({ label })), [stepLines])

  const leftLines = useMemo(() => t('rosVpnPage.cards.leftItems', { returnObjects: true }) as string[], [t])
  const leftItems: FeatureItemData[] = useMemo(() => leftLines.map((label) => ({ label })), [leftLines])

  const rightLines = useMemo(() => t('rosVpnPage.cards.rightItems', { returnObjects: true }) as string[], [t])
  const rightItems: FeatureItemData[] = useMemo(() => rightLines.map((label) => ({ label })), [rightLines])

  const premium1Lines = useMemo(
    () => t('rosVpnPage.premium.block1.items', { returnObjects: true }) as string[],
    [t],
  )
  const premium1Items: FeatureItemData[] = useMemo(() => premium1Lines.map((label) => ({ label })), [premium1Lines])

  const premium2Lines = useMemo(
    () => t('rosVpnPage.premium.block2.items', { returnObjects: true }) as string[],
    [t],
  )
  const premium2Items: FeatureItemData[] = useMemo(() => premium2Lines.map((label) => ({ label })), [premium2Lines])

  const rightIntroText = t('rosVpnPage.cards.rightIntro').trim()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  if (!isRu) {
    return <Navigate to="/ww" replace />
  }

  return (
    <>
      <SEOHead variant="ru" page="rosvpn" metaLocale="ru" />
      <Header />
      <main className={styles.root}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.mascot} aria-hidden="true">
                <img src={ROSVPN_HERO_SRC} alt="" className={styles.mascotImg} width={560} height={260} />
              </div>
              <h1 className={styles.heroTitle}>{t('rosVpnPage.hero.title')}</h1>
              <p className={styles.heroLead}>{t('rosVpnPage.hero.subtitle')}</p>
              <a
                href={HELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                {t('rosVpnPage.micro.support')}
              </a>
            </div>
          </div>
        </section>

        <section className={`section ${styles.sectionBlock}`}>
          <div className="container">
            <h2 className={styles.sectionHeading}>{t('rosVpnPage.steps.title')}</h2>
            <div className={`${styles.featuresCard} ${styles.featuresCardPlain}`}>
              <FeatureList items={stepItems} className={styles.featureList} />
            </div>
          </div>
        </section>

        <section className={`section ${styles.sectionBlock}`} id="rosvpn-benefits">
          <div className="container">
            <div className={pricingStyles.grid}>
              <div className={`${pricingStyles.card} ${pricingStyles.cardBase}`}>
                <div className={pricingStyles.cardHeader}>
                  <span className={`${pricingStyles.badge} ${styles.rosVpnCardHeading}`}>{t('rosVpnPage.cards.leftTitle')}</span>
                </div>
                <FeatureList items={leftItems} className={pricingStyles.features} />
              </div>

              <div className={`${pricingStyles.card} ${pricingStyles.cardPremium} ${styles.referralRewardCard}`}>
                <div className={styles.referralRewardContent}>
                  <div className={pricingStyles.cardHeader}>
                    <span className={`${pricingStyles.badge} ${styles.rosVpnCardHeading}`}>{t('rosVpnPage.cards.rightTitle')}</span>
                  </div>
                  {rightIntroText ? <p className={styles.rewardIntro}>{rightIntroText}</p> : null}
                  <FeatureList items={rightItems} className={pricingStyles.features} />
                </div>
                <div className={styles.referralRewardDecor} aria-hidden="true">
                  <img src="/eyes.png" alt="" className={styles.eyesImg} width={300} height={200} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.sectionBlock}`}>
          <div className="container">
            <div className={styles.premiumCard}>
              <div className={styles.premiumSection}>
                <h2 className={`${styles.blockTitle} ${styles.rosVpnCardHeading}`}>{t('rosVpnPage.premium.block1.title')}</h2>
                <p className={styles.prose}>{t('rosVpnPage.premium.block1.body')}</p>
                <FeatureList items={premium1Items} className={styles.premiumList} />
              </div>
              <div className={styles.premiumSection}>
                <h2 className={`${styles.blockTitle} ${styles.rosVpnCardHeading}`}>{t('rosVpnPage.premium.block2.title')}</h2>
                <FeatureList items={premium2Items} className={styles.premiumList} />
              </div>
              <div className={styles.premiumSection}>
                <h2 className={`${styles.blockTitle} ${styles.rosVpnCardHeading}`}>{t('rosVpnPage.premium.block3.title')}</h2>
                <p className={styles.prose}>{t('rosVpnPage.premium.block3.body')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.finalWrap}`}>
          <div className="container">
            <div className={styles.finalCard}>
              <p className={styles.finalText}>{t('rosVpnPage.final.text')}</p>
              <a href={HELP_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.finalCta}`}>
                {t('rosVpnPage.micro.support')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
