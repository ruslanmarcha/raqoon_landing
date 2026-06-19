import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popup } from '../Popup/Popup'
import { clientPortalUrl } from '@/utils/clientPortalUrl'
import styles from './ProfilePortalModal.module.css'

const PORTAL_READY_MESSAGE = 'qatlink-portal-ready'

function isPortalEmbedOrigin(origin: string): boolean {
  try {
    const host = new URL(origin).hostname
    return host === 'raqoon.qatlink.site' || host.endsWith('.qatlink.site')
  } catch {
    return false
  }
}

type ProfilePortalModalProps = {
  open: boolean
  onClose: () => void
}

export function ProfilePortalModal({ open, onClose }: ProfilePortalModalProps) {
  const { t } = useTranslation()
  const portalUrl = clientPortalUrl()
  const closeLabel = t('nav.profileClose', { defaultValue: 'Close' })
  const [portalReady, setPortalReady] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const frameKey = useRef(0)

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
    if (!open) {
      setPortalReady(false)
      setShowFallback(false)
      return
    }

    frameKey.current += 1
    setPortalReady(false)
    setShowFallback(false)

    function onMessage(event: MessageEvent) {
      if (!isPortalEmbedOrigin(event.origin)) return
      if (event.data?.type !== PORTAL_READY_MESSAGE) return
      setPortalReady(true)
      setShowFallback(false)
    }

    window.addEventListener('message', onMessage)
    const fallbackTimer = window.setTimeout(() => {
      setShowFallback(true)
    }, 6000)

    return () => {
      window.removeEventListener('message', onMessage)
      window.clearTimeout(fallbackTimer)
    }
  }, [open])

  return (
    <Popup open={open} onClose={onClose} modalClassName={styles.modal}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('nav.profile', { defaultValue: 'Profile' })}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
      </div>
      <div className={styles.frameWrap}>
        {!portalReady && !showFallback ? (
          <p className={styles.loading}>{t('nav.profileLoading', { defaultValue: 'Loading…' })}</p>
        ) : null}
        {showFallback && !portalReady ? (
          <div className={styles.fallback}>
            <p>{t('nav.profileEmbedBlocked', { defaultValue: 'Could not load the portal here.' })}</p>
            <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t('nav.profileOpenTab', { defaultValue: 'Open in new tab' })}
            </a>
          </div>
        ) : null}
        <iframe
          key={frameKey.current}
          title={t('nav.profile', { defaultValue: 'Profile' })}
          src={portalUrl}
          className={styles.frame}
          hidden={showFallback && !portalReady}
        />
      </div>
      <div className={styles.footer}>
        <a href={portalUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          {t('nav.profileOpenTab', { defaultValue: 'Open in new tab' })}
        </a>
      </div>
    </Popup>
  )
}
