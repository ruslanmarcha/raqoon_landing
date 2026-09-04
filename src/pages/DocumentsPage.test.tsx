import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import i18n from '../i18n'
import { LocalePolicyProvider } from '../contexts/LocalePolicyContext'
import { ProfilePortalProvider } from '../contexts/ProfilePortalContext'
import { DocumentsPage } from './DocumentsPage'

describe('DocumentsPage', () => {
  it('renders two product sections with six distinct legal document destinations', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <LocalePolicyProvider
            allowLanguageSwitch={false}
            countryCode={null}
            allowedLanguages={['en']}
            isEUVisitor={false}
          >
            <ProfilePortalProvider>
              <MemoryRouter>
                <DocumentsPage />
              </MemoryRouter>
            </ProfilePortalProvider>
          </LocalePolicyProvider>
        </HelmetProvider>
      </I18nextProvider>,
    )

    expect(screen.getAllByRole('heading')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'Raqoon VPN — Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy',
    )
    expect(screen.getByRole('link', { name: 'Raqoon VPN — Refund Policy' })).toHaveAttribute(
      'href',
      '/refund',
    )
    expect(screen.getByRole('link', { name: 'Raqoon Travel eSIM — Privacy Policy' })).toHaveAttribute(
      'href',
      '/esim/privacy',
    )
    expect(screen.getAllByRole('link', {
      name: /Raqoon (VPN|Travel eSIM) — (Privacy Policy|Terms of Use|Refund Policy)/,
    })).toHaveLength(6)
  })
})
