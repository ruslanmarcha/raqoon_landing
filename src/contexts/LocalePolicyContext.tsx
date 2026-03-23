import { createContext, useContext, type ReactNode } from 'react'

type LocalePolicyContextValue = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  isTurkeyVisitor: boolean
}

const LocalePolicyContext = createContext<LocalePolicyContextValue>({
  allowLanguageSwitch: false,
  countryCode: null,
  isTurkeyVisitor: false,
})

type LocalePolicyProviderProps = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  children: ReactNode
}

export function LocalePolicyProvider({
  allowLanguageSwitch,
  countryCode,
  children,
}: LocalePolicyProviderProps) {
  return (
    <LocalePolicyContext.Provider
      value={{
        allowLanguageSwitch,
        countryCode,
        isTurkeyVisitor: countryCode === 'TR',
      }}
    >
      {children}
    </LocalePolicyContext.Provider>
  )
}

export function useLocalePolicy() {
  return useContext(LocalePolicyContext)
}
