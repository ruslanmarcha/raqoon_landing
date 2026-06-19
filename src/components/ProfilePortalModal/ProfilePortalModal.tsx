import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popup } from '../Popup/Popup'
import { clientPortalUrl } from '@/utils/clientPortalUrl'
import { isClientPortalMessageOrigin, openClientPortalPopup } from '@/utils/openClientPortalPopup'
import styles from './ProfilePortalModal.module.css'

type ProfilePortalModalProps = {
  open: boolean
  onClose: () => void
}

export function ProfilePortalModal({ open, onClose }: ProfilePortalModalProps) {
  const { t } = useTranslation()
  const portalUrl = clientPortalUrl()
  const closeLabel = t('nav.profileClose')
  const [popupBlocked, setPopupBlocked] = useState(false)

  const launchPopup = useCallback(() => {
    const popup = openClientPortalPopup(portalUrl)
    if (!popup) {
      setPopupBlocked(true)
      return false
    }
    setPopupBlocked(false)
    popup.focus()
    return true
  }, [portalUrl])

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

  useEffect(() => {
    if (!open) return
    launchPopup()
  }, [open, launchPopup])

  useEffect(() => {
    if (!open) return
    const onMessage = (event: MessageEvent) => {
      if (!isClientPortalMessageOrigin(event.origin)) return
      const data = event.data as { type?: string } | null
      if (data?.type === 'qatlink-portal-authenticated') {
        onClose()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [open, onClose])

  if (!open) return null

  return (
    <Popup open={open} onClose={onClose} modalClassName={styles.modal}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('nav.profile')}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
      </div>
      <div className={styles.body}>
        {popupBlocked ? (
          <p className={styles.hint}>{t('nav.profileEmbedBlocked')}</p>
        ) : (
          <p className={styles.hint}>{t('nav.profilePopupHint')}</p>
        )}
        <button type="button" className="btn btn-primary btn-lg" onClick={() => launchPopup()}>
          {t('nav.profileOpenWindow')}
        </button>
        <a className={styles.tabLink} href={portalUrl} target="_blank" rel="noopener noreferrer">
          {t('nav.profileOpenTab')}
        </a>
      </div>
    </Popup>
  )
}
