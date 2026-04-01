import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import styles from './PaymentFailPage.module.css'

export function PaymentFailPage() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const homePath = useMemo(
    () => (i18n.language.startsWith('ru') ? '/' : '/ww'),
    [i18n.language],
  )

  return (
    <div className={styles.root}>
      <Helmet>
        <title>{t('paymentFail.title')} — Raqoon</title>
        <meta name="description" content={t('paymentFail.description')} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.mascotWrap}>
              <img
                src="/payment-fail-mascot.png"
                alt=""
                className={styles.mascot}
                width={180}
                height={180}
              />
            </div>
            <p className={styles.badge}>{t('paymentFail.badge')}</p>
            <h1 className={styles.title}>{t('paymentFail.title')}</h1>
            <p className={styles.description}>{t('paymentFail.description')}</p>
            <div className={styles.actions}>
              <Link to={homePath} className="btn btn-secondary btn-lg">
                {t('paymentFail.ctaHome')}
              </Link>
              <Link to="/faq" className="btn btn-primary btn-lg">
                {t('paymentFail.ctaFaq')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
