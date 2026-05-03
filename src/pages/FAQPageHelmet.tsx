import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, getSiteOrigin } from '@/config/siteUrl'
import type { FaqApiLocale } from '@/lib/supportPublicFaq'

type FAQPageHelmetProps = {
  apiLocale: FaqApiLocale
}

/** SEO для `/faq` и `/app` — язык и meta по локали контента FAQ (ru / en). */
export function FAQPageHelmet({ apiLocale }: FAQPageHelmetProps) {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const tMeta = i18n.getFixedT(apiLocale === 'ru' ? 'ru' : 'en')

  const title =
    apiLocale === 'ru'
      ? tMeta('meta.faqTitleRU')
      : tMeta('meta.faqTitleWW')
  const description =
    apiLocale === 'ru'
      ? tMeta('meta.faqDescriptionRU')
      : tMeta('meta.faqDescriptionWW')

  const ogTitle = title
  const ogDescription = description
  const htmlLang = apiLocale === 'ru' ? 'ru' : 'en'

  const origin = getSiteOrigin()
  const canonicalPath = pathname === '/app' ? '/app' : '/faq'
  const canonical = origin ? `${origin.replace(/\/$/, '')}${canonicalPath}` : undefined
  const ogImageAbsolute = absoluteUrl('/og-image.png')
  const url = canonical ?? (typeof window !== 'undefined' ? window.location.href : '')
  const siteName = 'Raqoon VPN'
  const ogLocale = apiLocale === 'ru' ? 'ru_RU' : 'en_US'
  const ogLocaleAlternate = apiLocale === 'ru' ? 'en_US' : 'ru_RU'

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
          sameAs: ['https://t.me/raqoonbot'],
        },
        {
          '@type': 'WebPage',
          name: title,
          url: canonical ?? `${origin}${canonicalPath}`,
          inLanguage: apiLocale === 'ru' ? 'ru-RU' : 'en',
          isPartOf: { '@type': 'WebSite', name: 'Raqoon', url: origin },
        },
      ],
    }).replace(/</g, '\\u003c')

  return (
    <Helmet>
      <html lang={htmlLang} />
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

      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} /> : null}
    </Helmet>
  )
}
