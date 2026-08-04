import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './HomePage.module.css'

type TileSpan = 'full' | 'half'
type TileTheme = 'light' | 'dark' | 'soft'

type HomeTile = {
  id: string
  span: TileSpan
  theme: TileTheme
  accent?: string
  headline: string
  sub?: string
  price?: string
  detailTitle?: string
  detailBody?: string
  benefits?: string[]
  cta?: string
  href?: string
  soon?: boolean
  display?: boolean
  flip?: boolean
  visual?: string
  icon?: 'zero'
  iconLabel?: string
}

function asTiles(value: unknown): HomeTile[] {
  return Array.isArray(value) ? (value as HomeTile[]) : []
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

function ZeroIcon({ label }: { label: string }) {
  const short = label.length <= 2
  return (
    <svg className={styles.zeroSvg} viewBox="0 0 120 96" fill="none" aria-hidden="true">
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fill="currentColor"
        fontSize={short ? 88 : 64}
        fontWeight="700"
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        {label}
      </text>
    </svg>
  )
}

function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      →
    </span>
  )
}

function tileCanFlip(tile: HomeTile) {
  if (tile.soon) return false
  if (tile.flip === true) return true
  if (tile.flip === false) return false
  return Boolean(
    tile.detailTitle ||
      tile.detailBody ||
      (Array.isArray(tile.benefits) && tile.benefits.length > 0),
  )
}

function DownloadCta({
  tile,
  onClick,
}: {
  tile: HomeTile
  onClick: (e: ReactMouseEvent) => void
}) {
  if (!tile.href) return null
  const label = tile.cta || 'Download'
  const className = styles.downloadBtn
  const content = (
    <>
      <span className={styles.srOnly}>{label}</span>
      <span aria-hidden="true">→</span>
    </>
  )
  if (tile.href.startsWith('http')) {
    return (
      <a
        href={tile.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }
  return (
    <Link to={tile.href} className={className} aria-label={label} onClick={onClick}>
      {content}
    </Link>
  )
}

function FlipTile({
  tile,
  open,
  onToggle,
}: {
  tile: HomeTile
  open: boolean
  onToggle: () => void
}) {
  const { t } = useTranslation()
  const themeClass =
    tile.theme === 'dark'
      ? styles.tileDark
      : tile.theme === 'soft'
        ? styles.tileSoft
        : styles.tileLight
  const spanClass = tile.span === 'full' ? styles.tileFull : styles.tileHalf
  const headlineClass = [
    styles.tileHeadline,
    tile.display ? styles.displayHeadline : styles.feeHeadline,
  ]
    .filter(Boolean)
    .join(' ')
  const benefits = Array.isArray(tile.benefits) ? tile.benefits : []
  const stop = (e: ReactMouseEvent) => e.stopPropagation()

  return (
    <article
      className={`${styles.tile} ${styles.tileFlip} ${spanClass} ${themeClass} ${open ? styles.tileOpen : ''}`}
      onClick={onToggle}
      role="presentation"
    >
      <div className={styles.scene}>
        <div className={`${styles.face} ${styles.faceFront}`}>
          <div
            className={`${styles.facePad} ${tile.display ? styles.privacyFace : ''} ${
              tile.icon ? styles.facePadIcon : ''
            }`}
          >
            <h2 className={headlineClass}>
              {tile.accent ? (
                <>
                  <span className={styles.gradText}>{tile.accent}</span>
                  {tile.headline ? <Lines text={tile.headline} className={styles.blockLine} /> : null}
                </>
              ) : (
                <Lines text={tile.headline} className={styles.blockLine} />
              )}
            </h2>
            {tile.sub ? (
              <p
                className={`${styles.tileSub} ${tile.display ? styles.tileSubDisplay : ''}`}
              >
                {tile.sub}
              </p>
            ) : null}
            {tile.price ? <p className={styles.priceTag}>{tile.price}</p> : null}
            {tile.icon === 'zero' ? (
              <div className={styles.tileIcon} aria-hidden="true">
                <ZeroIcon label={tile.iconLabel || '0'} />
              </div>
            ) : null}
          </div>
        </div>

        <div className={`${styles.face} ${styles.faceBack}`}>
          <div className={styles.backPad}>
            <h3 className={styles.backTitle}>{tile.detailTitle || tile.accent || tile.headline}</h3>
            {tile.detailBody ? <p className={styles.backBody}>{tile.detailBody}</p> : null}
            {benefits.length > 0 ? (
              <ul className={styles.benefits}>
                {benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.cornerActions}>
        <DownloadCta tile={tile} onClick={stop} />
        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleClose : ''}`}
          aria-expanded={open}
          aria-label={
            open
              ? String(t('homePage.closeTile'))
              : String(
                  t('homePage.openTile', {
                    title: tile.detailTitle || tile.accent || tile.headline,
                  }),
                )
          }
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
        >
          {open ? <CloseIcon /> : <PlusIcon />}
        </button>
      </div>
    </article>
  )
}

function LinkTile({ tile }: { tile: HomeTile }) {
  const themeClass =
    tile.theme === 'dark'
      ? styles.tileDark
      : tile.theme === 'soft'
        ? styles.tileSoft
        : styles.tileLight
  const spanClass = tile.span === 'full' ? styles.tileFull : styles.tileHalf
  const headlineClass = [
    styles.tileHeadline,
    tile.display ? styles.displayHeadline : styles.feeHeadline,
  ]
    .filter(Boolean)
    .join(' ')
  const isCardsMedia = Boolean(tile.visual?.includes('wallet-cards'))
  const isPhoneMedia = Boolean(tile.visual?.includes('esim-phone'))

  const inner = (
    <>
      <div
        className={[
          styles.facePad,
          tile.visual ? styles.facePadMedia : '',
          isCardsMedia ? styles.facePadMediaCards : '',
          isPhoneMedia ? styles.facePadMediaPhone : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <h2 className={headlineClass}>
          {tile.accent ? (
            <>
              <span className={styles.gradText}>{tile.accent}</span>
              {tile.headline ? <Lines text={tile.headline} className={styles.blockLine} /> : null}
            </>
          ) : (
            <Lines text={tile.headline} className={styles.blockLine} />
          )}
        </h2>
        {tile.sub ? <p className={styles.tileSub}>{tile.sub}</p> : null}
        {tile.price ? <p className={styles.priceTag}>{tile.price}</p> : null}
        {tile.visual ? (
          <div
            className={[
              styles.tileMedia,
              isCardsMedia ? styles.tileMediaCards : '',
              isPhoneMedia ? styles.tileMediaPhone : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          >
            <img src={tile.visual} alt="" />
          </div>
        ) : null}
      </div>
      <Arrow />
    </>
  )

  const className = [
    styles.tile,
    styles.tileLink,
    spanClass,
    themeClass,
    tile.soon ? styles.tileSoon : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!tile.href || tile.soon) {
    return (
      <article className={className} aria-label={tile.accent || tile.headline}>
        {inner}
      </article>
    )
  }

  if (tile.href.startsWith('http') || tile.href.startsWith('#')) {
    return (
      <a
        className={className}
        href={tile.href}
        {...(tile.href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link className={className} to={tile.href}>
      {inner}
    </Link>
  )
}

function TileCard({
  tile,
  open,
  onToggle,
}: {
  tile: HomeTile
  open: boolean
  onToggle: () => void
}) {
  if (tileCanFlip(tile)) {
    return <FlipTile tile={tile} open={open} onToggle={onToggle} />
  }
  return <LinkTile tile={tile} />
}

export function HomePage() {
  const { t, i18n } = useTranslation()
  const isRu = i18n.language.startsWith('ru')
  const seoVariant = isRu ? 'ru' : 'ww'
  const tiles = asTiles(t('homePage.tiles', { returnObjects: true }))
  const [openId, setOpenId] = useState<string | null>(null)

  // Catalog differs by locale (RU vs WW); drop stale flip state on switch.
  useEffect(() => {
    setOpenId(null)
  }, [i18n.language])

  return (
    <>
      <SEOHead variant={seoVariant} />
      <Header />
      <main className={styles.page}>
        <section id="top" className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroMascot} aria-hidden="true">
              <img src="/mascot.png" alt="" width={560} height={280} />
            </div>
            <h1 className={styles.heroHeadline}>
              <Lines text={String(t('homePage.hero.headline'))} className={styles.blockLine} />
            </h1>
            <Link to="/download" className={styles.btnDark}>
              {t('homePage.hero.cta')}
            </Link>
          </div>
        </section>

        <section id="gallery" className={styles.gallery}>
          <div className={styles.galleryWrap}>
            <div className={styles.tiles}>
              {tiles.map((tile) => (
                <TileCard
                  key={tile.id}
                  tile={tile}
                  open={openId === tile.id}
                  onToggle={() => setOpenId((cur) => (cur === tile.id ? null : tile.id))}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.start}>
          <div className={styles.wrap}>
            <img
              src="/wallet-app-icon.png"
              alt=""
              width={80}
              height={80}
              className={styles.startIcon}
            />
            <h2 className={styles.startTitle}>{t('homePage.final.headline')}</h2>
            <p className={styles.startBody}>{t('homePage.final.body')}</p>
            <Link to="/download" className={styles.btnLight}>
              {t('homePage.final.cta')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
