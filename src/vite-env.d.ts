/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production site origin, no trailing slash (e.g. https://raqoon.app). Used for canonical URLs, OG images, and sitemap. */
  readonly VITE_SITE_URL?: string
  /** Google Analytics 4 measurement ID (default G-1S5CS8CFVZ). */
  readonly VITE_GTAG_ID?: string
  /** Dev only: set to "1" to simulate EU visitor (consent banner). */
  readonly VITE_DEV_FORCE_EU?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
