import { useTranslation } from 'react-i18next'
import styles from './ComingSoonModal.module.css'

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
}

export function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  const { t } = useTranslation()

  if (!open) return null

  const message = t('common.comingSoonMessage')
  const okLabel = t('common.comingSoonOk')

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        // Close only when clicking the backdrop, not the modal itself.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <p className={styles.message}>{message}</p>
        <button type="button" className={`btn btn-primary ${styles.okBtn}`} onClick={onClose}>
          {okLabel}
        </button>
      </div>
    </div>
  )
}

