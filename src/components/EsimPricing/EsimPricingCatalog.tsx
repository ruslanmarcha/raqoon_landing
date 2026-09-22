import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocalePolicy } from '../../contexts/LocalePolicyContext'
import { filterTurkeyDestinationSims } from '../../lib/esimPricing/filterTurkeySims'
import { formatDataBytes } from '../../lib/esimPricing/formatDataBytes'
import { formatPrice } from '../../lib/esimPricing/formatPrice'
import { useEsimPricing } from '../../lib/esimPricing/useEsimPricing'
import type { Market, Package } from '../../lib/esimPricing/types'
import styles from './EsimPricingCatalog.module.css'

const PURCHASE_HREF = '/download'

type CountryOption = {
  code: string
  packages: Package[]
}

function resolveMarket(markets: Market[], preferred: string | null): Market | null {
  if (!markets.length) return null
  if (preferred) {
    const match = markets.find((m) => m.customerCountry === preferred)
    if (match) return match
  }
  return markets.find((m) => m.customerCountry === 'RU') ?? markets[0]
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

  const catalog = useMemo(() => {
    if (!pricing.data) return null
    return filterTurkeyDestinationSims(pricing.data, countryCode)
  }, [pricing.data, countryCode])

  const market = useMemo(() => {
    if (!catalog) return null
    return resolveMarket(catalog.markets, marketCode)
  }, [catalog, marketCode])

  const countries = useMemo((): CountryOption[] => {
    if (!catalog || !market) return []
    return catalog.countries
      .map((group) => ({
        code: group.code,
        packages: group.packages.filter(
          (pkg) => pkg.prices[market.customerCountry] !== undefined,
        ),
      }))
      .filter((group) => group.packages.length > 0)
      .sort((a, b) =>
        countryLabel(a.code, locale).localeCompare(countryLabel(b.code, locale), locale),
      )
  }, [catalog, market, locale])

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return countries
    return countries.filter((c) => {
      const label = countryLabel(c.code, locale).toLowerCase()
      return label.includes(q) || c.code.toLowerCase().includes(q)
    })
  }, [countries, query, locale])

  const activeCountry =
    selectedCountry && filteredCountries.some((c) => c.code === selectedCountry)
      ? selectedCountry
      : filteredCountries[0]?.code ?? null

  const activePackages =
    filteredCountries.find((c) => c.code === activeCountry)?.packages ?? []

  if (pricing.status === 'loading' || pricing.status === 'idle') {
    return (
      <div className={styles.root} aria-busy="true">
        <div className={styles.panel}>
          <p className={styles.status}>{t('esimPage.pricing.loading')}</p>
        </div>
      </div>
    )
  }

  if (pricing.status === 'error' || !catalog || !market || countries.length === 0) {
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
        {catalog.markets.length > 1 ? (
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
          <span className={styles.visuallyHidden}>{t('esimPage.pricing.searchCountry')}</span>
          <input
            className={styles.search}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={String(t('esimPage.pricing.searchCountry'))}
          />
        </label>

        <ul className={styles.countryList} role="listbox" aria-label={t('esimPage.pricing.searchCountry')}>
          {filteredCountries.map((c) => {
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

        <ul className={styles.packageList}>
          {activePackages.map((pkg) => {
            const price = formatPrice(pkg, market, locale)
            if (price === null) return null
            return (
              <li key={pkg.id} className={styles.packageRow}>
                <div className={styles.packageMain}>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
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
                  <Link to={purchaseHref} className={styles.buyLink}>
                    {t('esimPage.pricing.buyCta')}
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <p className={styles.disclaimer}>{t('esimPage.pricing.priceDisclaimer')}</p>
    </div>
  )
}
