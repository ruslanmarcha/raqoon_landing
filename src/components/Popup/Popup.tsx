import type { ReactNode } from 'react'
import styles from './Popup.module.css'

interface PopupProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Popup({ open, onClose, children }: PopupProps) {
  if (!open) return null

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  )
}

