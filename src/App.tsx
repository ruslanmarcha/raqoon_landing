import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LandingRU } from './pages/LandingRU'
import { LandingWW } from './pages/LandingWW'

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
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingRU />} />
            <Route path="/ww" element={<LandingWW />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
