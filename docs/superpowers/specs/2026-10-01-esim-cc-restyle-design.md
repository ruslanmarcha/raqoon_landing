# Design: `/esim` page restyle after raqoon.cc/ru (app CTA)

**Date:** 2026-10-01  
**Status:** Draft for review  
**Reference:** https://www.raqoon.cc/ru  
**Target:** https://www.raqoon.app/esim/

## Goal

Пересобрать продуктовую страницу `/esim` на `raqoon.app` так, чтобы **контент и визуальная иерархия** совпадали с лендингом `raqoon.cc/ru`, но:

- шапка и подвал **остаются** текущими (`Header` / `Footer` с `raqoon.app`);
- клиента ведём **в приложение** (App Store), а не в ЛК / корзину / checkout на сайте;
- у пакета вместо двух кнопок («Купить» + «В корзину») — **одна круглая кнопка со стрелкой** → App Store.

## Non-goals

- Не менять `Header`, `Footer`, глобальную навигацию, cookie banner.
- Не внедрять web-checkout, корзину, «Войти», оплату на лендинге.
- Не копировать header/footer с `raqoon.cc`.
- Не оставлять flip-gallery / wallet-style плитки как основной storytelling (заменяются секциями как на `.cc`).
- Не трогать legal routes `/esim/privacy|terms|refund|distance-sales`.

## Constraints (already on raqoon.app)

- CTA приложения: `RAQOON_ESIM_APP_STORE_URL` (`https://apps.apple.com/am/app/raqoon-vpn/id6763367620`).
- Живые цены из `/api/esim-pricing` (текущий клиент `useEsimPricing`).
- Валюта: **RUB только для UI `ru*`**; остальные локали — **USD** (`formatPriceForLocale`).
- 1-дневные пакеты скрыты; для geo `TR` скрыты Turkish destination SIMs.
- Не пересчитывать курс на клиенте, если в каталоге появится рынок USD — брать его; fallback RUB→USD только пока USD-рынка нет.

## Page structure (main only)

Порядок секций внутри `<main>` (после Header, до Footer):

1. **Hero** — крупный H1, короткий lead, две кнопки:
   - primary: «Выбрать страну» → `#pricing`
   - secondary: «Как это работает» → `#how`
2. **Pricing (`#pricing`)** — бейдж «Живые цены · …», H2 про выбор страны, lead про финальную цену.
3. **Country picker (упрощённый каталог)** — внутри панели:
   - поиск страны/региона;
   - чипы популярных направлений (как на `.cc`: TR, TH, AE, EG, GR, CY, IT, ES, US, JP — пересечение с тем, что есть в каталоге);
   - после выбора страны — список пакетов (без ползунков срок/трафик и без дропдаунов конструктора);
   - строка пакета: локализованное имя · мета · **цена** · **одна `→`** (App Store);
   - подсказка «Начните со страны…» пока страна не выбрана / нет результатов;
   - опционально: ссылка «Проверить, подходит ли телефон» (якорь/аккордеон; без ухода в ЛК).
4. **Map / coverage visual** — декоративный блок карты (asset с `.cc` или существующий/новый static asset в `/public`), без интерактивной покупки.
5. **Feature grid (2×2)** — четыре карточки в тоне `.cc` (часть заголовка зелёным). Тексты адаптировать под app (не «на сайте купите в кабинет», а «в приложении»).
6. **How it works (`#how`)** — «Четыре шага до интернета»; шаг про оплату/QR — формулировки про **приложение**, не «кабинет».
7. **Stats / trust** — 150+ стран / 200+ сетей / LTE·5G / поддержка (как на `.cc`, цифры сверить с актуальным каталогом где возможно).
8. **FAQ** — аккордеон группами (перед покупкой / оплата / в поездке / поддержка); ответы без ведения в ЛК; support email — текущий продуктный (`help@raqoon.app` или существующий в проекте), не обязательно `support@raqoon.cc`.
9. **Final CTA** — H2 + body + одна кнопка «Скачать приложение» → App Store.

## Catalog UX (упрощение)

| Было | Станет |
|------|--------|
| Поиск + чипы + 2 ползунка/дропдауна (срок, трафик) | Поиск + популярные чипы |
| Фильтр exact duration×data | Показ **всех** пакетов выбранной страны (кроме 1-day), сортировка разумная (цена / срок) |
| Купить / стрелка | Только круглая `→` → App Store |
| `EsimPlanSelector` | Убрать с этой страницы (можно оставить файл неиспользуемым или удалить в той же задаче) |

Сохранить: локализованные названия (`formatPackageTitle`), Turkey filter, exclude 1-day, currency by locale.

## Visual language

- Тёмный фон как у текущего сайта (`--color-bg` и т.д.), не новая брендовая тема.
- Акцент зелёный (`--color-accent`), крупные заголовки, скруглённые панели как на `.cc`.
- Hero: один composition, без dashboard; brand/product signal сильный.
- Не копировать «Корзина» / «Войти» из `.cc` в контент страницы.

## i18n

- Новые ключи `esimPage.*` под секции выше (hero, pricing, features, steps, stats, faq, final).
- RU — полный продающий копирайт по мотивам `.cc`, с заменой «кабинет/сайт-покупка» на «приложение» где нужно.
- EN + sync WW from EN.
- Удалить/не использовать старые `esimPage.tiles` flip-gallery ключи на этой странице.

## Technical sketch

- Переписать `src/pages/EsimPage.tsx` + `EsimPage.module.css` (основной layout страницы; можно меньше опираться на `HomePage`/`WalletPage` modules).
- Упростить `EsimPricingCatalog` (props/режим «simple») или заменить узким `EsimCountryCatalog` без селекторов.
- CTA: только `RAQOON_ESIM_APP_STORE_URL` (`<a target="_blank" rel="noopener noreferrer">`).
- SEO: оставить `SEOHead page="esim"`; обновить meta copy под новый hero при необходимости.

## Acceptance

- [ ] `/esim` визуально читается как `.cc/ru` (секции и иерархия), но header/footer = app.
- [ ] Нет кнопок Корзина / Войти / Купить в корзину в контенте страницы.
- [ ] У каждого пакета одна `→` → App Store.
- [ ] Hero secondary ведёт к `#how`; primary к `#pricing`.
- [ ] Нет ползунков срока/трафика.
- [ ] RU показывает ₽; EN/WW — $.
- [ ] 1-day скрыты; TR geo без Turkish destination.
- [ ] Legal `/esim/*` не сломаны.

## Open follow-ups (out of this design)

- Точный map asset (экспорт с `.cc` vs упрощённая иллюстрация).
- Полный список FAQ 1:1 vs сокращённый набор.
- Device compatibility checker: stub-аккордеон vs полноценный список устройств (v1: ссылка/короткий текст).
