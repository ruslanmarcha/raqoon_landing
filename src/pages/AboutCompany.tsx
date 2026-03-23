import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './AboutCompany.module.css'

const OFFICE_MAP_EMBED_URL =
  'https://yandex.com/map-widget/v1/?text=Ulus%20Giri%C5%9Fim%20Ofisi%20(Kulu%C3%A7ka%20Merkezi)%2C%20Hac%C4%B1%20Bayram%20Mah.%2C%20Sanayi%20Cad.%2C%20B%20Blok%2C%20Kat%3A2%2C%20No%3A4%2F211%2C%2006050%20Alt%C4%B1nda%C4%9F%2FAnkara%2C%20T%C3%BCrkiye&z=16'

export function AboutCompany() {
  const { t, i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant={variant} page="about" />
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
                src={OFFICE_MAP_EMBED_URL}
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

