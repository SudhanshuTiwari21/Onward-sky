import { Header } from '@/components/site/Header'
import { MobileCtaBar } from '@/components/site/MobileCtaBar'
import { Hero } from '@/sections/Hero'
import { TravelMoments } from '@/sections/TravelMoments'
import { TrustBar } from '@/sections/TrustBar'
import { VerifyAndReceive } from '@/sections/VerifyAndReceive'
import { HowItWorks } from '@/sections/HowItWorks'
import { Reviews } from '@/sections/Reviews'
import { Faq } from '@/sections/Faq'
import { FinalCta } from '@/sections/FinalCta'
import { Footer } from '@/sections/Footer'

/** Visual-first homepage - proof, process, social proof, FAQ. Deeper content lives on sub-pages. */
export default function App() {
  return (
    <div className="relative min-h-[100dvh] bg-background">
      <Header />
      <main>
        <Hero />
        <TravelMoments />
        <TrustBar />
        <VerifyAndReceive />
        <HowItWorks />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  )
}
