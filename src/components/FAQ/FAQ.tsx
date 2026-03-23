import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FAQ.module.css'

interface FAQItem {
  q: string
  a: string
}

export function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(0)

  const items = t('faq.items', { returnObjects: true }) as FAQItem[]

  function toggle(i: number) {
    setOpen((prev) => (prev === i ? null : i))
  }

  return (
    <section className={`section ${styles.root}`} id="faq">
      <div className="container">
        <h2 className={styles.title}>{t('faq.title')}</h2>
        <div className={styles.list}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden="true">
                  {open === i ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              </button>
              {open === i && (
                <div className={styles.answer}>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
