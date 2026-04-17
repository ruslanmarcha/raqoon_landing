import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, getSiteOrigin } from '@/config/siteUrl'

export type SeoPage =
  | 'default'
  | 'download'
  | 'about'
  | 'migration'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'refund'
  | 'referral'

interface SEOHeadProps {
  variant: 'ru' | 'ww'
  canonicalUrl?: string
  page?: SeoPage
  /** Force RU/WW meta keys (e.g. migration content is always Russian). */
  metaLocale?: 'ru' | 'ww'
}

function resolveOgLocale(lng: string, lang: 'ru' | 'en'): string {
  const lower = lng.toLowerCase()
  if (lang === 'ru') return 'ru_RU'
  if (lower.startsWith('zh')) return 'zh_CN'
  if (lower.startsWith('pt')) return 'pt_BR'
  if (lower.startsWith('tr')) return 'tr_TR'
  if (lower.startsWith('ja')) return 'ja_JP'
  if (lower.startsWith('ko')) return 'ko_KR'
  if (lower.startsWith('ar')) return 'ar_SA'
  return 'en_US'
}

function resolveMeta(
  page: SeoPage,
  lang: 'ru' | 'en',
  t: (key: string) => string,
): { title: string; description: string; ogTitle: string; ogDescription: string } {
  const suffix = lang === 'ru' ? 'RU' : 'WW'
  switch (page) {
    case 'download':
      return {
        title: t(`meta.downloadTitle${suffix}`),
        description: t(`meta.downloadDescription${suffix}`),
        ogTitle: t(`meta.downloadOgTitle${suffix}`),
        ogDescription: t(`meta.downloadOgDescription${suffix}`),
      }
    case 'referral':
      return {
        title: t(`meta.referralTitle${suffix}`),
        description: t(`meta.referralDescription${suffix}`),
        ogTitle: t(`meta.referralOgTitle${suffix}`),
        ogDescription: t(`meta.referralOgDescription${suffix}`),
      }
    case 'about':
      return {
        title: t(`meta.aboutTitle${suffix}`),
        description: t(`meta.aboutDescription${suffix}`),
        ogTitle: t(`meta.aboutTitle${suffix}`),
        ogDescription: t(`meta.aboutDescription${suffix}`),
      }
    case 'migration':
      return {
        title: t('meta.migrationTitleRU'),
        description: t('meta.migrationDescriptionRU'),
        ogTitle: t('meta.migrationTitleRU'),
        ogDescription: t('meta.migrationDescriptionRU'),
      }
    case 'privacy':
    case 'terms':
    case 'contact':
    case 'refund':
      return {
        title: t(`meta.${page}Title${suffix}`),
        description: t(`meta.${page}Description${suffix}`),
        ogTitle: t(`meta.${page}Title${suffix}`),
        ogDescription: t(`meta.${page}Description${suffix}`),
      }
    default:
      return {
        title: t(`meta.title${suffix}`),
        description: t(`meta.description${suffix}`),
        ogTitle: t(`meta.ogTitle${suffix}`),
        ogDescription: t(`meta.ogDescription${suffix}`),
      }
  }
}

export function SEOHead({ variant, canonicalUrl, page = 'default', metaLocale }: SEOHeadProps) {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const lng = i18n.language

  const langForMeta =
    metaLocale === 'ru' ? 'ru' : metaLocale === 'ww' ? 'en' : lng.startsWith('ru') ? 'ru' : 'en'
  void variant

  const lang = langForMeta
  const siteName = 'Raqoon VPN'

  const { title, description, ogTitle, ogDescription } = resolveMeta(page, lang, t)

  const origin = getSiteOrigin()
  const pathForCanonical = pathname || '/'
  const canonical =
    canonicalUrl ?? (origin ? new URL(pathForCanonical, `${origin}/`).href : undefined)

  const ogImageAbsolute = absoluteUrl('/og-image.png')
  const url = canonical ?? (typeof window !== 'undefined' ? window.location.href : '')

  const ogLocale = lang === 'ru' ? 'ru_RU' : resolveOgLocale(lng, 'en')
  const ogLocaleAlternate = lang === 'ru' ? 'en_US' : 'ru_RU'

  const jsonLd =
    origin &&
    JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Raqoon',
          legalName: 'Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.',
          url: origin,
          logo: absoluteUrl('/favicon-32x32.png'),
          email: 'help@raqoon.app',
          sameAs: ['https://t.me/raqoonbot'],
        },
        {
          '@type': 'WebSite',
          name: 'Raqoon',
          url: origin,
          inLanguage: lang === 'ru' ? 'ru-RU' : 'en',
          publisher: { '@type': 'Organization', name: 'Raqoon' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Raqoon VPN',
          applicationCategory: 'SecurityApplication',
          operatingSystem: 'iOS, Android, macOS',
          url: absoluteUrl('/download'),
          downloadUrl: absoluteUrl('/download'),
          publisher: { '@type': 'Organization', name: 'Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.', url: origin },
        },
      ],
    })

  const showHreflang = pathname === '/' || pathname === '/ww'
  const ruHome = origin ? `${origin}/` : ''
  const enWw = origin ? `${origin}/ww` : ''

  return (
    <Helmet>
      <html lang={lng} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Raqoon" />
      <meta name="theme-color" content="#00000a" />
      <meta name="format-detection" content="telephone=no" />
      {canonical && <link rel="canonical" href={canonical} />}

      {showHreflang && ruHome && enWw ? (
        <>
          <link rel="alternate" hrefLang="ru" href={ruHome} />
          <link rel="alternate" hrefLang="en" href={enWw} />
          <link rel="alternate" hrefLang="x-default" href={enWw} />
        </>
      ) : null}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImageAbsolute} />
      <meta property="og:image:secure_url" content={ogImageAbsolute} />
      <meta property="og:image:alt" content={ogTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImageAbsolute} />

      {jsonLd ? (
        <script type="application/ld+json">{jsonLd}</script>
      ) : null}
    </Helmet>
  )
}
