import { useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { useProfilePortal } from '../contexts/ProfilePortalContext'
import styles from './WalletPage.module.css'
import local from './ReferralPage.module.css'

type TileSpan = 'full' | 'half'
type TileTheme = 'light' | 'dark' | 'soft'

type GalleryTile = {
  id: string
  span: TileSpan
  theme: TileTheme
  frontKind: 'headline'
  headline: string
  accent?: string
  sub?: string
  detailTitle: string
  detailBody: string
  cta?: string
}

const REFERRAL_HERO_SRC = '/referral-hero.png'
const START_ICON = '/wallet-app-icon.png'

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

function Lines({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split('\n').map((line) => (
        <span key={line} className={className}>
          {line}
        </span>
      ))}
    </>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/** Rules motif — clipboard with aligned checklist */
function RulesIcon() {
  return (
    <svg className={styles.lockSvg} viewBox="0 0 80 96" fill="none" aria-hidden="true">
      <rect
        x="16"
        y="18"
        width="48"
        height="62"
        rx="12"
        fill="currentColor"
        opacity="0.14"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M32 18v-2a8 8 0 0 1 16 0v2"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.92"
      />
      <path
        d="M28 40h24M28 52h24M28 64h24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.92"
      />
    </svg>
  )
}

export function ReferralPage() {
  const { t, i18n } = useTranslation()
  const { hash } = useLocation()
  const { openProfilePortal } = useProfilePortal()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'
  const [openId, setOpenId] = useState<string | null>(null)

  const tiles = useMemo(
    () => asArray<GalleryTile>(t('referralPage.tiles', { returnObjects: true })),
    [t, i18n.language],
  )

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [hash])

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  const onCtaClick = (e: ReactMouseEvent) => {
    e.stopPropagation()
    openProfilePortal()
  }

  return (
    <>
      <SEOHead variant={variant} page="referral" />
      <Header />

      <main className={styles.page}>
        <section id="top" className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.heroBrand}>{t('referralPage.brand')}</p>
            <h1 className={`${styles.heroHeadline} ${local.heroHeadlineAccent}`}>
              <Lines text={String(t('referralPage.hero.headline'))} className={styles.blockLine} />
            </h1>
            <button type="button" className={styles.btnDark} onClick={openProfilePortal}>
              {t('referralPage.hero.cta')}
            </button>
          </div>
        </section>

        <section id="overview" className={styles.intro}>
          <div className={styles.wrap}>
            <div className={`${styles.introMedia} ${local.introWide}`}>
              <img
                src={`${REFERRAL_HERO_SRC}?v=cool`}
                alt={String(t('referralPage.brand'))}
                width={1024}
                height={529}
              />
            </div>
          </div>
        </section>

        <section id="gallery" className={styles.gallery}>
          <div className={styles.galleryWrap}>
            <div className={styles.tiles}>
              {tiles.map((tile) => {
                const open = openId === tile.id
                const themeClass =
                  tile.theme === 'dark'
                    ? styles.tileDark
                    : tile.theme === 'soft'
                      ? styles.tileSoft
                      : styles.tileLight
                const spanClass = tile.span === 'full' ? styles.tileFull : styles.tileHalf
                const isFeatureFace = tile.id === 'how'
                const isRulesFace = tile.id === 'limits'
                const isHalfAccent = tile.span === 'half'

                return (
                  <article
                    key={tile.id}
                    id={tile.id === 'reward' ? 'referral-benefits' : undefined}
                    className={`${styles.tile} ${spanClass} ${themeClass} ${open ? styles.tileOpen : ''}`}
                    onClick={() => toggle(tile.id)}
                    role="presentation"
                  >
                    <div className={styles.scene}>
                      <div className={`${styles.face} ${styles.faceFront}`}>
                        <div
                          className={`${styles.facePad} ${
                            isFeatureFace || isRulesFace ? styles.privacyFace : ''
                          }`}
                        >
                          <h2
                            className={`${styles.tileHeadline} ${
                              isFeatureFace
                                ? styles.privacyHeadline
                                : isHalfAccent
                                  ? styles.feeHeadline
                                  : ''
                            }`}
                          >
                            {tile.accent ? (
                              <>
                                <span className={styles.gradText}>{tile.accent}</span>
                                {tile.headline ? (
                                  <>
                                    {'\n'}
                                    <Lines text={tile.headline} className={styles.blockLine} />
                                  </>
                                ) : null}
                              </>
                            ) : (
                              <Lines text={tile.headline} className={styles.blockLine} />
                            )}
                          </h2>
                          {tile.sub ? (
                            <p
                              className={`${styles.tileSub} ${
                                isFeatureFace ? styles.privacySub : ''
                              }`}
                            >
                              {tile.sub}
                            </p>
                          ) : null}
                          {isRulesFace ? (
                            <div
                              className={`${styles.privacyLock} ${local.rulesIcon}`}
                              aria-hidden="true"
                            >
                              <RulesIcon />
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className={`${styles.face} ${styles.faceBack}`}>
                        <div className={styles.backPad}>
                          <h3 className={styles.backTitle}>{tile.detailTitle}</h3>
                          <p className={styles.backBody}>{tile.detailBody}</p>
                          {tile.cta ? (
                            <button
                              type="button"
                              className={styles.btnDark}
                              onClick={onCtaClick}
                            >
                              {tile.cta}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`${styles.toggle} ${open ? styles.toggleClose : ''}`}
                      aria-expanded={open}
                      aria-label={
                        open
                          ? String(t('referralPage.closeTile'))
                          : String(t('referralPage.openTile', { title: tile.detailTitle }))
                      }
                      onClick={(e) => {
                        e.stopPropagation()
                        toggle(tile.id)
                      }}
                    >
                      {open ? <CloseIcon /> : <PlusIcon />}
                    </button>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className={styles.start}>
          <div className={styles.wrap}>
            <img
              src={START_ICON}
              alt="Raqoon"
              width={80}
              height={80}
              className={styles.startIcon}
            />
            <h2 className={styles.startTitle}>{t('referralPage.final.headline')}</h2>
            <p className={styles.startBody}>{t('referralPage.final.body')}</p>
            <button type="button" className={styles.btnLight} onClick={openProfilePortal}>
              {t('referralPage.final.cta')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
