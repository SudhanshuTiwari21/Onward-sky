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
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container, Reveal } from '@/components/site/primitives'
import { GlobeGrid } from '@/components/site/backgrounds'
import { SITE } from '@/lib/site-data'

const TRUST = [
  { icon: BadgeCheck, label: 'Verifiable PNR' },
  { icon: Clock, label: SITE.delivery },
  { icon: ShieldCheck, label: 'Secure checkout' },
]

const VISA_POINTS = [
  'Formatted for embassy requirements',
  'Separate from onward travel reservations',
  'Delivered as a clean PDF itinerary',
]

export function FinalCta() {
  const go = () => document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="get-started" className="relative overflow-hidden py-14 sm:py-20">
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
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
          {/* Primary conversion card */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/25 p-6 shadow-[0_24px_60px_-28px_hsl(192_60%_35%_/0.35)] sm:p-8 lg:min-h-full lg:p-10">
              <GlobeGrid className="pointer-events-none absolute -right-16 -top-10 h-[340px] w-[340px] opacity-50" />
              <GlobeGrid className="pointer-events-none absolute -bottom-20 -left-16 h-[280px] w-[280px] opacity-30" />

              <div className="relative flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <BadgeCheck className="size-3.5" />
                  Verifiable · From {SITE.priceFrom}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Star className="size-3 fill-warning text-warning" />
                  {SITE.rating}/5 · {SITE.travelersServed} travelers
                </span>
              </div>

              <h2 className="relative mt-5 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Get a verifiable onward ticket in the next few minutes
              </h2>
              <p className="relative mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
                Real airline reservation, a PNR you can check yourself, delivered to your inbox. No
                account, no commitment to fly.
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

              <div className="relative mt-8 grid grid-cols-1 gap-2 border-t border-primary/15 pt-6 sm:grid-cols-3">
                {TRUST.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground/85"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-success/12 text-success ring-1 ring-inset ring-success/20">
                      <item.icon className="size-4" />
                    </span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Secondary column - visa bridge + quick stats */}
          <div className="flex flex-col gap-4">
            <Reveal delay={80}>
              <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-[hsl(189_62%_48%)] to-transparent"
                />
                <div className="flex items-start gap-4 pl-2">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                    <FileText className="size-5" strokeWidth={1.75} />
                  </span>
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

                <ul className="mt-4 space-y-2 pl-2">
                  {VISA_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href="/flight-itinerary-for-visa/"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-secondary sm:w-auto"
                >
                  Explore visa itineraries
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border/80 bg-background/95 p-4 sm:p-5">
                {[
                  { value: SITE.airlinesSupported, label: 'Airlines' },
                  { value: SITE.countriesServed, label: 'Countries' },
                  { value: SITE.priceFrom, label: 'From' },
                  { value: `${SITE.rating}/5`, label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-secondary/40 px-3 py-3 text-center">
                    <div className="text-lg font-semibold tracking-tight">{stat.value}</div>
                    <div className="text-[11px] font-medium text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div
                className={cn(
                  'flex items-center gap-3 rounded-2xl border border-dashed border-primary/30',
                  'bg-gradient-to-r from-primary/8 to-accent/15 px-4 py-4'
                )}
              >
                <Sparkles className="size-5 shrink-0 text-primary" />
                <p className="text-sm leading-snug text-muted-foreground">
                  <span className="font-semibold text-foreground">No account needed.</span> Build your
                  reservation in under a minute.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
