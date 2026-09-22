import { useEffect, useId, useState, type CSSProperties, type KeyboardEvent } from 'react'
import styles from './EsimPlanSelector.module.css'

type Dim = 'duration' | 'data'

type EsimPlanSelectorProps = {
  durationSteps: number[]
  dataSteps: number[]
  durationIndex: number
  dataIndex: number
  onDurationIndex: (index: number) => void
  onDataIndex: (index: number) => void
  formatDurationValue: (days: number) => string
  formatDataValue: (bytes: number) => string
  durationLabel: string
  dataLabel: string
  durationColor?: string
  dataColor?: string
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function Chevron() {
  return (
    <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2.5 4.5 L6 8 L9.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M2.5 7.5 L5.5 10.5 L11.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EsimPlanSelector({
  durationSteps,
  dataSteps,
  durationIndex,
  dataIndex,
  onDurationIndex,
  onDataIndex,
  formatDurationValue,
  formatDataValue,
  durationLabel,
  dataLabel,
  durationColor = '#4b9bff',
  dataColor = 'var(--color-accent)',
}: EsimPlanSelectorProps) {
  const reactId = useId()
  const [openMenu, setOpenMenu] = useState<Dim | null>(null)

  const durationValue = durationSteps[durationIndex] ?? durationSteps[0]
  const dataValue = dataSteps[dataIndex] ?? dataSteps[0]

  useEffect(() => {
    if (!openMenu) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest(`[data-picker-menu="${reactId}"]`)) return
      setOpenMenu(null)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu, reactId])

  const onSliderKey = (
    e: KeyboardEvent<HTMLInputElement>,
    _index: number,
    max: number,
    set: (i: number) => void,
  ) => {
    if (e.key === 'Home') {
      e.preventDefault()
      set(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      set(max)
    }
  }

  const renderDropdown = (
    kind: Dim,
    label: string,
    valueText: string,
    steps: number[],
    index: number,
    color: string,
    format: (v: number) => string,
    onPick: (i: number) => void,
  ) => {
    const open = openMenu === kind
    return (
      <div
        className={styles.dropdown}
        data-picker-menu={reactId}
        style={{ '--sel-accent': color } as CSSProperties}
      >
        <button
          type="button"
          className={styles.dropdownBtn}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpenMenu(open ? null : kind)}
        >
          <span className={styles.dropdownLabel}>{label}</span>
          <span className={styles.dropdownValueRow}>
            <span className={styles.dropdownValue}>{valueText}</span>
            <Chevron />
          </span>
        </button>
        {open ? (
          <ul className={styles.menu} role="listbox" aria-label={label}>
            {steps.map((step, i) => {
              const selected = i === index
              return (
                <li key={`${kind}-${step}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`${styles.menuItem} ${selected ? styles.menuItemActive : ''}`}
                    onClick={() => {
                      onPick(i)
                      setOpenMenu(null)
                    }}
                  >
                    <span>{format(step)}</span>
                    {selected ? <Check /> : null}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    )
  }

  const renderStrip = (
    _kind: Dim,
    label: string,
    steps: number[],
    index: number,
    color: string,
    valueText: string,
    onChange: (i: number) => void,
  ) => {
    if (!steps.length) return null
    const max = Math.max(0, steps.length - 1)
    const progress = max === 0 ? 1 : index / max
    return (
      <label
        className={styles.strip}
        style={{ '--sel-accent': color, '--sel-progress': String(progress) } as CSSProperties}
      >
        <span className={styles.stripHead}>
          <span className={styles.stripLabel}>{label}</span>
          <span className={styles.stripValue}>{valueText}</span>
        </span>
        <input
          className={styles.slider}
          type="range"
          min={0}
          max={max}
          step={1}
          value={clamp(index, 0, max)}
          disabled={steps.length < 2}
          aria-label={label}
          aria-valuetext={valueText}
          onChange={(e) => onChange(Number(e.target.value))}
          onKeyDown={(e) => onSliderKey(e, index, max, onChange)}
        />
      </label>
    )
  }

  if (!durationSteps.length) return null

  return (
    <div className={styles.root}>
      <div className={styles.dropdowns}>
        {renderDropdown(
          'duration',
          `1. ${durationLabel}`,
          durationValue != null ? formatDurationValue(durationValue) : '—',
          durationSteps,
          durationIndex,
          durationColor,
          formatDurationValue,
          onDurationIndex,
        )}
        {renderDropdown(
          'data',
          `2. ${dataLabel}`,
          dataValue != null ? formatDataValue(dataValue) : '—',
          dataSteps,
          dataIndex,
          dataColor,
          formatDataValue,
          onDataIndex,
        )}
      </div>

      <div className={styles.strips}>
        {renderStrip(
          'duration',
          durationLabel,
          durationSteps,
          durationIndex,
          durationColor,
          durationValue != null ? formatDurationValue(durationValue) : '—',
          onDurationIndex,
        )}
        {renderStrip(
          'data',
          dataLabel,
          dataSteps,
          dataIndex,
          dataColor,
          dataValue != null ? formatDataValue(dataValue) : '—',
          onDataIndex,
        )}
      </div>
    </div>
  )
}
