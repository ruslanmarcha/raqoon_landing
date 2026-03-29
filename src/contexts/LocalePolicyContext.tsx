import { createContext, useContext, type ReactNode } from 'react'

type LocalePolicyContextValue = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  isTurkeyVisitor: boolean
  /** EU/EEA/UK по гео — для cookie consent. */
  isEUVisitor: boolean
  allowedLanguages: string[]
}

const LocalePolicyContext = createContext<LocalePolicyContextValue>({
  allowLanguageSwitch: false,
  countryCode: null,
  isTurkeyVisitor: false,
  isEUVisitor: false,
  allowedLanguages: ['en'],
})

type LocalePolicyProviderProps = {
  allowLanguageSwitch: boolean
  countryCode: string | null
  allowedLanguages: string[]
  isEUVisitor: boolean
  children: ReactNode
}

export function LocalePolicyProvider({
  allowLanguageSwitch,
  countryCode,
  allowedLanguages,
  isEUVisitor,
  children,
}: LocalePolicyProviderProps) {
  return (
    <LocalePolicyContext.Provider
      value={{
        allowLanguageSwitch,
        countryCode,
        isTurkeyVisitor: countryCode === 'TR',
        isEUVisitor,
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
