import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Popup } from '../Popup/Popup'
import { clientPortalUrl } from '@/utils/clientPortalUrl'
import styles from './ProfilePortalModal.module.css'

type ProfilePortalModalProps = {
  open: boolean
  onClose: () => void
}

export function ProfilePortalModal({ open, onClose }: ProfilePortalModalProps) {
  const { t } = useTranslation()
  const portalUrl = clientPortalUrl()
  const closeLabel = t('nav.profileClose', { defaultValue: 'Close' })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <Popup open={open} onClose={onClose} modalClassName={styles.modal}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('nav.profile', { defaultValue: 'Profile' })}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
      </div>
      <iframe
        title={t('nav.profile', { defaultValue: 'Profile' })}
        src={portalUrl}
        className={styles.frame}
        loading="lazy"
      />
    </Popup>
  )
}
