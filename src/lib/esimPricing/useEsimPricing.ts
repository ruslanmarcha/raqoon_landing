import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchPricing } from './fetchPricing'
import type { Pricing } from './types'

const POLL_MS = 5 * 60 * 1000
const BACKOFF_MIN_MS = 30_000
const BACKOFF_MAX_MS = 60_000

export type EsimPricingStatus = 'idle' | 'loading' | 'ready' | 'error'

export type UseEsimPricingResult = {
  status: EsimPricingStatus
  data: Pricing | null
  etag: string | null
  displayedVersion: string | null
  updateAvailable: boolean
  stale: boolean
  error: string | null
  refresh: () => Promise<void>
  acknowledgeReload: () => void
}

function nextBackoff(prev: number): number {
  if (prev <= 0) return BACKOFF_MIN_MS
  return Math.min(BACKOFF_MAX_MS, Math.round(prev * 1.5))
}

/**
 * Load + poll public pricing. On new `version`, set updateAvailable and keep displayed snapshot frozen.
 */
export function useEsimPricing(): UseEsimPricingResult {
  const [status, setStatus] = useState<EsimPricingStatus>('idle')
  const [data, setData] = useState<Pricing | null>(null)
  const [etag, setEtag] = useState<string | null>(null)
  const [displayedVersion, setDisplayedVersion] = useState<string | null>(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [stale, setStale] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const etagRef = useRef<string | null>(null)
  const dataRef = useRef<Pricing | null>(null)
  const displayedVersionRef = useRef<string | null>(null)
  const inFlightRef = useRef(false)
  const backoffRef = useRef(0)
  const validUntilTimerRef = useRef<number | null>(null)
  const pollTimerRef = useRef<number | null>(null)
  const mountedRef = useRef(true)

  const clearValidUntilTimer = () => {
    if (validUntilTimerRef.current != null) {
      window.clearTimeout(validUntilTimerRef.current)
      validUntilTimerRef.current = null
    }
  }

  const scheduleValidUntilCheck = useCallback((validUntilIso: string, revalidate: () => void) => {
    clearValidUntilTimer()
    const until = Date.parse(validUntilIso)
    if (!Number.isFinite(until)) return

    const delay = Math.max(0, until - Date.now())
    validUntilTimerRef.current = window.setTimeout(() => {
      revalidate()
    }, delay === 0 ? backoffRef.current || BACKOFF_MIN_MS : delay)
  }, [])

  const load = useCallback(
    async (opts?: { background?: boolean }) => {
      if (inFlightRef.current) return
      inFlightRef.current = true

      const background = opts?.background === true
      if (!background && !dataRef.current) {
        setStatus('loading')
      }

      try {
        const result = await fetchPricing(etagRef.current ?? undefined)
        if (!mountedRef.current) return

        if (result.kind === 'unchanged') {
          setError(null)
          backoffRef.current = 0
          if (dataRef.current) {
            setStale(false)
            scheduleValidUntilCheck(dataRef.current.validUntil, () => {
              void load({ background: true })
            })
          }
          return
        }

        const next = result.data
        if (result.etag) {
          etagRef.current = result.etag
          setEtag(result.etag)
        }

        const currentVersion = displayedVersionRef.current
        if (currentVersion && next.version !== currentVersion) {
          setUpdateAvailable(true)
          backoffRef.current = 0
          setError(null)
          // Keep displayed data frozen; still track etag for subsequent polls.
          return
        }

        dataRef.current = next
        displayedVersionRef.current = next.version
        setData(next)
        setDisplayedVersion(next.version)
        setStatus('ready')
        setStale(false)
        setError(null)
        setUpdateAvailable(false)
        backoffRef.current = 0
        scheduleValidUntilCheck(next.validUntil, () => {
          void load({ background: true })
        })
      } catch (err) {
        if (!mountedRef.current) return
        const message = err instanceof Error ? err.message : 'Pricing unavailable'
        setError(message)
        backoffRef.current = nextBackoff(backoffRef.current)

        if (dataRef.current) {
          setStale(true)
          setStatus('ready')
          clearValidUntilTimer()
          validUntilTimerRef.current = window.setTimeout(() => {
            void load({ background: true })
          }, backoffRef.current)
        } else {
          setStatus('error')
        }
      } finally {
        inFlightRef.current = false
      }
    },
    [scheduleValidUntilCheck],
  )

  const refresh = useCallback(async () => {
    await load({ background: Boolean(dataRef.current) })
  }, [load])

  const acknowledgeReload = useCallback(() => {
    window.location.reload()
  }, [])

  useEffect(() => {
    mountedRef.current = true
    void load({ background: false })

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        void load({ background: true })
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    pollTimerRef.current = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        void load({ background: true })
      }
    }, POLL_MS)

    return () => {
      mountedRef.current = false
      document.removeEventListener('visibilitychange', onVisibility)
      if (pollTimerRef.current != null) {
        window.clearInterval(pollTimerRef.current)
        pollTimerRef.current = null
      }
      clearValidUntilTimer()
    }
  }, [load])

  return {
    status,
    data,
    etag,
    displayedVersion,
    updateAvailable,
    stale,
    error,
    refresh,
    acknowledgeReload,
  }
}
