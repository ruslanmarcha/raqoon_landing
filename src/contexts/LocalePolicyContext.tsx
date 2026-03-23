import { createContext, useContext, type ReactNode } from 'react'

type LocalePolicyContextValue = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  isTurkeyVisitor: boolean
  allowedLanguages: string[]
}

const LocalePolicyContext = createContext<LocalePolicyContextValue>({
  allowLanguageSwitch: false,
  countryCode: null,
  isTurkeyVisitor: false,
  allowedLanguages: ['en'],
})

type LocalePolicyProviderProps = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  allowedLanguages: string[]
  children: ReactNode
}

export function LocalePolicyProvider({
  allowLanguageSwitch,
  countryCode,
  allowedLanguages,
  children,
}: LocalePolicyProviderProps) {
  return (
    <LocalePolicyContext.Provider
      value={{
        allowLanguageSwitch,
        countryCode,
        isTurkeyVisitor: countryCode === 'TR',
        allowedLanguages,
      }}
    >
      {children}
    </LocalePolicyContext.Provider>
  )
}

export function useLocalePolicy() {
  return useContext(LocalePolicyContext)
}
