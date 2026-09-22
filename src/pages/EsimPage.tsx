import { useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { EsimPricingCatalog } from '../components/EsimPricing/EsimPricingCatalog'
import styles from './WalletPage.module.css'
import local from './EsimPage.module.css'

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

const ESIM_HERO_SRC = '/home-esim-phone.png'
const START_ICON = '/wallet-app-icon.png'
const PURCHASE_CTA = '/download'

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

export function EsimPage() {
  const { t, i18n } = useTranslation()
  const { hash } = useLocation()
  const variant = i18n.language.startsWith('ru') ? 'ru' : 'ww'
  const [openId, setOpenId] = useState<string | null>(null)

  const tiles = useMemo(
    () => asArray<GalleryTile>(t('esimPage.tiles', { returnObjects: true })),
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

  const onTileCtaClick = (e: ReactMouseEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      <SEOHead variant={variant} page="esim" />
      <Header />

      <main className={styles.page}>
        <section id="top" className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.heroBrand}>{t('esimPage.brand')}</p>
            <h1 className={styles.heroHeadline}>
              <Lines text={String(t('esimPage.hero.headline'))} className={styles.blockLine} />
            </h1>
            <Link to={PURCHASE_CTA} className={`${styles.btnDark} ${local.ctaLink} ${local.ctaAccent}`}>
              {t('esimPage.hero.cta')}
            </Link>
          </div>
        </section>

        <section id="overview" className={styles.intro}>
          <div className={styles.wrap}>
            <div className={`${styles.introMedia} ${local.introMedia}`}>
              <img
                src={ESIM_HERO_SRC}
                alt={String(t('esimPage.brand'))}
                width={761}
                height={1024}
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

                return (
                  <article
                    key={tile.id}
                    className={`${styles.tile} ${spanClass} ${themeClass} ${open ? styles.tileOpen : ''}`}
                    onClick={() => toggle(tile.id)}
                    role="presentation"
                  >
                    <div className={styles.scene}>
                      <div className={`${styles.face} ${styles.faceFront}`}>
                        <div className={styles.facePad}>
                          <h2 className={`${styles.tileHeadline} ${styles.feeHeadline}`}>
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
                          {tile.sub ? <p className={styles.tileSub}>{tile.sub}</p> : null}
                        </div>
                      </div>

                      <div className={`${styles.face} ${styles.faceBack}`}>
                        <div className={styles.backPad}>
                          <h3 className={styles.backTitle}>{tile.detailTitle}</h3>
                          <p className={styles.backBody}>{tile.detailBody}</p>
                          {tile.cta ? (
                            <Link
                              to={PURCHASE_CTA}
                              className={`${styles.btnDark} ${local.ctaLink}`}
                              onClick={onTileCtaClick}
                            >
                              {tile.cta}
                            </Link>
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
                          ? String(t('esimPage.closeTile'))
                          : String(t('esimPage.openTile', { title: tile.detailTitle }))
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

        <section id="pricing" className={local.pricing}>
          <div className={styles.wrap}>
            <h2 className={local.pricingTitle}>{t('esimPage.pricing.title')}</h2>
            <EsimPricingCatalog purchaseHref={PURCHASE_CTA} />
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
            <h2 className={styles.startTitle}>{t('esimPage.final.headline')}</h2>
            <p className={styles.startBody}>{t('esimPage.final.body')}</p>
            <Link to={PURCHASE_CTA} className={`${styles.btnLight} ${local.ctaLink}`}>
              {t('esimPage.final.cta')}
            </Link>
            <p className={local.finalDisclaimer}>{t('esimPage.final.disclaimer')}</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
