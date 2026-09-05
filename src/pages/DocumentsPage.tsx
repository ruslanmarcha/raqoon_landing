import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { DOCUMENTS_BY_PRODUCT, type LegalProduct } from '../legal/documentRegistry'
import { SEOHead } from '../seo/SEOHead'
import styles from './DocumentsPage.module.css'

const PRODUCTS: readonly LegalProduct[] = ['vpn', 'esim', 'corporate']

export function DocumentsPage() {
  const { t, i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant={variant} page="documents" />
      <Header />
      <main className={styles.root}>
        <section className={`section ${styles.section}`}>
          <div className="container">
            <h1 className={styles.title}>{t('documents.title')}</h1>
            <p className={styles.intro}>{t('documents.intro')}</p>
            <div className={styles.grid}>
              {PRODUCTS.map((product) => {
                const productTitle = t(`documents.products.${product}.title`)

                return (
                  <section className={styles.card} key={product}>
                    <h2 className={styles.cardTitle}>{productTitle}</h2>
                    <nav className={styles.links} aria-label={productTitle}>
                      {DOCUMENTS_BY_PRODUCT[product].map((definition) => {
                        const documentTitle = t(`documents.documents.${definition.document}`)

                        return (
                          <Link
                            key={definition.path}
                            to={definition.path}
                            className={styles.link}
                            aria-label={`${productTitle} — ${documentTitle}`}
                          >
                            {documentTitle}
                          </Link>
                        )
                      })}
                    </nav>
                  </section>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
