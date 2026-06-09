import { useState } from 'react'
import {
  ArrowRight,
  ArrowLeftRight,
  Calendar,
  Check,
  Mail,
  MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { HeroTicketPreview, SkyHeroBackdrop } from '@/components/site/travel-visuals'
import { Container, Stars } from '@/components/site/primitives'
import { SITE } from '@/lib/site-data'

const fieldWrap =
  'flex items-center gap-2.5 rounded-xl border border-border/70 bg-white px-3.5 shadow-sm transition-colors focus-within:border-[#2FB0C6]/60 focus-within:ring-2 focus-within:ring-[#2FB0C6]/15'
const fieldInput =
  'h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none'

export function Hero() {
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
    <section id="top" className="relative isolate overflow-hidden">
      <SkyHeroBackdrop />

      <div className="relative pt-[3.75rem] sm:pt-16">
        <Container className="pb-6 pt-8 sm:pb-8 sm:pt-12 lg:pt-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2FB0C6]">
              Onward flight reservation
            </p>
            <h1 className="mt-2 text-balance text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Book proof of onward travel.
            </h1>
            <p className="mt-2 text-sm text-white/75 sm:text-base">
              Real PNR · Airline-verifiable · {SITE.priceFrom}
            </p>
          </div>
        </Container>

        <Container className="relative z-10 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid items-start gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            {/* Booking panel */}
            <div
              id="hero-form"
              className="rounded-2xl border border-border/50 bg-white p-4 shadow-[0_28px_70px_-28px_rgba(8,44,66,0.35)] sm:p-6"
            >
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="size-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-[#082C42]">Reservation queued</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Itinerary heading to{' '}
                    <span className="text-foreground">{form.email || 'your inbox'}</span>.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Book another route
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-secondary/60 p-1">
                    {(['one-way', 'round-trip'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTripType(t)}
                        className={cn(
                          'rounded-lg py-2.5 text-sm font-semibold transition-colors',
                          tripType === t
                            ? 'bg-[#082C42] text-white shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {t === 'one-way' ? 'One-way' : 'Round-trip'}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className={fieldWrap}>
                      <MapPin className="size-4 shrink-0 text-[#2FB0C6]" />
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
                      <ArrowLeftRight className="size-4 shrink-0 text-[#2FB0C6]" />
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

                  <div className={cn('grid gap-3', tripType === 'round-trip' ? 'sm:grid-cols-2' : '')}>
                    <label className={fieldWrap}>
                      <Calendar className="size-4 shrink-0 text-[#2FB0C6]" />
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
                        <Calendar className="size-4 shrink-0 text-[#2FB0C6]" />
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
                    <Mail className="size-4 shrink-0 text-[#2FB0C6]" />
                    <input
                      type="email"
                      className={fieldInput}
                      placeholder="Email for ticket delivery"
                      value={form.email}
                      onChange={update('email')}
                      required
                      aria-label="Email"
                    />
                  </label>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-1 h-12 w-full bg-[#082C42] text-base font-semibold hover:bg-[#0a3550] sm:h-[3.25rem]"
                  >
                    Get my onward ticket
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
                <div className="flex items-center gap-2">
                  <Stars rating={SITE.rating} size={14} />
                  <span className="text-sm font-semibold text-[#082C42]">{SITE.rating}</span>
                  <span className="text-xs text-muted-foreground">· {SITE.travelersServed} travelers</span>
                </div>
                <span className="text-xs text-muted-foreground">{SITE.delivery}</span>
              </div>
            </div>

            {/* Live ticket preview */}
            <div className="lg:pt-6">
              <HeroTicketPreview from={form.from} to={form.to} className="lg:-rotate-1 lg:scale-[1.02]" />
              <p className="mt-3 text-center text-xs text-white/70 lg:text-left">
                Preview of what you receive — verifiable on the airline site.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
