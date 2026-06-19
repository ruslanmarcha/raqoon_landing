import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { ProfilePortalModal } from '../components/ProfilePortalModal/ProfilePortalModal'

type ProfilePortalContextValue = {
  openProfilePortal: () => void
}

const ProfilePortalContext = createContext<ProfilePortalContextValue | null>(null)

export function ProfilePortalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value = useMemo<ProfilePortalContextValue>(
    () => ({
      openProfilePortal: () => setOpen(true),
    }),
    [],
  )

  return (
    <ProfilePortalContext.Provider value={value}>
      {children}
      <ProfilePortalModal open={open} onClose={() => setOpen(false)} />
    </ProfilePortalContext.Provider>
  )
}

export function useProfilePortal() {
  const ctx = useContext(ProfilePortalContext)
  if (!ctx) throw new Error('useProfilePortal must be used inside ProfilePortalProvider')
  return ctx
}
