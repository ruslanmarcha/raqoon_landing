import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useComingSoon } from '../contexts/ComingSoonContext'
import {
  getGooglePlayBadgeUrl,
  getAppleAppStoreBadgeSrc,
  getMacAppStoreBadgeSrc,
} from '../utils/storeBadgeUrls'
import styles from './DownloadPage.module.css'

type BadgeItem = { src: string; key: string }

function useDownloadBadges(): BadgeItem[] {
  const { i18n } = useTranslation()
  return useMemo(
    () => [
      { src: getAppleAppStoreBadgeSrc(i18n.language), key: 'downloadPage.badgeAriaAppStore' },
      { src: getGooglePlayBadgeUrl(i18n.language), key: 'downloadPage.badgeAriaGooglePlay' },
      { src: getMacAppStoreBadgeSrc(i18n.language), key: 'downloadPage.badgeAriaMacAppStore' },
    ],
    [i18n.language],
  )
}

type Props = {
  className?: string
}

export function DownloadStoreBadges({ className }: Props) {
  const { t } = useTranslation()
  const { openComingSoon } = useComingSoon()
  const badges = useDownloadBadges()

  return (
    <div className={`${styles.storeBadges} ${className ?? ''}`}>
      {badges.map(({ src, key }) => (
        <button
          key={src}
          type="button"
          className={styles.badgeBtn}
          onClick={openComingSoon}
          aria-label={t(key)}
        >
          <img
            src={src}
            alt=""
            className={styles.badgeImg}
            loading="lazy"
            decoding="async"
          />
        </button>
      ))}
    </div>
  )
}
