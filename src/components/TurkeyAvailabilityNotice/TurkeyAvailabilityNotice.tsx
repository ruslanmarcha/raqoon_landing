import { useTranslation } from 'react-i18next'
import { useLocalePolicy } from '../../contexts/LocalePolicyContext'
import styles from './TurkeyAvailabilityNotice.module.css'

export function TurkeyAvailabilityNotice() {
  const { t } = useTranslation()
  const { isTurkeyVisitor } = useLocalePolicy()

  if (!isTurkeyVisitor) return null

  return (
    <aside className={styles.notice} role="status" aria-live="polite">
      <p className={styles.message}>{t('common.turkeyDownloadUnavailable')}</p>
    </aside>
  )
}
