import { useState } from 'react'
import {
  ArrowRight,
  ArrowLeftRight,
  Calendar,
  Check,
  Mail,
  MapPin,
  ShieldAlert,
  Stamp,
  Ticket,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { HeroGlobeBlend } from '@/components/site/backgrounds'
import { Container, Stars } from '@/components/site/primitives'
import { SITE } from '@/lib/site-data'

const fieldWrap =
  'group flex items-center gap-2.5 rounded-lg border border-input bg-background px-3 transition-colors focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15'
const fieldInput =
  'h-11 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none'

const FEARS = [
  {
    icon: Ticket,
    label: 'Denied boarding',
    tint: 'bg-[hsl(0_72%_50%_/0.08)] text-destructive ring-destructive/15',
  },
  {
    icon: ShieldAlert,
    label: 'Check-in questions',
    tint: 'bg-[hsl(35_92%_45%_/0.1)] text-[hsl(35_72%_38%)] ring-[hsl(35_72%_38%_/0.15)]',
  },
  {
    icon: Stamp,
    label: 'Immigration holds',
    tint: 'bg-primary/10 text-primary ring-primary/15',
  },
  {
    icon: Wallet,
    label: 'Costly refundable fares',
    tint: 'bg-[hsl(201_70%_22%_/0.08)] text-[hsl(201_55%_22%)] ring-[hsl(201_55%_22%_/0.12)]',
  },
]

function HeroBookingForm() {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ from: '', to: '', depart: '', ret: '', email: '' })

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      id="hero-form"
      className="relative z-10 rounded-xl border border-border/45 bg-background/55 p-4 pt-5 shadow-[0_12px_40px_-16px_hsl(201_50%_20%_/0.1)] backdrop-blur-md sm:bg-background/65 sm:p-5 sm:pt-6"
    >
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/50" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            <span className="text-sm font-semibold">Get your reservation</span>
          </div>
          <span className="rounded-full bg-[hsl(201_70%_16%_/0.06)] px-2.5 py-1 text-[11px] font-semibold text-[hsl(201_55%_22%)]">
            From {SITE.priceFrom}
          </span>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="size-6" />
            </span>
            <h3 className="text-lg font-semibold">Request received</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Your itinerary goes to{' '}
              <span className="text-foreground">{form.email || 'your inbox'}</span> within minutes.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-1">
              Build another
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-background p-1">
              {(['one-way', 'round-trip'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTripType(t)}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    tripType === t
                      ? 'bg-[hsl(201_70%_22%)] text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t === 'one-way' ? 'One-way' : 'Round-trip'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className={fieldWrap}>
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <input
                  className={fieldInput}
                  placeholder="From"
                  value={form.from}
                  onChange={update('from')}
                  required
                  aria-label="Departure"
                />
              </label>
              <label className={fieldWrap}>
                <ArrowLeftRight className="size-4 shrink-0 text-muted-foreground" />
                <input
                  className={fieldInput}
                  placeholder="To"
                  value={form.to}
                  onChange={update('to')}
                  required
                  aria-label="Destination"
                />
              </label>
            </div>

            <div className={cn('grid gap-2', tripType === 'round-trip' ? 'grid-cols-2' : 'grid-cols-1')}>
              <label className={fieldWrap}>
                <Calendar className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="date"
                  className={fieldInput}
                  value={form.depart}
                  onChange={update('depart')}
                  required
                  aria-label="Departure date"
                />
              </label>
              {tripType === 'round-trip' ? (
                <label className={fieldWrap}>
                  <Calendar className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    type="date"
                    className={fieldInput}
                    value={form.ret}
                    onChange={update('ret')}
                    aria-label="Return date"
                  />
                </label>
              ) : null}
            </div>

            <label className={fieldWrap}>
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="email"
                className={fieldInput}
                placeholder="Email for delivery"
                value={form.email}
                onChange={update('email')}
                required
                aria-label="Email"
              />
            </label>

            <Button
              type="submit"
              size="lg"
              className="mt-0.5 h-12 w-full bg-[hsl(201_70%_22%)] text-[15px] font-semibold hover:bg-[hsl(201_70%_18%)]"
            >
              Get my reservation
              <ArrowRight className="size-4" />
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">
              {SITE.delivery} · No account · Secure checkout
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function RatingCluster() {
  const avatars = [
    { initials: 'MV', bg: 'bg-[hsl(201_70%_22%)]' },
    { initials: 'DK', bg: 'bg-primary' },
    { initials: 'PS', bg: 'bg-[hsl(189_62%_46%)]' },
  ]
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {avatars.map((a) => (
          <span
            key={a.initials}
            className={cn(
              'flex size-8 items-center justify-center rounded-full border-2 border-background text-[11px] font-semibold text-white',
              a.bg
            )}
          >
            {a.initials}
          </span>
        ))}
      </div>
      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <Stars rating={SITE.rating} size={13} />
          <span className="text-sm font-semibold">{SITE.rating}/5</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {SITE.travelersServed} travelers served
        </span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-[4.75rem] pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(201_70%_16%_/0.04)] via-background to-background" />
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-20" />
      </div>

      <Container className="relative z-10">
        {/* Mobile: compact hook + form above the fold */}
        <p className="mb-3 text-center text-sm font-medium text-[hsl(201_55%_22%)] lg:hidden">
          Don&apos;t risk denied boarding - get a real reservation in minutes
        </p>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.92fr] lg:items-start lg:gap-10 xl:gap-14">
          {/* Form - first on mobile */}
          <div className="relative order-1 min-h-[min(420px,88vw)] lg:order-2 lg:sticky lg:top-24 lg:min-h-[460px]">
            <HeroGlobeBlend className="-inset-x-4 -inset-y-2 sm:-inset-x-6 lg:-inset-x-10 lg:-inset-y-4" />
            <HeroBookingForm />
          </div>

          {/* Copy */}
          <div className="order-2 lg:order-1">
            <p className="hidden text-sm font-medium text-primary lg:block">
              Travel compliance infrastructure for onward tickets
            </p>

            <h1 className="mt-0 text-balance text-[1.75rem] font-semibold leading-[1.08] tracking-tight text-[hsl(201_70%_14%)] sm:text-4xl lg:mt-3 lg:text-[3.15rem]">
              Stop worrying about check-in.{' '}
              <span className="text-gradient-brand">Get a real reservation airlines accept.</span>
            </h1>

            <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              OnwardSky issues genuine airline reservations with a booking reference you can verify
              yourself - built for onward travel rules, immigration, and visa documentation. From{' '}
              {SITE.priceFrom}, no ticket purchase required.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {FEARS.map((fear) => (
                <span
                  key={fear.label}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset',
                    fear.tint
                  )}
                >
                  <fear.icon className="size-3.5" strokeWidth={2} />
                  {fear.label}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <RatingCluster />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
