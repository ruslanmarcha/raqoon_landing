import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './DownloadPage.module.css'

export function DownloadPage() {
  const { t, i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'

  const features = t('downloadPage.features', { returnObjects: true }) as string[]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant={variant} page="download" />
      <Header />
      <main className={styles.root}>
        <section className={`${styles.section} ${styles.sectionHero}`}>
          <div className={`container ${styles.sectionContainer}`}>
            <h1 className={styles.title}>{t('downloadPage.heroTitle')}</h1>
            <p className={styles.text}>{t('downloadPage.heroText')}</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.sectionContainer}`}>
            <h2 className={styles.subtitle}>{t('downloadPage.mythsTitle')}</h2>
            <p className={styles.text}>{t('downloadPage.mythsP1')}</p>
            <p className={styles.text}>{t('downloadPage.mythsP2')}</p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSecondary}`}>
          <div className={`container ${styles.sectionContainer}`}>
            <h2 className={styles.subtitle}>{t('downloadPage.featuresTitle')}</h2>
            <ul className={styles.featureList}>
              {features.map((item) => (
                <li key={item} className={styles.featureItem}>
                  <span className={styles.featureDot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionFinal}`}>
          <div className={`container ${styles.sectionContainer}`}>
            <h2 className={styles.subtitle}>{t('downloadPage.finalTitle')}</h2>
            <p className={styles.text}>{t('downloadPage.finalText')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
