# Product Documents Design

## Goal

Turn the legal area of raqoon.app into a product-based document catalogue while preserving the existing public VPN URLs. Add a separate Travel eSIM legal set that describes Raqoon as a retail reseller of prepaid digital travel-data plans, not as a network operator.

## Scope

This change covers the public website only:

- a new `/documents` catalogue page;
- existing VPN legal routes, retaining their exact URLs: `/privacy`, `/terms`, and `/refund`;
- three new eSIM legal routes: `/esim/privacy`, `/esim/terms`, and `/esim/refund`;
- footer navigation;
- SEO metadata for the catalogue and eSIM documents;
- all supported website locales: `en`, `ru`, `ar`, `cs`, `de`, `fr`, `id`, `ja`, `ko`, `pl`, `pt-BR`, `th`, `tl`, and `zh-CN`.

It does not add a checkout, eSIM catalogue, payment flow, geo-block, product activation, customer account, or API integration. The legal copy must not claim that technical restrictions exist unless those restrictions are separately implemented and verified.

## Product and route model

| Product | Document | Public route | Legacy status |
| --- | --- | --- | --- |
| Raqoon VPN | Privacy Policy | `/privacy` | Preserved |
| Raqoon VPN | Terms of Use | `/terms` | Preserved |
| Raqoon VPN | Refund Policy | `/refund` | Preserved |
| Raqoon eSIM | Privacy Policy | `/esim/privacy` | New |
| Raqoon eSIM | Terms of Use | `/esim/terms` | New |
| Raqoon eSIM | Refund Policy | `/esim/refund` | New |

`/documents` is the canonical discovery page. It shows two product sections, each with the three document links above. The footer links only to `/documents`; existing direct VPN links remain valid for stores, portals, and other third parties.

## UI and component design

### Document catalogue

Create a `DocumentsPage` that uses the established header, footer, page container, and site typography. It has:

1. a localized page title and short introduction;
2. a **Raqoon VPN** card with three localized links;
3. a **Raqoon eSIM** card with three localized links.

The page is a catalogue, not legal content. Links must use React Router `Link`, preserve the active language, and be keyboard accessible. The layout must remain readable on narrow screens without adding a new design system.

### Reusable legal page

Refactor `LegalPage` from a `legalKey`-only interface to a two-dimensional product/document interface:

- `product`: `vpn` or `esim`;
- `document`: `privacy`, `terms`, or `refund`.

The page reads `legal.<product>.<document>.title` and `.body`. Existing routes pass `product="vpn"`; eSIM routes pass `product="esim"`. This prevents copy from one product accidentally appearing under the other product's URL.

Contact details remain outside this project unless the existing `contact` route needs a separate follow-up decision.

## Localization and source-of-truth design

Long legal bodies remain outside locale JSON:

- existing `scripts/privacy-bodies`, `scripts/terms-bodies`, and `scripts/refund-bodies` become explicitly VPN source bodies, or are superseded by product-specific VPN directories without changing the published content;
- add parallel eSIM source directories for privacy, terms, and refunds, with one UTF-8 `.txt` file for each supported locale;
- add safe, deterministic sync scripts that copy each text body into the corresponding `legal.esim.<document>.body` locale key;
- JSON keeps short UI labels, titles, SEO text, and the synced bodies consumed at runtime.

Every source document is authored and maintained in English and Russian, then published in full in the remaining twelve locales. Legal translation review is an operational requirement after deployment; there must be no “English only” fallback inside a localized legal page.

## Legal-copy boundaries

The legal copy is informational product documentation, not a substitute for a Turkish telecom or consumer-law opinion. It must consistently use the following facts and avoid unsupported conclusions.

### Common eSIM positioning

- Raqoon is an independent retail seller/reseller of prepaid digital Travel eSIM data plans.
- Third-party eSIM-provisioning and mobile-network providers technically issue profiles and provide connectivity.
- Raqoon does not own or operate a public electronic communications network, allocate telephone numbers, or provide voice/SMS service.
- The app may deliver order information, activation instructions, plan information, status/balance display, support, and top-up management.
- The product is for temporary travel use on compatible consumer devices. It is not a replacement for a local long-term mobile service, and the provider may apply plan-specific fair-use, device, coverage, and network restrictions.

### Türkiye exclusion

The product copy must say that Travel eSIM is not offered, sold, activated, or intended for use in Türkiye, and that Türkiye is not included in the advertised coverage of plans sold by Raqoon.

Before publishing this assertion, the business must obtain written confirmation from eSIMAccess (or the relevant technical provider) that every available plan excludes Türkiye and cannot use Turkish public mobile networks. If that confirmation or a technical catalogue filter is absent, the statement must be revised before release rather than treated as a legal disclaimer.

### Governing law and consumer rights

The documents identify the Turkish Raqoon legal entity, include its full legal name and registered address, and state Turkish law as the governing law. They preserve mandatory consumer rights that cannot lawfully be excluded in the consumer's habitual country of residence.

They do not claim a blanket worldwide “no refund” rule. For eligible unused and uninstalled profiles, the refund policy specifies cancellation and refund handling. Installed, activated, or used profiles are assessed for a technical provisioning failure, while mandatory consumer protections remain unaffected.

### eSIM Privacy Policy

The eSIM policy describes only data actually processed in the eSIM flow, including as applicable: contact/delivery information, order and transaction identifiers, selected plan, QR/activation information, ICCID or comparable technical identifiers, activation and plan status, remaining allowance, top-up information, support messages, fraud/abuse signals, and payment-provider transaction references. It expressly states that payment-card details are handled by the payment provider and are not stored by Raqoon where that is true.

It identifies the Turkish company as controller for Raqoon-collected data and names categories of recipients: eSIM provisioning provider, underlying mobile-network providers, payment provider, hosting/support providers, and regulators where legally required. It must describe international transfers accurately after the actual vendors, countries, roles, and transfer safeguards are confirmed. VPN no-logs statements do not apply to mobile-network data usage.

### eSIM Terms of Use

The terms define the eSIM plan as a prepaid digital travel-data product. They cover device compatibility and device lock status, plan-specific coverage/validity/activation conditions, QR-code confidentiality, limited transfer/reinstallation rules, expected but non-guaranteed coverage and speed, fair use and prohibited abuse, support escalation, top-ups, price/tax disclosures, and limitations permitted by mandatory law.

### eSIM Refund Policy

The refund policy distinguishes an unused/uninstalled profile from an installed, activated, or used profile. It states the support contact, the information needed to investigate an incident, the handling sequence, and that Raqoon cannot promise a refund for circumstances outside its reasonable control while preserving mandatory consumer rights.

## SEO

Add localized SEO titles and descriptions for the documents catalogue and the three eSIM documents. Existing VPN title/description keys are renamed or mapped without changing their visible pages. Canonical URL generation must support each new route and remain consistent with the current locale strategy.

## Verification and acceptance criteria

1. All seven routes render correctly in every supported locale.
2. `/privacy`, `/terms`, and `/refund` keep showing VPN-only document titles and bodies.
3. Each `/esim/...` URL renders eSIM-only document content, never VPN copy.
4. `/documents` contains exactly two product sections and six working document links.
5. Footer contains the localized documents link and no longer relies on three separate legal links.
6. Each locale JSON remains valid and has all required VPN/eSIM legal keys.
7. All legal source-text directories contain exactly one body for every supported locale; sync scripts fail clearly when a body is missing.
8. `npm run build` passes.
9. A route-by-route manual check confirms titles, language switching, browser back navigation, narrow-screen layout, and SEO head metadata.

## Preconditions before public release

- Turkish telecom counsel confirms the reseller/retailer positioning for the exact sales and technical flow.
- eSIMAccess supplies the data-processing agreement or role/recipient documentation and cross-border transfer details.
- eSIMAccess confirms the plan catalogue and network coverage exclude Türkiye, if that exclusion is stated.
- A qualified reviewer validates Turkish-law source copy and every published translation.
