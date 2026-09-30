import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { EsimPricingCatalog } from '../components/EsimPricing/EsimPricingCatalog'
import { RAQOON_ESIM_APP_STORE_URL } from '../utils/storeBadgeUrls'
import styles from './EsimPage.module.css'

const APP_HREF = RAQOON_ESIM_APP_STORE_URL
const START_ICON = '/wallet-app-icon.png'

type FeatureCard = { titleGreen: string; titleRest: string; body: string }
type Step = { title: string; body: string }
type Stat = { title: string; body: string }
type FaqItem = { q: string; a: string }
type FaqGroup = { title: string; items: FaqItem[] }

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

export function EsimPage() {
  const { t, i18n } = useTranslation()
  const { hash } = useLocation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const features = useMemo(
    () => asArray<FeatureCard>(t('esimPage.features', { returnObjects: true })),
    [t, i18n.language],
  )
  const steps = useMemo(
    () => asArray<Step>(t('esimPage.steps.items', { returnObjects: true })),
    [t, i18n.language],
  )
  const stats = useMemo(
    () => asArray<Stat>(t('esimPage.stats.items', { returnObjects: true })),
    [t, i18n.language],
  )
  const faqGroups = useMemo(
    () => asArray<FaqGroup>(t('esimPage.faq.groups', { returnObjects: true })),
    [t, i18n.language],
  )

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [hash])

  return (
    <>
      <SEOHead variant={variant} page="esim" />
      <Header />

      <main className={styles.page}>
        <section id="top" className={styles.hero}>
          <div className={styles.wrapNarrow}>
            <h1 className={styles.heroTitle}>{t('esimPage.hero.headline')}</h1>
            <p className={styles.heroLead}>{t('esimPage.hero.lead')}</p>
            <div className={styles.heroActions}>
              <a href="#pricing" className={styles.btnPrimary}>
                {t('esimPage.hero.ctaCountry')}
              </a>
              <a href="#how" className={styles.btnSecondary}>
                {t('esimPage.hero.ctaHow')}
              </a>
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.pricing}>
          <div className={styles.wrap}>
            <p className={styles.badge}>{t('esimPage.pricing.badge')}</p>
            <h2 className={styles.sectionTitle}>{t('esimPage.pricing.title')}</h2>
            <p className={styles.sectionLead}>{t('esimPage.pricing.lead')}</p>
            <EsimPricingCatalog purchaseHref={APP_HREF} />
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.wrap}>
            <div className={styles.featureGrid}>
              {features.map((f) => (
                <article key={f.titleGreen + f.titleRest} className={styles.featureCard}>
                  <h2 className={styles.featureTitle}>
                    <span className={styles.featureGreen}>{f.titleGreen}</span>
                    {f.titleRest ? <span>{f.titleRest}</span> : null}
                  </h2>
                  <p className={styles.featureBody}>{f.body}</p>
                </article>
              ))}
            </div>
            <a href="#pricing" className={styles.textLink}>
              {t('esimPage.featuresCta')}
            </a>
          </div>
        </section>

        <section id="how" className={styles.how}>
          <div className={styles.wrap}>
            <h2 className={styles.sectionTitle}>{t('esimPage.steps.title')}</h2>
            <ol className={styles.stepList}>
              {steps.map((step, i) => (
                <li key={step.title} className={styles.stepItem}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.wrap}>
            <h2 className={styles.sectionTitle}>{t('esimPage.stats.title')}</h2>
            <div className={styles.statGrid}>
              {stats.map((s) => (
                <article key={s.title} className={styles.statCard}>
                  <h3 className={styles.statTitle}>{s.title}</h3>
                  <p className={styles.statBody}>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className={styles.wrap}>
            <h2 className={styles.sectionTitle}>{t('esimPage.faq.title')}</h2>
            {faqGroups.map((group) => (
              <div key={group.title} className={styles.faqGroup}>
                <h3 className={styles.faqGroupTitle}>{group.title}</h3>
                <div className={styles.faqList}>
                  {group.items.map((item) => {
                    const id = `${group.title}::${item.q}`
                    const open = openFaq === id
                    return (
                      <div key={item.q} className={styles.faqItem}>
                        <button
                          type="button"
                          className={styles.faqBtn}
                          aria-expanded={open}
                          onClick={() => setOpenFaq(open ? null : id)}
                        >
                          <span>{item.q}</span>
                          <span
                            className={`${styles.faqMark} ${open ? styles.faqMarkOpen : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                        {open ? <p className={styles.faqAnswer}>{item.a}</p> : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.final}>
          <div className={styles.wrapNarrow}>
            <img
              src={START_ICON}
              alt=""
              width={80}
              height={80}
              className={styles.finalIcon}
            />
            <h2 className={styles.sectionTitle}>{t('esimPage.final.headline')}</h2>
            <p className={styles.sectionLead}>{t('esimPage.final.body')}</p>
            <a
              href={APP_HREF}
              className={styles.btnAccent}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('esimPage.final.cta')}
            </a>
            <p className={styles.finalDisclaimer}>{t('esimPage.final.disclaimer')}</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
