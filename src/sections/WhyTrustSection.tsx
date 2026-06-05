import { useRef, useEffect } from 'react'
import { revealOnScroll } from '@/lib/scrollReveal'
import { ShieldCheck, UserCheck, Tag, Check } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    iconColor: 'text-sky',
    title: 'Real PNR Verification',
    description:
      'Every booking comes with a live PNR you can verify directly on the airline’s own website.',
    image: '/assets/feature-airline-mockup.jpg',
    imageAlt: 'Airline booking confirmation screen showing a verified PNR',
    badge: 'Airline website',
    support: ['Check on the airline portal', 'Valid for 200+ carriers'],
  },
  {
    icon: UserCheck,
    iconColor: 'text-sky',
    title: 'Human Processed',
    description:
      'Real agents review and issue every reservation - never risky bots or auto-generated PDFs.',
    image: '/assets/feature-operations.jpg',
    imageAlt: 'Operations dashboard used for manual flight reservation processing',
    badge: 'Ops dashboard',
    support: ['Manually issued', 'Embassy-ready format'],
  },
  {
    icon: Tag,
    iconColor: 'text-gold',
    title: 'Best Value',
    description:
      'Professional reservations from just $9.99 - no subscriptions, no hidden fees, no surprises.',
    isPrice: true,
    badge: 'Flat pricing',
    support: ['One-time payment', 'Instant PDF delivery'],
  },
]

export function WhyTrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = revealOnScroll({
      trigger: el,
      targets: el.querySelectorAll('.trust-reveal'),
      start: 'top 88%',
      y: 24,
      stagger: 0.08,
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-jet py-[64px] md:py-[88px] relative border-t border-white/[0.05]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-end mb-8">
          <div>
            <span className="trust-reveal inline-block font-body font-semibold text-[1.05rem] uppercase tracking-[0.18em] px-3 py-1.5 rounded-lg text-sky bg-sky/15 border border-sky/30">
              Why travelers trust us
            </span>
            <h2 className="trust-reveal mt-4 font-display font-bold uppercase text-cloud leading-[0.95] text-[3.2rem] md:text-[4.4rem] lg:text-[5rem]">
              The Safest Flight Reservations Available
            </h2>
          </div>
          <p className="trust-reveal text-silver text-[1.5rem] md:text-[1.6rem] leading-[1.6]">
            Each reservation is issued by a real agent and backed by an airline-verifiable PNR -
            so your itinerary holds up at the embassy counter and the boarding gate alike.
          </p>
        </div>

        <div className="trust-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="trust-reveal feature-card group bg-night border border-white/[0.05] rounded-xl overflow-hidden flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:border-sky/30 hover:shadow-card-hover"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <div className="relative h-[190px] overflow-hidden">
                {feature.isPrice ? (
                  <div className="h-full bg-gradient-to-br from-night to-navy flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12)_0%,transparent_60%)]" />
                    <span className="text-silver text-[1.3rem] font-medium mb-1">From</span>
                    <span className="font-display font-bold text-[5rem] text-sky leading-none">$9.99</span>
                  </div>
                ) : (
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-jet/80 backdrop-blur-md border border-white/10 text-cloud text-[1rem] font-medium px-2.5 py-1 rounded-md">
                  <feature.icon size={13} className={feature.iconColor} />
                  {feature.badge}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-[1.9rem] uppercase text-cloud mb-2.5 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-silver text-[1.4rem] leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/[0.06]">
                  {feature.support.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[1.25rem] text-silver">
                      <Check size={14} className="text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
