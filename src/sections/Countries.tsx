import { ArrowUpRight, Globe2, MapPinned, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { COUNTRIES, SITE } from '@/lib/site-data'

const REGIONS: Record<string, string> = {
  thailand: 'Southeast Asia',
  indonesia: 'Southeast Asia',
  philippines: 'Southeast Asia',
  vietnam: 'Southeast Asia',
  malaysia: 'Southeast Asia',
  japan: 'East Asia',
  'costa-rica': 'Central America',
  panama: 'Central America',
  colombia: 'South America',
}

const ENFORCEMENT: Record<string, { label: string; tone: 'high' | 'medium' | 'moderate' }> = {
  thailand: { label: 'Strict at check-in', tone: 'high' },
  indonesia: { label: 'Commonly requested', tone: 'medium' },
  philippines: { label: 'Frequently required', tone: 'high' },
  'costa-rica': { label: 'Airline enforced', tone: 'high' },
  panama: { label: 'Boarding checks', tone: 'high' },
  colombia: { label: 'May be requested', tone: 'moderate' },
  vietnam: { label: 'Entry documentation', tone: 'moderate' },
  malaysia: { label: 'Common check', tone: 'medium' },
  japan: { label: 'Visa-free entry', tone: 'moderate' },
}

const TONE_CLASS = {
  high: 'bg-[hsl(0_72%_50%_/0.1)] text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-[hsl(35_72%_38%)] border-warning/25',
  moderate: 'bg-primary/10 text-primary border-primary/20',
}

const REGION_CHIPS = ['Southeast Asia', 'East Asia', 'Central America', 'South America']

function CountryCard({ country }: { country: (typeof COUNTRIES)[0] }) {
  const region = REGIONS[country.slug] ?? 'Worldwide'
  const enforcement = ENFORCEMENT[country.slug] ?? { label: 'Requirements vary', tone: 'moderate' as const }

  return (
    <a
      href={`/countries/${country.slug}/`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-4 transition-all duration-300 sm:p-5',
        'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_16px_40px_-24px_hsl(192_60%_35%_/0.28)]'
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-2 select-none text-6xl opacity-[0.07] transition-opacity group-hover:opacity-[0.12]"
      >
        {country.flag}
      </span>

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl shadow-sm ring-1 ring-inset ring-border/80">
            {country.flag}
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight sm:text-base">{country.name}</h3>
            <p className="text-[11px] font-medium text-muted-foreground">{region}</p>
          </div>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{country.note}</p>

      <div className="relative mt-4 flex items-center justify-between gap-2 border-t border-border/60 pt-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            TONE_CLASS[enforcement.tone]
          )}
        >
          {enforcement.label}
        </span>
        <span className="text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          View guide
        </span>
      </div>
    </a>
  )
}

export function Countries() {
  return (
    <Section id="countries" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-35" />
        <div
          className="absolute bottom-[-15%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
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
              eyebrow="Country requirements"
              title="Where proof of onward travel matters"
              description="Onward travel rules vary by destination. Explore requirements for popular countries."
            />

            <Reveal delay={80} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border/80 bg-background/95 p-4">
                  <div className="text-2xl font-semibold tracking-tight">{SITE.countriesServed}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Countries covered</div>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/95 p-4">
                  <div className="text-2xl font-semibold tracking-tight">{COUNTRIES.length}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Featured guides</div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/95 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                    <ShieldAlert className="size-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Airlines and border officials enforce onward travel differently by destination -
                    check the guide before you fly.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {REGION_CHIPS.map((region) => (
                  <span
                    key={region}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    <MapPinned className="size-3" />
                    {region}
                  </span>
                ))}
              </div>

              <Button asChild variant="outline" className="hidden w-full font-semibold lg:inline-flex">
                <a href="/countries/">
                  Browse all countries
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </Reveal>
          </div>

          <div>
            <Reveal delay={100} className="mb-4 flex items-center justify-between gap-3 lg:hidden">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Globe2 className="size-3.5 text-primary" />
                Popular destinations
              </span>
              <a
                href="/countries/"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                All countries
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {COUNTRIES.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 3) * 60}>
                  <CountryCard country={c} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={240} className="mt-5 flex justify-center lg:hidden">
              <Button asChild variant="outline" className="font-semibold">
                <a href="/countries/">
                  Browse all countries
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
