import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { isValidEmail } from '@/lib/isValidEmail'
import { submitBetaApplication, type BetaPlatform } from '@/lib/submitBetaApplication'
import styles from './BetaPage.module.css'

const BETA_HERO_IMAGE_SRC = '/beta-hero.png'
const RACCOON_ID_RE = /^[A-Za-z0-9]{16}$/

type StepItem = { title: string; hint: string }

export function BetaPage() {
  const { i18n } = useTranslation()
  const t = useMemo(() => i18n.getFixedT('ru'), [i18n])
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'

  const [platform, setPlatform] = useState<BetaPlatform | null>(null)
  const [email, setEmail] = useState('')
  const [raccoonId, setRaccoonId] = useState('')
  const [consent, setConsent] = useState(true)
  const [errors, setErrors] = useState<{ email?: string; raccoonId?: string; consent?: string; form?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const iosSteps = useMemo(() => t('betaPage.iosSteps', { returnObjects: true }) as StepItem[], [t])
  const androidSteps = useMemo(() => t('betaPage.androidSteps', { returnObjects: true }) as StepItem[], [t])
  const steps = platform === 'ios' ? iosSteps : platform === 'android' ? androidSteps : []

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const validate = useCallback(() => {
    const next: typeof errors = {}
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      next.email = t('betaPage.errors.emailRequired')
    } else if (!isValidEmail(trimmedEmail)) {
      next.email = t('betaPage.errors.emailInvalid')
    }
    const rid = raccoonId.trim()
    if (!rid) {
      next.raccoonId = t('betaPage.errors.raccoonIdRequired')
    } else if (!RACCOON_ID_RE.test(rid)) {
      next.raccoonId = t('betaPage.errors.raccoonIdInvalid')
    }
    if (!consent) {
      next.consent = t('betaPage.errors.consentRequired')
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }, [email, raccoonId, consent, t])

  const onEmailBlur = useCallback(() => {
    const trimmed = email.trim()
    if (!trimmed) {
      setErrors((prev) => ({ ...prev, email: undefined }))
      return
    }
    if (!isValidEmail(trimmed)) {
      setErrors((prev) => ({ ...prev, email: t('betaPage.errors.emailInvalid') }))
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }))
    }
  }, [email, t])

  const onRaccoonIdBlur = useCallback(() => {
    const trimmed = raccoonId.trim()
    if (!trimmed) {
      setErrors((prev) => ({ ...prev, raccoonId: undefined }))
      return
    }
    if (!RACCOON_ID_RE.test(trimmed)) {
      setErrors((prev) => ({ ...prev, raccoonId: t('betaPage.errors.raccoonIdInvalid') }))
    } else {
      setErrors((prev) => ({ ...prev, raccoonId: undefined }))
    }
  }, [raccoonId, t])

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!platform || success) return
      if (!validate()) return
      setSubmitting(true)
      setErrors((prev) => ({ ...prev, form: undefined }))
      const result = await submitBetaApplication({
        email: email.trim(),
        raccoonId: raccoonId.trim(),
        platform,
        submittedAt: new Date().toISOString(),
      })
      setSubmitting(false)
      if (result.ok) {
        setSuccess(true)
        return
      }
      if (result.error === 'not_configured') {
        setErrors({ form: t('betaPage.errors.notConfigured') })
        return
      }
      setErrors({ form: t('betaPage.errors.submitFailed') })
    },
    [email, raccoonId, platform, success, validate, t],
  )

  return (
    <>
      <SEOHead variant={variant} page="beta" />
      <Header />
      <main className={styles.root}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.mascot} aria-hidden="true">
                <img src={BETA_HERO_IMAGE_SRC} alt="" className={styles.mascotImg} width={560} height={260} />
              </div>
              <h1 className={styles.heroTitle}>{t('betaPage.heroTitle')}</h1>
              <p className={styles.heroLead}>{t('betaPage.heroSubtitle')}</p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.sectionBlock}`}>
          <div className="container">
            <div className={styles.platformSection}>
              <p className={styles.platformLabel}>{t('betaPage.platformPrompt')}</p>
              <div className={styles.platformRow}>
                <button
                  type="button"
                  className={`${styles.platformBtn} ${platform === 'ios' ? styles.platformBtnActive : ''}`}
                  onClick={() => {
                    setPlatform('ios')
                    setErrors({})
                  }}
                >
                  <span className={styles.platformEmoji} aria-hidden>
                    🍎
                  </span>
                  {t('betaPage.platformIos')}
                </button>
                <button
                  type="button"
                  className={`${styles.platformBtn} ${platform === 'android' ? styles.platformBtnActive : ''}`}
                  onClick={() => {
                    setPlatform('android')
                    setErrors({})
                  }}
                >
                  <span className={styles.platformEmoji} aria-hidden>
                    🤖
                  </span>
                  {t('betaPage.platformAndroid')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {platform && !success ? (
          <div key={platform} className={styles.reveal}>
            <section className={`section ${styles.sectionBlock}`}>
              <div className="container">
                <h2 className={styles.sectionHeading}>{t('betaPage.stepsTitle')}</h2>
                <div className={styles.stepsTrack}>
                  {steps.map((step, index) => (
                    <div key={`${platform}-${index}`} className={styles.stepCard}>
                      <div className={styles.stepNum}>{index + 1}</div>
                      <div className={styles.stepTitle}>{step.title}</div>
                      {step.hint ? <p className={styles.stepHint}>{step.hint}</p> : null}
                    </div>
                  ))}
                </div>

                <form className={styles.formCard} onSubmit={onSubmit} noValidate>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="beta-email">
                      {t('betaPage.emailLabel')}
                    </label>
                    <input
                      id="beta-email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(ev) => {
                        setEmail(ev.target.value)
                        setErrors((prev) => ({ ...prev, email: undefined }))
                      }}
                      onBlur={onEmailBlur}
                      disabled={submitting}
                    />
                    {errors.email ? <p className={styles.fieldError}>{errors.email}</p> : null}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="beta-raccoon">
                      {t('betaPage.raccoonIdLabel')}
                    </label>
                    <input
                      id="beta-raccoon"
                      className={`${styles.input} ${errors.raccoonId ? styles.inputError : ''}`}
                      type="text"
                      name="raccoonId"
                      autoComplete="username"
                      maxLength={16}
                      pattern="[A-Za-z0-9]{16}"
                      value={raccoonId}
                      onChange={(ev) => {
                        setRaccoonId(ev.target.value)
                        setErrors((prev) => ({ ...prev, raccoonId: undefined }))
                      }}
                      onBlur={onRaccoonIdBlur}
                      disabled={submitting}
                    />
                    {errors.raccoonId ? <p className={styles.fieldError}>{errors.raccoonId}</p> : null}
                  </div>
                  <div className={styles.consentRow}>
                    <input
                      id="beta-consent"
                      className={styles.checkbox}
                      type="checkbox"
                      checked={consent}
                      onChange={(ev) => setConsent(ev.target.checked)}
                      disabled={submitting}
                    />
                    <label className={styles.consentLabel} htmlFor="beta-consent">
                      {t('betaPage.consentLabel')}
                    </label>
                  </div>
                  {errors.consent ? <p className={styles.fieldError}>{errors.consent}</p> : null}
                  {errors.form ? <p className={styles.formError}>{errors.form}</p> : null}
                  <div className={styles.submitWrap}>
                    <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
                      {submitting ? t('betaPage.submitting') : t('betaPage.submit')}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        ) : null}

        {success ? (
          <section className={`section ${styles.sectionBlock}`}>
            <div className="container">
              <div className={`${styles.successCard} ${styles.reveal}`}>
                <p className={styles.successText}>{t('betaPage.successMessage')}</p>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
