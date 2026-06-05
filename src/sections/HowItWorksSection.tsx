import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { SectionHeader } from '@/components/SectionHeader'
import { MapPin, UserCheck, FileCheck, Plane } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Submit Route',
    description:
      'Traveler enters itinerary and passenger details through our secure booking form.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Human Verification',
    description:
      'Our team secures your reservation manually through direct airline systems, ensuring 100% authenticity.',
    icon: UserCheck,
  },
  {
    number: '03',
    title: 'Receive & Verify',
    description:
      'PDF itinerary delivered to your email. PNR can be verified directly through the airline\'s website.',
    icon: FileCheck,
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    const cards = cardsRef.current
    if (!section || !line || !cards) return

    const ctx = gsap.context(() => {
      // Timeline line growth
      gsap.fromTo(
        line,
        { width: '0%' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      )

      // Step cards entrance
      const cardEls = cards.querySelectorAll('.step-card')
      cardEls.forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.15,
        })
      })

      // Step numbers scale
      const circles = cards.querySelectorAll('.step-circle')
      circles.forEach((circle, i) => {
        gsap.from(circle, {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: circle,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.15,
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-night py-[64px] md:py-[88px] dot-grid relative"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeader
          label="HOW IT WORKS"
          heading="Your Reservation In"
          accentText="Three Steps"
        />

        <div ref={cardsRef} className="relative mt-20">
          {/* Timeline line - desktop */}
          <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-[2px] bg-sky/20">
            <div
              ref={lineRef}
              className="h-full bg-sky"
              style={{ width: '0%' }}
            />
          </div>

          {/* Flight path arc - decorative */}
          <svg
            className="hidden lg:block absolute top-[-60px] left-[10%] right-[10%] w-[80%] h-[100px] pointer-events-none"
            viewBox="0 0 800 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 80 Q 400 -20 800 80"
              fill="none"
              stroke="rgba(56,189,248,0.15)"
              strokeWidth="1"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="step-card relative">
                {/* Step number circle */}
                <div className="step-circle w-14 h-14 rounded-full border-2 border-sky bg-night flex items-center justify-center mb-6 relative z-10">
                  <span className="font-display font-bold text-[2rem] text-sky">
                    {step.number}
                  </span>
                </div>

                {/* Vertical connector for mobile */}
                <div className="lg:hidden absolute left-7 top-14 w-[2px] h-8 bg-sky/30" />

                {/* Content */}
                <h3 className="font-display font-bold text-[2rem] text-cloud uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-silver text-[1.4rem] leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Small inline visual */}
                <div className="flex items-center gap-3 text-sky/60">
                  <step.icon size={24} />
                  {step.number === '01' && (
                    <div className="flex items-center gap-2">
                      <span className="text-[1.1rem] font-medium">A</span>
                      <Plane size={14} />
                      <span className="text-[1.1rem] font-medium">B</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
