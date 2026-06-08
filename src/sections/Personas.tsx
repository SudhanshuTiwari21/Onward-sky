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
import { cn } from '@/lib/utils'
import { Container, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { PERSONAS, SITE } from '@/lib/site-data'

const ICONS: Record<string, LucideIcon> = {
  laptop: Laptop,
  backpack: Backpack,
  stamp: Stamp,
  briefcase: Briefcase,
  grad: GraduationCap,
}

const ACCENTS = [
  'from-primary/15 via-background to-accent/20',
  'from-accent/30 via-background to-secondary/40',
  'from-[hsl(35_92%_45%_/0.08)] via-background to-accent/15',
  'from-primary/10 via-background to-[hsl(201_70%_60%_/0.08)]',
  'from-[hsl(152_55%_36%_/0.08)] via-background to-primary/10',
]

const USE_CASES = [
  'Open-ended itineraries',
  'Visa documentation',
  'Airline check-in',
  'Last-minute departures',
]

function PersonaCard({ persona, index, featured = false }: { persona: (typeof PERSONAS)[0]; index: number; featured?: boolean }) {
  const Icon = ICONS[persona.icon] ?? Laptop

  return (
    <a
      href={`/travelers/${persona.slug}/`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 p-5 transition-all duration-300',
        featured
          ? 'bg-gradient-to-br from-primary/12 via-background to-accent/20 shadow-[0_16px_40px_-24px_hsl(192_60%_35%_/0.28)] sm:p-6'
          : cn('bg-background/95 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_14px_36px_-22px_hsl(201_50%_20%_/0.2)]', ACCENTS[index % ACCENTS.length])
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-xl text-primary ring-1 ring-inset ring-primary/20',
            featured ? 'size-12 bg-primary/15' : 'size-11 bg-primary/12'
          )}
        >
          <Icon className={featured ? 'size-5' : 'size-[1.15rem]'} strokeWidth={1.75} />
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      <h3 className={cn('mt-4 font-semibold tracking-tight', featured ? 'text-lg' : 'text-base')}>
        {persona.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{persona.desc}</p>

      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Explore guide
        <ArrowUpRight className="size-3" />
      </span>
    </a>
  )
}

export function Personas() {
  const [featured, ...rest] = PERSONAS

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

            <Reveal delay={80} className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border/80 bg-background/95 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                    <Users className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">One reservation, many use cases</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      From open-ended backpacking to visa applications - the same verifiable PNR
                      works across scenarios.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {USE_CASES.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    <Sparkles className="size-3 text-primary/70" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border/80 bg-background/95 p-4">
                  <div className="text-2xl font-semibold tracking-tight">{PERSONAS.length}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Traveler types</div>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/95 p-4">
                  <div className="text-2xl font-semibold tracking-tight">{SITE.priceFrom}</div>
                  <div className="mt-1 text-xs text-muted-foreground">From per reservation</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <Reveal delay={100} className="sm:col-span-2 xl:col-span-2">
              <PersonaCard persona={featured} index={0} featured />
            </Reveal>

            {rest.slice(0, 1).map((p, i) => (
              <Reveal key={p.slug} delay={120 + i * 60}>
                <PersonaCard persona={p} index={i + 1} />
              </Reveal>
            ))}

            {rest.slice(1).map((p, i) => (
              <Reveal key={p.slug} delay={160 + i * 60}>
                <PersonaCard persona={p} index={i + 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
