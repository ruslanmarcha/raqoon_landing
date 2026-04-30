# Приём заявок `/beta` в Google Sheets (Apps Script)

## Какая таблица и как подключить свою

В коде сайта **нет** ID Google Таблицы: фронтенд только шлёт JSON на **`VITE_BETA_WEBHOOK_URL`**.

Чтобы заявки попадали **в вашу** таблицу:

1. Создайте таблицу и скопируйте её ID из URL (см. раздел «Таблица» ниже).
2. В **Apps Script** (тот же проект, что разворачиваете как Web App) укажите этот ID в константе **`SPREADSHEET_ID`** в `openById(...)`.
3. Разверните скрипт как **веб-приложение**, скопируйте URL развёртывания.
4. В `.env` проекта лендинга задайте **`VITE_BETA_WEBHOOK_URL`** этим URL и пересоберите сайт.

Итого: какую таблицу вы откроете в скрипте через `SPREADSHEET_ID`, в ту и пойдут строки.

---

Фронтенд отправляет **POST JSON** на URL из переменной **`VITE_BETA_WEBHOOK_URL`** (см. `.env.example`).

Тело запроса:

```json
{
  "email": "user@example.com",
  "raccoonId": "…",
  "platform": "ios",
  "submittedAt": "2026-04-30T12:00:00.000Z"
}
```

`platform`: `"ios"` или `"android"`.

## 1. Таблица

1. Создайте Google Таблицу (или откройте существующую).
2. На первом листе в **первой строке** заголовки, например:  
   `timestamp` | `email` | `raccoonId` | `platform`
3. Скопируйте **ID таблицы** из URL:  
   `https://docs.google.com/spreadsheets/d/`**`SPREADSHEET_ID`**`/edit`

## 2. Скрипт

**Расширения → Apps Script** в таблице, вставьте код (замените `SPREADSHEET_ID` и при необходимости имя листа):

```javascript
const SPREADSHEET_ID = 'ВСТАВЬТЕ_ID_ТАБЛИЦЫ'
const SHEET_NAME = 'Sheet1'

function doPost(e) {
  try {
    const body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {}
    const email = String(body.email || '').trim()
    const raccoonId = String(body.raccoonId || '').trim()
    const platform = String(body.platform || '').trim()
    const submittedAt = String(body.submittedAt || new Date().toISOString())

    if (!email || !raccoonId || !platform) {
      return jsonOut({ ok: false, error: 'missing_fields' }, 400)
    }

    const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
    sh.appendRow([submittedAt, email, raccoonId, platform])

    return jsonOut({ ok: true }, 200)
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) }, 500)
  }
}

function jsonOut(obj, status) {
  const out = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
  // Apps Script не позволяет задать HTTP status в Web App напрямую; для ошибок всё равно верните JSON.
  return out
}

function doOptions() {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT)
}
```

## 3. Развёртывание Web App

1. **Развернуть → Новое развертывание** → тип **Веб-приложение**.
2. **Выполнять от имени:** вы (учётная запись с доступом к таблице).
3. **У кого есть доступ:** «Все» (иначе браузер не сможет вызвать `fetch` с сайта).
4. Скопируйте **URL веб-приложения** и укажите в `VITE_BETA_WEBHOOK_URL`, пересоберите фронт.

## 4. CORS

Для `fetch` с другого домена Apps Script Web App по умолчанию отвечает с заголовками, подходящими для простых POST JSON. Если браузер блокирует запрос, проверьте, что развёртывание именно **Web App**, а не API Executable.

## 5. Защита от спама (по желанию)

- Ограничение по секретному токену: добавьте в JSON поле `secret` и проверяйте его в `doPost` (секрет храните в **Properties Service**, не в клиентском коде — тогда секрет всё равно виден в бандле; надёжнее — отдельный маленький backend).

Для продакшена с тайным ключом лучше свой endpoint (Node/Fastify), который пишет в Sheets через сервисный аккаунт.
