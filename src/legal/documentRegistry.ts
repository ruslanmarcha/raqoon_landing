export type LegalProduct = 'vpn' | 'esim' | 'corporate'
export type LegalDocument = 'privacy' | 'terms' | 'refund' | 'distanceSales' | 'about' | 'kvkk' | 'sustainability'

export interface LegalDocumentDefinition {
  product: LegalProduct
  document: LegalDocument
  path: string
  translationPrefix?: `legal.${LegalProduct}.${LegalDocument}`
  seoPage: 'privacy' | 'terms' | 'refund' | 'esimPrivacy' | 'esimTerms' | 'esimRefund' | 'esimDistanceSales' | 'kvkk' | 'sustainability'
}

export const LEGAL_DOCUMENTS: readonly LegalDocumentDefinition[] = [
  { product: 'vpn', document: 'privacy', path: '/privacy', translationPrefix: 'legal.vpn.privacy', seoPage: 'privacy' },
  { product: 'vpn', document: 'terms', path: '/terms', translationPrefix: 'legal.vpn.terms', seoPage: 'terms' },
  { product: 'vpn', document: 'refund', path: '/refund', translationPrefix: 'legal.vpn.refund', seoPage: 'refund' },
  { product: 'esim', document: 'privacy', path: '/esim/privacy', translationPrefix: 'legal.esim.privacy', seoPage: 'esimPrivacy' },
  { product: 'esim', document: 'terms', path: '/esim/terms', translationPrefix: 'legal.esim.terms', seoPage: 'esimTerms' },
  { product: 'esim', document: 'refund', path: '/esim/refund', translationPrefix: 'legal.esim.refund', seoPage: 'esimRefund' },
  { product: 'esim', document: 'distanceSales', path: '/esim/distance-sales', translationPrefix: 'legal.esim.distanceSales', seoPage: 'esimDistanceSales' },
  { product: 'corporate', document: 'about', path: '/about', seoPage: 'sustainability' },
  { product: 'corporate', document: 'kvkk', path: '/kvkk', translationPrefix: 'legal.corporate.kvkk', seoPage: 'kvkk' },
  { product: 'corporate', document: 'sustainability', path: '/sustainability', translationPrefix: 'legal.corporate.sustainability', seoPage: 'sustainability' },
]

export const DOCUMENTS_BY_PRODUCT: Record<LegalProduct, readonly LegalDocumentDefinition[]> = {
  vpn: LEGAL_DOCUMENTS.filter(({ product }) => product === 'vpn'),
  esim: LEGAL_DOCUMENTS.filter(({ product }) => product === 'esim'),
  corporate: LEGAL_DOCUMENTS.filter(({ product }) => product === 'corporate'),
}

export function getLegalDocument(
  product: LegalProduct,
  document: LegalDocument,
): LegalDocumentDefinition {
  const definition = LEGAL_DOCUMENTS.find(
    (entry) => entry.product === product && entry.document === document,
  )

  if (!definition) {
    throw new Error(`Unknown legal document: ${product}/${document}`)
  }

  return definition
}
