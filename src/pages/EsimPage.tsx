import { useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import { EsimPricingCatalog } from '../components/EsimPricing/EsimPricingCatalog'
import home from './HomePage.module.css'
import wallet from './WalletPage.module.css'
import local from './EsimPage.module.css'

type TileSpan = 'full' | 'half'
type TileTheme = 'light' | 'dark' | 'soft'

type GalleryTile = {
  id: string
  span: TileSpan
  theme: TileTheme
  accent?: string
  headline: string
  sub?: string
  detailTitle: string
  detailBody: string
  benefits?: string[]
  cta?: string
  href?: string
  display?: boolean
}

const ESIM_HERO_SRC = '/home-esim-phone.png'
const START_ICON = '/wallet-app-icon.png'
const DOWNLOAD_HREF = '/download'

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

function TileCta({
  tile,
  onClick,
}: {
  tile: GalleryTile
  onClick: (e: ReactMouseEvent) => void
}) {
  if (!tile.href) return null
  const label = tile.cta || 'Download'
  const content = (
    <>
      <span className={home.srOnly}>{label}</span>
      <span aria-hidden="true">→</span>
    </>
  )
  if (tile.href.startsWith('http')) {
    return (
      <a
        href={tile.href}
        className={home.downloadBtn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }
  if (tile.href.startsWith('#')) {
    return (
      <a href={tile.href} className={home.downloadBtn} aria-label={label} onClick={onClick}>
        {content}
      </a>
    )
  }
  return (
    <Link to={tile.href} className={home.downloadBtn} aria-label={label} onClick={onClick}>
      {content}
    </Link>
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
  const stop = (e: ReactMouseEvent) => e.stopPropagation()

  return (
    <>
      <SEOHead variant={variant} page="esim" />
      <Header />

      <main className={home.page}>
        <section id="top" className={wallet.hero}>
          <div className={wallet.wrap}>
            <p className={wallet.heroBrand}>{t('esimPage.brand')}</p>
            <h1 className={wallet.heroHeadline}>
              <Lines text={String(t('esimPage.hero.headline'))} className={wallet.blockLine} />
            </h1>
            <Link
              to={DOWNLOAD_HREF}
              className={`${wallet.btnDark} ${local.ctaLink} ${local.ctaAccent}`}
            >
              {t('esimPage.hero.cta')}
            </Link>
          </div>
        </section>

        <section id="overview" className={wallet.intro}>
          <div className={wallet.wrap}>
            <div className={`${wallet.introMedia} ${local.introMedia}`}>
              <img
                src={ESIM_HERO_SRC}
                alt={String(t('esimPage.brand'))}
                width={761}
                height={1024}
              />
            </div>
          </div>
        </section>

        <section id="gallery" className={home.gallery}>
          <div className={home.galleryWrap}>
            <div className={home.tiles}>
              {tiles.map((tile) => {
                const open = openId === tile.id
                const themeClass =
                  tile.theme === 'dark'
                    ? home.tileDark
                    : tile.theme === 'soft'
                      ? home.tileSoft
                      : home.tileLight
                const spanClass = tile.span === 'full' ? home.tileFull : home.tileHalf
                const headlineClass = [
                  home.tileHeadline,
                  tile.display ? home.displayHeadline : home.feeHeadline,
                ].join(' ')
                const benefits = Array.isArray(tile.benefits) ? tile.benefits : []

                return (
                  <article
                    key={tile.id}
                    className={`${home.tile} ${home.tileFlip} ${spanClass} ${themeClass} ${
                      open ? home.tileOpen : ''
                    }`}
                    onClick={() => toggle(tile.id)}
                    role="presentation"
                  >
                    <div className={home.scene}>
                      <div className={`${home.face} ${home.faceFront}`}>
                        <div
                          className={`${home.facePad} ${tile.display ? home.privacyFace : ''}`}
                        >
                          <h2 className={headlineClass}>
                            {tile.accent ? (
                              <>
                                <span className={home.gradText}>{tile.accent}</span>
                                {tile.headline ? (
                                  <Lines text={tile.headline} className={home.blockLine} />
                                ) : null}
                              </>
                            ) : (
                              <Lines text={tile.headline} className={home.blockLine} />
                            )}
                          </h2>
                          {tile.sub ? (
                            <p
                              className={`${home.tileSub} ${
                                tile.display ? home.tileSubDisplay : ''
                              }`}
                            >
                              {tile.sub}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className={`${home.face} ${home.faceBack}`}>
                        <div className={home.backPad}>
                          <h3 className={home.backTitle}>{tile.detailTitle}</h3>
                          {tile.detailBody ? (
                            <p className={home.backBody}>{tile.detailBody}</p>
                          ) : null}
                          {benefits.length > 0 ? (
                            <ul className={home.benefits}>
                              {benefits.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className={home.cornerActions}>
                      <TileCta tile={tile} onClick={stop} />
                      <button
                        type="button"
                        className={`${home.toggle} ${open ? home.toggleClose : ''}`}
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
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className={local.pricing}>
          <div className={wallet.wrap}>
            <h2 className={local.pricingTitle}>{t('esimPage.pricing.title')}</h2>
            <EsimPricingCatalog purchaseHref={DOWNLOAD_HREF} />
          </div>
        </section>

        <section className={home.start}>
          <div className={home.wrap}>
            <img
              src={START_ICON}
              alt="Raqoon"
              width={80}
              height={80}
              className={home.startIcon}
            />
            <h2 className={home.startTitle}>{t('esimPage.final.headline')}</h2>
            <p className={home.startBody}>{t('esimPage.final.body')}</p>
            <Link to={DOWNLOAD_HREF} className={`${home.btnLight} ${local.ctaLink}`}>
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
