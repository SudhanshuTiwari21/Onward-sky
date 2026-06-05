import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Globe, FileCheck, Plane } from 'lucide-react'

const useCases = [
  {
    icon: Globe,
    title: 'Digital Nomads',
    description:
      'Travel freely without committing to expensive return flights. Maintain flexibility while meeting entry requirements.',
  },
  {
    icon: FileCheck,
    title: 'Visa Applicants',
    description:
      'Meet embassy travel-document requirements safely. Avoid the risk of purchasing non-refundable tickets before visa approval.',
  },
  {
    icon: Plane,
    title: 'One-Way Travelers',
    description:
      'Avoid denied boarding situations at airport check-in. Airlines require proof of onward travel - we\'ve got you covered.',
  },
]

export function WhoNeedsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Image parallax
      const img = imageRef.current?.querySelector('img')
      if (img) {
        gsap.fromTo(img, { y: '-5%' }, {
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Cards sequential reveal
      const cards = cardsRef.current?.querySelectorAll('.use-case-card')
      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.15,
        })

        // Accent line animation
        const line = card.querySelector('.accent-line')
        if (line) {
          gsap.from(line, {
            scaleY: 0,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
            delay: i * 0.15 + 0.2,
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-jet py-[64px] md:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
          {/* Left - Image */}
          <div ref={imageRef} className="relative overflow-hidden rounded-xl aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[600px]">
            <img
              src="/assets/use-cases-lifestyle.jpg"
              alt="Professional working in premium airport lounge with aircraft visible through window"
              className="w-full h-full object-cover scale-110"
              loading="lazy"
            />
          </div>

          {/* Right - Content */}
          <div ref={cardsRef}>
            <h2 className="font-display font-bold text-[3.5rem] md:text-[5rem] lg:text-[7rem] uppercase text-cloud leading-[0.9] mb-12">
              Who Needs an Onward Ticket
            </h2>

            <div className="flex flex-col gap-5">
              {useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="use-case-card relative bg-night/50 border border-white/[0.05] rounded-xl p-6 md:p-8 pl-8 md:pl-10"
                >
                  {/* Left accent line */}
                  <div className="accent-line absolute left-0 top-4 bottom-4 w-[3px] bg-sky rounded-full origin-top" />

                  <useCase.icon size={28} className="text-sky mb-3" />
                  <h3 className="font-display font-bold text-[2rem] text-cloud uppercase mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-silver text-[1.4rem] leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
