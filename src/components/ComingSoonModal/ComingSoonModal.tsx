import { useTranslation } from 'react-i18next'
import styles from './ComingSoonModal.module.css'
import { Popup } from '../Popup/Popup'

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
}

export function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  const { t } = useTranslation()

  const message = t('common.comingSoonMessage')
  const okLabel = t('common.comingSoonOk')

  return (
    <Popup open={open} onClose={onClose}>
      <p className={styles.message}>{message}</p>
      <button type="button" className={`btn btn-primary ${styles.okBtn}`} onClick={onClose}>
        {okLabel}
      </button>
    </Popup>
  )
}

