/** Human-readable data volume from `dataBytes` (1024-based units). */
export function formatDataBytes(dataBytes: number, locale = 'en'): string {
  if (!Number.isFinite(dataBytes) || dataBytes < 0) return '—'

  const gb = dataBytes / (1024 ** 3)
  if (gb >= 1) {
    const rounded = gb >= 10 ? Math.round(gb) : Math.round(gb * 10) / 10
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(rounded)} GB`
  }

  const mb = dataBytes / (1024 ** 2)
  if (mb >= 1) {
    const rounded = mb >= 10 ? Math.round(mb) : Math.round(mb * 10) / 10
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(rounded)} MB`
  }

  const kb = dataBytes / 1024
  if (kb >= 1) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(kb))} KB`
  }

  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(dataBytes)} B`
}
