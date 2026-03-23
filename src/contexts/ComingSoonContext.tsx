import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { ComingSoonModal } from '../components/ComingSoonModal/ComingSoonModal'

type ComingSoonContextValue = {
  openComingSoon: () => void
}

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null)

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value = useMemo<ComingSoonContextValue>(
    () => ({
      openComingSoon: () => setOpen(true),
    }),
    [],
  )

  return (
    <ComingSoonContext.Provider value={value}>
      {children}
      <ComingSoonModal open={open} onClose={() => setOpen(false)} />
    </ComingSoonContext.Provider>
  )
}

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext)
  if (!ctx) throw new Error('useComingSoon must be used inside ComingSoonProvider')
  return ctx
}

