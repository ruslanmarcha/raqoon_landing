import { Header } from '../components/Header/Header'
import { Hero } from '../components/Hero/Hero'
import { FeaturesCard } from '../components/FeaturesCard/FeaturesCard'
import { FAQ } from '../components/FAQ/FAQ'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'

export function LandingWW() {
  return (
    <>
      <SEOHead variant="ww" />
      <Header />
      <main>
        <Hero variant="ww" />
        <FeaturesCard />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
