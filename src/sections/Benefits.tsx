import {
  Globe,
  Lock,
  RefreshCw,
  Search,
  ShieldCheck,
  Star,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { BENEFITS, SITE } from '@/lib/site-data'

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  shield: ShieldCheck,
  search: Search,
  refresh: RefreshCw,
  globe: Globe,
  lock: Lock,
}

const STATS = [
  { label: 'Traveler rating', value: `${SITE.rating}/5`, hint: `${SITE.reviewCount.toLocaleString()}+ reviews` },
  { label: 'Travelers served', value: SITE.travelersServed, hint: 'Worldwide' },
  { label: 'Airlines supported', value: SITE.airlinesSupported, hint: `${SITE.countriesServed} countries` },
  { label: 'Starting from', value: SITE.priceFrom, hint: 'No ticket purchase' },
]

/** Grid spans on a 3-column desktop layout — last card fills the bottom row. */
const SPANS = [
  'sm:col-span-2 lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'sm:col-span-2 lg:col-span-3',
]

export function Benefits() {
  return (
    <Section id="benefits" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot opacity-30" />
        <div
          className="absolute bottom-[-10%] left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, hsl(201 70% 60% / 0.1), hsl(189 70% 55% / 0.04) 50%, transparent 72%)',
          }}
        />
      </div>

      <Container>
        <SectionHeading
          eyebrow="Why OnwardSky"
          title="Engineered for trust, speed and compliance"
          description="Everything you need to satisfy onward travel requirements - without the cost and commitment of a real ticket."
        />

        <Reveal className="mt-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-0.5 bg-background/95 px-4 py-4 sm:px-5 sm:py-5"
              >
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </span>
                <span className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">{stat.hint}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[b.icon] ?? ShieldCheck
            const featured = i === 0

            return (
              <Reveal key={b.title} delay={(i % 3) * 70} className={cn('h-full', SPANS[i])}>
                <div
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 p-5 transition-all duration-300 sm:p-6',
                    featured
                      ? 'bg-gradient-to-br from-primary/10 via-background to-accent/20 hover:border-primary/35'
                      : 'bg-background/90 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background',
                    'shadow-[0_1px_2px_0_hsl(201_40%_20%_/0.04),0_10px_28px_-18px_hsl(201_50%_20%_/0.16)]',
                    'hover:shadow-[0_1px_2px_0_hsl(201_40%_20%_/0.04),0_20px_40px_-22px_hsl(192_60%_35%_/0.24)]'
                  )}
                >
                  {featured ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:bg-primary/15"
                    />
                  ) : null}

                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        'inline-flex shrink-0 items-center justify-center rounded-xl text-primary ring-1 ring-inset ring-primary/20',
                        featured ? 'size-12 bg-primary/15' : 'size-11 bg-primary/12'
                      )}
                    >
                      <Icon className={featured ? 'size-5' : 'size-[1.15rem]'} strokeWidth={1.75} />
                    </span>
                    {featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                        <Star className="size-3 fill-current" />
                        Most popular
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] font-semibold text-primary/45">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  <h3 className={cn('relative mt-4 font-semibold tracking-tight', featured && 'text-lg')}>
                    {b.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {b.desc}
                  </p>

                  {featured ? (
                    <div className="relative mt-4 flex items-center gap-2 border-t border-primary/15 pt-4 text-xs font-medium text-primary">
                      <Zap className="size-3.5" />
                      {SITE.delivery}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
