import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './AboutCompany.module.css'

type LegalKey = 'privacy' | 'terms' | 'contact' | 'refund'

interface LegalPageProps {
  legalKey: LegalKey
}

export function LegalPage({ legalKey }: LegalPageProps) {
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
            <h1 className={styles.title}>{t(`legal.${legalKey}.title`)}</h1>
            <div className={styles.block}>
              <p className={`${styles.text} ${styles.legalText}`}>
                {t(`legal.${legalKey}.body`)}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

