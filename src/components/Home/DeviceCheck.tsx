import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import devices from '../../data/esimDevices.json'
import styles from './DeviceCheck.module.css'

type Model = {
  id: string
  name: string
  compatible: boolean
  regional?: boolean
}

type Manufacturer = {
  id: string
  name: string
  models: Model[]
}

const catalog = devices as {
  source?: string
  manufacturers: Manufacturer[]
}

type Props = {
  onCompatibleCta?: () => void
  variant?: 'default' | 'compact'
}

export function DeviceCheck({ onCompatibleCta, variant = 'default' }: Props) {
  const { t } = useTranslation()
  const [makerId, setMakerId] = useState('')
  const [modelId, setModelId] = useState('')
  const [query, setQuery] = useState('')

  const maker = useMemo(
    () => catalog.manufacturers.find((m) => m.id === makerId) ?? null,
    [makerId],
  )

  const models = useMemo(() => {
    if (!maker) return []
    const q = query.trim().toLowerCase()
    if (!q) return maker.models
    return maker.models.filter((m) => m.name.toLowerCase().includes(q))
  }, [maker, query])

  const model = useMemo(
    () => maker?.models.find((m) => m.id === modelId) ?? null,
    [maker, modelId],
  )

  const compact = variant === 'compact'

  return (
    <div className={`${styles.panel} ${compact ? styles.compact : ''}`}>
      {!compact ? (
        <div className={styles.head}>
          <p className={styles.badge}>{t('esimPage.device.badge')}</p>
          <p className={styles.count}>
            {t('esimPage.device.count', {
              count: catalog.manufacturers.reduce((n, m) => n + m.models.length, 0),
            })}
          </p>
        </div>
      ) : null}
      <h3 className={styles.title}>
        {compact ? t('esimPage.device.titleShort') : t('esimPage.device.title')}
      </h3>
      <p className={styles.sub}>
        {compact ? t('esimPage.device.subtitleShort') : t('esimPage.device.subtitle')}
      </p>

      <div className={`${styles.fields} ${compact ? styles.fieldsRow : ''}`}>
        <label className={styles.field}>
          <span>{t('esimPage.device.manufacturer')}</span>
          <select
            value={makerId}
            onChange={(e) => {
              setMakerId(e.target.value)
              setModelId('')
              setQuery('')
            }}
          >
            <option value="">{t('esimPage.device.pickMaker')}</option>
            {catalog.manufacturers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>{t('esimPage.device.model')}</span>
          {!compact ? (
            <input
              type="search"
              value={query}
              disabled={!maker}
              placeholder={
                maker ? String(t('esimPage.device.searchModel')) : String(t('esimPage.device.needMaker'))
              }
              onChange={(e) => setQuery(e.target.value)}
            />
          ) : null}
          <select
            value={modelId}
            disabled={!maker}
            onChange={(e) => setModelId(e.target.value)}
          >
            <option value="">
              {maker ? t('esimPage.device.pickModel') : t('esimPage.device.needMaker')}
            </option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {model ? (
        <div
          className={`${styles.result} ${model.compatible ? styles.ok : styles.no}`}
          role="status"
        >
          <p>
            {model.compatible
              ? model.regional
                ? t('esimPage.device.regional')
                : t('esimPage.device.compatible')
              : t('esimPage.device.incompatible')}
          </p>
          {model.compatible && onCompatibleCta ? (
            <button type="button" className={styles.cta} onClick={onCompatibleCta}>
              {t('esimPage.hero.ctaCountry')}
            </button>
          ) : null}
          {!compact ? <p className={styles.note}>{t('esimPage.device.disclaimer')}</p> : null}
        </div>
      ) : null}
    </div>
  )
}
