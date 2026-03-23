# Raqoon Landing Memory Bank

## Purpose
This file is a working memory bank for future agents and contributors. It explains how the project is structured, what each page/component does, which behaviors are intentional, and where changes are most likely to cause regressions.

## Project Snapshot
- Product: bilingual marketing landing for `Raqoon`
- Stack: `React 18` + `TypeScript` + `Vite`
- Routing: `react-router-dom` with SPA routing on Vercel
- Localization: `i18next` + `react-i18next` + browser language detector
- SEO: `react-helmet-async`
- Styling: global design tokens + `base.css` + CSS Modules
- Global state: one context for the coming-soon modal
- Canonical local project path: `/Users/ruslanmarchenko/Documents/GitHub/raqoon_landing/`

## Canonical Paths
- Project root: `package.json`, `vite.config.ts`, `tsconfig.json`, `vercel.json`, `index.html`
- App entry: `src/main.tsx`
- App shell and routes: `src/App.tsx`
- Locale setup: `src/i18n/index.ts`
- Locale content: `src/i18n/locales/ru.json`, `src/i18n/locales/en.json`
- Shared SEO: `src/seo/SEOHead.tsx`
- Shared modal state: `src/contexts/ComingSoonContext.tsx`
- Components: `src/components/*`
- Pages: `src/pages/*`

## Important Cleanup Note
The root currently contains duplicate-looking artifacts such as `node_modules 2`, `package 2.json`, `package-lock 2.json`, `tsconfig 2.json`, and `vite.config 2.ts`. Treat the normal filenames without ` 2` as canonical unless the user explicitly says otherwise.

## Product Rules That Must Stay True
- Russian-facing marketing copy uses `VPS`, not `VPN`.
- English-facing marketing copy uses `VPN`.
- `en.json` should contain English content only.
- `ru.json` should contain Russian content only.
- The `coming soon` modal is the current destination for purchase actions.
- The migration page is a special Russian-only page and intentionally hides the language switcher.
- Footer legal/about routes should keep the same general header/footer shell as the rest of the site.
- Direct navigation to client routes must work on Vercel via SPA rewrite config.

## Boot Flow
1. `src/main.tsx` imports i18n and global CSS, then mounts `<App />` inside `React.StrictMode`.
2. `src/App.tsx` wraps the app with:
   - `HelmetProvider`
   - `ComingSoonProvider`
   - `BrowserRouter`
   - `Suspense`
3. Routes render top-level pages directly. There is no shared layout component.

## Route Map
| Route | Component | Purpose | Notes |
| --- | --- | --- | --- |
| `/` | `LandingRU` | Main Russian landing | Composes hero, pricing, referral, FAQ |
| `/ww` | `LandingWW` | Main worldwide landing | Composes hero, features, FAQ |
| `/migration` | `MigrationRU` | IZI to Raqoon migration instructions | Hardcoded Russian copy, no language selector |
| `/about` | `AboutCompany` | About company page | Uses localized content and Yandex map URL |
| `/privacy` | `LegalPage` | Privacy policy | Uses `legal.privacy.*` locale keys |
| `/terms` | `LegalPage` | Terms of service | Uses `legal.terms.*` locale keys |
| `/contact` | `LegalPage` | Contact page | Uses `legal.contact.*` locale keys |
| `/refund` | `LegalPage` | Refund policy | Uses `legal.refund.*` locale keys |
| `*` | `NotFoundPage` | 404 page | Background paws image, returns to `/` |

## Routing and Language: Critical Behavior
This project separates route choice from language choice.

- The route controls which page composition is rendered.
- The current i18n language controls a lot of the actual text and some conditional UI.
- Because of this, route and visible copy can diverge if someone switches language manually.

Examples:
- `LandingRU` always renders the Russian landing structure, but text is still resolved through i18n.
- `LandingWW` always renders the worldwide landing structure, but text also depends on i18n.
- `Pricing` hides or shows some blocks based on the active i18n language, not the route prop.
- `SEOHead` also uses i18n language, not the passed `variant` prop.

If future work needs strict route-language coupling, that should be redesigned centrally. Right now the app is intentionally tolerant of route/language mismatch.

## Localization Model
Localization is configured in `src/i18n/index.ts`.

- Supported languages: `ru`, `en`
- Fallback language: `en`
- Detection order: `localStorage`, then browser `navigator`
- Local storage key: `raqoon_lang`

### Locale Key Conventions
- Russian SEO and hero keys use `*RU` suffixes in `ru.json`
- English SEO and hero keys use `*WW` suffixes in `en.json`
- Many other sections use unsuffixed shared keys like `faq.title`, `about.title`, `footer.about`

### Top-Level Locale Sections
- `meta`
- `nav`
- `hero`
- `features`
- `pricing`
- `migration`
- `referral`
- `faq`
- `common`
- `about`
- `legal`
- `notFound`
- `footer`
- `lang`

### High-Risk Locale Rules
- Keep RU-only vocabulary in `ru.json`: `VPS`, `Raqoon VPS`, `Raqoon VPS` SEO naming.
- Keep EN-only vocabulary in `en.json`: `VPN`, `Raqoon VPN`.
- `legal.privacy.body` is multiline text and is rendered with preserved line breaks.
- If a key is missing in `ru.json`, i18n can fall back to English. That can accidentally reintroduce English content into Russian screens.

## SEO Model
`src/seo/SEOHead.tsx` handles:
- `<html lang>`
- document `<title>`
- description
- robots
- Open Graph
- Twitter card
- optional canonical URL

Important details:
- `SEOHead` accepts `variant`, but the prop is currently ignored with `void variant`.
- SEO strings are resolved from current i18n language:
  - RU -> `meta.*RU`
  - EN -> `meta.*WW`
- Site name also changes by language:
  - RU -> `Raqoon VPS`
  - EN -> `Raqoon VPN`

Known inconsistency:
- `SEOHead` points `og:image` to `/og-image.png`
- `public/` currently contains `og-image.jpg`
- This mismatch should be kept in mind before any SEO or share-preview debugging

## Global Styling System
Global styles are loaded in `src/main.tsx`.

- `src/design-system/tokens.css` defines colors, typography, spacing, radii, shadows, transitions, and layout variables.
- `src/design-system/base.css` defines reset styles and global utility classes.

### Important Global Utilities
- `.container`
- `.section`
- `.btn`
- `.btn-primary`
- `.btn-secondary`
- `.btn-outline`
- `.btn-ghost`
- `.btn-lg`
- `.card`
- `.sr-only`

### Layout Defaults
- Max content width comes from `--container-max: 600px`
- Mobile breakpoint is effectively `768px`
- Font family is `TikTok Sans`

## Public Assets
Assets currently present in `public/`:
- `apple-touch-icon.png`
- `apple.svg`
- `check.svg`
- `constructor.png`
- `eyes.png`
- `favicon-32x32.png`
- `favicon.png`
- `gift.png`
- `logo.png`
- `mascot.png`
- `og-image.jpg`
- `paws-bg.png`
- `spark.svg`

### Asset Path Caveat
Some components use root-relative paths like `/logo.png`, which is safe.
Some components use relative paths like `apple.svg`, `constructor.png`, and `logo.png`, which are more fragile if route nesting changes.

## Component Inventory

### `Header`
- File: `src/components/Header/Header.tsx`
- Props: `showLanguageSelector?: boolean`
- Role: site header with logo and optional language switcher
- Depends on:
  - `LanguageSelector`
  - `nav.logoAlt` locale key
- Caveat:
  - Logo uses raw `<a href="/">`, which forces full navigation instead of SPA `Link`

### `LanguageSelector`
- File: `src/components/LanguageSelector/LanguageSelector.tsx`
- Props: `className?: string`
- Role: toggles `ru` and `en` via `i18n.changeLanguage`
- Behavior:
  - Accepts only `ru`/`en`
  - Falls back to `en` if `i18n.language` is something unexpected like `en-US`
- Caveat:
  - This keeps UI stable, but it can hide regional language variants from the control

### `Hero`
- File: `src/components/Hero/Hero.tsx`
- Props: `variant: 'ru' | 'ww'`
- Role: main hero section with mascot, title, subtitle, CTA
- Data source:
  - Reads text from `hero.titleRU` / `hero.titleWW` and related keys
- Behavior:
  - Splits title on `\n` to insert line breaks
  - Opens coming-soon modal on CTA click
  - `variant` changes CTA presentation:
    - `ru` -> plain CTA button
    - `ww` -> App Store button with Apple icon
- Caveat:
  - Text suffix comes from current i18n language, not `variant`
  - Apple icon path is relative (`apple.svg`)

### `Pricing`
- File: `src/components/Pricing/Pricing.tsx`
- Props: `variant?: 'ru' | 'ww'`
- Role: pricing cards and migration promo strip
- Data source:
  - `pricing.constructor.*`
  - `pricing.allIn.*`
  - `pricing.constructorFeatures`
  - `pricing.allInFeatures`
  - `migration.*`
- Behavior:
  - Purchase buttons open coming-soon modal
  - Constructor plan and migration strip render only when active language starts with `ru`
  - All Inclusive card is always shown
  - Splits `allInFeatures` into one highlighted top item and the rest
- Caveats:
  - `variant` is intentionally ignored with `void variant`
  - Constructor and logo asset paths are relative (`constructor.png`, `logo.png`)
  - If someone reuses `Pricing` elsewhere, visibility depends on language, not page route

### `FeaturesCard`
- File: `src/components/FeaturesCard/FeaturesCard.tsx`
- Props: none
- Role: card-style feature list for worldwide landing
- Data source:
  - `features.items`
- Depends on:
  - `FeatureList`
- Caveat:
  - Decorative image is `/eyes.png`

### `FeatureList`
- File: `src/components/FeatureList/FeatureList.tsx`
- Props:
  - `items: FeatureItemData[]`
  - `topItems?: FeatureItemData[]`
  - `className?: string`
- Role: renders either a simple list or a split list with top highlighted items
- Depends on:
  - `FeatureItem`
- Behavior:
  - If `topItems` is present, renders a top list with `/spark.svg` icons and a divider

### `FeatureItem`
- File: `src/components/FeatureItem/FeatureItem.tsx`
- Props:
  - `item`
  - `icon?`
  - `centered?`
- Role: renders one feature row
- Data model:
  - `label`
  - optional `sub`
- Default icon: `/check.svg`

### `FAQ`
- File: `src/components/FAQ/FAQ.tsx`
- Props: none
- Role: accordion for common questions
- Data source:
  - `faq.title`
  - `faq.items`
- Behavior:
  - First item is open by default
  - Tracks open item index in local state

### `Referral`
- File: `src/components/Referral/Referral.tsx`
- Props: none
- Role: referral promo section on the Russian landing
- Data source:
  - `referral.title`
  - `referral.description`
  - `referral.cta`
- Behavior:
  - Splits title on `\n`
- Caveat:
  - CTA button currently has no click handler or link

### `Footer`
- File: `src/components/Footer/Footer.tsx`
- Props: none
- Role: footer with brand, legal/about links, copyright
- Data source:
  - `footer.*`
  - `nav.logoAlt`
- Depends on:
  - `react-router-dom` `Link`
- Caveat:
  - Footer logo always links to `/`, not conditionally to `/ww`

### `Popup`
- File: `src/components/Popup/Popup.tsx`
- Props:
  - `open`
  - `onClose`
  - `children`
- Role: generic modal shell
- Behavior:
  - Returns `null` when closed
  - Closes on backdrop mouse down
- Styling:
  - Uses opaque modal surface in `Popup.module.css`

### `ComingSoonModal`
- File: `src/components/ComingSoonModal/ComingSoonModal.tsx`
- Props:
  - `open`
  - `onClose`
- Role: specialized popup content for the coming-soon flow
- Data source:
  - `common.comingSoonMessage`
  - `common.comingSoonOk`
- Depends on:
  - `Popup`

## Global Context

### `ComingSoonContext`
- File: `src/contexts/ComingSoonContext.tsx`
- Exposes:
  - `openComingSoon()`
- Role: single shared state for the coming-soon modal
- Behavior:
  - Provider renders children plus one `ComingSoonModal`
  - `useComingSoon()` throws if called outside provider

## Page Inventory

### `LandingRU`
- File: `src/pages/LandingRU.tsx`
- Composition:
  - `SEOHead`
  - `Header`
  - `Hero variant="ru"`
  - `Pricing variant="ru"`
  - `Referral`
  - `FAQ`
  - `Footer`
- Role: main Russian route shell

### `LandingWW`
- File: `src/pages/LandingWW.tsx`
- Composition:
  - `SEOHead`
  - `Header`
  - `Hero variant="ww"`
  - `FeaturesCard`
  - `FAQ`
  - `Footer`
- Role: worldwide route shell

### `MigrationRU`
- File: `src/pages/MigrationRU.tsx`
- Role: migration instructions for former IZI users
- Behavior:
  - scrolls to top on mount
  - hides language switcher via `showLanguageSelector={false}`
- Content:
  - hardcoded Russian text
  - links to `https://t.me/raqoonbot`
- Caveat:
  - not localized through i18n

### `AboutCompany`
- File: `src/pages/AboutCompany.tsx`
- Role: company info page
- Behavior:
  - scrolls to top on mount
  - computes `variant` from i18n language for SEO call
- Data source:
  - `about.*`
- Content:
  - company name
  - address
  - mailto link
  - key points
  - Yandex map iframe URL from locale

### `LegalPage`
- File: `src/pages/LegalPage.tsx`
- Props: `legalKey: 'privacy' | 'terms' | 'contact' | 'refund'`
- Role: reusable page for legal/contact content
- Behavior:
  - scrolls to top on mount
  - reuses `AboutCompany.module.css`
- Data source:
  - `legal.{key}.title`
  - `legal.{key}.body`
- Caveat:
  - multiline legal text depends on `.legalText { white-space: pre-line; }`

### `NotFoundPage`
- File: `src/pages/NotFoundPage.tsx`
- Role: custom 404 page
- Data source:
  - `notFound.*`
- Styling:
  - uses `paws-bg.png` background
- Caveats:
  - home button always points to `/`
  - page does not currently include `SEOHead`

## Styling Reuse Notes
- `AboutCompany.module.css` is reused by `LegalPage`
- `MigrationRU.module.css` is page-specific and not shared
- Popup visuals live in `Popup.module.css`, not in `ComingSoonModal.module.css`

## Known Risks and Gotchas
- `SEOHead` uses current i18n language, not route or `variant`
- `Pricing` uses current i18n language, not route or `variant`
- `Hero` mixes:
  - text chosen by i18n language
  - button layout chosen by `variant`
- `MigrationRU` is the only page that intentionally hides the language switch
- `Referral` CTA is visually present but not wired
- Some assets are referenced with relative paths instead of root-relative paths
- `NotFoundPage` and header/footer always return users to `/`, even if they came from `/ww`
- Large legal copy lives in JSON, which is awkward to edit and easy to break with quotes/newlines
- TypeScript is strict and build will fail on unused locals/params unless intentionally handled

## Safe Edit Playbook

### When editing text
- Prefer updating locale JSON instead of hardcoding strings in components
- Do not mix Russian and English content between locale files
- Preserve newline formatting in legal text
- Keep RU terminology as `VPS`, EN terminology as `VPN`

### When editing page structure
- Check whether the behavior is route-based, language-based, or both
- Verify `Header`, `Footer`, and `SEOHead` implications
- If adding a new page route, remember Vercel SPA routing already rewrites to `index.html`

### When editing assets
- Put static files in `public/`
- Prefer root-relative references like `/logo.png`
- Double-check asset filenames in code vs files in `public/`

### When editing modal behavior
- Use `useComingSoon()` inside the provider tree only
- Reuse `Popup` for future modal work instead of duplicating overlay logic

### When editing legal pages
- `LegalPage` is generic by design; add new legal page types there if possible
- Remember `.legalText` is needed for multiline copy readability

## Build and Verification
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Production check: `npm run build`

Build currently consists of:
- `tsc`
- `vite build`

There are no automated tests in the project at the moment.

## High-Value Files For Future Agents
- `src/App.tsx`
- `src/i18n/index.ts`
- `src/i18n/locales/ru.json`
- `src/i18n/locales/en.json`
- `src/seo/SEOHead.tsx`
- `src/components/Hero/Hero.tsx`
- `src/components/Pricing/Pricing.tsx`
- `src/components/Header/Header.tsx`
- `src/components/LanguageSelector/LanguageSelector.tsx`
- `src/pages/MigrationRU.tsx`
- `src/pages/LegalPage.tsx`

## Recommended First Checks Before Any Future Change
1. Identify whether the requested change affects route composition, language content, or both.
2. Check whether the text belongs in locales or is intentionally hardcoded.
3. Verify asset paths if any image/icon is involved.
4. Run `npm run build` after non-trivial edits.
5. If a bug appears only in one language, inspect both locale JSON files before changing components.
