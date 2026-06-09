import { useEffect, useState } from 'react'
import { BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Container, Section, Reveal, Stars } from '@/components/site/primitives'
import { REVIEWS, SITE } from '@/lib/site-data'

const AVATAR_COLORS = [
  'bg-[#082C42]',
  'bg-[#2FB0C6]',
  'bg-[#1D6675]',
  'bg-[#0a3550]',
  'bg-[#2C8EA7]',
  'bg-[#082C42]',
]

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
    <div>
      <Carousel setApi={setApi} opts={{ align: 'start', loop: true }}>
        <CarouselContent className="-ml-3">
          {REVIEWS.map((review, i) => (
            <CarouselItem key={review.name} className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3">
              <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full text-xs font-bold text-white',
                      AVATAR_COLORS[i % AVATAR_COLORS.length]
                    )}
                  >
                    {review.initials}
                  </span>
                  <div>
                    <figcaption className="text-sm font-semibold text-[#082C42]">
                      {review.name}
                    </figcaption>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                  <Stars rating={review.rating} size={12} className="ml-auto" />
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-[#2FB0C6]">
                  <BadgeCheck className="size-3.5" />
                  Verified traveler
                </p>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-5 flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-full"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous review"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="text-xs text-muted-foreground">
          {current + 1} / {REVIEWS.length}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-full"
          onClick={() => api?.scrollNext()}
          aria-label="Next review"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export function Reviews() {
  return (
    <Section id="reviews" className="bg-white py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2FB0C6]">
                Traveler reviews
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#082C42] sm:text-3xl">
                {SITE.rating}/5 from {SITE.reviewCount.toLocaleString()}+ travelers
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60} className="mt-8">
          <SpotlightCarousel />
        </Reveal>
      </Container>
    </Section>
  )
}
