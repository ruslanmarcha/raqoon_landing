import { useTranslation } from 'react-i18next'
import styles from './PaymentBadges.module.css'

type PaymentBadgesProps = {
  className?: string
  compact?: boolean
}

function SbpMark() {
  return (
    <svg className={styles.chip} viewBox="0 0 48 28" width="40" height="24" aria-hidden="true">
      <rect width="48" height="28" rx="4" fill="#ffffff" />
      <g transform="translate(15.5 3.5) scale(0.408)">
        <path d="M12.1929 24.4954L5.86836 28.1832L0 38.4605L23.9386 24.4954H12.1929Z" fill="#874691" />
        <path d="M30.263 13.9651L23.9384 17.653L18.0701 27.9302L41.9997 13.9651H30.263Z" fill="#DA1844" />
        <path d="M23.9384 10.2773L18.0701 0V21.0697V27.9303V49L23.9384 38.7227V10.2773Z" fill="#F9B229" />
        <path d="M18.0701 0L23.9384 10.2773L30.263 13.9651H41.9997L18.0701 0Z" fill="#F07F1A" />
        <path d="M18.0701 21.0696V48.9999L23.9384 38.7226V31.3378L18.0701 21.0696Z" fill="#72B22C" />
        <path d="M30.263 35.0347L23.9384 38.7225L18.0701 48.9998L41.9997 35.0347H30.263Z" fill="#00743E" />
        <path d="M0 10.5303V38.4605L5.86836 28.1833V20.8075L0 10.5303Z" fill="#5F5A94" />
        <path
          d="M18.0702 21.0697V21.0787L0 10.5303L5.86836 20.8075L30.2632 35.0348H41.9999L18.0702 21.0697Z"
          fill="#0D90CD"
        />
      </g>
    </svg>
  )
}

function BrandImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      className={styles.chipImg}
      src={src}
      alt={alt}
      width={40}
      height={24}
      decoding="async"
    />
  )
}

export function PaymentBadges({ className, compact }: PaymentBadgesProps) {
  const { i18n, t } = useTranslation()
  const isRu = i18n.language.startsWith('ru')

  return (
    <ul
      className={`${styles.root} ${compact ? styles.compact : ''} ${className ?? ''}`.trim()}
      aria-label={String(t('esimPage.pricing.paymentMethods'))}
    >
      {isRu ? (
        <li className={styles.badge} title="СБП — Система быстрых платежей">
          <SbpMark />
        </li>
      ) : (
        <>
          <li className={styles.badge} title="Visa">
            <BrandImg src="/payment/visa.svg" alt="Visa" />
          </li>
          <li className={styles.badge} title="Mastercard">
            <BrandImg src="/payment/mastercard.svg" alt="Mastercard" />
          </li>
          <li className={styles.badge} title="Apple Pay">
            <BrandImg src="/payment/apple-pay.png" alt="Apple Pay" />
          </li>
        </>
      )}
    </ul>
  )
}
