/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production site origin, no trailing slash (e.g. https://raqoon.app). Used for canonical URLs, OG images, and sitemap. */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
