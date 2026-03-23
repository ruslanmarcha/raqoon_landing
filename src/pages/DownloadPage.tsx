import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { FeatureList } from '../components/FeatureList/FeatureList'
import type { FeatureItemData } from '../components/FeatureItem/FeatureItem'
import { useComingSoon } from '../contexts/ComingSoonContext'
import styles from './DownloadPage.module.css'

export function DownloadPage() {
  const { t, i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'
  const isRuLang = i18n.language.startsWith('ru')
  const { openComingSoon } = useComingSoon()

  const homePath = isRuLang ? '/' : '/ww'

  const features = t('downloadPage.features', { returnObjects: true }) as string[]
  const featureItems: FeatureItemData[] = useMemo(
    () => features.map((label) => ({ label })),
    [features],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant={variant} page="download" />
      <Header />
      <main className={styles.root}>
        {/* Hero — как на главной: маскот + типографика */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.mascot} aria-hidden="true">
                <img src="/mascot.png" alt="" className={styles.mascotImg} />
              </div>
              <h1 className={styles.heroTitle}>{t('downloadPage.heroTitle')}</h1>
              <p className={styles.heroLead}>{t('downloadPage.heroText')}</p>
              <div className={styles.heroActions}>
                {isRuLang ? (
                  <>
                    <Link
                      to="/#pricing"
                      className={`btn btn-primary btn-lg ${styles.heroBtn}`}
                    >
                      {t('downloadPage.ctaPlans')}
                    </Link>
                    <Link to={homePath} className={`btn btn-secondary btn-lg ${styles.heroBtn}`}>
                      {t('downloadPage.ctaHome')}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={homePath} className={`btn btn-primary btn-lg ${styles.heroBtn}`}>
                      {t('downloadPage.ctaHome')}
                    </Link>
                    <div className={styles.storeRow}>
                      <button
                        type="button"
                        className={`btn btn-secondary btn-lg ${styles.storeBtn}`}
                        onClick={openComingSoon}
                      >
                        <img src="/apple.svg" alt="" className={styles.appleIcon} aria-hidden="true" />
                        {t('hero.storeApple')}
                      </button>
                      <button
                        type="button"
                        className={`btn btn-secondary btn-lg ${styles.storeBtn}`}
                        onClick={openComingSoon}
                      >
                        {t('hero.storeGoogle')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Блок про приватность — светлая «полоса» как secondary-bg у конкурентов */}
        <section className={`section ${styles.band}`}>
          <div className="container">
            <div className={styles.storyCard}>
              <h2 className={styles.blockTitle}>{t('downloadPage.mythsTitle')}</h2>
              <p className={styles.prose}>{t('downloadPage.mythsP1')}</p>
            </div>
          </div>
        </section>

        {/* Преимущества — карточка как Features / Pricing */}
        <section className={`section ${styles.bandMuted}`}>
          <div className="container">
            <h2 className={styles.sectionHeading}>{t('downloadPage.featuresTitle')}</h2>
            <div className={styles.featuresCard}>
              <FeatureList items={featureItems} className={styles.featureList} />
              <div className={styles.raccoonDecor} aria-hidden="true">
                <img src="/eyes.png" alt="" className={styles.eyesImg} width={300} height={200} />
              </div>
            </div>
          </div>
        </section>

        {/* Честная модель / пробный период */}
        <section className={`section ${styles.band}`}>
          <div className="container">
            <div className={styles.premiumCard}>
              <div className={styles.premiumGlow} aria-hidden />
              <p className={styles.proseLarge}>{t('downloadPage.mythsP2')}</p>
            </div>
          </div>
        </section>

        {/* Финальный CTA */}
        <section className={`section ${styles.finalWrap}`}>
          <div className="container">
            <div className={styles.finalCard}>
              <h2 className={styles.finalTitle}>{t('downloadPage.finalTitle')}</h2>
              <p className={styles.finalLead}>{t('downloadPage.finalText')}</p>
              <div className={styles.finalActions}>
                {isRuLang ? (
                  <>
                    <Link
                      to="/#pricing"
                      className={`btn btn-primary btn-lg ${styles.heroBtn}`}
                    >
                      {t('downloadPage.ctaPlans')}
                    </Link>
                    <Link to={homePath} className={`btn btn-outline btn-lg ${styles.heroBtn}`}>
                      {t('downloadPage.ctaHome')}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={homePath} className={`btn btn-primary btn-lg ${styles.heroBtn}`}>
                      {t('downloadPage.ctaHome')}
                    </Link>
                    <div className={styles.storeRow}>
                      <button
                        type="button"
                        className={`btn btn-secondary btn-lg ${styles.storeBtn}`}
                        onClick={openComingSoon}
                      >
                        <img src="/apple.svg" alt="" className={styles.appleIcon} aria-hidden="true" />
                        {t('hero.storeApple')}
                      </button>
                      <button
                        type="button"
                        className={`btn btn-secondary btn-lg ${styles.storeBtn}`}
                        onClick={openComingSoon}
                      >
                        {t('hero.storeGoogle')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
