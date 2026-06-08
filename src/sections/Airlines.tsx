import { ArrowUpRight, Plane, ShieldCheck, TicketCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AirlineLogoBadge } from '@/components/site/AirlineLogo'
import {
  AccentBlock,
  Container,
  DividerList,
  LinkRow,
  Section,
  SectionHeading,
  Reveal,
} from '@/components/site/primitives'
import { AIRLINES, SITE } from '@/lib/site-data'

const CATEGORIES: Record<string, { label: string; tone: 'budget' | 'full' | 'regional' }> = {
  airasia: { label: 'Low-cost', tone: 'budget' },
  scoot: { label: 'Low-cost', tone: 'budget' },
  jetstar: { label: 'Low-cost', tone: 'budget' },
  latam: { label: 'Americas', tone: 'regional' },
  avianca: { label: 'Americas', tone: 'regional' },
  'copa-airlines': { label: 'Americas', tone: 'regional' },
  emirates: { label: 'Full-service', tone: 'full' },
  'qatar-airways': { label: 'Full-service', tone: 'full' },
  'turkish-airlines': { label: 'Full-service', tone: 'full' },
  'singapore-airlines': { label: 'Full-service', tone: 'full' },
  lufthansa: { label: 'Full-service', tone: 'full' },
}

const TONE_CLASS = {
  budget: 'text-accent-foreground',
  full: 'text-primary',
  regional: 'text-muted-foreground',
}

const TYPE_CHIPS = ['Low-cost carriers', 'Full-service', 'Americas network']

export function Airlines() {
  return (
    <Section id="airlines" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot opacity-30" />
        <div
          className="absolute right-[-8%] top-1/2 h-[520px] w-[680px] -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, hsl(201 70% 60% / 0.1), hsl(189 70% 55% / 0.04) 55%, transparent 75%)',
          }}
        />
      </div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start lg:gap-10 xl:gap-12">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Airline requirements"
              title="Airlines that check onward travel"
              description="Many carriers verify proof of onward travel at check-in. See what each airline expects."
            />

            <Reveal delay={80} className="mt-6 space-y-5">
              <div className="flex flex-wrap gap-x-8 gap-y-3 border-y border-border/70 py-4">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{SITE.airlinesSupported}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Airlines supported</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{AIRLINES.length}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Featured carriers</div>
                </div>
              </div>

              <AccentBlock>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Low-cost and full-service carriers alike may refuse boarding without proof of
                    onward travel - check your airline before departure.
                  </p>
                </div>
              </AccentBlock>

              <div className="flex flex-wrap gap-2">
                {TYPE_CHIPS.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground"
                  >
                    <Plane className="size-3 text-primary/70" />
                    {type}
                  </span>
                ))}
              </div>

              <Button asChild variant="outline" className="hidden w-full font-semibold lg:inline-flex">
                <a href="/airlines/">
                  Browse all airlines
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </Reveal>
          </div>

          <div>
            <Reveal delay={100} className="mb-4 flex items-center justify-between gap-3 lg:hidden">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Plane className="size-3.5 text-primary" />
                Popular carriers
              </span>
              <a
                href="/airlines/"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                All airlines
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>

            <Reveal delay={120}>
              <DividerList>
                {AIRLINES.map((airline) => {
                  const category = CATEGORIES[airline.slug] ?? {
                    label: 'Global carrier',
                    tone: 'full' as const,
                  }

                  return (
                    <LinkRow key={airline.slug} href={`/airlines/${airline.slug}/`}>
                      <AirlineLogoBadge name={airline.name} logo={airline.logo} code={airline.code} />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary sm:text-base">
                            {airline.name}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground">{airline.code}</span>
                        </span>
                        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px]">
                          <span className={cn('font-semibold uppercase tracking-wide', TONE_CLASS[category.tone])}>
                            {category.label}
                          </span>
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <TicketCheck className="size-3 text-primary/70" />
                            Check-in check
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </LinkRow>
                  )
                })}

                <LinkRow href="/airlines/" className="text-primary">
                  <Plane className="size-5 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">All {SITE.airlinesSupported} airlines</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      Browse requirements for every carrier we support
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0" />
                </LinkRow>
              </DividerList>
            </Reveal>

            <Reveal delay={240} className="mt-5 flex justify-center lg:hidden">
              <Button asChild variant="outline" className="font-semibold">
                <a href="/airlines/">
                  Browse all airlines
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
