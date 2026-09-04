import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { getLegalDocument, type LegalDocument, type LegalProduct } from '../legal/documentRegistry'
import { SEOHead } from '../seo/SEOHead'
import styles from './AboutCompany.module.css'

interface LegalPageProps {
  product: LegalProduct
  document: LegalDocument
}

interface LegalContentPageProps {
  title: string
  body: string
  seoPage: 'privacy' | 'terms' | 'contact' | 'refund' | 'esimPrivacy' | 'esimTerms' | 'esimRefund'
}

function LegalContentPage({ title, body, seoPage }: LegalContentPageProps) {
  const { i18n } = useTranslation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant={variant} page={seoPage} />
      <Header />
      <main className={styles.root}>
        <section className={`section ${styles.section}`}>
          <div className="container">
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.block}>
              <p className={`${styles.text} ${styles.legalText}`}>
                {body}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function LegalPage({ product, document }: LegalPageProps) {
  const { t } = useTranslation()
  const definition = getLegalDocument(product, document)

  return (
    <LegalContentPage
      seoPage={definition.seoPage}
      title={t(`${definition.translationPrefix}.title`)}
      body={t(`${definition.translationPrefix}.body`)}
    />
  )
}

export function ContactPage() {
  const { t } = useTranslation()

  return <LegalContentPage seoPage="contact" title={t('legal.contact.title')} body={t('legal.contact.body')} />
}
