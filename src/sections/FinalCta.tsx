import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  FileText,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AccentBlock, Container, Reveal } from '@/components/site/primitives'
import { GlobeGrid } from '@/components/site/backgrounds'
import { SITE } from '@/lib/site-data'

const TRUST = [
  { icon: Clock, label: SITE.delivery },
  { icon: BadgeCheck, label: `From ${SITE.priceFrom}` },
  { icon: ShieldCheck, label: 'Secure checkout' },
]

const VISA_POINTS = [
  'Formatted for embassy requirements',
  'Separate from onward travel reservations',
  'Delivered as a clean PDF itinerary',
]

const STATS = [
  { value: SITE.airlinesSupported, label: 'Airlines' },
  { value: SITE.countriesServed, label: 'Countries' },
  { value: SITE.priceFrom, label: 'From' },
  { value: `${SITE.rating}/5`, label: 'Rating' },
]

export function FinalCta() {
  const go = () => document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="get-started" className="relative overflow-hidden border-t border-border/60 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div
          className="absolute left-1/2 top-1/2 h-[640px] w-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, hsl(189 70% 55% / 0.14), hsl(192 80% 45% / 0.06) 45%, transparent 72%)',
          }}
        />
      </div>

      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <Reveal>
            <div className="relative">
              <GlobeGrid className="pointer-events-none absolute -right-16 -top-10 h-[340px] w-[340px] opacity-40" />

              <div className="relative flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <BadgeCheck className="size-3.5" />
                  Verifiable · From {SITE.priceFrom}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Star className="size-3 fill-warning text-warning" />
                  {SITE.rating}/5 · {SITE.travelersServed} travelers
                </span>
              </div>

              <h2 className="relative mt-5 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready for check-in? Build your reservation now.
              </h2>
              <p className="relative mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
                Onward travel proof in minutes - no account, no commitment to fly.
              </p>

              <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={go}
                  size="lg"
                  className="h-12 rounded-full px-7 text-[15px] font-semibold shadow-[0_10px_30px_-12px_hsl(192_86%_31%_/0.6)]"
                >
                  Get my reservation
                  <ArrowRight className="size-4" />
                </Button>
                <a
                  href="#verification"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  See how verification works
                  <ArrowRight className="size-3.5" />
                </a>
              </div>

              <div className="relative mt-8 flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row sm:flex-wrap sm:gap-6">
                {TRUST.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground/85"
                  >
                    <item.icon className="size-4 text-primary" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal delay={80}>
              <AccentBlock>
                <div className="flex items-start gap-4">
                  <FileText className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Visa documentation
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">
                      Need a flight itinerary for a visa application?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      A dedicated itinerary service formatted for embassy requirements - separate
                      from onward travel reservations.
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 pl-9">
                  {VISA_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href="/flight-itinerary-for-visa/"
                  className="mt-5 inline-flex items-center gap-2 pl-9 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Explore visa itineraries
                  <ArrowRight className="size-4" />
                </a>
              </AccentBlock>
            </Reveal>

            <Reveal delay={140}>
              <div className="flex flex-wrap gap-x-8 gap-y-4 border-y border-border/70 py-5">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg font-semibold tracking-tight">{stat.value}</div>
                    <div className="text-[11px] font-medium text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="flex items-start gap-3 text-sm leading-snug text-muted-foreground">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  <span className="font-semibold text-foreground">No account needed.</span> Build your
                  reservation in under a minute.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
