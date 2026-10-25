import type { Currency } from './types'
import { isCurrency } from './money'

export const DISPLAY_CURRENCY_KEY = 'raqoon_esim_display_currency'
/** Catalog default per ESIM-95 §6 — independent of buyer market and UI locale. */
export const DEFAULT_DISPLAY_CURRENCY: Currency = 'USD'

function storage(): Storage | null {
  try {
    const candidate = (globalThis as { localStorage?: Storage }).localStorage
    return candidate ?? null
  } catch {
    return null
  }
}

export function readStoredDisplayCurrency(): Currency | null {
  const store = storage()
  if (!store) return null
  try {
    const raw = store.getItem(DISPLAY_CURRENCY_KEY)
    return isCurrency(raw) ? raw : null
  } catch {
    return null
  }
}

export function saveDisplayCurrency(currency: Currency): void {
  const store = storage()
  if (!store) return
  try {
    store.setItem(DISPLAY_CURRENCY_KEY, currency)
  } catch {
    /* ignore quota / private mode */
  }
}

export function preferredDisplayCurrency(): Currency {
  return readStoredDisplayCurrency() ?? DEFAULT_DISPLAY_CURRENCY
}
