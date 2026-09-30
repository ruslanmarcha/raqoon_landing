import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocalePolicy } from '../../contexts/LocalePolicyContext'
import { excludeOneDayPackages } from '../../lib/esimPricing/excludeOneDayPackages'
import { filterTurkeyDestinationSims } from '../../lib/esimPricing/filterTurkeySims'
import { formatDataBytes } from '../../lib/esimPricing/formatDataBytes'
import { formatPackageTitle } from '../../lib/esimPricing/formatPackageTitle'
import {
  formatPriceForLocale,
  packageHasPriceForLocale,
  resolveMarketForLocale,
} from '../../lib/esimPricing/formatPrice'
import { useEsimPricing } from '../../lib/esimPricing/useEsimPricing'
import type { Package } from '../../lib/esimPricing/types'
import { RAQOON_ESIM_APP_STORE_URL } from '../../utils/storeBadgeUrls'
import styles from './EsimPricingCatalog.module.css'

const PURCHASE_HREF = RAQOON_ESIM_APP_STORE_URL

/** Popular chips order (aligned with raqoon.cc). */
const POPULAR_DESTINATIONS = ['TR', 'TH', 'AE', 'EG', 'GR', 'CY', 'IT', 'ES', 'US', 'JP'] as const

type CountryOption = {
  code: string
  packages: Package[]
}

function popularRank(code: string): number {
  const idx = POPULAR_DESTINATIONS.indexOf(code.toUpperCase() as (typeof POPULAR_DESTINATIONS)[number])
  return idx === -1 ? POPULAR_DESTINATIONS.length : idx
}

function countryLabel(code: string, locale: string): string {
  try {
    const names = new Intl.DisplayNames([locale], { type: 'region' })
    return names.of(code.toUpperCase()) ?? code
  } catch {
    return code
  }
}

function flagEmoji(code: string): string {
  const upper = code.toUpperCase()
  if (!/^[A-Z]{2}$/.test(upper)) return ''
  const base = 0x1f1e6
  return String.fromCodePoint(
    ...[...upper].map((ch) => base + ch.charCodeAt(0) - 65),
  )
}

type EsimPricingCatalogProps = {
  purchaseHref?: string
}

export function EsimPricingCatalog({ purchaseHref = PURCHASE_HREF }: EsimPricingCatalogProps) {
  const { t, i18n } = useTranslation()
  const { countryCode } = useLocalePolicy()
  const pricing = useEsimPricing()
  const [marketCode, setMarketCode] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const locale = i18n.language || 'en'

  useEffect(() => {
    setMarketCode(null)
  }, [locale])

  const catalog = useMemo(() => {
    if (!pricing.data) return null
    return excludeOneDayPackages(filterTurkeyDestinationSims(pricing.data, countryCode))
  }, [pricing.data, countryCode])

  const market = useMemo(() => {
    if (!catalog) return null
    return resolveMarketForLocale(catalog.markets, locale, marketCode)
  }, [catalog, marketCode, locale])

  const countries = useMemo((): CountryOption[] => {
    if (!catalog) return []
    return catalog.countries
      .map((group) => ({
        code: group.code,
        packages: group.packages
          .filter((pkg) => packageHasPriceForLocale(pkg, catalog.markets, locale))
          .sort((a, b) => a.durationDays - b.durationDays || a.dataBytes - b.dataBytes),
      }))
      .filter((group) => group.packages.length > 0)
      .sort((a, b) => {
        const byPopular = popularRank(a.code) - popularRank(b.code)
        if (byPopular !== 0) return byPopular
        return countryLabel(a.code, locale).localeCompare(countryLabel(b.code, locale), locale)
      })
  }, [catalog, locale])

  const popularCountries = useMemo(
    () =>
      POPULAR_DESTINATIONS.map((code) => countries.find((c) => c.code === code)).filter(
        (c): c is CountryOption => Boolean(c),
      ),
    [countries],
  )

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return countries
    return countries.filter((c) => {
      const label = countryLabel(c.code, locale).toLowerCase()
      return label.includes(q) || c.code.toLowerCase().includes(q)
    })
  }, [countries, query, locale])

  const chipCountries = query.trim() ? filteredCountries.slice(0, 24) : popularCountries

  const activeCountry =
    selectedCountry && countries.some((c) => c.code === selectedCountry) ? selectedCountry : null

  const activePackages = activeCountry
    ? (countries.find((c) => c.code === activeCountry)?.packages ?? [])
    : []

  if (pricing.status === 'loading' || pricing.status === 'idle') {
    return (
      <div className={styles.root} aria-busy="true">
        <div className={styles.panel}>
          <p className={styles.status}>{t('esimPage.pricing.loading')}</p>
        </div>
      </div>
    )
  }

  if (pricing.status === 'error' || !catalog || countries.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.panel}>
          <p className={styles.status}>{t('esimPage.pricing.unavailable')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {pricing.updateAvailable ? (
        <div className={styles.banner} role="status">
          <span>{t('esimPage.pricing.updatedBanner')}</span>
          <button type="button" className={styles.bannerBtn} onClick={pricing.acknowledgeReload}>
            {t('esimPage.pricing.refresh')}
          </button>
        </div>
      ) : null}

      {pricing.stale ? <p className={styles.stale}>{t('esimPage.pricing.stale')}</p> : null}

      <div className={styles.panel}>
        {catalog.markets.length > 1 && market ? (
          <label className={styles.marketRow}>
            <span className={styles.fieldLabel}>{t('esimPage.pricing.marketLabel')}</span>
            <select
              className={styles.select}
              value={market.customerCountry}
              onChange={(e) => {
                setMarketCode(e.target.value)
                setSelectedCountry(null)
              }}
            >
              {catalog.markets.map((m) => (
                <option key={m.customerCountry} value={m.customerCountry}>
                  {m.customerCountry} · {m.currency}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className={styles.searchRow}>
          <span className={styles.fieldLabel}>{t('esimPage.pricing.searchLabel')}</span>
          <input
            className={styles.search}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={String(t('esimPage.pricing.searchCountry'))}
          />
        </label>

        <ul className={styles.countryList} role="listbox" aria-label={t('esimPage.pricing.searchLabel')}>
          {chipCountries.map((c) => {
            const active = c.code === activeCountry
            return (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`${styles.countryBtn} ${active ? styles.countryBtnActive : ''}`}
                  onClick={() => setSelectedCountry(c.code)}
                >
                  <span className={styles.flag} aria-hidden="true">
                    {flagEmoji(c.code)}
                  </span>
                  <span>{countryLabel(c.code, locale)}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {!activeCountry ? (
          <p className={styles.empty}>{t('esimPage.pricing.startWithCountry')}</p>
        ) : activePackages.length === 0 ? (
          <p className={styles.empty}>{t('esimPage.pricing.noMatchingPlans')}</p>
        ) : (
          <ul className={styles.packageList}>
            {activePackages.map((pkg) => {
              const price = formatPriceForLocale(pkg, catalog.markets, locale)
              if (price === null) return null
              return (
                <li key={pkg.id} className={styles.packageRow}>
                  <div className={styles.packageMain}>
                    <h3 className={styles.packageName}>{formatPackageTitle(pkg, locale, t)}</h3>
                    <p className={styles.packageMeta}>
                      {t('esimPage.pricing.data')}: {formatDataBytes(pkg.dataBytes, locale)}
                      {' · '}
                      {t('esimPage.pricing.days', { count: pkg.durationDays })}
                      {pkg.networkTypes.length
                        ? ` · ${t('esimPage.pricing.networks')}: ${pkg.networkTypes.join(', ')}`
                        : null}
                      {pkg.supportsTopUp ? ` · ${t('esimPage.pricing.topUpYes')}` : null}
                    </p>
                  </div>
                  <div className={styles.packageSide}>
                    <p className={styles.price}>{price}</p>
                    {purchaseHref.startsWith('http') ? (
                      <a
                        href={purchaseHref}
                        className={styles.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={String(t('esimPage.pricing.buyCta'))}
                      >
                        <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <Link
                        to={purchaseHref}
                        className={styles.buyLink}
                        aria-label={String(t('esimPage.pricing.buyCta'))}
                      >
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        <p className={styles.panelNote}>{t('esimPage.pricing.finalPriceNote')}</p>
      </div>

      <p className={styles.disclaimer}>{t('esimPage.pricing.priceDisclaimer')}</p>
    </div>
  )
}
