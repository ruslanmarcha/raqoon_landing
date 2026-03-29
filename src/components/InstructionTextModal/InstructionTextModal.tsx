import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './InstructionTextModal.module.css'

type InstructionWarning = {
  title: string
  lines: readonly string[]
}

type InstructionSectionLabels = {
  stepsTitle: string
  ifNotWorkingTitle: string
  importantTitle: string
}

const DEFAULT_SECTION_LABELS: InstructionSectionLabels = {
  stepsTitle: 'Пошаговая инструкция',
  ifNotWorkingTitle: 'Если не работает',
  importantTitle: 'Важно',
}

type InstructionTextModalProps = {
  open: boolean
  onClose: () => void
  title: string
  shortDescription?: string
  steps: readonly string[]
  ifNotWorking?: readonly string[]
  important?: readonly string[]
  sectionLabels?: InstructionSectionLabels
  closeLabel: string
  appUrl: string
  appUrlLabel: string
  botUrl: string
  botUrlLabel: string
  instructionWarning?: InstructionWarning
}

export function InstructionTextModal({
  open,
  onClose,
  title,
  shortDescription,
  steps,
  ifNotWorking,
  important,
  sectionLabels,
  closeLabel,
  appUrl,
  appUrlLabel,
  botUrl,
  botUrlLabel,
  instructionWarning,
}: InstructionTextModalProps) {
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

  const labels: InstructionSectionLabels = sectionLabels ?? DEFAULT_SECTION_LABELS

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
        aria-labelledby="instruction-text-modal-title"
      >
        <div className={styles.header}>
          <h2 id="instruction-text-modal-title" className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={closeLabel}>
            ×
          </button>
        </div>
        <div className={styles.body}>
          {instructionWarning && instructionWarning.lines.length > 0 ? (
            <div className={styles.trafficWarning} role="note">
              <div className={styles.trafficWarningStripe} aria-hidden="true" />
              <div className={styles.trafficWarningInner}>
                <strong className={styles.trafficWarningTitle}>{instructionWarning.title}</strong>
                {instructionWarning.lines.map((line, i) => (
                  <p key={i} className={styles.trafficWarningLine}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
          <div className={styles.quickLinks}>
            <a href={appUrl} target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
              {appUrlLabel}
            </a>
            <a href={botUrl} target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
              {botUrlLabel}
            </a>
          </div>
          {shortDescription ? <p className={styles.lead}>{shortDescription}</p> : null}
          <h3 className={styles.sectionHeading}>{labels.stepsTitle}</h3>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {ifNotWorking && ifNotWorking.length > 0 ? (
            <>
              <h3 className={styles.sectionHeading}>{labels.ifNotWorkingTitle}</h3>
              <ul className={styles.bulletList}>
                {ifNotWorking.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}
          {important && important.length > 0 ? (
            <>
              <h3 className={styles.sectionHeading}>{labels.importantTitle}</h3>
              <ul className={styles.bulletList}>
                {important.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        <div className={styles.footer}>
          <button type="button" className={styles.closeAction} onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
