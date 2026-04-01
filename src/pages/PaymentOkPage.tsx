import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import styles from './PaymentOkPage.module.css'

export function PaymentOkPage() {
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
        <title>{t('paymentOk.title')} — Raqoon</title>
        <meta name="description" content={t('paymentOk.description')} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.mascotWrap}>
              <img
                src="/payment-success-mascot.png"
                alt=""
                className={styles.mascot}
                width={180}
                height={180}
              />
            </div>
            <p className={styles.badge}>{t('paymentOk.badge')}</p>
            <h1 className={styles.title}>{t('paymentOk.title')}</h1>
            <p className={styles.description}>{t('paymentOk.description')}</p>
            <div className={styles.actions}>
              <Link to={homePath} className="btn btn-secondary btn-lg">
                {t('paymentOk.ctaHome')}
              </Link>
              <Link to="/download" className="btn btn-primary btn-lg">
                {t('paymentOk.ctaDownload')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
