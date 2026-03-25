import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './InstructionModal.module.css'

type InstructionModalProps = {
  open: boolean
  onClose: () => void
  title: string
  /** Path under public/, e.g. /instructions/foo.pdf */
  pdfSrc: string
  openInNewTabLabel: string
  closeLabel: string
  viewerHint: string
}

export function InstructionModal({
  open,
  onClose,
  title,
  pdfSrc,
  openInNewTabLabel,
  closeLabel,
  viewerHint,
}: InstructionModalProps) {
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

  if (!open) return null

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="instruction-modal-title"
      >
        <div className={styles.header}>
          <h2 id="instruction-modal-title" className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={closeLabel}>
            ×
          </button>
        </div>
        <div className={styles.frameWrap}>
          <iframe title={title} src={pdfSrc} className={styles.frame} />
        </div>
        <p className={styles.hint}>{viewerHint}</p>
        <div className={styles.footer}>
          <a className={styles.linkTab} href={pdfSrc} target="_blank" rel="noopener noreferrer">
            {openInNewTabLabel}
          </a>
          <button type="button" className={styles.closeAction} onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
