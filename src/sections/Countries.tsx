import { ArrowUpRight, Globe2, MapPinned, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  AccentBlock,
  Container,
  DividerList,
  LinkRow,
  Section,
  SectionHeading,
  Reveal,
} from '@/components/site/primitives'
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
  high: 'text-destructive',
  medium: 'text-[hsl(35_72%_38%)]',
  moderate: 'text-primary',
}

const REGION_CHIPS = ['Southeast Asia', 'East Asia', 'Central America', 'South America']

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

            <Reveal delay={80} className="mt-6 space-y-5">
              <div className="flex flex-wrap gap-x-8 gap-y-3 border-y border-border/70 py-4">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{SITE.countriesServed}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Countries covered</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{COUNTRIES.length}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Featured guides</div>
                </div>
              </div>

              <AccentBlock>
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Airlines and border officials enforce onward travel differently by destination -
                    check the guide before you fly.
                  </p>
                </div>
              </AccentBlock>

              <div className="flex flex-wrap gap-2">
                {REGION_CHIPS.map((region) => (
                  <span
                    key={region}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground"
                  >
                    <MapPinned className="size-3 text-primary/70" />
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

            <Reveal delay={120}>
              <DividerList>
                {COUNTRIES.map((country) => {
                  const region = REGIONS[country.slug] ?? 'Worldwide'
                  const enforcement = ENFORCEMENT[country.slug] ?? {
                    label: 'Requirements vary',
                    tone: 'moderate' as const,
                  }

                  return (
                    <LinkRow key={country.slug} href={`/countries/${country.slug}/`}>
                      <span className="text-2xl leading-none">{country.flag}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary sm:text-base">
                            {country.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">{region}</span>
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">{country.note}</span>
                        <span
                          className={cn(
                            'mt-1.5 inline-block text-[11px] font-semibold uppercase tracking-wide',
                            TONE_CLASS[enforcement.tone]
                          )}
                        >
                          {enforcement.label}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </LinkRow>
                  )
                })}
              </DividerList>
            </Reveal>

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
