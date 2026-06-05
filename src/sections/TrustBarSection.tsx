import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ShieldCheck, FileText, UserCheck, Plane, Clock, Headphones } from 'lucide-react'

const items = [
  { icon: ShieldCheck, text: '100% Verifiable PNR' },
  { icon: FileText, text: 'Embassy Approved Docs' },
  { icon: UserCheck, text: 'Manual Verification' },
  { icon: Plane, text: 'Valid for Major Airlines' },
  { icon: Clock, text: 'Instant PDF Delivery' },
  { icon: Headphones, text: '24/7 Customer Support' },
]

export function TrustBarSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.trust-item'), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-jet border-y border-white/[0.05]">
      <div ref={containerRef} className="max-w-[1280px] mx-auto px-6 md:px-12 py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-0">
          {items.map((item, index) => (
            <div
              key={item.text}
              className={`trust-item flex items-center gap-2 justify-center ${
                index < items.length - 1 ? 'lg:border-r lg:border-white/[0.08]' : ''
              }`}
            >
              <item.icon size={18} className="text-sky shrink-0" />
              <span className="font-body font-medium text-[1.1rem] uppercase tracking-[0.12em] text-silver whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
