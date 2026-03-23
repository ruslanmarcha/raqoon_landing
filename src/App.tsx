import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LandingRU } from './pages/LandingRU'
import { LandingWW } from './pages/LandingWW'
import { MigrationRU } from './pages/MigrationRU'
import { AboutCompany } from './pages/AboutCompany'
import { ComingSoonProvider } from './contexts/ComingSoonContext'

function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
      }}
    />
  )
}

export function App() {
  return (
    <HelmetProvider>
      <ComingSoonProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingRU />} />
              <Route path="/ww" element={<LandingWW />} />
              <Route path="/migration" element={<MigrationRU />} />
              <Route path="/about" element={<AboutCompany />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ComingSoonProvider>
    </HelmetProvider>
  )
}
