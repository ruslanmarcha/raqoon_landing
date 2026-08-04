import { useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './WalletPage.module.css'

type TileSpan = 'full' | 'half'
type TileTheme = 'light' | 'dark' | 'soft'
type FrontKind = 'product' | 'headline' | 'card'

type GalleryTile = {
  id: string
  span: TileSpan
  theme: TileTheme
  frontKind: FrontKind
  headline: string
  accent?: string
  sub?: string
  detailTitle: string
  detailBody: string
  cta?: string
  visual?: 'transfer' | 'card' | 'telegram'
  cardPrice?: string
}

const CTA = 'https://t.me/raqoonwalletbot?start=17510'
const CARD_SUB = '/card-subscription-raqoon.png?v=hq2'
const CARD_PREM = '/card-premium-raqoon.png?v=hq2'

const VISUAL: Record<NonNullable<GalleryTile['visual']>, string> = {
  transfer: '/wallet-hero-transfer.png',
  card: '/card-hero.png',
  telegram: '/wallet-tile-telegram-phone.png',
}

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

function LockIcon() {
  return (
    <svg className={styles.lockSvg} viewBox="0 0 80 96" fill="none" aria-hidden="true">
      <path
        d="M24 42V28c0-8.837 7.163-16 16-16s16 7.163 16 16v14"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      />
      <rect
        x="14"
        y="42"
        width="52"
        height="42"
        rx="10"
        fill="currentColor"
        opacity="0.14"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="40" cy="60" r="5" fill="currentColor" opacity="0.9" />
      <path d="M40 65v10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}

/** Assist / concierge motif — same weight as LockIcon */
function ConciergeIcon() {
  return (
    <svg className={styles.lockSvg} viewBox="0 0 80 96" fill="none" aria-hidden="true">
      <path
        d="M18 50c0-12.15 9.85-22 22-22s22 9.85 22 22"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.92"
      />
      <rect
        x="12"
        y="48"
        width="14"
        height="26"
        rx="7"
        fill="currentColor"
        opacity="0.14"
        stroke="currentColor"
        strokeWidth="4"
      />
      <rect
        x="54"
        y="48"
        width="14"
        height="26"
        rx="7"
        fill="currentColor"
        opacity="0.14"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M68 64v6c0 6.627-5.373 12-12 12H40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="36" cy="82" r="4.5" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

export function WalletPage() {
  const { i18n } = useTranslation()
  const { hash } = useLocation()
  const t = useMemo(() => i18n.getFixedT('ru'), [i18n])
  const [openId, setOpenId] = useState<string | null>(null)

  const tiles = useMemo(
    () => asArray<GalleryTile>(t('walletPage.tiles', { returnObjects: true })),
    [t],
  )

  useEffect(() => {
    if (!i18n.language.startsWith('ru')) void i18n.changeLanguage('ru')
  }, [i18n])

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

  const onCtaClick = (e: ReactMouseEvent) => e.stopPropagation()

  return (
    <>
      <SEOHead variant="ru" page="wallet" metaLocale="ru" />
      <Header />

      <main className={styles.page}>
        {/* Hero */}
        <section id="top" className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.heroBrand}>{t('walletPage.brand')}</p>
            <h1 className={styles.heroHeadline}>
              <Lines text={String(t('walletPage.hero.headline'))} className={styles.blockLine} />
            </h1>
            <a href={CTA} target="_blank" rel="noopener noreferrer" className={styles.btnDark}>
              {t('walletPage.hero.cta')}
            </a>
          </div>
        </section>

        <section id="overview" className={styles.intro}>
          <div className={styles.wrap}>
            <div className={styles.introMedia}>
              <img src="/wallet-overview-app.png" alt="Raqoon Wallet" width={1024} height={975} />
            </div>
          </div>
        </section>

        {/* Apple Card–style gallery */}
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
                const isCardsAnchor = tile.id === 'subscription' || tile.id === 'premium'

                return (
                  <article
                    key={tile.id}
                    id={isCardsAnchor && tile.id === 'subscription' ? 'cards' : undefined}
                    className={`${styles.tile} ${spanClass} ${themeClass} ${open ? styles.tileOpen : ''}`}
                    onClick={() => toggle(tile.id)}
                    role="presentation"
                  >
                    <div className={styles.scene}>
                      {/* FRONT */}
                      <div className={`${styles.face} ${styles.faceFront}`}>
                        {tile.frontKind === 'headline' ? (
                          <div
                            className={`${styles.facePad} ${
                              tile.id === 'privacy' || tile.id === 'concierge'
                                ? styles.privacyFace
                                : ''
                            }`}
                          >
                            <h2
                              className={`${styles.tileHeadline} ${
                                tile.id === 'privacy' || tile.id === 'concierge'
                                  ? styles.privacyHeadline
                                  : tile.span === 'half'
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
                                  tile.id === 'privacy' || tile.id === 'concierge'
                                    ? styles.privacySub
                                    : ''
                                }`}
                              >
                                {tile.sub}
                              </p>
                            ) : null}
                            {tile.id === 'privacy' ? (
                              <div className={styles.privacyLock} aria-hidden="true">
                                <LockIcon />
                              </div>
                            ) : null}
                            {tile.id === 'concierge' ? (
                              <div className={styles.privacyLock} aria-hidden="true">
                                <ConciergeIcon />
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {tile.frontKind === 'product' ? (
                          <div
                            className={`${styles.facePad} ${styles.productFace} ${
                              tile.id === 'built' ? styles.productFaceBuilt : ''
                            }`}
                          >
                            <h2
                              className={`${styles.tileHeadline} ${
                                tile.id === 'built' || tile.id === 'speed'
                                  ? styles.privacyHeadline
                                  : ''
                              }`}
                            >
                              {tile.accent ? (
                                <>
                                  <span className={styles.blockLine}>{tile.accent}</span>
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
                            {tile.sub ? <p className={styles.tileSub}>{tile.sub}</p> : null}
                            {tile.visual ? (
                              <div
                                className={`${styles.productMedia} ${
                                  tile.id === 'built' ? styles.productMediaBuilt : ''
                                }`}
                                aria-hidden="true"
                              >
                                <img src={VISUAL[tile.visual]} alt="" />
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {tile.frontKind === 'card' ? (
                          <div
                            className={`${styles.facePad} ${styles.cardFace} ${
                              tile.id === 'subscription' ? styles.cardSubFace : ''
                            }`}
                          >
                            <h2 className={styles.tileHeadlineSm}>
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
                            <p className={styles.cardPrice}>{tile.cardPrice}</p>
                            {(tile.id === 'subscription' || tile.id === 'premium') && (
                              <div className={styles.cardArt} aria-hidden="true">
                                <img
                                  src={tile.id === 'premium' ? CARD_PREM : CARD_SUB}
                                  alt=""
                                  className={styles.cardArtImg}
                                />
                              </div>
                            )}
                            {tile.sub ? <p className={styles.tileSub}>{tile.sub}</p> : null}
                          </div>
                        ) : null}
                      </div>

                      {/* BACK — white detail face */}
                      <div className={`${styles.face} ${styles.faceBack}`}>
                        <div className={styles.backPad}>
                          <h3 className={styles.backTitle}>{tile.detailTitle}</h3>
                          <p className={styles.backBody}>{tile.detailBody}</p>
                          {tile.cta ? (
                            <a
                              href={CTA}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.btnDark}
                              onClick={onCtaClick}
                            >
                              {tile.cta}
                            </a>
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
                          ? String(t('walletPage.closeTile'))
                          : String(t('walletPage.openTile', { title: tile.detailTitle }))
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

        {/* Get started */}
        <section className={styles.start}>
          <div className={styles.wrap}>
            <img
              src="/wallet-app-icon.png"
              alt="Raqoon"
              width={80}
              height={80}
              className={styles.startIcon}
            />
            <h2 className={styles.startTitle}>{t('walletPage.final.headline')}</h2>
            <p className={styles.startBody}>{t('walletPage.final.body')}</p>
            <a href={CTA} target="_blank" rel="noopener noreferrer" className={styles.btnLight}>
              {t('walletPage.final.cta')}
            </a>
            <p className={styles.disclaimer}>{t('walletPage.final.disclaimer')}</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
