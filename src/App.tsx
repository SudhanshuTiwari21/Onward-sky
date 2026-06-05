import { useState } from 'react'
import { Header } from '@/components/Header'
import { BookingFormModal } from '@/components/BookingFormModal'
import { HeroSection } from '@/sections/HeroSection'
import { TrustBarSection } from '@/sections/TrustBarSection'
import { WhyTrustSection } from '@/sections/WhyTrustSection'
import { SocialProofSection } from '@/sections/SocialProofSection'
import { HowItWorksSection } from '@/sections/HowItWorksSection'
import { WhoNeedsSection } from '@/sections/WhoNeedsSection'
import { EmbassySection } from '@/sections/EmbassySection'
import { PnrVerificationSection } from '@/sections/PnrVerificationSection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { FaqSection } from '@/sections/FaqSection'
import { FinalCtaSection } from '@/sections/FinalCtaSection'
import { Footer } from '@/sections/Footer'
import { useLenis } from '@/hooks/useLenis'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  useLenis()

  const openBooking = () => setBookingOpen(true)
  const closeBooking = () => setBookingOpen(false)

  return (
    <div className="min-h-[100dvh] bg-jet">
      <Header onOpenBooking={openBooking} />

      <main>
        <HeroSection onOpenBooking={openBooking} />
        <TrustBarSection />
        <WhyTrustSection />
        <SocialProofSection />
        <HowItWorksSection />
        <WhoNeedsSection />
        <EmbassySection />
        <PnrVerificationSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection onOpenBooking={openBooking} />
      </main>

      <Footer />

      <BookingFormModal isOpen={bookingOpen} onClose={closeBooking} />
    </div>
  )
}
