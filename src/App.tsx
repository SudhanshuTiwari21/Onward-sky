import { Header } from '@/components/site/Header'
import { MobileCtaBar } from '@/components/site/MobileCtaBar'
import { Hero } from '@/sections/Hero'
import { TrustBar } from '@/sections/TrustBar'
import { VerifyAndReceive } from '@/sections/VerifyAndReceive'
import { ComplianceResources } from '@/sections/ComplianceResources'
import { HowItWorks } from '@/sections/HowItWorks'
import { Reviews } from '@/sections/Reviews'
import { Benefits } from '@/sections/Benefits'
import { DocumentComparison } from '@/sections/DocumentComparison'
import { Countries } from '@/sections/Countries'
import { Airlines } from '@/sections/Airlines'
import { Personas } from '@/sections/Personas'
import { Faq } from '@/sections/Faq'
import { FinalCta } from '@/sections/FinalCta'
import { Footer } from '@/sections/Footer'

export default function App() {
  return (
    <div className="relative min-h-[100dvh] bg-background">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <VerifyAndReceive />
        <ComplianceResources />
        <HowItWorks />
        <Benefits />
        <Reviews />
        <DocumentComparison />
        <Countries />
        <Airlines />
        <Personas />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  )
}
