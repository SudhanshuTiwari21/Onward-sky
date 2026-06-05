import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/Button'
import { Check } from 'lucide-react'

const features = [
  'Real booking reference recognized by airlines',
  'Airline-recognized PNR in global systems',
  'Passenger name verification on airline websites',
  'Complete PDF itinerary included',
  'Embassy-ready documentation format',
]

export function PnrVerificationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Dashboard mockup slide in
      gsap.from(mockupRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          once: true,
        },
      })

      // Content stagger
      const items = contentRef.current?.querySelectorAll('.feature-item')
      items?.forEach((item, i) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            once: true,
          },
          delay: 0.3 + i * 0.08,
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="verification" ref={sectionRef} className="bg-jet py-[64px] md:py-[88px] relative overflow-hidden">
      {/* Radar grid overlay */}
      <div className="absolute inset-0 opacity-40 pointer-events-none animate-radar-rotate origin-bottom">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMax slice"
        >
          {[15, 30, 45, 60].map((r) => (
            <circle
              key={r}
              cx="400"
              cy="720"
              r={r * 6}
              fill="none"
              stroke="rgba(56,189,248,0.08)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x2 = 400 + Math.cos(angle - Math.PI / 2) * 400
            const y2 = 720 + Math.sin(angle - Math.PI / 2) * 400
            return (
              <line
                key={i}
                x1="400"
                y1="720"
                x2={x2}
                y2={y2}
                stroke="rgba(56,189,248,0.08)"
                strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Dashboard Mockup */}
          <div ref={mockupRef} className="animate-float" style={{ animationDuration: '5s', animationTimingFunction: 'ease-in-out' }}>
            <div
              className="rounded-xl overflow-hidden border border-white/[0.12] shadow-[0_16px_48px_rgba(0,0,0,0.5)] bg-night"
              style={{ transform: 'perspective(1200px) rotateY(-3deg) rotateX(2deg)' }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08] bg-night/80">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="flex-1 mx-4">
                  <div className="bg-white/[0.05] rounded-md px-3 py-1 text-[1rem] text-silver/60 text-center">
                    airline.com/manage-booking
                  </div>
                </div>
              </div>

              {/* Mockup content */}
              <div className="p-6">
                {/* Airline header */}
                <div className="flex items-center gap-2 mb-6">
                  <PlaneIcon />
                  <span className="text-cloud font-semibold text-[1.4rem]">Airline</span>
                </div>

                {/* Search box */}
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2.5 text-silver text-[1.3rem]">
                    ABC123
                  </div>
                  <div className="bg-sky text-jet font-semibold text-[1.2rem] px-5 py-2.5 rounded-lg">
                    Find Booking
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.06]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-silver text-[1.1rem] mb-1">Passenger</p>
                      <p className="text-cloud font-bold text-[1.8rem]">Emma Laurent</p>
                    </div>
                    <span className="bg-success/20 text-success font-semibold text-[1.1rem] px-3 py-1 rounded-full">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <p className="text-silver text-[1.1rem]">JFK</p>
                      <p className="text-cloud font-semibold text-[1.4rem]">10:30</p>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="h-[2px] flex-1 bg-sky/40" />
                      <PlaneIcon className="text-sky" />
                      <div className="h-[2px] flex-1 bg-sky/40" />
                    </div>
                    <div className="text-right">
                      <p className="text-silver text-[1.1rem]">LHR</p>
                      <p className="text-cloud font-semibold text-[1.4rem]">22:45</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[1.1rem]">
                    <span className="text-silver">Flight SK 1234</span>
                    <span className="text-silver">15 June 2026</span>
                  </div>

                  <p className="text-sky text-[1.2rem] mt-4 cursor-pointer hover:underline">
                    View Details &rarr;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <span className="feature-item inline-block font-body font-semibold text-[0.9rem] uppercase tracking-[0.18em] text-sky bg-sky/15 border border-sky/30 px-3 py-1.5 rounded-lg mb-4">
              REAL-TIME PNR VERIFICATION
            </span>

            <h2 className="feature-item font-display font-bold text-[3rem] md:text-[4rem] lg:text-[5rem] uppercase text-cloud leading-[0.95] mb-8">
              Verify Your Reservation Directly With Airlines
            </h2>

            <div className="flex flex-col gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="feature-item flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="text-cloud text-[1.6rem] md:text-[1.8rem]">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" size="md" className="feature-item">
              Generate Reservation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12h20" />
      <path d="M13 2v20l7-8H6l7 8V2z" />
    </svg>
  )
}
