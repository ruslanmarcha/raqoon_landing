import { Header } from '../components/Header/Header'
import { Hero } from '../components/Hero/Hero'
import { Pricing } from '../components/Pricing/Pricing'
import { Referral } from '../components/Referral/Referral'
import { FAQ } from '../components/FAQ/FAQ'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'

export function LandingRU() {
  return (
    <>
      <SEOHead variant="ru" />
      <Header />
      <main>
        <Hero variant="ru" />
        <Pricing />
        <Referral />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
