import { render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import i18n from '../i18n'
import { SEOHead } from './SEOHead'

describe('SEOHead', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('uses dedicated eSIM privacy metadata and canonical URL', async () => {
    await i18n.changeLanguage('en')

    render(
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <MemoryRouter initialEntries={['/esim/privacy']}>
            <SEOHead variant="ww" page="esimPrivacy" />
          </MemoryRouter>
        </HelmetProvider>
      </I18nextProvider>,
    )

    expect(document.title).toBe('Raqoon eSIM Privacy Policy')
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.raqoon.app/esim/privacy',
    )
  })
})
