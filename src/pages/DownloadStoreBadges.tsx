import { useMemo, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useComingSoon } from '../contexts/ComingSoonContext'
import {
  getGooglePlayBadgeUrl,
  getGooglePlayBadgeVisualScale,
  getAppleAppStoreBadgeSrc,
  getHuaweiAppGalleryBadgeSrc,
  getMacAppStoreBadgeSrc,
} from '../utils/storeBadgeUrls'
import styles from './DownloadPage.module.css'

function isRuLang(language: string): boolean {
  return language.trim().toLowerCase().startsWith('ru')
}

type BadgeKind = 'apple' | 'google' | 'huawei' | 'mac'

type BadgeItem = { src: string; key: string; kind: BadgeKind }

function useDownloadBadges(): BadgeItem[] {
  const { i18n } = useTranslation()
  return useMemo(
    () => [
      { src: getAppleAppStoreBadgeSrc(i18n.language), key: 'downloadPage.badgeAriaAppStore', kind: 'apple' },
      { src: getGooglePlayBadgeUrl(i18n.language), key: 'downloadPage.badgeAriaGooglePlay', kind: 'google' },
      {
        src: getHuaweiAppGalleryBadgeSrc(i18n.language),
        key: 'downloadPage.badgeAriaAppGallery',
        kind: 'huawei',
      },
      { src: getMacAppStoreBadgeSrc(i18n.language), key: 'downloadPage.badgeAriaMacAppStore', kind: 'mac' },
    ],
    [i18n.language],
  )
}

type Props = {
  className?: string
  /** ПК: один ряд, слоты 40px — белые рамки на одной линии */
  variant?: 'stack' | 'row'
}

export function DownloadStoreBadges({ className, variant = 'stack' }: Props) {
  const { t, i18n } = useTranslation()
  const { openComingSoon } = useComingSoon()
  const badges = useDownloadBadges()
  const googleScale = useMemo(
    () => getGooglePlayBadgeVisualScale(i18n.language),
    [i18n.language],
  )

  const ru = isRuLang(i18n.language)
  const isRow = variant === 'row'

  return (
    <div
      className={[styles.storeBadges, isRow && styles.storeBadgesRow, className].filter(Boolean).join(' ')}
    >
      {badges.map(({ src, key, kind }) => {
        const badgeVars =
          kind === 'google'
            ? ({
                '--badge-google-sm': googleScale.sm,
                '--badge-google-md': googleScale.md,
                '--badge-google-row-scale': isRow ? googleScale.sm : undefined,
              } as CSSProperties)
            : undefined

        const rowImgClass = [
          styles.badgeImgRow,
          kind === 'google' && styles.badgeImgRowGoogle,
        ]
          .filter(Boolean)
          .join(' ')

        const inner = isRow ? (
          <span className={styles.badgeFrameRow}>
            <img src={src} alt="" className={rowImgClass} loading="lazy" decoding="async" />
          </span>
        ) : (
          <span className={styles.badgeFrame}>
            <img
              src={src}
              alt=""
              className={
                kind === 'google' ? `${styles.badgeImg} ${styles.badgeImgGoogle}` : styles.badgeImg
              }
              loading="lazy"
              decoding="async"
            />
          </span>
        )

        if (ru && (kind === 'apple' || kind === 'google' || kind === 'mac')) {
          return (
            <Link
              key={key}
              to="/beta"
              className={styles.badgeBtn}
              style={badgeVars}
              data-badge={kind}
              aria-label={t(key)}
            >
              {inner}
            </Link>
          )
        }

        return (
          <button
            key={key}
            type="button"
            className={styles.badgeBtn}
            style={badgeVars}
            data-badge={kind}
            onClick={openComingSoon}
            aria-label={t(key)}
          >
            {inner}
          </button>
        )
      })}
    </div>
  )
}
