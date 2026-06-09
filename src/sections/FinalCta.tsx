import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroTicketPreview, TravelPhoto } from '@/components/site/travel-visuals'
import { Container, Reveal } from '@/components/site/primitives'
import { SITE, TRAVEL_PHOTOS } from '@/lib/site-data'

export function FinalCta() {
  const go = () => document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="get-started" className="relative overflow-hidden py-14 sm:py-20">
      <TravelPhoto
        photo={TRAVEL_PHOTOS.cabinInterior}
        className="absolute inset-0"
        imgClassName="scale-105 object-[center_35%]"
        overlay="dark"
      />
      <div className="absolute inset-0 bg-[#082C42]/75" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need an onward ticket before check-in?
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base text-white/75">
              {SITE.delivery}. Verifiable PNR from {SITE.priceFrom}.
            </p>
            <Button
              onClick={go}
              size="lg"
              className="mt-8 h-12 bg-white px-7 text-base font-semibold text-[#082C42] hover:bg-white/90"
            >
              Book now
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>

          <Reveal delay={80}>
            <HeroTicketPreview from="LIS" to="BKK" className="mx-auto max-w-md lg:ml-auto" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
