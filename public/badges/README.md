# Store badges

## Apple (local SVG)

Bundled from Apple’s marketing guidelines (US/UK English black badge):

| File | Source |
|------|--------|
| `app-store.svg` | [badge-download-on-the-app-store.svg](https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg) |
| `mac-app-store.svg` | [badge-download-on-the-mac-app-store.svg](https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-mac-app-store.svg) |

Localized “Download on the …” artwork is only in Apple’s **Marketing Resources** ZIP (see App Store marketing guidelines). To add RU/DE/…, replace or add files here and wire them in `src/utils/storeBadgeUrls.ts`.

## Google Play (CDN)

The app **does not** ship a `google-play.png` file. The download page picks the official badge **language** from `i18n` and loads the matching PNG from `play.google.com` (see `getGooglePlayBadgeUrl()` in `src/utils/storeBadgeUrls.ts`).

Follow [Google Play badge guidelines](https://play.google.com/intl/en_us/badges/).
