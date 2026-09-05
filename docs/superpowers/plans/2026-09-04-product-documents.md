# Product Documents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a product-based legal document catalogue, preserve the three existing VPN legal URLs, and publish a separate six-route Travel eSIM legal set in every supported locale.

**Architecture:** A typed legal-document registry owns the product/document/route mapping. `LegalPage` reads product-scoped i18n keys from that registry; `DocumentsPage` renders the same registry as two product sections. Long legal bodies remain as locale-specific UTF-8 source files and are synchronised into locale JSON through deterministic scripts.

**Tech Stack:** React 18, TypeScript, React Router 6, react-i18next, Vite 5, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-04-product-documents-design.md`

## Global Constraints

- Preserve the exact public VPN URLs `/privacy`, `/terms`, and `/refund`; do not redirect them.
- Add `/documents`, `/esim/privacy`, `/esim/terms`, and `/esim/refund`.
- Publish complete VPN and eSIM legal content in `en`, `ru`, `ar`, `cs`, `de`, `fr`, `id`, `ja`, `ko`, `pl`, `pt-BR`, `th`, `tl`, and `zh-CN`; no English-body fallback on a localized page.
- The legal source model identifies Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. as the Turkish seller/controller only after the exact registered address and contact details have been verified.
- eSIM copy uses the reseller/retailer model and never states that Raqoon operates a public communications network, allocates telephone numbers, or provides voice/SMS services.
- Do not publish a Türkiye-exclusion assertion until eSIMAccess confirms in writing that every offered plan excludes Türkiye and Turkish public mobile networks.
- Turkish law is the contractual baseline; mandatory consumer protections in the buyer's country remain unaffected.
- Preserve the existing `contact` route and footer contact link.
- Add every new public document route to the generated sitemap.

---

### Task 1: Establish a typed legal-document registry and its test harness

**Files:**
- Create: `src/legal/documentRegistry.ts`
- Create: `src/legal/documentRegistry.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`

**Interfaces:**
- Produces: `LegalProduct = 'vpn' | 'esim'`, `LegalDocument = 'privacy' | 'terms' | 'refund'`, `LEGAL_DOCUMENTS`, `DOCUMENTS_BY_PRODUCT`, and `getLegalDocument(product, document)`.
- Consumes: no application modules; later tasks import its types and route records.

- [ ] **Step 1: Add the test runner and a `test` command**

Install the minimal test dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Add a `test` section to the object returned by `defineConfig` in `vite.config.ts`:

```ts
test: {
  environment: 'jsdom',
  setupFiles: [],
},
```

- [ ] **Step 2: Write the failing registry test**

Create `src/legal/documentRegistry.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { DOCUMENTS_BY_PRODUCT, LEGAL_DOCUMENTS, getLegalDocument } from './documentRegistry'

describe('legal document registry', () => {
  it('lists exactly the three stable VPN URLs and three eSIM URLs', () => {
    expect(LEGAL_DOCUMENTS.map(({ path }) => path)).toEqual([
      '/privacy',
      '/terms',
      '/refund',
      '/esim/privacy',
      '/esim/terms',
      '/esim/refund',
    ])
  })

  it('groups exactly three documents under each product', () => {
    expect(DOCUMENTS_BY_PRODUCT.vpn).toHaveLength(3)
    expect(DOCUMENTS_BY_PRODUCT.esim).toHaveLength(3)
  })

  it('resolves an eSIM refund document without returning VPN content', () => {
    expect(getLegalDocument('esim', 'refund')).toMatchObject({
      product: 'esim',
      document: 'refund',
      path: '/esim/refund',
      translationPrefix: 'legal.esim.refund',
    })
  })
})
```

- [ ] **Step 3: Run the registry test to confirm the red state**

Run:

```bash
npm test -- src/legal/documentRegistry.test.ts
```

Expected: FAIL because `documentRegistry.ts` does not exist.

- [ ] **Step 4: Implement the registry**

Create `src/legal/documentRegistry.ts` with this public shape:

```ts
export type LegalProduct = 'vpn' | 'esim'
export type LegalDocument = 'privacy' | 'terms' | 'refund'

export interface LegalDocumentDefinition {
  product: LegalProduct
  document: LegalDocument
  path: string
  translationPrefix: `legal.${LegalProduct}.${LegalDocument}`
  seoPage: 'privacy' | 'terms' | 'refund' | 'esimPrivacy' | 'esimTerms' | 'esimRefund'
}

export const LEGAL_DOCUMENTS: readonly LegalDocumentDefinition[] = [
  { product: 'vpn', document: 'privacy', path: '/privacy', translationPrefix: 'legal.vpn.privacy', seoPage: 'privacy' },
  { product: 'vpn', document: 'terms', path: '/terms', translationPrefix: 'legal.vpn.terms', seoPage: 'terms' },
  { product: 'vpn', document: 'refund', path: '/refund', translationPrefix: 'legal.vpn.refund', seoPage: 'refund' },
  { product: 'esim', document: 'privacy', path: '/esim/privacy', translationPrefix: 'legal.esim.privacy', seoPage: 'esimPrivacy' },
  { product: 'esim', document: 'terms', path: '/esim/terms', translationPrefix: 'legal.esim.terms', seoPage: 'esimTerms' },
  { product: 'esim', document: 'refund', path: '/esim/refund', translationPrefix: 'legal.esim.refund', seoPage: 'esimRefund' },
]
```

Build `DOCUMENTS_BY_PRODUCT` from this constant and implement `getLegalDocument` to throw an explicit error for an unknown pair.

- [ ] **Step 5: Run the registry test to confirm the green state**

Run:

```bash
npm test -- src/legal/documentRegistry.test.ts
```

Expected: PASS with three tests.

- [ ] **Step 6: Commit the isolated registry change**

```bash
git add package.json package-lock.json vite.config.ts src/legal/documentRegistry.ts src/legal/documentRegistry.test.ts
git commit -m "test: add legal document registry"
```

### Task 2: Migrate legal localization to product-scoped keys and add deterministic validation

**Files:**
- Create: `scripts/migrate-legal-product-keys.mjs`
- Create: `scripts/verify-legal-locales.mjs`
- Create: `scripts/esim-privacy-bodies/{ar,cs,de,en,fr,id,ja,ko,pl,pt-BR,ru,th,tl,zh-CN}.txt`
- Create: `scripts/esim-terms-bodies/{ar,cs,de,en,fr,id,ja,ko,pl,pt-BR,ru,th,tl,zh-CN}.txt`
- Create: `scripts/esim-refund-bodies/{ar,cs,de,en,fr,id,ja,ko,pl,pt-BR,ru,th,tl,zh-CN}.txt`
- Modify: `scripts/sync-privacy-bodies.mjs`
- Modify: `scripts/sync-terms-bodies.mjs`
- Modify: `scripts/sync-refund-bodies.mjs`
- Modify: `src/i18n/locales/ar.json`
- Modify: `src/i18n/locales/cs.json`
- Modify: `src/i18n/locales/de.json`
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/fr.json`
- Modify: `src/i18n/locales/id.json`
- Modify: `src/i18n/locales/ja.json`
- Modify: `src/i18n/locales/ko.json`
- Modify: `src/i18n/locales/pl.json`
- Modify: `src/i18n/locales/pt-BR.json`
- Modify: `src/i18n/locales/ru.json`
- Modify: `src/i18n/locales/th.json`
- Modify: `src/i18n/locales/tl.json`
- Modify: `src/i18n/locales/zh-CN.json`
- Modify: `package.json`

**Interfaces:**
- Consumes: `LegalProduct`, `LegalDocument`, and the 14-locale list fixed in Task 1.
- Produces: `legal.vpn.<document>`, `legal.esim.<document>`, and `documents.*` i18n keys in every locale; `npm run verify:legal` exits non-zero on missing source text, missing localized UI key, or a mismatched product/document body.

- [ ] **Step 1: Write the failing locale verification script**

Create `scripts/verify-legal-locales.mjs` using `node:fs` and `node:path`. It must define this exact locale list:

```js
const LOCALES = ['ar', 'cs', 'de', 'en', 'fr', 'id', 'ja', 'ko', 'pl', 'pt-BR', 'ru', 'th', 'tl', 'zh-CN']
const DOCUMENTS = ['privacy', 'terms', 'refund']
```

For every locale, validate all of the following:

```js
locale.legal.vpn[document].title
locale.legal.vpn[document].body
locale.legal.esim[document].title
locale.legal.esim[document].body
locale.documents.title
locale.documents.intro
locale.documents.products.vpn.title
locale.documents.products.esim.title
locale.documents.documents[document]
```

The script must also check for the 42 eSIM source files and fail with the exact missing path. Add this package script:

```json
"verify:legal": "node scripts/verify-legal-locales.mjs"
```

- [ ] **Step 2: Run the verifier to confirm the red state**

Run:

```bash
npm run verify:legal
```

Expected: FAIL because `legal.vpn` and `legal.esim` namespaces and the eSIM body files do not yet exist.

- [ ] **Step 3: Migrate every locale without losing existing VPN or contact copy**

Implement `scripts/migrate-legal-product-keys.mjs`. For each locale JSON it must:

1. Move existing `legal.privacy`, `legal.terms`, and `legal.refund` into `legal.vpn`.
2. Preserve `legal.contact` unchanged.
3. Create empty object slots `legal.esim.privacy`, `legal.esim.terms`, and `legal.esim.refund` before sync fills body text.
4. Add localized `documents` labels and localized VPN/eSIM product names.
5. Leave every unrelated key byte-for-byte semantically unchanged.

Run the migration once. Do not leave the migration script as a required production build step; retain it as an auditable one-time migration tool.

- [ ] **Step 4: Update VPN synchronisation scripts**

Change each existing sync script so it writes to the nested VPN key:

```js
data.legal.vpn.privacy.body = body
data.legal.vpn.terms.body = body
data.legal.vpn.refund.body = body
```

Keep the existing source directories `scripts/privacy-bodies`, `scripts/terms-bodies`, and `scripts/refund-bodies`; they remain the VPN source of truth.

- [ ] **Step 5: Add three eSIM synchronisation scripts**

Create `scripts/sync-esim-privacy-bodies.mjs`, `scripts/sync-esim-terms-bodies.mjs`, and `scripts/sync-esim-refund-bodies.mjs`. Each follows the existing script pattern, uses the exact 14-locale map, reads its matching `scripts/esim-*-bodies` directory, normalizes CRLF to LF, and writes to `data.legal.esim.<document>.body`.

Add scripts:

```json
{
  "sync:legal:vpn": "node scripts/sync-privacy-bodies.mjs && node scripts/sync-terms-bodies.mjs && node scripts/sync-refund-bodies.mjs",
  "sync:legal:esim": "node scripts/sync-esim-privacy-bodies.mjs && node scripts/sync-esim-terms-bodies.mjs && node scripts/sync-esim-refund-bodies.mjs",
  "sync:legal": "npm run sync:legal:vpn && npm run sync:legal:esim && npm run verify:legal"
}
```

- [ ] **Step 6: Write the approved VPN and eSIM source copy in all 14 locales**

Update every existing VPN source body so its title and scope explicitly name **Raqoon VPN**. Preserve VPN-specific no-logs, app-store, billing, and refund language; do not add eSIM data processing or carrier statements to those documents.

For each eSIM privacy source body, use these numbered sections in the locale's native language:

```text
1. Controller and scope
2. Raqoon's role as retail reseller
3. Data categories
4. Processing purposes and legal grounds
5. Recipients and international transfers
6. Retention, security, and user rights
7. Support and contact information
8. Changes to this policy
```

For each eSIM terms source body, use these numbered sections:

```text
1. Seller, acceptance, and eligibility
2. Prepaid Travel eSIM data-plan product
3. Raqoon reseller role and third-party technical providers
4. Device compatibility, QR code, installation, activation, and validity
5. Coverage, quality, fair use, and prohibited uses
6. Türkiye exclusion, conditional on verified provider coverage
7. Orders, price, taxes, payments, and top-ups
8. Support, limitations, and mandatory consumer rights
9. Turkish governing law, jurisdiction, and changes
```

For each eSIM refund source body, use these numbered sections:

```text
1. Scope and mandatory consumer rights
2. Unused and uninstalled profile cancellation
3. Installed, activated, or used profile technical review
4. Non-refundable circumstances permitted by law
5. Request channel, evidence, and review outcome
6. Chargebacks and payment-provider rules
```

The exact company address, processor/controller roles, payment processor, data-transfer locations/safeguards, customer-support SLA, and the verified Türkiye coverage position must be inserted only after they are supplied by the business and eSIMAccess. If any fact remains unverified, keep the release blocked instead of inventing it in a translation.

- [ ] **Step 7: Synchronise bodies and run the verifier to confirm the green state**

Run:

```bash
npm run sync:legal
```

Expected: every locale JSON is updated and `verify:legal` reports success.

- [ ] **Step 8: Commit the localization architecture and approved copy**

```bash
git add package.json scripts src/i18n/locales
git commit -m "feat: add localized product legal content"
```

### Task 3: Render product-scoped legal documents and the catalogue page

**Files:**
- Create: `src/pages/DocumentsPage.tsx`
- Create: `src/pages/DocumentsPage.module.css`
- Create: `src/pages/DocumentsPage.test.tsx`
- Modify: `src/pages/LegalPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Footer/Footer.tsx`
- Modify: `src/legal/documentRegistry.test.ts`

**Interfaces:**
- Consumes: `LEGAL_DOCUMENTS`, `DOCUMENTS_BY_PRODUCT`, `LegalProduct`, and `LegalDocument` from `src/legal/documentRegistry.ts`.
- Produces: a reusable `LegalPage` accepting `{ product: LegalProduct; document: LegalDocument }` and a route-ready `DocumentsPage`.

- [ ] **Step 1: Extend the failing test to cover rendered grouping and product scope**

Add this assertion to `src/legal/documentRegistry.test.ts`:

```ts
it('keeps a VPN document and its eSIM counterpart under different translation prefixes', () => {
  expect(getLegalDocument('vpn', 'privacy').translationPrefix).toBe('legal.vpn.privacy')
  expect(getLegalDocument('esim', 'privacy').translationPrefix).toBe('legal.esim.privacy')
})
```

Create `src/pages/DocumentsPage.test.tsx` with a test i18n instance that returns each requested key and render inside `MemoryRouter`:

```tsx
it('renders two products and six distinct document destinations', () => {
  render(
    <MemoryRouter>
      <DocumentsPage />
    </MemoryRouter>,
  )

  expect(screen.getAllByRole('heading')).toHaveLength(3)
  expect(screen.getByRole('link', { name: 'documents.documents.privacy' })).toHaveAttribute('href', '/privacy')
  expect(screen.getByRole('link', { name: 'documents.documents.refund' })).toHaveAttribute('href', '/refund')
  expect(screen.getAllByRole('link')).toHaveLength(6)
})
```

Name the six links with product-prefixed accessible labels in the component (`Raqoon VPN — Privacy Policy`, for example), then update the test to use those exact labels so duplicate document names cannot make the test ambiguous.

- [ ] **Step 2: Run UI tests to confirm the red state**

Run:

```bash
npm test -- src/legal/documentRegistry.test.ts src/pages/DocumentsPage.test.tsx
```

Expected: FAIL because `DocumentsPage` does not exist and `LegalPage` has no product-scoped interface.

- [ ] **Step 3: Implement `DocumentsPage`**

Build the page with the existing `Header`, `Footer`, `SEOHead`, `.container`, and typography conventions. Iterate `DOCUMENTS_BY_PRODUCT.vpn` and `.esim`; do not hard-code six duplicate JSX link blocks. Use:

```tsx
<Link
  to={definition.path}
  aria-label={`${t(`documents.products.${definition.product}.title`)} — ${t(`documents.documents.${definition.document}`)}`}
>
  {t(`documents.documents.${definition.document}`)}
</Link>
```

Use a responsive two-card CSS grid that collapses to one column at `768px`. Cards need a visible border, title, and stacked document links; they must reuse existing tokens and not introduce a new color system.

- [ ] **Step 4: Refactor `LegalPage` to use the registry**

Replace `LegalKey` with props:

```ts
interface LegalPageProps {
  product: LegalProduct
  document: LegalDocument
}
```

Resolve the definition through `getLegalDocument(product, document)`, then render:

```tsx
<SEOHead variant={variant} page={definition.seoPage} />
<h1>{t(`${definition.translationPrefix}.title`)}</h1>
<p>{t(`${definition.translationPrefix}.body`)}</p>
```

Keep `window.scrollTo` behaviour, header/footer composition, and the current legal `white-space: pre-line` presentation.

- [ ] **Step 5: Wire every route, including legal accessibility under Turkey-only mode**

In `App.tsx`, lazy-load `DocumentsPage` and create these routes in the standard route block:

```tsx
<Route path="/documents" element={<DocumentsPage />} />
<Route path="/privacy" element={<LegalPage product="vpn" document="privacy" />} />
<Route path="/terms" element={<LegalPage product="vpn" document="terms" />} />
<Route path="/refund" element={<LegalPage product="vpn" document="refund" />} />
<Route path="/esim/privacy" element={<LegalPage product="esim" document="privacy" />} />
<Route path="/esim/terms" element={<LegalPage product="esim" document="terms" />} />
<Route path="/esim/refund" element={<LegalPage product="esim" document="refund" />} />
```

Duplicate only the seven legal/document routes into the `turkeyOnlyMode` route block. Access to legal information is not a product offer and must remain possible even where the product landing page is geo-restricted.

- [ ] **Step 6: Replace only the three legal footer links with the documents catalogue link**

In `Footer.tsx`, remove links to `/privacy`, `/terms`, and `/refund`. Add one link:

```tsx
<Link to="/documents" className={styles.link}>
  {t('footer.documents')}
</Link>
```

Keep FAQ, referral, about, download, beta/RosVPN conditional links, and contact unchanged.

- [ ] **Step 7: Run UI and type tests to confirm the green state**

Run:

```bash
npm test -- src/legal/documentRegistry.test.ts src/pages/DocumentsPage.test.tsx
npm run build
```

Expected: all tests PASS and TypeScript/Vite build completes successfully.

- [ ] **Step 8: Commit the public document UI**

```bash
git add src/App.tsx src/components/Footer/Footer.tsx src/pages src/legal
git commit -m "feat: add product documents catalogue"
```

### Task 4: Add localized SEO metadata and sitemap coverage

**Files:**
- Modify: `src/seo/SEOHead.tsx`
- Modify: `vite.config.ts`
- Modify: `src/i18n/locales/ar.json`
- Modify: `src/i18n/locales/cs.json`
- Modify: `src/i18n/locales/de.json`
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/fr.json`
- Modify: `src/i18n/locales/id.json`
- Modify: `src/i18n/locales/ja.json`
- Modify: `src/i18n/locales/ko.json`
- Modify: `src/i18n/locales/pl.json`
- Modify: `src/i18n/locales/pt-BR.json`
- Modify: `src/i18n/locales/ru.json`
- Modify: `src/i18n/locales/th.json`
- Modify: `src/i18n/locales/tl.json`
- Modify: `src/i18n/locales/zh-CN.json`
- Create: `src/seo/SEOHead.test.tsx`

**Interfaces:**
- Consumes: the six registry `seoPage` values and every locale's `meta` key family.
- Produces: accurate document titles/descriptions/canonicals and seven legal/document sitemap entries.

- [ ] **Step 1: Write the failing eSIM metadata test**

Create `src/seo/SEOHead.test.tsx` that renders `SEOHead` with a test i18n translation map and `MemoryRouter initialEntries={['/esim/privacy']}`. Assert the document head contains the dedicated eSIM privacy title and canonical path:

```tsx
expect(document.title).toBe('Raqoon eSIM Privacy Policy')
expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
  'href',
  'https://www.raqoon.app/esim/privacy',
)
```

- [ ] **Step 2: Run the metadata test to confirm the red state**

Run:

```bash
npm test -- src/seo/SEOHead.test.tsx
```

Expected: FAIL because `SeoPage` and `resolveMeta` do not support `esimPrivacy`.

- [ ] **Step 3: Extend SEO page types and translations**

Add `documents`, `esimPrivacy`, `esimTerms`, and `esimRefund` to `SeoPage`. Add an explicit `resolveMeta` case for these four values that reads:

```ts
meta.documentsTitle${suffix}
meta.documentsDescription${suffix}
meta.esimPrivacyTitle${suffix}
meta.esimPrivacyDescription${suffix}
meta.esimTermsTitle${suffix}
meta.esimTermsDescription${suffix}
meta.esimRefundTitle${suffix}
meta.esimRefundDescription${suffix}
```

Use the same title for Open Graph title and the same description for Open Graph description. Add complete translated values for all eight keys per locale (`RU` and `WW` variants, matching the project's existing metadata convention).

Use the generic site name `Raqoon` for document/eSIM pages while preserving current VPN naming on existing VPN marketing pages.

- [ ] **Step 4: Add the new discoverable pages to the sitemap list**

Add these `SEO_ROUTES` entries in `vite.config.ts`:

```ts
{ path: '/documents', priority: '0.5', changefreq: 'yearly' },
{ path: '/esim/privacy', priority: '0.5', changefreq: 'yearly' },
{ path: '/esim/terms', priority: '0.5', changefreq: 'yearly' },
{ path: '/esim/refund', priority: '0.5', changefreq: 'yearly' },
```

- [ ] **Step 5: Run the metadata test and production build to confirm the green state**

Run:

```bash
VITE_SITE_URL=https://www.raqoon.app npm test -- src/seo/SEOHead.test.tsx
VITE_SITE_URL=https://www.raqoon.app npm run build
rg -n '<loc>https://www\.raqoon\.app/(documents|esim/privacy|esim/terms|esim/refund)</loc>' dist/sitemap.xml
```

Expected: metadata test PASS; build succeeds; all four new sitemap URLs are found.

- [ ] **Step 6: Commit SEO coverage**

```bash
git add src/seo/SEOHead.tsx src/seo/SEOHead.test.tsx vite.config.ts src/i18n/locales
git commit -m "feat: add eSIM legal SEO metadata"
```

### Task 5: Validate the released content and record the legal release gate

**Files:**
- Create: `docs/legal/product-documents-release-checklist.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: completed routes, localized source files, generated JSON, eSIMAccess written confirmations, and Turkish counsel review.
- Produces: a reproducible release checklist and documented commands for future legal-copy updates.

- [ ] **Step 1: Write the release checklist before final verification**

Create `docs/legal/product-documents-release-checklist.md` with checkboxes for:

```text
- Exact Turkish legal entity name, registered address, support address, and privacy address verified.
- Merchant of record and payment processor verified.
- eSIMAccess contract, DPA/role description, recipient countries, and transfer safeguard confirmed.
- Every listed eSIM plan excludes Türkiye and cannot register on Turkish public mobile networks, or all Türkiye-exclusion wording is removed.
- Turkish telecom counsel approves the reseller/retailer positioning.
- Turkish-law copy and every one of the fourteen locale translations have human legal-language review.
- Checkout contains the required pre-contract information and required immediate-supply/withdrawal acknowledgement where applicable.
- Production sitemap contains all seven legal/document routes.
```

- [ ] **Step 2: Document the legal-content maintenance workflow**

Add a concise `README.md` section:

```markdown
## Updating legal documents

1. Edit the appropriate locale source body in `scripts/*-bodies/`.
2. Run `npm run sync:legal`.
3. Run `npm test` and `npm run build`.
4. Complete `docs/legal/product-documents-release-checklist.md` before deployment.
```

- [ ] **Step 3: Run the complete automated verification suite**

Run:

```bash
npm run verify:legal
npm test
VITE_SITE_URL=https://www.raqoon.app npm run build
```

Expected: all three commands exit with code 0.

- [ ] **Step 4: Complete the manual browser route matrix**

In a production build or preview, inspect `/documents`, `/privacy`, `/terms`, `/refund`, `/esim/privacy`, `/esim/terms`, and `/esim/refund` for English, Russian, and one non-Latin locale (`ar`, `ja`, `ko`, or `zh-CN`). Confirm the following on each checked page:

```text
- Correct product name and document title.
- Correct localized body, with preserved section breaks and no VPN/eSIM cross-over.
- Correct footer Documents destination.
- Correct browser title, meta description, canonical URL, and Open Graph title.
- Keyboard-visible links and a one-column readable layout at 375px width.
- Direct legal URLs still render when `VITE_ENABLE_TURKEY_GEOLOCK=true` and country code is `TR`.
```

- [ ] **Step 5: Commit the release documentation**

```bash
git add README.md docs/legal/product-documents-release-checklist.md
git commit -m "docs: add legal documents release checklist"
```

## Plan self-review

## Mandatory release condition

This implementation is not complete until the changes are deployed to production and the live legal routes return the updated content. A local build, commit, or push alone is not a completion condition. If the primary workspace blocks a build or push, use a clean checkout to complete deployment and verify the live site before reporting completion.

- **Spec coverage:** Tasks 1–3 cover the product/route model, reusable page, catalogue, footer, localization, and legal content. Task 4 covers SEO and sitemap. Task 5 covers release prerequisites and all stated acceptance checks.
- **No placeholders:** The plan names all routes, locales, files, i18n keys, command names, document sections, and required verification commands. Business facts that cannot safely be inferred are explicit publication gates, not invented copy.
- **Type consistency:** `LegalProduct`, `LegalDocument`, `LEGAL_DOCUMENTS`, `DOCUMENTS_BY_PRODUCT`, and `getLegalDocument` are introduced once in Task 1 and consumed consistently in later tasks.
