import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { absoluteUrl, getSiteOrigin } from '@/config/siteUrl'

/** SEO only for `/faq` — не трогает общий `SEOHead` остальных страниц. */
export function FAQPageHelmet() {
  const { t, i18n } = useTranslation()
  const lng = i18n.language
  const title = t('meta.faqTitleRU')
  const description = t('meta.faqDescriptionRU')
  const ogTitle = title
  const ogDescription = description

  const origin = getSiteOrigin()
  const canonical = origin ? `${origin.replace(/\/$/, '')}/faq` : undefined
  const ogImageAbsolute = absoluteUrl('/og-image.png')
  const url = canonical ?? (typeof window !== 'undefined' ? window.location.href : '')
  const siteName = 'Raqoon VPN'
  const ogLocale = 'ru_RU'
  const ogLocaleAlternate = 'en_US'

  const jsonLd =
    origin &&
    JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Raqoon',
          legalName: 'Qat Bilişim LTD.',
          url: origin,
          logo: absoluteUrl('/favicon-32x32.png'),
          email: 'hello@raqoon.app',
          sameAs: ['https://t.me/raqoonbot'],
        },
        {
          '@type': 'WebPage',
          name: title,
          url: canonical ?? `${origin}/faq`,
          inLanguage: 'ru-RU',
          isPartOf: { '@type': 'WebSite', name: 'Raqoon', url: origin },
        },
      ],
    })

  return (
    <Helmet>
      <html lang={lng} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Raqoon" />
      <meta name="theme-color" content="#00000a" />
      {canonical ? <link rel="canonical" href={canonical} /> : null}

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

      {jsonLd ? <script type="application/ld+json">{jsonLd}</script> : null}
    </Helmet>
  )
}
