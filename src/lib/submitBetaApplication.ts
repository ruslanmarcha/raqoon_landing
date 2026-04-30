import { getBetaWebhookUrl } from '@/config/betaWebhookUrl'
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
 * POST JSON на webhook (Google Apps Script Web App).
 * URL: `VITE_BETA_WEBHOOK_URL` при сборке, иначе резерв в `src/config/betaWebhookUrl.ts`.
 */
export async function submitBetaApplication(payload: BetaPayload): Promise<BetaSubmitResult> {
  const url = getBetaWebhookUrl()
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
