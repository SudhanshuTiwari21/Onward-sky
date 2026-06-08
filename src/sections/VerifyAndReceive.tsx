import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Download,
  FileText,
  Globe,
  Mail,
  Plane,
  PlaneTakeoff,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/site/Logo'
import { Container, DividerList, FeatureRow, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { SITE } from '@/lib/site-data'

const PNR = 'K7G2QP'

const DELIVERY_ITEMS = [
  {
    icon: FileText,
    title: 'Airline-standard PDF',
    desc: 'Formatted like a real e-ticket receipt agents recognize at check-in.',
  },
  {
    icon: Search,
    title: 'Booking reference (PNR)',
    desc: 'Look it up on the airline’s manage-booking page yourself.',
  },
  {
    icon: ShieldCheck,
    title: 'Full flight details',
    desc: 'Passenger, route, dates, flight number and airline in one document.',
  },
  {
    icon: Mail,
    title: 'Delivered in minutes',
    desc: 'PDF to your inbox - save it or forward to an agent.',
  },
]

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden border-y border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-warning/70" />
        <span className="size-2.5 rounded-full bg-success/70" />
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-1.5">
          <Globe className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate font-mono text-[11px] text-muted-foreground sm:text-xs">
            airline.com/manage-booking
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-5">{children}</div>
    </div>
  )
}

function ItineraryVisual({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden border-y border-border bg-background', className)}>
      <div className="relative border-b border-border bg-secondary/30 px-4 py-4 sm:px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, hsl(201 40% 25% / 0.05) 0, hsl(201 40% 25% / 0.05) 1px, transparent 1px, transparent 9px)',
          }}
        />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-7" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Flight Reservation</div>
              <div className="text-[11px] text-muted-foreground">e-Itinerary · PDF</div>
            </div>
          </div>
          <div className="rounded-xl border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-right ring-1 ring-inset ring-primary/15">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              PNR
            </div>
            <div className="font-mono text-sm font-bold tracking-[0.16em] text-primary">{PNR}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          {[
            { label: 'Passenger', value: 'ALEX TRAVELER' },
            { label: 'Airline', value: 'TAP Portugal' },
            { label: 'Flight', value: 'TP 1234', mono: true },
            { label: 'Date', value: '24 Aug 2026' },
          ].map((row) => (
            <div key={row.label}>
              <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {row.label}
              </div>
              <div className={cn('mt-0.5 font-medium', row.mono && 'font-mono')}>{row.value}</div>
            </div>
          ))}
        </div>

        <div className="border-y border-border/60 bg-secondary/20 py-3.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xl font-semibold tracking-tight">LIS</div>
              <div className="text-[11px] text-muted-foreground">09:40</div>
            </div>
            <div className="flex flex-1 items-center gap-1.5 px-1">
              <span className="h-px flex-1 bg-border" />
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/12 text-primary">
                <Plane className="size-3.5 rotate-90" />
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold tracking-tight">BKK</div>
              <div className="text-[11px] text-muted-foreground">06:15+1</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success">
            <span className="size-1.5 rounded-full bg-success" />
            Confirmed
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/85">
            <Download className="size-3 text-primary" />
            PDF attachment
          </span>
        </div>
      </div>
    </div>
  )
}

function AirlineLookupVisual({ className }: { className?: string }) {
  return (
    <BrowserChrome>
      <div className={cn('flex flex-col gap-3.5', className)}>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <span className="font-mono text-sm tracking-[0.18em]">{PNR}</span>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground sm:text-sm">
            Find booking
          </span>
        </div>

        <div className="border-y border-success/25 bg-success/[0.04] py-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Reservation status
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
              <span className="size-1.5 rounded-full bg-success" />
              Confirmed
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div>
              <div className="text-xl font-semibold">LIS</div>
              <div className="text-[11px] text-muted-foreground">Lisbon</div>
            </div>
            <div className="flex flex-1 items-center gap-1.5 px-1 text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              <PlaneTakeoff className="size-4 text-primary" />
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold">BKK</div>
              <div className="text-[11px] text-muted-foreground">Bangkok</div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-[11px]">
            <div>
              <div className="text-muted-foreground">Passenger</div>
              <div className="font-medium">A. TRAVELER</div>
            </div>
            <div>
              <div className="text-muted-foreground">PNR</div>
              <div className="font-mono font-semibold text-primary">{PNR}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Class</div>
              <div className="font-medium">Economy</div>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          Same reference on the airline site - not a mock PDF.
        </p>
      </div>
    </BrowserChrome>
  )
}

function PnrBridge() {
  return (
    <div className="relative flex flex-col items-center justify-center px-2 py-6 lg:px-4 lg:py-0">
      <div
        aria-hidden="true"
        className="absolute hidden h-px w-full bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-4 h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/45 to-primary/20 lg:hidden"
      />

      <div className="relative z-10 flex flex-col items-center gap-2 border-y border-primary/30 bg-background px-4 py-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="size-3" />
          Same PNR
        </span>
        <span className="font-mono text-lg font-bold tracking-[0.2em] text-primary">{PNR}</span>
        <span className="max-w-[8rem] text-center text-[10px] leading-snug text-muted-foreground">
          On your PDF and in the airline system
        </span>
      </div>

      <div className="relative z-10 mt-3 hidden items-center gap-1 text-primary/70 lg:flex">
        <ArrowRight className="size-4" />
      </div>
    </div>
  )
}

type ViewTab = 'itinerary' | 'verify'

export function VerifyAndReceive() {
  const [tab, setTab] = useState<ViewTab>('itinerary')
  const go = () => document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Section id="verification" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-35" />
        <div
          className="absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, hsl(189 70% 55% / 0.14), hsl(192 80% 45% / 0.05) 50%, transparent 72%)',
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-5%] h-[480px] w-[640px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, hsl(201 70% 60% / 0.08), transparent 65%)',
          }}
        />
      </div>

      <Container>
        <SectionHeading
          eyebrow={
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="size-3.5 text-primary" />
              What you get · How to verify
            </span>
          }
          title={
            <>
              Your PDF.{' '}
              <span className="text-gradient-brand">The airline’s confirmation.</span>
            </>
          }
          description="See what lands in your inbox - then check the same booking reference on the carrier’s site."
        />

        {/* Mobile tab switcher */}
        <Reveal delay={40} className="mx-auto mt-8 flex max-w-md rounded-xl border border-border bg-secondary/50 p-1 lg:hidden">
          {(
            [
              { id: 'itinerary' as const, label: 'Your PDF', icon: FileText },
              { id: 'verify' as const, label: 'Airline lookup', icon: Search },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                tab === item.id
                  ? 'bg-background text-foreground shadow-sm ring-1 ring-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </Reveal>

        {/* Visual showcase */}
        <Reveal delay={80} className="relative mt-8 lg:mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/8 via-transparent to-accent/25 blur-xl"
          />

          {/* Desktop: dual panel */}
          <div className="relative hidden items-stretch gap-0 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <div className="relative">
              <span className="absolute -left-1 top-4 z-10 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
                1 · What you receive
              </span>
              <ItineraryVisual />
            </div>

            <PnrBridge />

            <div className="relative">
              <span className="absolute -right-1 top-4 z-10 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm">
                2 · Verify yourself
              </span>
              <AirlineLookupVisual />
            </div>
          </div>

          {/* Mobile: single panel */}
          <div className="relative lg:hidden">
            {tab === 'itinerary' ? <ItineraryVisual /> : <AirlineLookupVisual />}
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Illustrative example. Your reservation includes a unique, lookupable PNR.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 lg:mt-12">
          <DividerList>
            {DELIVERY_ITEMS.map((item) => (
              <FeatureRow
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.desc}
              />
            ))}
          </DividerList>
        </Reveal>

        <Reveal delay={400} className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
          <Button onClick={go} size="lg" className="h-12 px-7 font-semibold shadow-[0_10px_30px_-12px_hsl(192_86%_31%_/0.55)]">
            Get a verifiable reservation
            <ArrowRight className="size-4" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            From {SITE.priceFrom} · {SITE.delivery}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
