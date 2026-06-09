import { useState } from 'react'
import {
  ArrowRight,
  Download,
  FileText,
  Globe,
  Plane,
  PlaneTakeoff,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/site/Logo'
import { Container, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { SITE } from '@/lib/site-data'

const PNR = 'K7G2QP'

function MockPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border/80 bg-background shadow-[0_12px_40px_-24px_hsl(201_50%_20%_/0.18)]',
        className
      )}
    >
      {children}
    </div>
  )
}

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <MockPanel>
      <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
        <span className="size-2.5 shrink-0 rounded-full bg-destructive/70" />
        <span className="size-2.5 shrink-0 rounded-full bg-warning/70" />
        <span className="size-2.5 shrink-0 rounded-full bg-success/70" />
        <div className="ml-1 flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 sm:ml-2">
          <Globe className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate font-mono text-[11px] text-muted-foreground sm:text-xs">
            airline.com/manage-booking
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-background to-secondary/15 p-4 sm:p-5">{children}</div>
    </MockPanel>
  )
}

function ItineraryVisual() {
  return (
    <MockPanel>
      <div className="relative border-b border-border bg-secondary/30 px-4 py-4 sm:px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, hsl(201 40% 25% / 0.05) 0, hsl(201 40% 25% / 0.05) 1px, transparent 1px, transparent 9px)',
          }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <BrandMark className="size-8 shrink-0" />
            <div className="min-w-0 leading-tight">
              <div className="text-sm font-semibold">Flight Reservation</div>
              <div className="text-[11px] text-muted-foreground">e-Itinerary · PDF</div>
            </div>
          </div>
          <div className="shrink-0 rounded-lg border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-right">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              PNR
            </div>
            <div className="font-mono text-sm font-bold tracking-[0.12em] text-primary">{PNR}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
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

        <div className="rounded-lg border border-border/70 bg-secondary/25 px-3 py-3.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xl font-semibold tracking-tight">LIS</div>
              <div className="text-[11px] text-muted-foreground">09:40</div>
            </div>
            <div className="flex flex-1 items-center gap-1.5 px-2">
              <span className="h-px flex-1 bg-border" />
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
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
    </MockPanel>
  )
}

function AirlineLookupVisual() {
  return (
    <BrowserChrome>
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-sm tracking-[0.14em]">{PNR}</span>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            Find booking
          </span>
        </div>

        <div className="rounded-lg border border-success/25 bg-success/[0.04] p-3.5">
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
            <div className="flex flex-1 items-center gap-1.5 px-2 text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              <PlaneTakeoff className="size-4 shrink-0 text-primary" />
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
    <div className="flex flex-col items-center justify-center gap-3 self-center px-2 lg:min-w-[9.5rem] lg:px-4">
      <div
        aria-hidden="true"
        className="hidden h-px w-full bg-gradient-to-r from-border via-primary/40 to-border lg:block"
      />
      <div className="flex w-full max-w-[11rem] flex-col items-center gap-1.5 rounded-xl border border-primary/25 bg-background px-4 py-3.5 text-center shadow-sm lg:max-w-none">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Same PNR
        </span>
        <span className="font-mono text-base font-bold tracking-[0.18em] text-primary sm:text-lg">
          {PNR}
        </span>
        <span className="text-[10px] leading-snug text-muted-foreground">
          On your PDF and in the airline system
        </span>
      </div>
      <ArrowRight className="hidden size-4 text-primary/50 lg:block" aria-hidden="true" />
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
      </div>

      <Container>
        <SectionHeading
          eyebrow="Verification"
          title="Your ticket. The airline’s record."
          description="Same booking reference on your PDF and the carrier’s site."
          className="max-w-2xl"
        />

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

        <Reveal delay={80} className="mt-8 lg:mt-12">
          {/* Desktop: side-by-side comparison */}
          <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start lg:gap-6 xl:gap-8">
            <div className="flex min-w-0 flex-col gap-3">
              <p className="text-xs font-semibold text-foreground">1 · What you receive</p>
              <ItineraryVisual />
            </div>

            <PnrBridge />

            <div className="flex min-w-0 flex-col gap-3">
              <p className="text-xs font-semibold text-primary">2 · Verify yourself</p>
              <AirlineLookupVisual />
            </div>
          </div>

          {/* Mobile: tabbed single panel */}
          <div className="flex flex-col gap-3 lg:hidden">
            <p className="text-xs font-semibold text-muted-foreground">
              {tab === 'itinerary' ? '1 · What you receive' : '2 · Verify yourself'}
            </p>
            {tab === 'itinerary' ? <ItineraryVisual /> : <AirlineLookupVisual />}
            <PnrBridge />
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Illustrative example. Your reservation includes a unique, lookupable PNR.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
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
