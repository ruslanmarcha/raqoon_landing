/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production site origin, no trailing slash (e.g. https://raqoon.app). Used for canonical URLs, OG images, and sitemap. */
  readonly VITE_SITE_URL?: string
  /** Google Analytics 4 measurement ID (default G-1S5CS8CFVZ). */
  readonly VITE_GTAG_ID?: string
  /** Dev only: set to "1" to simulate EU visitor (consent banner). */
  readonly VITE_DEV_FORCE_EU?: string
  /** When `"true"`, visitors from Türkiye (geo TR) are limited to /turkiye only. */
  readonly VITE_ENABLE_TURKEY_GEOLOCK?: string
  /** URL Google Apps Script Web App (или другой POST webhook) для заявок `/beta`. */
  readonly VITE_BETA_WEBHOOK_URL?: string
  /** Публичный FAQ Support: тот же хост, что и портал, + `/api/public` без хвостового слэша (прод: `https://help.raqoon.app/api/public`). */
  readonly VITE_SUPPORT_PUBLIC_API_BASE?: string
  /** Клиентский портал — страница входа (прод: `https://help.raqoon.app/support/login`). */
  readonly VITE_CLIENT_PORTAL_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
