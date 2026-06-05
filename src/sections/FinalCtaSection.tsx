import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Button } from '@/components/Button'
import { Check } from 'lucide-react'

interface FinalCtaSectionProps {
  onOpenBooking: () => void
}

const stats = [
  { target: 50000, suffix: '+', label: 'Travelers Helped', prefix: '' },
  { target: 200, suffix: '+', label: 'Airlines Supported', prefix: '' },
  { target: 4.8, suffix: '', label: 'Average Rating', prefix: '' },
]

function AnimatedCounter({
  target,
  suffix,
  prefix,
  trigger,
}: {
  target: number
  suffix: string
  prefix: string
  trigger: boolean
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!trigger) return

    const isDecimal = target % 1 !== 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 2) // power2.out
      const current = eased * target

      if (isDecimal) {
        setValue(parseFloat(current.toFixed(1)))
      } else {
        setValue(Math.floor(current))
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [trigger, target])

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

export function FinalCtaSection({ onOpenBooking }: FinalCtaSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Background parallax
      const bg = el.querySelector('.cta-bg')
      if (bg) {
        gsap.to(bg, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Content entrance
      ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          setTriggered(true)
          gsap.from(el.querySelector('.cta-heading'), {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
          })
          gsap.from(el.querySelector('.cta-sub'), {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
          })
          gsap.from(el.querySelector('.cta-btn'), {
            scale: 0.95,
            opacity: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'back.out(1.4)',
          })
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-[72px] md:py-[110px] overflow-hidden">
      {/* Background */}
      <div className="cta-bg absolute inset-0 scale-110">
        <img
          src="/assets/hero-aviation.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-jet/[0.85]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(8,11,16,0.75) 0%, rgba(8,11,16,0.95) 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <h2 className="cta-heading font-display font-bold text-[4rem] md:text-[5.5rem] lg:text-[7rem] uppercase text-cloud leading-[0.9] drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
          Ready to Fly?
        </h2>

        <p className="cta-sub text-silver text-[1.6rem] md:text-[1.8rem] leading-[1.7] max-w-[560px] mx-auto mt-6">
          Get your verifiable onward ticket in minutes and travel with complete confidence.
        </p>

        <div className="cta-btn mt-12">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenBooking}
            className="shadow-glow-sky-lg"
          >
            Generate My Ticket
          </Button>
        </div>

        <p className="text-silver text-[1.1rem] font-medium mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1">
            <Check size={14} className="text-success" /> Instant Delivery
          </span>
          <span className="text-silver/40">•</span>
          <span className="flex items-center gap-1">
            <Check size={14} className="text-success" /> Airline Verifiable
          </span>
          <span className="text-silver/40">•</span>
          <span className="flex items-center gap-1">
            <Check size={14} className="text-success" /> From $9.99
          </span>
        </p>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="font-display font-bold text-[4rem] md:text-[5rem] text-cloud">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    trigger={triggered}
                  />
                </div>
                <div className="text-silver text-[1rem] uppercase tracking-[0.12em] mt-1">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-10 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
