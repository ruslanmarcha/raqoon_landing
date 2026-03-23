import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.card}>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.title}>{t('notFound.title')}</h2>
            <p className={styles.text}>{t('notFound.description')}</p>
            <Link to="/" className="btn btn-primary">
              {t('notFound.cta')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

