import { useState } from 'react'
import {
  ArrowRight,
  ArrowLeftRight,
  BadgeCheck,
  Calendar,
  Check,
  CircleDot,
  Clock,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container, Stars } from '@/components/site/primitives'
import { SITE } from '@/lib/site-data'

const fieldWrap =
  'group flex items-center gap-2.5 rounded-lg border border-input bg-background px-3 transition-colors focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15'
const fieldInput =
  'h-11 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none'

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
    <div id="hero-form" className="card-elevated rounded-2xl p-1.5">
      <div className="rounded-[14px] border border-border/60 bg-card/50 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/50" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            <span className="text-sm font-semibold">Build your reservation</span>
          </div>
          <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            No account needed
          </span>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="size-6" />
            </span>
            <h3 className="text-lg font-semibold">Reservation request received</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              We’ll email your verifiable itinerary to{' '}
              <span className="text-foreground">{form.email || 'your inbox'}</span> within minutes.
              You’ll be able to look up the PNR on the airline’s site.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-1">
              Build another
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-background p-1">
              {(['one-way', 'round-trip'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTripType(t)}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    tripType === t
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t === 'one-way' ? 'One-way' : 'Round-trip'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className={fieldWrap}>
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <input
                  className={fieldInput}
                  placeholder="From (e.g. LIS)"
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
                  placeholder="To (e.g. BKK)"
                  value={form.to}
                  onChange={update('to')}
                  required
                  aria-label="Destination"
                />
              </label>
            </div>

            <div className={cn('grid grid-cols-1 gap-3', tripType === 'round-trip' && 'sm:grid-cols-2')}>
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

            <Button type="submit" size="lg" className="mt-1 h-12 w-full text-[15px] font-semibold">
              Get my reservation
              <ArrowRight className="size-4" />
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-success" /> Verifiable PNR
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-success" /> {SITE.delivery}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-success" /> From {SITE.priceFrom}
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/** Avatars + rating trust cluster. */
function RatingCluster() {
  const avatars = [
    { initials: 'MV', bg: 'bg-primary' },
    { initials: 'DK', bg: 'bg-[hsl(189_62%_46%)]' },
    { initials: 'PS', bg: 'bg-[hsl(201_70%_20%)]' },
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
          Trusted by {SITE.travelersServed} travelers
        </span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-25" />

        {/* primary brand glow, top-right */}
        <div
          className="absolute right-[-10%] top-[-14%] h-[620px] w-[820px] rounded-full opacity-90 blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse at center, hsl(189 75% 60% / 0.18), hsl(192 80% 45% / 0.06) 45%, transparent 72%)',
          }}
        />
        {/* secondary soft glow, lower-left for depth */}
        <div
          className="absolute bottom-[-20%] left-[-10%] h-[440px] w-[620px] rounded-full opacity-70 blur-[120px]"
          style={{ background: 'radial-gradient(circle, hsl(201 70% 60% / 0.1), transparent 65%)' }}
        />
      </div>

      <Container>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-12 lg:gap-y-7">
          {/* Headline block */}
          <div className="order-1 flex flex-col items-start lg:col-start-1 lg:row-start-1">
            <a
              href="#verification"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 py-1 pl-1 pr-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-semibold text-primary">
                <BadgeCheck className="size-3.5" /> Verifiable
              </span>
              <span className="hidden sm:inline">Real PNR you can check on the airline’s site</span>
              <span className="sm:hidden">Real, verifiable PNR</span>
            </a>

            <h1 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Proof of onward travel,{' '}
              <span className="text-gradient-brand">sorted in minutes</span>
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
              {SITE.name} issues real airline flight reservations with a verifiable PNR - built for
              airline check-in and proof of onward travel requirements. No commitment to fly.
            </p>

            <div className="mt-6">
              <RatingCluster />
            </div>
          </div>

          {/* Booking form */}
          <div className="order-2 w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <HeroBookingForm />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Verifiable across {SITE.airlinesSupported} airlines · {SITE.countriesServed} countries
            </p>
          </div>

          {/* Proof block */}
          <div className="order-3 flex flex-col gap-4 lg:col-start-1 lg:row-start-2">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { icon: ShieldCheck, label: 'Real airline reservations' },
                { icon: CircleDot, label: 'Verifiable PNR' },
                { icon: Clock, label: SITE.delivery },
              ].map((item) => (
                <span key={item.label} className="inline-flex items-center gap-2 text-sm text-foreground/85">
                  <item.icon className="size-4 text-primary" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
