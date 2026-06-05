import { useRef, useEffect } from 'react'
import { revealOnScroll } from '@/lib/scrollReveal'
import { Star, FileCheck2, Globe2, Headphones } from 'lucide-react'

const metrics = [
  {
    value: '4.8/5',
    label: 'Average Rating',
    sub: 'Across 2,400+ verified reviews',
    icon: Star,
    accent: 'text-gold',
    stars: true,
  },
  {
    value: '50,000+',
    label: 'Reservations Delivered',
    sub: 'Verifiable PNRs issued to date',
    icon: FileCheck2,
    accent: 'text-sky',
  },
  {
    value: '150+',
    label: 'Countries Served',
    sub: 'Travelers & nomads worldwide',
    icon: Globe2,
    accent: 'text-sky',
  },
  {
    value: '24/7',
    label: 'Human Support',
    sub: 'Real agents, always reachable',
    icon: Headphones,
    accent: 'text-sky',
  },
]

export function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = revealOnScroll({
      trigger: el,
      targets: el.querySelectorAll('.metric-card'),
      start: 'top 88%',
      y: 24,
      stagger: 0.1,
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-night py-[56px] md:py-[72px] border-y border-white/[0.05]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="font-display font-bold uppercase text-cloud leading-[0.95] text-[2.6rem] md:text-[3.4rem]">
            Trusted by travelers everywhere
          </h2>
          <p className="text-silver text-[1.45rem] max-w-[440px]">
            Thousands of reservations delivered to digital nomads, visa applicants and
            frequent flyers - with a track record to prove it.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="metric-card bg-jet border border-white/[0.06] rounded-xl p-6 hover:border-sky/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10">
                  <m.icon size={18} className={m.accent} />
                </span>
                {m.stars && (
                  <span className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-gold text-gold" />
                    ))}
                  </span>
                )}
              </div>
              <div className={`font-display font-bold leading-none text-[3rem] md:text-[3.6rem] ${m.accent}`}>
                {m.value}
              </div>
              <div className="text-cloud text-[1.5rem] font-semibold mt-2">{m.label}</div>
              <div className="text-silver text-[1.25rem] mt-1 leading-snug">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
