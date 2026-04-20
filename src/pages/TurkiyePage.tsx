import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { SEOHead } from '../seo/SEOHead'
import styles from './TurkiyePage.module.css'

const TURKIYE_HERO_IMAGE_SRC = '/turkiye-mascot.png'

export function TurkiyePage() {
  const { t, i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead
        variant={variant}
        page="turkiye"
        robots="noindex, nofollow"
        includeStructuredData={false}
      />
      <Header />
      <main className={styles.root}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.mascot} aria-hidden="true">
                <img
                  src={TURKIYE_HERO_IMAGE_SRC}
                  alt=""
                  className={styles.mascotImg}
                  width={560}
                  height={420}
                />
              </div>
              <h1 className={styles.heroTitle}>{t('turkiyePage.title')}</h1>
              <p className={styles.heroLead}>{t('turkiyePage.lead')}</p>
              <p className={styles.heroClosing}>{t('turkiyePage.closing')}</p>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.minFooter}>
        <div className="container">
          <p className={styles.copy}>{t('footer.copy')}</p>
        </div>
      </footer>
    </>
  )
}
