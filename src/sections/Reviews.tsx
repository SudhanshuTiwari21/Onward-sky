import { useEffect, useState } from 'react'
import { BadgeCheck, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Container, Section, SectionHeading, Reveal, Stars } from '@/components/site/primitives'
import { REVIEWS, SITE } from '@/lib/site-data'

const AVATAR_COLORS = [
  'bg-[hsl(201_70%_22%)]',
  'bg-primary',
  'bg-[hsl(189_62%_46%)]',
  'bg-[hsl(201_55%_28%)]',
  'bg-[hsl(192_80%_38%)]',
  'bg-[hsl(201_70%_28%)]',
]

function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center sm:gap-x-12">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-semibold tracking-tight">{SITE.rating}</span>
        <div className="text-left">
          <Stars rating={SITE.rating} size={15} />
          <p className="mt-0.5 text-xs text-muted-foreground">Average rating</p>
        </div>
      </div>
      <div className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
      <div>
        <p className="text-lg font-semibold">{SITE.reviewCount.toLocaleString()}+</p>
        <p className="text-xs text-muted-foreground">Verified reviews</p>
      </div>
      <div className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
      <div>
        <p className="text-lg font-semibold">{SITE.travelersServed}</p>
        <p className="text-xs text-muted-foreground">Travelers served</p>
      </div>
    </div>
  )
}

function SpotlightCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="relative">
      <div className="overflow-hidden border-y border-border/70 bg-secondary/20 px-6 py-10 sm:px-10 sm:py-12">
        <Carousel setApi={setApi} opts={{ loop: true, align: 'center' }}>
          <CarouselContent className="-ml-2">
            {REVIEWS.map((review, index) => (
              <CarouselItem key={review.name} className="pl-2">
                <figure className="mx-auto max-w-3xl text-center">
                  <div className="flex justify-center">
                    <Stars rating={review.rating} size={16} />
                  </div>
                  <blockquote className="mt-5 text-pretty text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl sm:leading-snug">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
                    <span
                      className={cn(
                        'flex size-10 items-center justify-center rounded-full text-sm font-semibold text-white',
                        AVATAR_COLORS[index % AVATAR_COLORS.length]
                      )}
                    >
                      {review.initials}
                    </span>
                    <div className="text-center sm:text-left">
                      <span className="block text-sm font-semibold">{review.name}</span>
                      <span className="mt-0.5 flex items-center justify-center gap-1 text-xs text-muted-foreground sm:justify-start">
                        <MapPin className="size-3 shrink-0" />
                        {review.location}
                        <span className="text-border">·</span>
                        {review.role}
                      </span>
                    </div>
                    {review.rating === 5 ? (
                      <BadgeCheck className="size-4 text-success sm:ml-1" aria-label="Verified" />
                    ) : null}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          {REVIEWS.map((review, index) => (
            <button
              key={review.name}
              type="button"
              aria-label={`Review from ${review.name}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === current ? 'w-7 bg-primary' : 'w-2 bg-border hover:bg-primary/40'
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-full"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous review"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-full"
            onClick={() => api?.scrollNext()}
            aria-label="Next review"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ReviewerTicker() {
  const items = [...REVIEWS, ...REVIEWS]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-6 py-1">
        {items.map((review, i) => (
          <span
            key={`${review.name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground"
          >
            <span
              className={cn(
                'flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-white',
                AVATAR_COLORS[i % REVIEWS.length]
              )}
            >
              {review.initials}
            </span>
            <span className="font-medium text-foreground/85">{review.name}</span>
            <span className="text-border">·</span>
            <span>{review.location}</span>
            <Stars rating={review.rating} size={11} className="opacity-80" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function Reviews() {
  return (
    <Section id="reviews" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot opacity-25" />
      </div>

      <Container>
        <SectionHeading
          eyebrow="Loved by travelers"
          title="Real travelers, real onward tickets"
          description="Verified feedback from digital nomads, backpackers and visa applicants who used OnwardSky for proof of onward travel."
        />

        <Reveal delay={50} className="mt-8">
          <TrustStrip />
        </Reveal>

        <Reveal delay={90} className="mt-10 sm:mt-12">
          <SpotlightCarousel />
        </Reveal>

        <Reveal delay={130} className="mt-10 sm:mt-12">
          <ReviewerTicker />
        </Reveal>
      </Container>
    </Section>
  )
}
