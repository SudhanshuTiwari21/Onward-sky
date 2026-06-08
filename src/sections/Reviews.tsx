import { BadgeCheck, MapPin, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container, Section, SectionHeading, Reveal, Stars } from '@/components/site/primitives'
import { REVIEWS, SITE } from '@/lib/site-data'

const AVATAR_COLORS = [
  'from-primary to-[hsl(189_62%_46%)]',
  'from-[hsl(189_62%_46%)] to-[hsl(201_70%_28%)]',
  'from-[hsl(201_70%_28%)] to-primary',
  'from-primary/90 to-[hsl(192_80%_38%)]',
  'from-[hsl(192_80%_38%)] to-[hsl(201_55%_22%)]',
  'from-[hsl(201_55%_22%)] to-primary',
]

const PERSONA_TAGS: Record<string, string> = {
  'Digital nomad': 'bg-primary/10 text-primary',
  Backpacker: 'bg-accent text-accent-foreground',
  'Visa applicant': 'bg-[hsl(35_92%_45%_/0.12)] text-[hsl(35_72%_38%)]',
  'Business traveler': 'bg-secondary text-secondary-foreground',
  Student: 'bg-[hsl(152_55%_36%_/0.12)] text-success',
}

function RatingPanel() {
  return (
    <div className="rounded-2xl border border-border/80 bg-background/95 p-5 shadow-[0_10px_32px_-22px_hsl(201_50%_20%_/0.22)] sm:p-6">
      <div className="flex items-end gap-3">
        <span className="text-5xl font-semibold tracking-tight text-foreground">{SITE.rating}</span>
        <div className="pb-1.5">
          <Stars rating={SITE.rating} size={18} />
          <p className="mt-1 text-sm text-muted-foreground">out of 5</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {[
          { stars: 5, pct: 92 },
          { stars: 4, pct: 6 },
          { stars: 3, pct: 2 },
        ].map((row) => (
          <div key={row.stars} className="flex items-center gap-2 text-xs">
            <span className="w-3 font-medium text-muted-foreground">{row.stars}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-[hsl(189_62%_48%)]"
                style={{ width: `${row.pct}%` }}
              />
            </div>
            <span className="w-8 text-right text-muted-foreground">{row.pct}%</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border/60 pt-5">
        <div>
          <div className="text-lg font-semibold">{SITE.reviewCount.toLocaleString()}+</div>
          <div className="text-xs text-muted-foreground">Reviews</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{SITE.travelersServed}</div>
          <div className="text-xs text-muted-foreground">Travelers</div>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
        <BadgeCheck className="size-3.5" />
        Verified traveler feedback
      </div>
    </div>
  )
}

function ReviewCard({ review, index, featured = false }: { review: (typeof REVIEWS)[0]; index: number; featured?: boolean }) {
  const personaClass = PERSONA_TAGS[review.role] ?? 'bg-secondary text-secondary-foreground'

  return (
    <figure
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background/95 transition-all duration-300',
        featured
          ? 'p-6 shadow-[0_16px_40px_-24px_hsl(192_60%_35%_/0.28)] sm:p-7'
          : 'p-5 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-22px_hsl(201_50%_20%_/0.2)]'
      )}
    >
      <Quote
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute text-primary/[0.06] transition-colors group-hover:text-primary/10',
          featured ? 'right-4 top-4 size-16' : 'right-3 top-3 size-10'
        )}
      />

      <div className="relative flex items-center justify-between gap-3">
        <Stars rating={review.rating} size={featured ? 15 : 13} />
        <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-medium', personaClass)}>
          {review.role}
        </span>
      </div>

      <blockquote
        className={cn(
          'relative mt-4 text-pretty leading-relaxed text-foreground/90',
          featured ? 'text-base sm:text-[17px]' : 'text-sm'
        )}
      >
        “{review.text}”
      </blockquote>

      <figcaption className="relative mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white shadow-sm',
              AVATAR_COLORS[index % AVATAR_COLORS.length]
            )}
          >
            {review.initials}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{review.name}</span>
            <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              {review.location}
            </span>
          </span>
        </div>
        {review.rating === 5 ? (
          <BadgeCheck className="size-4 shrink-0 text-success/80" aria-label="Verified review" />
        ) : null}
      </figcaption>
    </figure>
  )
}

export function Reviews() {
  const [featured, ...rest] = REVIEWS

  return (
    <Section id="reviews" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-35" />
        <div
          className="absolute left-[-8%] top-1/2 h-[520px] w-[640px] -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, hsl(189 70% 55% / 0.1), hsl(201 70% 60% / 0.04) 55%, transparent 75%)',
          }}
        />
      </div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start lg:gap-10 xl:gap-12">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Loved by travelers"
              title="Real travelers, real onward tickets"
              description="Verified feedback from digital nomads, backpackers and visa applicants who used OnwardSky for proof of onward travel."
            />
            <Reveal delay={80} className="mt-6">
              <RatingPanel />
            </Reveal>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            <Reveal delay={100} className="sm:col-span-2">
              <ReviewCard review={featured} index={0} featured />
            </Reveal>

            {rest.map((r, i) => (
              <Reveal key={r.name} delay={120 + (i % 2) * 70}>
                <ReviewCard review={r} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
