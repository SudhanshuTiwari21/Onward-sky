import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { SectionHeader } from '@/components/SectionHeader'

const embassies = [
  {
    letter: 'N',
    name: 'Norway Embassy',
    subtitle: 'Royal Norwegian Embassy',
    quote:
      'Do not purchase tickets before visa approval. A flight reservation is sufficient for your application.',
    reference: '- Official visa guidance',
  },
  {
    letter: 'S',
    name: 'Spain Embassy',
    subtitle: 'Embassy of Spain',
    quote:
      'Applicants are strongly recommended not to purchase flights before obtaining their visa. A reservation is acceptable.',
    reference: '- Schengen visa requirements',
  },
  {
    letter: 'I',
    name: 'India Embassy',
    subtitle: 'Embassy of India',
    quote:
      'Applicants should avoid purchasing airline tickets before visa approval. A confirmed reservation may be submitted instead.',
    reference: '- Indian visa application guidelines',
  },
]

export function EmbassySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.embassy-card')
      cards.forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="embassy"
      ref={sectionRef}
      className="bg-night py-[64px] md:py-[88px] relative"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, transparent, transparent 31px, rgba(255,255,255,0.02) 31px, rgba(255,255,255,0.02) 32px)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeader
          label="EMBASSY GUIDELINES"
          heading="Why Embassies Recommend Flight Reservations"
          labelColor="gold"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {embassies.map((embassy) => (
            <div
              key={embassy.letter}
              className="embassy-card bg-night border-l-[3px] border-l-sky rounded-r-xl p-6 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-l-[5px] hover:bg-night/80"
            >
              {/* Seal badge */}
              <div className="w-10 h-10 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center mb-4">
                <span className="font-display font-bold text-[1.4rem] text-gold">
                  {embassy.letter}
                </span>
              </div>

              {/* Embassy info */}
              <h3 className="font-display font-bold text-[2rem] text-cloud uppercase mb-1">
                {embassy.name}
              </h3>
              <p className="text-silver text-[1.1rem] mb-5">{embassy.subtitle}</p>

              {/* Quote */}
              <div className="relative">
                <span className="absolute -top-2 -left-1 font-serif text-[4rem] text-sky/20 leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-silver text-[1.5rem] italic leading-[1.7] pl-4 font-serif">
                  {embassy.quote}
                </p>
              </div>

              {/* Reference */}
              <p className="text-silver/60 text-[1.1rem] mt-4">{embassy.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
