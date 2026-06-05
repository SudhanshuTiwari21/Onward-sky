import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from './Button'
import { X, Check, MapPin, User, Mail, Calendar, PlaneTakeoff, PlaneLanding } from 'lucide-react'

interface BookingFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingFormModal({ isOpen, onClose }: BookingFormModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    date: '',
    name: '',
    email: '',
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const tl = gsap.timeline()
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      tl.fromTo(formRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.15')
    } else {
      document.body.style.overflow = ''
      setSubmitted(false)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    })
    tl.to(formRef.current, { scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in' })
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.1')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-jet/90 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
    >
      <div
        ref={formRef}
        className="relative w-full max-w-[560px] bg-night border border-white/[0.12] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] p-8 md:p-12 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-silver hover:text-cloud transition-colors p-2"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <>
            <h3 className="font-display font-bold text-[2.8rem] md:text-[3.2rem] uppercase text-cloud leading-tight mb-2">
              Get Your Onward Ticket
            </h3>
            <p className="text-silver text-[1.4rem] mb-8">
              Embassy & Airline Approved Flight Reservations
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Trip Type Toggle */}
              <div className="flex bg-white/[0.08] rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setTripType('one-way')}
                  className={`flex-1 py-2.5 px-6 rounded-md text-[1.3rem] font-semibold uppercase tracking-wider transition-all duration-300 ${
                    tripType === 'one-way'
                      ? 'bg-sky text-jet'
                      : 'text-silver hover:text-cloud'
                  }`}
                >
                  One Way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('round-trip')}
                  className={`flex-1 py-2.5 px-6 rounded-md text-[1.3rem] font-semibold uppercase tracking-wider transition-all duration-300 ${
                    tripType === 'round-trip'
                      ? 'bg-sky text-jet'
                      : 'text-silver hover:text-cloud'
                  }`}
                >
                  Round Trip
                </button>
              </div>

              {/* Departure Airport */}
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="text"
                  placeholder="Departure Airport (e.g. JFK)"
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-cloud placeholder-silver text-[1.4rem] focus:border-sky focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)] transition-all outline-none"
                  required
                />
              </div>

              {/* Arrival Airport */}
              <div className="relative">
                <PlaneLanding size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="text"
                  placeholder="Arrival Airport (e.g. LHR)"
                  value={formData.arrival}
                  onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-cloud placeholder-silver text-[1.4rem] focus:border-sky focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)] transition-all outline-none"
                  required
                />
              </div>

              {/* Travel Date */}
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-cloud text-[1.4rem] focus:border-sky focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)] transition-all outline-none [color-scheme:dark]"
                  required
                />
              </div>

              {/* Traveler Name */}
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="text"
                  placeholder="Traveler Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-cloud placeholder-silver text-[1.4rem] focus:border-sky focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)] transition-all outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-cloud placeholder-silver text-[1.4rem] focus:border-sky focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)] transition-all outline-none"
                  required
                />
              </div>

              <Button variant="primary" size="md" type="submit" fullWidth className="mt-2">
                <PlaneTakeoff size={18} className="mr-2" />
                Generate My Ticket
              </Button>

              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {['100% Verifiable PNR', 'Manual Human Processing', 'Instant PDF Delivery'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-[1.1rem] text-silver">
                    <Check size={14} className="text-success" />
                    {item}
                  </span>
                ))}
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
              <Check size={40} className="text-success" />
            </div>
            <h3 className="font-display font-bold text-[2.8rem] uppercase text-cloud mb-3">
              Request Received!
            </h3>
            <p className="text-silver text-[1.5rem] mb-8 max-w-[400px]">
              Our team will process your onward ticket within minutes. Check your email for the PDF itinerary.
            </p>
            <Button variant="secondary" size="md" onClick={handleClose}>
              Return to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
