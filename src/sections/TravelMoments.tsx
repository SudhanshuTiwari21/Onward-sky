import { TravelPhoto } from '@/components/site/travel-visuals'
import { Reveal } from '@/components/site/primitives'
import { TRAVEL_MOMENTS } from '@/lib/site-data'

export function TravelMoments() {
  return (
    <section aria-label="Travel moments" className="border-y border-border/60 bg-background">
      <div className="grid sm:grid-cols-3">
        {TRAVEL_MOMENTS.map((photo, i) => (
          <Reveal key={photo.src} delay={i * 60} className="group relative">
            <TravelPhoto
              photo={photo}
              className="aspect-[5/4] sm:aspect-[4/5] lg:aspect-[16/11]"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
              overlay="bottom"
            />
            <p className="pointer-events-none absolute bottom-4 left-4 text-sm font-medium tracking-wide text-white drop-shadow-md">
              {photo.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
