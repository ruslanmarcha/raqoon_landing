import { clientPortalUrl } from './clientPortalUrl'

const POPUP_NAME = 'raqoonClientPortal'
const POPUP_FEATURES = 'popup=yes,width=480,height=760,scrollbars=yes,resizable=yes'

/** Открывает клиентский портал в отдельном окне (first-party cookies, в отличие от iframe на raqoon.app). */
export function openClientPortalPopup(url = clientPortalUrl()): Window | null {
  return window.open(url, POPUP_NAME, POPUP_FEATURES)
}

export const CLIENT_PORTAL_MESSAGE_ORIGINS = [
  'https://raqoon.qatlink.site',
  'https://qatlink.site',
  'http://localhost:9999',
  'http://127.0.0.1:9999',
] as const

export function isClientPortalMessageOrigin(origin: string): boolean {
  return (CLIENT_PORTAL_MESSAGE_ORIGINS as readonly string[]).includes(origin)
}
