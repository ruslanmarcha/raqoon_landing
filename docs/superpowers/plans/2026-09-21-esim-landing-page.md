# Raqoon eSIM Landing (`/esim`) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить продуктовую страницу `/esim` в стиле `/wallet` (hero → intro → flip-gallery → final CTA), с живым каталогом цен из публичного API, i18n во **всех** locale-файлах, ссылкой с home-tile вместо «Скоро», пунктом eSIM в Header, и скрытием турецких SIM для посетителей из TR.

**Architecture:** Страница копирует каркас `RosVpnPage` / `WalletPage` (Header, `WalletPage.module.css` для shell/tiles, Footer, `SEOHead`). Маркетинговые секции — статический i18n. Каталог цен — отдельный клиент `fetchPricing` + UI-блок каталога (страна → пакеты → цена рынка), без оформления заказа на лендинге. Маршрут `/esim` не конфликтует с уже существующими `/esim/privacy|terms|refund|distance-sales`.

**Tech Stack:** React 18, TypeScript, React Router 6, react-i18next, Vite 5, Vitest (для клиента цен и хелперов), CSS Modules, design tokens (`--color-*`, `--font-*`, `--space-*`).

**Spec / source of truth (цены):** `/Users/ruslanmarchenko/Downloads/landing-public-pricing.md`  
**Style reference:** `https://www.raqoon.app/wallet` + локально `src/pages/WalletPage.tsx`, `WalletPage.module.css`, `RosVpnPage.tsx`, `ReferralPage.tsx`.

## Global Constraints

- Стиль страницы = wallet/rosvpn: тёмный фон токенов, brand-first hero, flip-tiles с `+`/`×`, max-width ~600px, без «dashboard»-сетки карточек в hero.
- Цены **только** из `GET https://tech-raqoon-esim.izirocks.store/api/v1/public/pricing`; не хардкодить суммы и `currencyScale`.
- `credentials: "omit"`; без API-ключей и `X-Client-*`; не использовать `mode: "no-cors"`.
- Цены информационные; не создавать заказ с лендинга; финальная сумма — при покупке.
- Не показывать пакет без `prices[market.customerCountry]`; отсутствующая цена ≠ 0.
- При новой `version` — баннер «цены обновились», не менять суммы live под глазами.
- Не ломать существующие legal-роуты `/esim/*` и Documents/SEO для eSIM.
- Не коммитить секреты; URL pricing — публичный, можно в `VITE_ESIM_PRICING_URL` с дефолтом из контракта.
- CORS по умолчанию только `https://raqoon.app` — localhost/`www` не заработают без бэкенда.
- eSIM copy (legal constraint из предыдущих планов): reseller/retailer; не утверждать, что Raqoon — оператор сети / выдаёт номера / голос+SMS, если это не подтверждено.

---

## Goal / Non-goals

### Goal
- Публичная страница `/esim` с маркетинговым каркасом как у Wallet и интерактивным каталогом тарифов eSIM.
- Home tile `esim`: убрать `soon`, вести на `/esim` (все locale).
- i18n: ключи `esimPage.*` + meta + `nav.esim` во **всех** locale JSON (как `homePage` catalogs).
- Header: пункт eSIM в product-nav для **всех** локалей.
- Turkey: посетителям из TR не показывать Turkish destination SIMs (фильтр по `countries[].code` / `packages[].countries`).
- SEO: `page="esim"` + запись в sitemap (`vite.config.ts` `SEO_ROUTES`).
- CTA покупки → `/download` (или `https://www.raqoon.app/download`).

### Non-goals (v1)
- Checkout / оплата / создание заказа на лендинге.
- Полноценный мульти-рыночный UX для всех валют (v1: рынок `RU`, если есть; иначе явный выбор из `markets`).
- Переписывание legal pages `/esim/*`.
- Обход CORS через прокси на Vercel (только если явно решим в Open questions).

---

## Content outline (из pricing MD + wallet-паттерн)

Pricing MD — **контракт API**, не готовый marketing copy. На лендинг из него берём поведение каталога; тексты hero/tiles — по образцу Wallet/Home + согласование копирайта.

### A. Marketing shell (как `/wallet`)
1. **Hero:** brand `Raqoon eSIM` → один headline → один CTA.
2. **Intro / overview:** full-bleed-в-колонке визуал (реюз `/home-esim-phone.png` или новый asset).
3. **Gallery (flip-tiles):** 4–6 плиток про пользу (установка в приложении, страны/пакеты, top-up, сети 4G/5G, без физической SIM и т.п.) — **статический i18n**, не из API.
4. **Final CTA:** иконка + headline + body + кнопка + короткий disclaimer (цены информационные; ссылки на `/esim/terms`, `/esim/privacy` при необходимости).

### B. Pricing catalog (из API — ядро pricing MD)
Секция `#pricing` **между gallery и final** (или якорь из hero secondary link):

| Элемент | Поведение |
|--------|-----------|
| Загрузка | Skeleton / «Загрузка цен…» |
| Рынок | По умолчанию `customerCountry === "RU"`; иначе picker по `markets[]` |
| Список стран | `countries[].code`; название/флаг через `Intl.DisplayNames` + emoji/флаг-asset локально |
| Пакеты | `name` как textContent (не `innerHTML`); `dataBytes`, `durationDays`, `networkTypes`, `supportsTopUp` |
| Цена | `formatPrice`: `minor / currencyScale` + `Intl.NumberFormat(locale, { style:'currency', currency })` |
| Дедуп | Один `id` пакета может быть в нескольких странах — при «все пакеты» дедуп по `id` |
| Баннер version | При новой `version` vs отображаемой: «Цены обновились — обновите страницу»; не мутировать суммы |
| Stale / validUntil | После `validUntil` — revalidate; при провале — метка устаревания; backoff 30–60s |
| Polling | Каждые 5 мин + `visibilitychange`; без параллельных запросов; ETag + `If-None-Match`; 304 = no-op |
| Ошибки | Сеть / 5xx / пустой каталог → «Цены временно недоступны»; при наличии snapshot — показать с отметкой stale |
| CTA пакета | v1: «Купить в приложении» → `/download` (не вызывать order API) |

### C. Чего из MD **не** класть на лендинг как UI
- Настройка `RAQOON_PUBLIC_CORS_ORIGINS` / Cloudflare cache rules — infra checklist, не UI.
- Примеры синтетических цен из JSON в MD — не копировать как статику.

### Suggested marketing tiles (черновик копирайта — утвердить)
| id | span | тема | смысл |
|----|------|------|--------|
| `install` | full | light/product | eSIM в приложении Raqoon |
| `coverage` | half | soft | Страны и пакеты |
| `topup` | half | light | Пополнение (`supportsTopUp`) |
| `networks` | half | dark | 4G / 5G |
| `no-plastic` | half | light | Без физической SIM |
| `fair-price` | full | dark | Цены из каталога, без сюрпризов на витрине |

CTA группы: тот же primary action, что hero/final (приложение / бот / portal — TBD).

---

## Current codebase anchors (что уже есть)

| Область | Факт |
|--------|------|
| Роуты product | `/wallet`, `/rosvpn`, `/referral` в `src/App.tsx`; **`/esim` product отсутствует** |
| Legal eSIM | `/esim/privacy`, `/esim/terms`, `/esim/refund`, `/esim/distance-sales` уже есть |
| Wallet style | `WalletPage.tsx` + `WalletPage.module.css`; RosVpn/Referral **переиспользуют** этот CSS |
| Locale gate | Wallet/RosVpn: **только RU** (`Navigate` → `/`); Referral: RU+WW |
| Home eSIM tile | `homePage.tiles` id=`esim`, `soon: true`, **без `href`**, visual `/home-esim-phone.png` (ru + en) |
| Header nav | Только `vpn` + `wallet` (`Header.tsx` `PRODUCT_LINKS`) |
| SEO | Legal eSIM pages есть; product `page: 'esim'` нет; sitemap без `/esim` product |
| Fetch helper | `src/lib/fetchWithTimeout.ts` (можно расширить/обернуть под ETag) |

---

## File map

### Create
- `src/pages/EsimPage.tsx` — страница (shell + catalog mount)
- `src/pages/EsimPage.module.css` — только каталог/баннеры/списки (shell → import `WalletPage.module.css`)
- `src/lib/esimPricing/types.ts` — `Market`, `Package`, `Pricing`, `PricingResult`
- `src/lib/esimPricing/fetchPricing.ts` — клиент из контракта (ETag, timeout 10s, credentials omit)
- `src/lib/esimPricing/formatPrice.ts` — `formatPrice(pkg, market, locale)`
- `src/lib/esimPricing/formatDataBytes.ts` — человекочитаемый объём из `dataBytes`
- `src/lib/esimPricing/useEsimPricing.ts` — load + poll 5m + visibility + validUntil + single-flight + version banner state
- `src/components/EsimPricing/EsimPricingCatalog.tsx` — UI каталога
- `src/components/EsimPricing/EsimPricingCatalog.module.css`
- `src/lib/esimPricing/fetchPricing.test.ts` — unit: scale, missing price, 304, version change
- `src/lib/esimPricing/formatPrice.test.ts`

### Modify
- `src/App.tsx` — lazy `EsimPage`, `<Route path="/esim" element={<EsimPage />} />` (в non-turkey ветке; turkey — см. Open questions)
- `src/seo/SEOHead.tsx` — `SeoPage` + case `'esim'`
- `src/i18n/locales/ru.json` — `esimPage.*`, `meta.esim*`, правка `homePage.tiles` esim
- `src/i18n/locales/en.json` — то же
- `vite.config.ts` — `SEO_ROUTES` entry `/esim`
- `.env.example` + `src/vite-env.d.ts` — `VITE_ESIM_PRICING_URL?`
- Опционально: `src/components/Header/Header.tsx` — пункт nav eSIM
- Опционально: остальные locales — минимальный fallback или sync ключей

### Do not touch (unless needed)
- Legal registry / `/esim/privacy|…`
- Wallet/RosVpn page logic (только reference)

---

## Design / style constraints (match Wallet)

- Токены: `var(--color-bg|text|surface|border|primary|accent|…)`, `var(--font-sans)`, `var(--space-*)`, `var(--radius-full)`.
- Hero: brand → headline (multiline через `Lines`) → одна CTA; без stats/chips/overlays на media.
- Gallery: grid 2 col / 1 col ≤519px; flip `rotateY`; `prefers-reduced-motion: reduce` → без transition.
- Catalog: **не** превращать в «карточки ради карточек»; список/таблица в колонке `max-width: 600px`, визуально родственный surface/border wallet.
- Motion: 2–3 осмысленности — flip tiles + появление баннера + лёгкий loading; без glow/purple AI-look.
- Mobile: проверять hero, tiles, country list, sticky banner.

---

## i18n pattern

Следовать product pages:

```ts
// Wallet/RosVpn today:
const isRu = i18n.language.startsWith('ru')
const t = useMemo(() => i18n.getFixedT('ru'), [i18n])
if (!isRu) return <Navigate to="/" replace />

// Referral: bilingual via variant ru|ww
```

**Решение для `/esim` (принято):** все локали — ключи `esimPage` во всех locale JSON; `SEOHead` по текущему языку; **без** RU-only redirect.

Структура ключей (минимум):

```json
"esimPage": {
  "brand": "...",
  "openTile": "...",
  "closeTile": "...",
  "hero": { "headline": "...", "cta": "..." },
  "tiles": [ /* GalleryTile[] */ ],
  "pricing": {
    "title": "...",
    "loading": "...",
    "unavailable": "...",
    "stale": "...",
    "updatedBanner": "Цены обновились — обновите страницу",
    "refresh": "Обновить",
    "marketLabel": "...",
    "searchCountry": "...",
    "data": "...",
    "days": "...",
    "networks": "...",
    "topUpYes": "...",
    "buyCta": "...",
    "priceDisclaimer": "Цены информационные; итоговая сумма при оформлении."
  },
  "final": { "headline": "...", "body": "...", "cta": "...", "disclaimer": "..." }
},
"meta": {
  "esimTitleRU": "...",
  "esimDescriptionRU": "...",
  "esimOgTitleRU": "...",
  "esimOgDescriptionRU": "..."
}
```

EN: те же ключи без суффикса или зеркало `*EN` — **как уже сделано для wallet** (`meta.walletTitleRU` даже для RU-страницы). Для bilingual esim: либо пара `*RU`/`*EN`, либо обычные ключи + `t()` текущего языка (предпочтительно как `referralPage`).

Home tile (ru + en):

```json
{
  "id": "esim",
  "span": "full",
  "theme": "dark",
  "display": true,
  "accent": "eSIM.",
  "headline": "Связь в поездках.",
  "sub": "Связь без лишней возни.",
  "visual": "/home-esim-phone.png",
  "href": "/esim"
}
```

Удалить `"soon": true`. EN: accent/headline на английском, `href: "/esim"`.

`HomePage` `LinkTile`: при `href` и без `soon` уже рендерит `<Link to={...}>` — **код HomePage менять не обязательно**, только JSON.

---

## Step-by-step tasks

### Task 1: Pricing types + format helpers + tests

**Files:**
- Create: `src/lib/esimPricing/types.ts`
- Create: `src/lib/esimPricing/formatPrice.ts`
- Create: `src/lib/esimPricing/formatDataBytes.ts`
- Create: `src/lib/esimPricing/formatPrice.test.ts`

**Interfaces:**
- Produces: `Market`, `Package`, `Pricing`, `formatPrice`, `formatDataBytes`

- [x] **Step 1:** Добавить типы ровно по контракту MD (`currencyScale`, `prices: Record<string, number>`, …).
- [x] **Step 2:** `formatPrice` — `null` если нет цены рынка; иначе `Intl.NumberFormat`; делитель только из `market.currencyScale`.
- [x] **Step 3:** Тест: `129000` + scale `100` + `RUB` → строка с `1 290` / `1290` (locale-tolerant assert).
- [x] **Step 4:** Тест: нет `prices.RU` → `null`.
- [x] **Step 5:** `npm test -- src/lib/esimPricing/formatPrice.test.ts` → PASS.

### Task 2: `fetchPricing` client + tests

**Files:**
- Create: `src/lib/esimPricing/fetchPricing.ts`
- Create: `src/lib/esimPricing/fetchPricing.test.ts`
- Modify: `.env.example`, `src/vite-env.d.ts`

**Interfaces:**
- Produces: `fetchPricing(etag?: string): Promise<PricingResult>`
- Consumes: `VITE_ESIM_PRICING_URL` или дефолт URL из MD

- [ ] **Step 1:** Реализовать fetch: `Accept: application/json`, optional `If-None-Match`, `credentials: "omit"`, timeout 10s (`AbortSignal.timeout` или обёртка).
- [ ] **Step 2:** 304 → `{ kind: "unchanged" }`; 200 → `{ kind: "snapshot", etag, data }`; !ok → throw с status.
- [ ] **Step 3:** Ошибки: не парсить non-JSON тело безусловно.
- [ ] **Step 4:** Unit-тесты с mock `fetch` (304 / 200 / 503).
- [ ] **Step 5:** Задокументировать в `.env.example` CORS caveat.

### Task 3: `useEsimPricing` hook

**Files:**
- Create: `src/lib/esimPricing/useEsimPricing.ts`

**Interfaces:**
- Produces: `{ status, data, etag, displayedVersion, updateAvailable, stale, error, refresh, acknowledgeReload }`
- Consumes: `fetchPricing`

- [ ] **Step 1:** Initial load без ETag; сохранить snapshot + version + etag.
- [ ] **Step 2:** Interval 5 min + `document.visibilitychange` → visible; mutex/single-flight.
- [ ] **Step 3:** 304 / same `version` → обновить etag/timestamps, UI цен не трогать.
- [ ] **Step 4:** New `version` → `updateAvailable=true`, **не** подменять `data` отображения.
- [ ] **Step 5:** `validUntil` истёк → revalidate; fail → `stale`; backoff 30–60s, без tight loop.
- [ ] **Step 6:** Unmount: clear timers / abort.

### Task 4: `EsimPricingCatalog` UI

**Files:**
- Create: `src/components/EsimPricing/EsimPricingCatalog.tsx`
- Create: `src/components/EsimPricing/EsimPricingCatalog.module.css`

- [ ] **Step 1:** Состояния loading / error / empty / ready.
- [ ] **Step 2:** Market resolve (`RU` first).
- [ ] **Step 3:** Country list + package rows; filter missing price; show networks/top-up/duration/data.
- [ ] **Step 4:** Sticky/top banner for `updateAvailable` + reload button (`location.reload()`).
- [ ] **Step 5:** Disclaimer под каталогом; CTA buy → TBD link (prop `purchaseHref`).
- [ ] **Step 6:** Mobile layout check (узкая колонка 600px).

### Task 5: `EsimPage` shell (wallet parity)

**Files:**
- Create: `src/pages/EsimPage.tsx`
- Create: `src/pages/EsimPage.module.css` (тонкий слой)
- Reuse: `src/pages/WalletPage.module.css`

- [ ] **Step 1:** Скопировать каркас с `RosVpnPage` (меньше frontKind-вариантов, чем Wallet).
- [ ] **Step 2:** Hero + intro media (`/home-esim-phone.png`) + gallery tiles из `esimPage.tiles` + final.
- [ ] **Step 3:** Вставить `<EsimPricingCatalog />` в секцию `#pricing`.
- [ ] **Step 4:** Hash scroll как на Wallet (`#pricing`, `#gallery`).
- [ ] **Step 5:** Locale: bilingual (рекомендация) или RU-only gate — зафиксировать перед кодом.
- [ ] **Step 6:** CTA: единая константа `PURCHASE_CTA` / download / portal (после Open question).

### Task 6: Route + SEO + sitemap

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/seo/SEOHead.tsx`
- Modify: `vite.config.ts`

- [ ] **Step 1:** `const EsimPage = lazy(() => import('./pages/EsimPage').then(m => ({ default: m.EsimPage })))`
- [ ] **Step 2:** Route `/esim` рядом с `/wallet` (после `/referral` / до `/wallet` — порядок не критичен).
- [ ] **Step 3:** Убедиться, что `/esim/privacy` и т.д. остаются отдельными Route (более длинный path).
- [ ] **Step 4:** `SEOHead` case `esim` + meta keys.
- [ ] **Step 5:** `SEO_ROUTES` `{ path: '/esim', priority: '0.8', changefreq: 'weekly' }`.
- [ ] **Step 6:** Turkey geolock branch: либо добавить `/esim`, либо оставить 404→turkiye (решение в Open questions).

### Task 7: i18n RU+EN + home tile link

**Files:**
- Modify: `src/i18n/locales/ru.json`
- Modify: `src/i18n/locales/en.json`

- [ ] **Step 1:** Добавить полный блок `esimPage` + `meta.esim*`.
- [ ] **Step 2:** Home tile: снять `soon`, добавить `href: "/esim"`, обновить accent/headline.
- [ ] **Step 3:** Проверить, что `nav` keys не обязательны, если Header не трогаем.
- [ ] **Step 4:** (Опционально) Header `PRODUCT_LINKS` + `nav.esim`.

### Task 8: Verification

- [ ] **Step 1:** `npm run dev` → `/esim` рендерится, `/esim/terms` не сломан.
- [ ] **Step 2:** Home → клик по eSIM tile → `/esim`.
- [ ] **Step 3:** Locale RU/EN: тексты shell + catalog UI.
- [ ] **Step 4:** Mobile width ~375: hero, tiles flip, pricing list.
- [ ] **Step 5:** Pricing: на `https://raqoon.app` origin — 200 + ETag; на localhost ожидать CORS fail → UI «временно недоступны» (не silent empty).
- [ ] **Step 6:** Mock/dev: 304, version bump banner, missing price excluded, `129000/100` format.
- [ ] **Step 7:** `npm test` + `npm run build`.
- [ ] **Step 8:** Reduced motion: flip без анимации.

---

## Resolved decisions (2026-09-21)

1. **CTA покупки:** → `/download` (внутренний `Link` / `https://www.raqoon.app/download`).
2. **Locale policy:** ALL locales — `esimPage.*` во всех locale JSON (как homePage catalogs), не только RU+EN.
3. **Header nav:** показывать eSIM в Header для **всех** локалей.
4. **Turkey filter:** если `countryCode === "TR"` (geoLocale / LocalePolicyContext), **не показывать** Turkish destination SIMs: скрыть `countries[].code === "TR"` и пакеты с `"TR"` в `packages[].countries`. (Не путать destination TR с buyer market `markets[].customerCountry`.)

## Open questions / risks (remaining)

1. **CORS:** production origin must be exact `https://raqoon.app`. Нужен ли preview/www/localhost в `RAQOON_PUBLIC_CORS_ORIGINS`? Иначе локальная разработка каталога невозможна без mock.
2. **Dev mock:** feature-flag `VITE_ESIM_PRICING_MOCK=1` с фикстурой из MD?
3. **Turkey geolock:** показывать ли product `/esim` посетителям TR при `VITE_ENABLE_TURKEY_GEOLOCK`? (v1: geolock branch без product `/esim`; при выключенном geolock — страница есть + Turkey SIM filter.)
4. **Marketing copy:** pricing MD не даёт hero/tiles текст — черновик в i18n; при необходимости polish от продукта.
5. **Ассеты:** v1 использует `/home-esim-phone.png`.
6. **Риск конфликта path:** `/esim` vs `/esim/*` — ок в RR6 при явных routes; не делать `<Route path="/esim/*">` catch-all.
7. **Кеш CDN:** изменения цен с задержкой до ~5–10 мин — баннер version это покрывает; не бастить cache query-string’ом.

---

## Suggested verification checklist

| Check | Expected |
|-------|----------|
| `/esim` | 200 SPA, Header/Footer, wallet-like layout |
| `/esim/privacy` | Legal page, не EsimPage |
| `/` eSIM tile | Link to `/esim`, no «Soon/Скоро», no `tileSoon` |
| RU / EN | `esimPage` strings switch with language |
| Pricing happy path | Packages + formatted price for RU market |
| Pricing CORS fail | Friendly unavailable state |
| Version change | Banner; prices frozen until reload |
| Mobile | No horizontal scroll; tiles stack; catalog usable |
| SEO | Title/description; `/esim` in generated sitemap |
| Build | `npm run build` success |

---

## Self-review (spec coverage)

| Requirement | Task |
|-------------|------|
| Match `/wallet` style | Task 5 |
| Pricing MD API contract | Tasks 1–4 |
| Home soon tile → `/esim` | Task 7 |
| Routes App/router | Task 6 |
| Parity with wallet/rosvpn/referral structure | Task 5 (+ Referral bilingual) |
| i18n RU+EN | Task 7 |
| Plan in Russian for coding session | this document |
| No implementation / no commit in planning phase | ✅ |

---

## Execution handoff

План сохранён в `docs/superpowers/plans/2026-09-21-esim-landing-page.md`.

**Варианты реализации:**

1. **Subagent-Driven (рекомендуется)** — свежий сабагент на задачу, ревью между задачами  
2. **Inline Execution** — выполнение в этой сессии через executing-plans с чекпоинтами  

Какой подход выбрать?
