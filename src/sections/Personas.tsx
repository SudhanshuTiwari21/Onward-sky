import {
  ArrowUpRight,
  Backpack,
  Briefcase,
  GraduationCap,
  Laptop,
  Sparkles,
  Stamp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  AccentBlock,
  Container,
  DividerList,
  LinkRow,
  Section,
  SectionHeading,
  Reveal,
} from '@/components/site/primitives'
import { PERSONAS, SITE } from '@/lib/site-data'

const ICONS: Record<string, LucideIcon> = {
  laptop: Laptop,
  backpack: Backpack,
  stamp: Stamp,
  briefcase: Briefcase,
  grad: GraduationCap,
}

const USE_CASES = [
  'Open-ended itineraries',
  'Visa documentation',
  'Airline check-in',
  'Last-minute departures',
]

export function Personas() {
  return (
    <Section id="travelers" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute left-1/2 top-[-10%] h-[480px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
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
              eyebrow="Who it's for"
              title="Built for the way modern travelers move"
              description="Whatever your reason for flying, a verifiable onward ticket keeps your plans flexible."
            />

            <Reveal delay={80} className="mt-6 space-y-5">
              <AccentBlock>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">One reservation, many use cases</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      From open-ended backpacking to visa applications - the same verifiable PNR
                      works across scenarios.
                    </p>
                  </div>
                </div>
              </AccentBlock>

              <div className="flex flex-wrap gap-2">
                {USE_CASES.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground"
                  >
                    <Sparkles className="size-3 text-primary/70" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 border-y border-border/70 py-4">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{PERSONAS.length}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Traveler types</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{SITE.priceFrom}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">From per reservation</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <DividerList>
              {PERSONAS.map((persona) => {
                const Icon = ICONS[persona.icon] ?? Laptop
                return (
                  <LinkRow key={persona.slug} href={`/travelers/${persona.slug}/`}>
                    <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground group-hover:text-primary sm:text-base">
                        {persona.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{persona.desc}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </LinkRow>
                )
              })}
            </DividerList>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
