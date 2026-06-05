import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { SectionHeader } from '@/components/SectionHeader'
import { Star, ChevronLeft, ChevronRight, Plane } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Digital Nomad',
    flag: '🇺🇸',
    quote:
      "I've used Onward Sky for 6 different countries. Every reservation was verified instantly at check-in and immigration. Worth every penny.",
    route: 'BKK → SGN',
    date: 'Mar 2026',
    rating: 5,
  },
  {
    name: 'Marco Rodriguez',
    location: 'Visa Applicant',
    flag: '🇪🇸',
    quote:
      'My Schengen visa was approved on the first try. The embassy accepted the flight reservation without any questions. Highly recommended.',
    route: 'MAD → CDG',
    date: 'Jan 2026',
    rating: 5,
  },
  {
    name: 'Emily Chen',
    location: 'Long-Term Traveler',
    flag: '🇬🇧',
    quote:
      "Flying one-way to Southeast Asia and every airline asked for proof of onward travel. Onward Sky saved me from being denied boarding.",
    route: 'LHR → BKK',
    date: 'Feb 2026',
    rating: 5,
  },
  {
    name: "James O'Brien",
    location: 'Remote Worker',
    flag: '🇮🇪',
    quote:
      "Fast, reliable, and the PNR actually works when you check it on the airline's website. That's the difference - these are real reservations.",
    route: 'DUB → JFK',
    date: 'Apr 2026',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => {
    if (!cardRef.current) return
    const direction = index > current ? 1 : -1

    gsap.to(cardRef.current, {
      opacity: 0,
      x: direction * -30,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: direction * 30 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
        )
      },
    })
  }, [current])

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length)
  }, [current, goTo])

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(next, 5000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, next])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelector('.testimonials-header'), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const t = testimonials[current]

  return (
    <section ref={sectionRef} className="bg-night py-[64px] md:py-[88px]">
      <div className="section-divider w-[60%] mx-auto mb-[56px]" />
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="testimonials-header">
          <SectionHeader
            label="TESTIMONIALS"
            heading="Trusted by Travelers Worldwide"
          />

          {/* Rating badge */}
          <div className="flex flex-col items-center mt-6 mb-12">
            <div className="flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-2 mb-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>
              <span className="text-gold font-semibold text-[1.3rem]">4.8/5</span>
            </div>
            <span className="text-silver text-[1.1rem]">Based on 2,400+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/[0.12] bg-transparent items-center justify-center text-cloud hover:bg-white/[0.06] hover:border-white/25 transition-all z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/[0.12] bg-transparent items-center justify-center text-cloud hover:bg-white/[0.06] hover:border-white/25 transition-all z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Card */}
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-night to-navy border border-white/[0.08] rounded-xl overflow-hidden"
          >
            {/* Top section - 70% */}
            <div className="p-6 md:p-8 pb-8 relative">
              {/* Decorative corner */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-sky rounded-tl-sm" />

              <div className="mb-4">
                <h4 className="font-display font-bold text-[2rem] text-cloud uppercase">
                  {t.name}
                </h4>
                <p className="text-silver text-[1.3rem]">
                  {t.location}, {t.flag}
                </p>
              </div>

              <span className="absolute top-4 right-6 font-serif text-[3rem] text-sky/15 leading-none select-none">
                &ldquo;
              </span>

              <p className="text-cloud text-[1.6rem] md:text-[1.8rem] leading-[1.7] font-serif italic">
                {t.quote}
              </p>
            </div>

            {/* Dashed divider */}
            <div className="border-b-2 border-dashed border-white/10 mx-6 md:mx-8" />

            {/* Bottom section - 30% */}
            <div className="p-6 md:p-8 pt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-silver">
                <Plane size={14} className="text-sky" />
                <span className="text-[1.1rem]">{t.route}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-silver text-[1.1rem]">{t.date}</span>
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-sky rounded-br-sm" />
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-sky scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
