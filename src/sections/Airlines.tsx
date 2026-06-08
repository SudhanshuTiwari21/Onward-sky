import { ArrowUpRight, Plane, ShieldCheck, TicketCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AirlineLogoBadge } from '@/components/site/AirlineLogo'
import { Container, Section, SectionHeading, Reveal } from '@/components/site/primitives'
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
  budget: 'bg-accent text-accent-foreground border-border',
  full: 'bg-primary/10 text-primary border-primary/20',
  regional: 'bg-secondary text-secondary-foreground border-border',
}

const TYPE_CHIPS = ['Low-cost carriers', 'Full-service', 'Americas network']

function AirlineCard({ airline }: { airline: (typeof AIRLINES)[0] }) {
  const category = CATEGORIES[airline.slug] ?? { label: 'Global carrier', tone: 'full' as const }

  return (
    <a
      href={`/airlines/${airline.slug}/`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-4 transition-all duration-300 sm:p-5',
        'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_16px_40px_-24px_hsl(192_60%_35%_/0.28)]'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <AirlineLogoBadge name={airline.name} logo={airline.logo} code={airline.code} />
        <span className="rounded-md bg-foreground/[0.04] px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-muted-foreground ring-1 ring-inset ring-border/80">
          {airline.code}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold tracking-tight sm:text-base">{airline.name}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              TONE_CLASS[category.tone]
            )}
          >
            {category.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
            <TicketCheck className="size-3 text-primary/70" />
            Check-in check
          </span>
        </div>
      </div>

      <div className="mt-4 border-t border-border/60 pt-3 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View airline requirements
      </div>
    </a>
  )
}

function BrowseAllCard() {
  return (
    <a
      href="/airlines/"
      className={cn(
        'group flex h-full min-h-[168px] flex-col items-center justify-center rounded-2xl border border-dashed border-primary/35',
        'bg-gradient-to-br from-primary/10 via-background to-accent/15 p-5 text-center transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_16px_40px_-24px_hsl(192_60%_35%_/0.28)]'
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-inset ring-primary/20">
        <Plane className="size-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{SITE.airlinesSupported} airlines</h3>
      <p className="mt-1 max-w-[12rem] text-sm text-muted-foreground">
        Browse requirements for every carrier we support
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        All airlines
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  )
}

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

            <Reveal delay={80} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border/80 bg-background/95 p-4">
                  <div className="text-2xl font-semibold tracking-tight">{SITE.airlinesSupported}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Airlines supported</div>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/95 p-4">
                  <div className="text-2xl font-semibold tracking-tight">{AIRLINES.length}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Featured carriers</div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/95 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                    <ShieldCheck className="size-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Low-cost and full-service carriers alike may refuse boarding without proof of
                    onward travel - check your airline before departure.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {TYPE_CHIPS.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    <Plane className="size-3" />
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {AIRLINES.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 60}>
                  <AirlineCard airline={a} />
                </Reveal>
              ))}
              <Reveal delay={180} className="sm:col-span-2 xl:col-span-1">
                <BrowseAllCard />
              </Reveal>
            </div>

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
