import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

export type BetaPlatform = 'ios' | 'android'

export type BetaPayload = {
  email: string
  raccoonId: string
  platform: BetaPlatform
  submittedAt: string
}

export type BetaSubmitResult =
  | { ok: true }
  | { ok: false; error: 'network' | 'server' | 'not_configured' }

/**
 * POST JSON на URL из VITE_BETA_WEBHOOK_URL (например Google Apps Script Web App).
 * Скрипт должен принять JSON и записать строку в Google Sheets + вернуть 200.
 */
export async function submitBetaApplication(payload: BetaPayload): Promise<BetaSubmitResult> {
  const url = (import.meta.env.VITE_BETA_WEBHOOK_URL ?? '').trim()
  if (!url) {
    return { ok: false, error: 'not_configured' }
  }

  try {
    const res = await fetchWithTimeout(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      },
      15000,
    )
    if (res.ok) {
      return { ok: true }
    }
    return { ok: false, error: 'server' }
  } catch {
    return { ok: false, error: 'network' }
  }
}
