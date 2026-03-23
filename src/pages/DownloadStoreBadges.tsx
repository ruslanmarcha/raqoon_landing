import { useMemo, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useComingSoon } from '../contexts/ComingSoonContext'
import {
  getGooglePlayBadgeUrl,
  getGooglePlayBadgeVisualScale,
  getAppleAppStoreBadgeSrc,
  getMacAppStoreBadgeSrc,
} from '../utils/storeBadgeUrls'
import styles from './DownloadPage.module.css'

type BadgeKind = 'apple' | 'google' | 'mac'

type BadgeItem = { src: string; key: string; kind: BadgeKind }

function useDownloadBadges(): BadgeItem[] {
  const { i18n } = useTranslation()
  return useMemo(
    () => [
      { src: getAppleAppStoreBadgeSrc(i18n.language), key: 'downloadPage.badgeAriaAppStore', kind: 'apple' },
      { src: getGooglePlayBadgeUrl(i18n.language), key: 'downloadPage.badgeAriaGooglePlay', kind: 'google' },
      { src: getMacAppStoreBadgeSrc(i18n.language), key: 'downloadPage.badgeAriaMacAppStore', kind: 'mac' },
    ],
    [i18n.language],
  )
}

type Props = {
  className?: string
}

export function DownloadStoreBadges({ className }: Props) {
  const { t, i18n } = useTranslation()
  const { openComingSoon } = useComingSoon()
  const badges = useDownloadBadges()
  const googleScale = useMemo(
    () => getGooglePlayBadgeVisualScale(i18n.language),
    [i18n.language],
  )

  return (
    <div className={`${styles.storeBadges} ${className ?? ''}`}>
      {badges.map(({ src, key, kind }) => (
        <button
          key={key}
          type="button"
          className={styles.badgeBtn}
          onClick={openComingSoon}
          aria-label={t(key)}
        >
          <span
            className={styles.badgeFrame}
            style={
              kind === 'google'
                ? ({
                    '--badge-google-sm': googleScale.sm,
                    '--badge-google-md': googleScale.md,
                  } as CSSProperties)
                : undefined
            }
          >
            <img
              src={src}
              alt=""
              className={
                kind === 'google'
                  ? `${styles.badgeImg} ${styles.badgeImgGoogle}`
                  : styles.badgeImg
              }
              loading="lazy"
              decoding="async"
            />
          </span>
        </button>
      ))}
    </div>
  )
}
