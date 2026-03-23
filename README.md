# Raqoon Landing — документация

## Содержание

1. [Технический стек](#технический-стек)
2. [Запуск и сборка](#запуск-и-сборка)
3. [Структура проекта](#структура-проекта)
4. [Обновление текстов](#обновление-текстов)
5. [Настройка SEO](#настройка-seo)
6. [Настройка Open Graph](#настройка-open-graph)
7. [Сборка отдельных страниц (MPA)](#сборка-отдельных-страниц-mpa)

---

## Технический стек

| Инструмент | Версия | Назначение |
|---|---|---|
| [React](https://react.dev) | 18 | UI-фреймворк |
| [TypeScript](https://www.typescriptlang.org) | 5 | Типизация |
| [Vite](https://vitejs.dev) | 5 | Сборщик и dev-сервер |
| [react-router-dom](https://reactrouter.com) | 6 | Клиентский роутинг |
| [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com) | 23 / 14 | Интернационализация |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | 7 | Автоопределение языка |
| [react-helmet-async](https://github.com/staylor/react-helmet-async) | 2 | Управление `<head>`: title, meta, OG |
| CSS Modules | — | Изолированные стили компонентов |

Шрифт: **Inter** (Google Fonts, подключён в `index.html`).

---

## Запуск и сборка

### Установка зависимостей

```bash
npm install
```

### Dev-сервер

```bash
npm run dev
```

Открывает `http://localhost:5173`.

- `/` — лендинг для России (`LandingRU`)
- `/ww` — международный лендинг (`LandingWW`)

### Продакшн-сборка

```bash
npm run build
```

Артефакты появятся в папке `dist/`. TypeScript-ошибки блокируют сборку.

### Предпросмотр сборки

```bash
npm run preview
```

Локально поднимает собранный `dist/` на `http://localhost:4173`.

---

## Структура проекта

```
landing/
├── public/                  # Статические ассеты (иконки, og-image, фавикон)
│   ├── check.svg
│   ├── spark.svg
│   ├── og-image.png
│   └── favicon.svg
├── src/
│   ├── App.tsx              # Корневой компонент, роутинг
│   ├── main.tsx             # Точка входа
│   ├── design-system/
│   │   ├── tokens.css       # CSS-переменные (цвета, отступы, шрифты)
│   │   └── base.css         # Глобальные стили, утилиты (.btn, .container и др.)
│   ├── i18n/
│   │   ├── index.ts         # Инициализация i18next
│   │   └── locales/
│   │       ├── ru.json      # Тексты на русском
│   │       └── en.json      # Тексты на английском
│   ├── seo/
│   │   └── SEOHead.tsx      # Компонент управления <head>
│   ├── pages/
│   │   ├── LandingRU.tsx    # Страница для России
│   │   └── LandingWW.tsx    # Международная страница
│   └── components/          # UI-компоненты (каждый в своей папке с .module.css)
│       ├── Hero/
│       ├── Header/
│       ├── Pricing/
│       ├── FeaturesCard/
│       ├── FeatureItem/
│       ├── FeatureList/
│       ├── Referral/
│       ├── FAQ/
│       └── Footer/
└── index.html               # HTML-шаблон
```

---

## Обновление текстов

Все тексты хранятся в двух файлах:

- `src/i18n/locales/ru.json` — русский язык
- `src/i18n/locales/en.json` — английский язык

Язык определяется автоматически по настройкам браузера. Выбор сохраняется в `localStorage` под ключом `raqoon_lang`.

### Структура файла локализации

```jsonc
{
  "meta": {           // SEO и Open Graph
  "hero": {           // Секция Hero
  "features": {       // Карточка с фичами (WW-лендинг)
  "pricing": {        // Тарифы (RU-лендинг)
  "referral": {       // Реферальная программа
  "faq": {            // FAQ
  "footer": {         // Футер
}
```

### Простые строки

Найдите нужный ключ и поменяйте значение:

```json
"hero": {
  "ctaRU": "Купить VPN"
}
```

### Многострочные заголовки

Перенос строки в заголовке задаётся символом `\n`:

```json
"hero": {
  "titleRU": "Доступный,\nудобный, надёжный"
}
```

### Списки (features, pricing)

Элементы списка — объекты с полем `label` и опциональным `sub` (подпись меньшим шрифтом):

```json
"features": {
  "items": [
    { "label": "Автоматический выбор протокола" },
    { "label": "Приоритетная поддержка", "sub": "Ответим в течение 24 часов" }
  ]
}
```

Тарифные фичи в `pricing.constructorFeatures` и `pricing.allInFeatures` имеют такую же структуру.

### FAQ

Каждый вопрос — объект `{ "q": "...", "a": "..." }`:

```json
"faq": {
  "items": [
    { "q": "Вопрос?", "a": "Ответ." }
  ]
}
```

---

## Настройка SEO

SEO управляется компонентом `src/seo/SEOHead.tsx` через библиотеку `react-helmet-async`. Компонент принимает проп `variant: 'ru' | 'ww'` и берёт тексты из файлов локализации.

### Тексты title и description

Отредактируйте соответствующие ключи в `ru.json` / `en.json`:

```json
"meta": {
  "titleRU": "Raqoon VPN — Доступный, удобный и надёжный VPN",
  "titleWW": "Raqoon VPN — Fast & Secure VPN for Your Favorite Services",
  "descriptionRU": "Текст для тега <meta name=\"description\">",
  "descriptionWW": "Text for <meta name=\"description\">"
}
```

### Canonical URL

`SEOHead` принимает опциональный проп `canonicalUrl`. Передайте его в страницах, если требуется явная канонизация:

```tsx
// src/pages/LandingRU.tsx
<SEOHead variant="ru" canonicalUrl="https://raqoon.app/" />
```

Если `canonicalUrl` не передан, тег `<link rel="canonical">` не добавляется.

### robots

По умолчанию: `index, follow`. Чтобы закрыть страницу от индексации, измените в `SEOHead.tsx`:

```tsx
<meta name="robots" content="noindex, nofollow" />
```

---

## Настройка Open Graph

OG-метатеги формируются в том же компоненте `SEOHead.tsx`.

### Тексты og:title и og:description

```json
"meta": {
  "ogTitleRU": "Raqoon — Доступный, удобный, надёжный VPN",
  "ogTitleWW": "Raqoon — VPN for Your Favorite Services",
  "ogDescriptionRU": "Описание для шейра в соцсетях (RU)",
  "ogDescriptionWW": "Description for social media share (WW)"
}
```

### OG-картинка

Файл `public/og-image.png`. Рекомендуемый размер: **1200 × 630 px**.

Путь захардкожен в `SEOHead.tsx`:

```tsx
const ogImage = '/og-image.png'
```

Чтобы использовать разные картинки для разных вариантов:

```tsx
const ogImage = variant === 'ru' ? '/og-image-ru.png' : '/og-image-ww.png'
```

### Проверка OG-разметки

- [Open Graph Debugger (Meta)](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Open Graph Preview](https://www.opengraph.xyz)

---

## Сборка отдельных страниц (MPA)

Сейчас проект — SPA: одна точка входа `index.html`, роутинг на клиенте через `react-router-dom`. Поисковики и хостинги, не поддерживающие SPA (например, GitHub Pages или статические CDN), могут не отдавать `/ww` корректно.

Чтобы собрать две полностью независимые HTML-страницы, выполните следующие шаги.

### 1. Создать отдельные HTML-шаблоны

Скопируйте `index.html` в `ru.html` и `ww.html`. В каждом — своя точка входа:

**`ru.html`**:
```html
<script type="module" src="/src/entries/ru.tsx"></script>
```

**`ww.html`**:
```html
<script type="module" src="/src/entries/ww.tsx"></script>
```

### 2. Создать отдельные точки входа

**`src/entries/ru.tsx`**:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import '../i18n/index'
import '../design-system/tokens.css'
import '../design-system/base.css'
import { LandingRU } from '../pages/LandingRU'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LandingRU />
    </HelmetProvider>
  </React.StrictMode>
)
```

**`src/entries/ww.tsx`** — аналогично с `LandingWW`.

### 3. Настроить `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    rollupOptions: {
      input: {
        ru: resolve(__dirname, 'ru.html'),
        ww: resolve(__dirname, 'ww.html'),
      },
    },
  },
})
```

После сборки в `dist/` появятся `ru.html` и `ww.html` с независимыми бандлами. Деплой каждого файла — на соответствующий домен или путь.

### 4. Убрать react-router-dom

Если страницы полностью независимы, роутер больше не нужен. Удалите `BrowserRouter`, `Routes` и `Route` из `App.tsx` (или удалите `App.tsx` целиком, используя точки входа напрямую).
