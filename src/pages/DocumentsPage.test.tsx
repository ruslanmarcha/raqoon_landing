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
  it('renders VPN, eSIM and corporate sections with the checkout documents', () => {
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

    expect(screen.getAllByRole('heading')).toHaveLength(4)
    expect(screen.getByRole('link', { name: 'Raqoon VPN — Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy',
    )
    expect(screen.getByRole('link', { name: 'Raqoon VPN — Refund Policy' })).toHaveAttribute(
      'href',
      '/refund',
    )
    expect(screen.getByRole('link', { name: 'Raqoon eSIM — Privacy Policy' })).toHaveAttribute(
      'href',
      '/esim/privacy',
    )
    expect(screen.getByRole('link', { name: 'Raqoon eSIM — Distance Sales Agreement' })).toHaveAttribute(
      'href',
      '/esim/distance-sales',
    )
    expect(screen.getByRole('link', { name: 'Corporate — KVKK Information Notice' })).toHaveAttribute('href', '/kvkk')
    expect(screen.getAllByRole('link', { name: /^(Raqoon VPN|Raqoon eSIM|Corporate) —/ })).toHaveLength(10)
  })
})
