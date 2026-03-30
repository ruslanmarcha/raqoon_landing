import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { FeatureList } from '../components/FeatureList/FeatureList'
import type { FeatureItemData } from '../components/FeatureItem/FeatureItem'
import styles from './DownloadPage.module.css'
import pricingStyles from '../components/Pricing/Pricing.module.css'

const REFERRAL_HERO_IMAGE_SRC = '/referral-hero.png'
const BOT_URL = 'https://t.me/raqoonbot'

type RewardRow = {
  period: string
  bonus: string
}

export function ReferralPage() {
  const { t, i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'
  const importantInline = t('referralPage.important.inline', {
    title: t('referralPage.important.title'),
    oldCode: t('referralPage.important.oldCode'),
    defaultValue: '{{title}}: {{oldCode}}',
  })
  const campaignInline = t('referralPage.campaign.inline', {
    title: t('referralPage.campaign.title'),
    description: t('referralPage.campaign.description'),
    defaultValue: '{{title}}. {{description}}',
  })

  const heroTitles = useMemo(
    () => t('referralPage.hero.titleVariants', { returnObjects: true }) as string[],
    [t, i18n.language],
  )
  const howItWorks = useMemo(
    () => t('referralPage.howItWorks.steps', { returnObjects: true }) as string[],
    [t, i18n.language],
  )
  const rewards = useMemo(
    () => t('referralPage.yourReward.rows', { returnObjects: true }) as RewardRow[],
    [t, i18n.language],
  )
  const limits = useMemo(
    () => t('referralPage.limits.items', { returnObjects: true }) as string[],
    [t, i18n.language],
  )
  const importantSources = useMemo(
    () => t('referralPage.important.sources', { returnObjects: true }) as string[],
    [t, i18n.language],
  )

  const howItWorksItems: FeatureItemData[] = useMemo(
    () => howItWorks.map((step) => ({ label: step })),
    [howItWorks],
  )
  const limitsItems: FeatureItemData[] = useMemo(
    () => limits.map((item) => ({ label: item })),
    [limits],
  )
  const importantSourceItems: FeatureItemData[] = useMemo(
    () => importantSources.map((item) => ({ label: item })),
    [importantSources],
  )
  const rewardItems: FeatureItemData[] = useMemo(
    () => rewards.map((row) => ({ label: `${row.period} - ${row.bonus}` })),
    [rewards],
  )
  const leftCardItems: FeatureItemData[] = useMemo(
    () => [
      { label: t('referralPage.friendBonus.description') },
      { label: t('referralPage.accrual.description') },
      { label: t('referralPage.timing.description') },
    ],
    [t, i18n.language],
  )
  const rightCardItems: FeatureItemData[] = useMemo(
    () => rewardItems,
    [rewardItems],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant={variant} page="download" />
      <Header />
      <main className={styles.root}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.mascot} aria-hidden="true">
                <img src={REFERRAL_HERO_IMAGE_SRC} alt="" className={styles.mascotImg} />
              </div>
              <h1 className={styles.heroTitle}>{heroTitles[0]}</h1>
              <p className={styles.heroLead}>{t('referralPage.hero.subtitle')}</p>
              <a
                href={BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                {t('referralPage.micro.getPromo')}
              </a>
            </div>
          </div>
        </section>

        <section className={`section ${styles.sectionBlock}`}>
          <div className="container">
            <h2 className={styles.sectionHeading}>{t('referralPage.howItWorks.title')}</h2>
            <div className={styles.featuresCard}>
              <FeatureList items={howItWorksItems} className={styles.featureList} />
            </div>
          </div>
        </section>

        <section className={`section ${styles.sectionBlock}`} id="referral-benefits">
          <div className="container">
            <div className={pricingStyles.grid}>
              <div className={`${pricingStyles.card} ${pricingStyles.cardBase}`}>
                <div className={pricingStyles.cardHeader}>
                  <span className={pricingStyles.badge}>{t('referralPage.friendBonus.title')}</span>
                </div>
                <FeatureList items={leftCardItems} className={pricingStyles.features} />
              </div>

              <div className={`${pricingStyles.card} ${pricingStyles.cardPremium} ${styles.referralRewardCard}`}>
                  <div className={styles.referralRewardContent}>
                    <div className={pricingStyles.cardHeader}>
                      <span className={pricingStyles.badge}>{t('referralPage.yourReward.title')}</span>
                    </div>
                    <p className={styles.rewardIntro}>{t('referralPage.yourReward.description')}</p>
                    <FeatureList items={rightCardItems} className={pricingStyles.features} />
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
                <h2 className={styles.blockTitle}>{importantInline}</h2>
                <p className={styles.prose}>{t('referralPage.important.useNew')}</p>
                <FeatureList items={importantSourceItems} className={styles.premiumList} />
              </div>
              <div className={styles.premiumSection}>
                <h2 className={styles.blockTitle}>{t('referralPage.limits.title')}</h2>
                <FeatureList items={limitsItems} className={styles.premiumList} />
              </div>
              <div className={styles.premiumSection}>
                <h2 className={styles.blockTitle}>{t('referralPage.reuse.title')}</h2>
                <p className={styles.prose}>{t('referralPage.reuse.description')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.finalWrap}`}>
          <div className="container">
            <div className={styles.finalCard}>
              <p className={styles.finalText}>{campaignInline}</p>
              <a href={BOT_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.finalCta}`}>
                {t('referralPage.micro.getPromo')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
