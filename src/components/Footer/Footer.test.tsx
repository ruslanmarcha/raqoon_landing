import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { Footer } from './Footer'

describe('Footer', () => {
  it('keeps the legal-documents entry point while omitting duplicate company and contact links', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </I18nextProvider>,
    )

    expect(screen.getByRole('link', { name: i18n.t('footer.documents') })).toHaveAttribute('href', '/documents')
    expect(screen.queryByRole('link', { name: i18n.t('footer.about') })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: i18n.t('footer.contact') })).not.toBeInTheDocument()
  })
})
