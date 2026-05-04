/**
 * В русской локали CTA «магазины приложений» ведут на /beta (TestFlight / Google Play beta).
 */
export function ruAppStoreCtaPath(language: string): '/beta' | '/download' {
  return language.trim().toLowerCase().startsWith('ru') ? '/beta' : '/download'
}
