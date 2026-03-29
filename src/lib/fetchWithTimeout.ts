/** Avoid indefinite hang on geo/IP calls (Safari can stall longer than Chrome on blocked third-party fetches). */
export function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 6000,
): Promise<Response> {
  if (typeof AbortController === 'undefined') {
    return fetch(input, init)
  }
  const controller = new AbortController()
  const id = window.setTimeout(() => controller.abort(), timeoutMs)
  return fetch(input, { ...init, signal: controller.signal }).finally(() => {
    window.clearTimeout(id)
  })
}
