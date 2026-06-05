import { useRef } from 'react'
import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  heading: string
  labelColor?: 'sky' | 'gold'
  centered?: boolean
  className?: string
  headingClassName?: string
  accentText?: string
}

export function SectionHeader({
  label,
  heading,
  labelColor = 'sky',
  centered = true,
  className,
  headingClassName,
  accentText,
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.animate-item'), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(centered && 'text-center', 'mb-10', className)}
    >
      <span
        className={cn(
          'animate-item inline-block font-body font-semibold text-[0.9rem] uppercase tracking-[0.18em] px-3 py-1.5 rounded-lg',
          labelColor === 'sky'
            ? 'text-sky bg-sky/15 border border-sky/30'
            : 'text-gold bg-gold/15 border border-gold/30'
        )}
      >
        {label}
      </span>
      <h2
        className={cn(
          'animate-item mt-4 font-display font-bold uppercase text-cloud leading-[0.9]',
          'text-[3.5rem] md:text-[5rem] lg:text-[7rem]',
          centered && 'mx-auto',
          headingClassName
        )}
        style={{ maxWidth: centered ? '900px' : undefined }}
      >
        {heading}
        {accentText && (
          <span className="font-serif italic normal-case"> {accentText}</span>
        )}
      </h2>
    </div>
  )
}
