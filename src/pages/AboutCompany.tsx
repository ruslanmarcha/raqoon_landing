import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './AboutCompany.module.css'

export function AboutCompany() {
  const { t, i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant={variant} />
      <Header />
      <main className={styles.root}>
        <section className={`section ${styles.section}`}>
          <div className="container">
            <h1 className={styles.title}>{t('about.title')}</h1>

            <div className={styles.block}>
              <p className={styles.text}>{t('about.company')}</p>
              <p className={styles.text}>{t('about.address')}</p>
              <p className={styles.text}>
                {t('about.emailLabel')}{' '}
                <a href={`mailto:${t('about.email')}`} className={styles.link}>
                  {t('about.email')}
                </a>
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.subtitle}>{t('about.keyPointsTitle')}</h2>
              <p className={styles.text}>{t('about.keyPointsBody')}</p>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                title="Raqoon office map"
                src={t('about.mapEmbedUrl')}
                className={styles.map}
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

