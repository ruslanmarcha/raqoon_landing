const DEFAULT_CLIENT_PORTAL_URL = 'https://help.raqoon.app/support/login'

/** Клиентский портал (подписка, тикеты, FAQ). Переопределяется через `VITE_CLIENT_PORTAL_URL`. */
export function clientPortalUrl(): string {
  const fromEnv = import.meta.env.VITE_CLIENT_PORTAL_URL?.trim()
  return fromEnv || DEFAULT_CLIENT_PORTAL_URL
}
