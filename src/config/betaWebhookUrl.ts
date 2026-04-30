/**
 * Резервный URL приёма заявок бета (Google Apps Script Web App).
 * `VITE_BETA_WEBHOOK_URL` в .env / на Vercel переопределяет его при сборке.
 */
const DEFAULT_BETA_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx1g_Emgrac582voXB3iUktbljahQNLR1iPjNX-ZjEOZP7F1ivmdpol70zzZO6MrvU/exec'

export function getBetaWebhookUrl(): string {
  const fromEnv = (import.meta.env.VITE_BETA_WEBHOOK_URL ?? '').trim()
  return fromEnv || DEFAULT_BETA_WEBHOOK_URL
}
