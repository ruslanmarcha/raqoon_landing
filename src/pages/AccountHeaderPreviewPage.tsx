import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Hero } from '../components/Hero/Hero'
import { Footer } from '../components/Footer/Footer'
import { clientPortalUrl } from '@/utils/clientPortalUrl'
import styles from './AccountHeaderPreviewPage.module.css'

/** Черновик: шапка с кнопкой «Профиль» в контексте главной. */
export function AccountHeaderPreviewPage() {
  return (
    <div className={styles.root}>
      <Helmet>
        <title>Preview — Профиль в шапке</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={styles.note}>
        <div className={`container ${styles.noteInner}`}>
          <p className={styles.noteTitle}>Draft: кнопка «Профиль» в шапке</p>
          <p className={styles.noteMeta}>
            Ссылка →{' '}
            <a href={clientPortalUrl()} className={styles.noteLink}>
              {clientPortalUrl()}
            </a>
            {' · '}
            <Link to="/" className={styles.noteLink}>
              На прод-главную
            </Link>
          </p>
        </div>
      </div>

      <Header />
      <main className={styles.main}>
        <Hero variant="ru" />
      </main>
      <Footer />
    </div>
  )
}
