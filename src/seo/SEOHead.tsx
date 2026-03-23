import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOHeadProps {
  variant: 'ru' | 'ww'
  canonicalUrl?: string
}

export function SEOHead({ variant, canonicalUrl }: SEOHeadProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('ru') ? 'ru' : 'en'
  const suffix = lang === 'ru' ? 'RU' : 'WW'
  void variant
  const siteName = lang === 'ru' ? 'Raqoon VPS' : 'Raqoon VPN'

  const title = t(`meta.title${suffix}`)
  const description = t(`meta.description${suffix}`)
  const ogTitle = t(`meta.ogTitle${suffix}`)
  const ogDescription = t(`meta.ogDescription${suffix}`)
  const ogImage = '/og-image.png'
  const url = canonicalUrl ?? (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
