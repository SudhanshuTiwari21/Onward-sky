import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/Button'
import {
  Check,
  ShieldCheck,
  Building2,
  Zap,
  UserCheck,
  MapPin,
  PlaneLanding,
  Calendar,
  User,
  Mail,
  PlaneTakeoff,
  Star,
} from 'lucide-react'

interface HeroSectionProps {
  onOpenBooking: () => void
}

const trustIndicators = [
  { icon: ShieldCheck, text: 'Airline Verifiable' },
  { icon: Building2, text: 'Embassy Accepted' },
  { icon: Zap, text: 'Instant Delivery' },
  { icon: UserCheck, text: 'Human Processed' },
]

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way')
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    date: '',
    name: '',
    email: '',
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      const loadTl = gsap.timeline({ delay: 0.2 })

      loadTl.from(bgRef.current, { opacity: 0, duration: 0.9, ease: 'power2.out' })

      loadTl.from(
        leftRef.current?.querySelectorAll('.hero-stagger') || [],
        { y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out' },
        '-=0.4'
      )

      loadTl.from(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.97, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollToVerification = () => {
    document.querySelector('#verification')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenBooking()
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-lg py-[11px] pl-11 pr-3 text-cloud placeholder-silver/70 text-[1.35rem] focus:border-sky focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.18)] transition-all outline-none'

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-[100px] pb-[60px]"
    >
      {/* Background Layer */}
      <div ref={bgRef} className="absolute inset-0 scale-110" style={{ willChange: 'transform' }}>
        <img
          src="/assets/hero-aviation.jpg"
          alt="Aerial view of aircraft wing over clouds at golden hour"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-jet via-jet/85 to-jet/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-jet via-transparent to-jet/40" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          {/* LEFT - Trust building content */}
          <div ref={leftRef}>
            <div className="hero-stagger inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] backdrop-blur-md rounded-full pl-2 pr-4 py-1.5 mb-6">
              <span className="flex items-center gap-0.5 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-gold text-gold" />
                ))}
              </span>
              <span className="text-cloud text-[1.2rem] font-medium">
                4.8/5 from 2,400+ travelers worldwide
              </span>
            </div>

            <h1 className="hero-stagger font-display font-bold uppercase text-cloud leading-[0.95] tracking-tight text-[3.4rem] md:text-[4.6rem] lg:text-[5.2rem]">
              Get Your Verifiable{' '}
              <span className="text-gradient-hero">Onward Ticket</span> In Minutes
            </h1>

            <p className="hero-stagger text-silver text-[1.5rem] md:text-[1.7rem] leading-[1.6] mt-5 max-w-[560px]">
              Real airline reservations with verifiable PNRs for visa applications,
              digital nomads, and onward travel requirements.
            </p>

            {/* Trust indicators */}
            <div className="hero-stagger grid grid-cols-2 gap-x-6 gap-y-3 mt-7 max-w-[480px]">
              {trustIndicators.map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-success/15 shrink-0">
                    <Check size={14} className="text-success" />
                  </span>
                  <span className="text-cloud text-[1.4rem] font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
              <Button variant="primary" size="lg" onClick={onOpenBooking}>
                Generate My Ticket
              </Button>
              <Button variant="secondary" size="lg" onClick={scrollToVerification}>
                How Verification Works
              </Button>
            </div>

            <p className="hero-stagger text-silver/80 text-[1.2rem] mt-5 flex items-center gap-2">
              <span className="font-semibold text-sky">Starting at $9.99</span>
              <span className="text-silver/40">•</span>
              No account required
              <span className="text-silver/40">•</span>
              PDF in your inbox
            </p>
          </div>

          {/* RIGHT - Premium booking widget */}
          <div ref={cardRef} className="glass-card glass-border-glow rounded-2xl p-6 md:p-7 w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-[2rem] uppercase text-cloud leading-none">
                  Build Your Reservation
                </h2>
                <p className="text-silver text-[1.25rem] mt-1.5">
                  Verifiable PNR • Delivered in minutes
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-success/15 border border-success/30 text-success text-[1.05rem] font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Live
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {/* Trip Type */}
              <div className="flex bg-white/[0.05] border border-white/10 rounded-lg p-1">
                {(['one-way', 'round-trip'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`flex-1 py-2 rounded-md text-[1.2rem] font-semibold uppercase tracking-wider transition-all duration-300 ${
                      tripType === type ? 'bg-sky text-jet' : 'text-silver hover:text-cloud'
                    }`}
                  >
                    {type === 'one-way' ? 'One Way' : 'Round Trip'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
                  <input
                    type="text"
                    placeholder="From (JFK)"
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <PlaneLanding size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
                  <input
                    type="text"
                    placeholder="To (LHR)"
                    value={formData.arrival}
                    onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>

              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="text"
                  placeholder="Traveler Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <Button variant="primary" size="md" type="submit" fullWidth className="mt-1">
                <PlaneTakeoff size={18} className="mr-2" />
                Generate Ticket
              </Button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-4 pt-4 border-t border-white/[0.08]">
              {['Verifiable PNR', 'Human Processed', 'Instant PDF'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[1.1rem] text-silver">
                  <Check size={13} className="text-success shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
