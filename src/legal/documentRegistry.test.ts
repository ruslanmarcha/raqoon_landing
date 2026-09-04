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

  it('keeps a VPN document and its eSIM counterpart under different translation prefixes', () => {
    expect(getLegalDocument('vpn', 'privacy').translationPrefix).toBe('legal.vpn.privacy')
    expect(getLegalDocument('esim', 'privacy').translationPrefix).toBe('legal.esim.privacy')
  })
})
