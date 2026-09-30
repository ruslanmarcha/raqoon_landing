import { memo, useCallback, useMemo, useState, type MouseEvent } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import isoNumericToAlpha2 from '../../lib/esimPricing/isoNumericToAlpha2.json'
import styles from './DestinationMap.module.css'

const GEO_URL = '/geo/countries-110m.json'

const NUMERIC_TO_ALPHA2 = isoNumericToAlpha2 as Record<string, string>

type DestinationMapProps = {
  availableCodes: string[]
  selectedCode: string | null
  onSelect: (code: string) => void
  countryName: (code: string) => string
  label: string
}

type TipState = {
  code: string
  name: string
  flag: string
  x: number
  y: number
}

function alpha2FromGeo(geo: { id?: string | number }): string | null {
  if (geo.id == null) return null
  const key = String(geo.id)
  return NUMERIC_TO_ALPHA2[key] ?? NUMERIC_TO_ALPHA2[key.padStart(3, '0')] ?? null
}

function flagEmoji(code: string): string {
  const upper = code.toUpperCase()
  if (!/^[A-Z]{2}$/.test(upper)) return ''
  const base = 0x1f1e6
  return String.fromCodePoint(...[...upper].map((ch) => base + ch.charCodeAt(0) - 65))
}

function DestinationMapComponent({
  availableCodes,
  selectedCode,
  onSelect,
  countryName,
  label,
}: DestinationMapProps) {
  const [tip, setTip] = useState<TipState | null>(null)

  const available = useMemo(() => {
    const set = new Set<string>()
    for (const code of availableCodes) {
      if (/^[A-Za-z]{2}$/.test(code)) set.add(code.toUpperCase())
    }
    return set
  }, [availableCodes])

  const selected = selectedCode?.toUpperCase() ?? null

  const moveTip = useCallback(
    (event: MouseEvent<SVGPathElement>, code: string) => {
      const well = event.currentTarget.closest(`.${styles.well}`)
      if (!(well instanceof HTMLElement)) return
      const rect = well.getBoundingClientRect()
      const x = Math.min(Math.max(16, event.clientX - rect.left), rect.width - 16)
      const y = Math.min(Math.max(16, event.clientY - rect.top), rect.height - 8)
      setTip({
        code,
        name: countryName(code),
        flag: flagEmoji(code),
        x,
        y,
      })
    },
    [countryName],
  )

  const clearTip = useCallback(() => setTip(null), [])

  return (
    <section className={styles.root} aria-label={label}>
      <div className={styles.well} onMouseLeave={clearTip}>
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 147, center: [0, 0] }}
          width={800}
          height={400}
          className={styles.map}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code = alpha2FromGeo(geo)
                const isAvailable = Boolean(code && available.has(code))
                const isSelected = Boolean(code && selected === code)
                const name =
                  code ? countryName(code) : ((geo.properties?.name as string | undefined) ?? '')

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={isAvailable ? 0 : -1}
                    role={isAvailable ? 'button' : undefined}
                    aria-label={code ? name : undefined}
                    aria-pressed={isAvailable ? isSelected : undefined}
                    className={[
                      styles.geo,
                      isAvailable ? styles.available : '',
                      isSelected ? styles.selected : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onMouseEnter={(event) => {
                      if (!code) return
                      moveTip(event, code)
                    }}
                    onMouseMove={(event) => {
                      if (!code) return
                      moveTip(event, code)
                    }}
                    onMouseLeave={clearTip}
                    onFocus={(event) => {
                      if (!code || !(event.currentTarget instanceof SVGPathElement)) return
                      const well = event.currentTarget.closest(`.${styles.well}`)
                      if (!(well instanceof HTMLElement)) return
                      const pathBox = event.currentTarget.getBoundingClientRect()
                      const wellBox = well.getBoundingClientRect()
                      setTip({
                        code,
                        name: countryName(code),
                        flag: flagEmoji(code),
                        x: pathBox.left + pathBox.width / 2 - wellBox.left,
                        y: pathBox.top - wellBox.top,
                      })
                    }}
                    onBlur={clearTip}
                    onClick={() => {
                      if (code && isAvailable) onSelect(code)
                    }}
                    onKeyDown={(event) => {
                      if (!code || !isAvailable) return
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onSelect(code)
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>

        {tip ? (
          <div
            className={styles.tip}
            style={{
              left: tip.x,
              top: tip.y,
            }}
            role="tooltip"
          >
            <span className={styles.tipFlag} aria-hidden="true">
              {tip.flag}
            </span>
            <span className={styles.tipName}>{tip.name}</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export const DestinationMap = memo(DestinationMapComponent)
