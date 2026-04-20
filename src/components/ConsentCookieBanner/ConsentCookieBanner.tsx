import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { applyUserConsentChoice, readStoredConsent, type StoredConsent } from '@/analytics/googleTagConsent'
import { useLocalePolicy } from '@/contexts/LocalePolicyContext'
import styles from './ConsentCookieBanner.module.css'

export function ConsentCookieBanner() {
  const { t } = useTranslation()
  const { isEUVisitor } = useLocalePolicy()
  const [stored, setStored] = useState<StoredConsent | null>(() => readStoredConsent())

  const visible = useMemo(() => isEUVisitor && stored === null, [isEUVisitor, stored])

  const onChoose = useCallback((choice: StoredConsent) => {
    applyUserConsentChoice(choice)
    setStored(choice)
  }, [])

  if (!visible) return null

  return (
    <aside
      className={`${styles.notice} ${styles.consentWithActions}`}
      role="dialog"
      aria-modal="false"
      aria-label={t('common.cookieConsentBannerAria')}
    >
      <p className={styles.consentText}>{t('common.cookieConsentMessage')}</p>
      <div className={styles.consentActions}>
        <button type="button" className={`${styles.consentBtn} ${styles.consentBtnPrimary}`} onClick={() => onChoose('accepted')}>
          {t('common.cookieConsentAccept')}
        </button>
        <button type="button" className={`${styles.consentBtn} ${styles.consentBtnGhost}`} onClick={() => onChoose('rejected')}>
          {t('common.cookieConsentReject')}
        </button>
      </div>
    </aside>
  )
}
