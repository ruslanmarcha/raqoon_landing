import { describe, expect, it } from 'vitest'
import { DOCUMENTS_BY_PRODUCT, LEGAL_DOCUMENTS, getLegalDocument } from './documentRegistry'

describe('legal document registry', () => {
  it('keeps stable VPN URLs and exposes the eSIM and corporate documents required for checkout', () => {
    expect(LEGAL_DOCUMENTS.map(({ path }) => path)).toEqual([
      '/privacy',
      '/terms',
      '/refund',
      '/esim/privacy',
      '/esim/terms',
      '/esim/refund',
      '/esim/distance-sales',
      '/about',
      '/contact',
      '/kvkk',
      '/sustainability',
    ])
  })

  it('groups documents by product without duplicating the existing company page', () => {
    expect(DOCUMENTS_BY_PRODUCT.vpn).toHaveLength(3)
    expect(DOCUMENTS_BY_PRODUCT.esim).toHaveLength(4)
    expect(DOCUMENTS_BY_PRODUCT.corporate).toHaveLength(4)
    expect(getLegalDocument('corporate', 'about').path).toBe('/about')
    expect(getLegalDocument('corporate', 'contact').path).toBe('/contact')
  })

  it('resolves an eSIM refund document without returning VPN content', () => {
    expect(getLegalDocument('esim', 'refund')).toMatchObject({
      product: 'esim',
      document: 'refund',
      path: '/esim/refund',
      translationPrefix: 'legal.esim.refund',
    })
  })

  it('keeps a VPN document and its eSIM counterpart under different translation prefixes', () => {
    expect(getLegalDocument('vpn', 'privacy').translationPrefix).toBe('legal.vpn.privacy')
    expect(getLegalDocument('esim', 'privacy').translationPrefix).toBe('legal.esim.privacy')
  })

  it('resolves the eSIM distance-sales agreement independently from the terms of use', () => {
    expect(getLegalDocument('esim', 'distanceSales')).toMatchObject({
      path: '/esim/distance-sales',
      translationPrefix: 'legal.esim.distanceSales',
    })
  })
})
