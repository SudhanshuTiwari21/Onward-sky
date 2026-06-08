import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  PlaneTakeoff,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { SITE, STEPS } from '@/lib/site-data'

const STEP_ICONS: LucideIcon[] = [MapPin, PlaneTakeoff, Search, BadgeCheck]

const HIGHLIGHTS = [
  { icon: Clock, label: 'Under 2 minutes' },
  { icon: Sparkles, label: 'No account needed' },
  { icon: BadgeCheck, label: `From ${SITE.priceFrom}` },
]

function StepContent({
  step,
  icon: Icon,
  isLast,
}: {
  step: (typeof STEPS)[0]
  icon: LucideIcon
  isLast: boolean
}) {
  return (
    <div className="flex items-start gap-3 pt-1">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.75} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-primary/70">
            Step {step.n}
          </span>
          {isLast ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success">
              <BadgeCheck className="size-3" />
              Done
            </span>
          ) : null}
        </div>
        <h3 className="mt-1 text-[15px] font-semibold tracking-tight">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
      </div>
    </div>
  )
}

function StepNode({ n, active = false }: { n: string; active?: boolean }) {
  return (
    <span
      className={cn(
        'relative z-10 flex size-11 items-center justify-center rounded-full font-mono text-xs font-bold text-primary-foreground shadow-[0_0_0_4px_hsl(var(--background)),0_6px_18px_-4px_hsl(192_86%_31%_/0.5)] transition-all duration-500',
        active ? 'scale-100 bg-primary' : 'scale-95 bg-primary/35'
      )}
    >
      {n}
    </span>
  )
}

function useTimelineScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setProgress(1)
        return
      }

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.88
      const end = vh * 0.32
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return { ref, progress }
}

function isStepActive(progress: number, index: number, total: number) {
  if (total <= 1) return progress >= 1
  const threshold = index / (total - 1)
  return progress >= threshold - 0.02
}

/** Desktop + tablet: grid timeline - no absolute positioning. */
function StepsTimeline() {
  const { ref, progress } = useTimelineScrollProgress()

  return (
    <div ref={ref}>
      {/* Desktop: 4-col timeline */}
      <div className="hidden lg:block">
        <div className="relative mb-6 grid grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[1.375rem] h-0.5 overflow-hidden rounded-full bg-border"
          >
            <div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary via-[hsl(189_62%_48%)] to-primary/90 motion-reduce:!scale-x-100"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 60} className="flex justify-center">
              <StepNode n={step.n} active={isStepActive(progress, i, STEPS.length)} />
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 xl:gap-5">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? MapPin
            const isLast = i === STEPS.length - 1
            return (
              <Reveal key={step.n} delay={80 + i * 70} className="h-full">
                <StepContent step={step} icon={Icon} isLast={isLast} />
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Tablet: 2×2 */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:hidden">
        {STEPS.map((step, i) => {
          const Icon = STEP_ICONS[i] ?? MapPin
          const isLast = i === STEPS.length - 1
          return (
            <Reveal key={step.n} delay={i * 70}>
              <div className="flex h-full flex-col gap-3">
                <div className="flex items-center gap-3">
                  <StepNode n={step.n} />
                  {i < STEPS.length - 1 && i % 2 === 0 ? (
                    <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent sm:block" />
                  ) : null}
                </div>
                <StepContent step={step} icon={Icon} isLast={isLast} />
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Mobile: vertical rail */}
      <div className="relative sm:hidden">
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[1.375rem] top-2 w-px overflow-hidden rounded-full bg-border"
        >
          <div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-[hsl(189_62%_48%)] to-primary/80 motion-reduce:!scale-y-100"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>
        <div className="flex flex-col gap-4">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? MapPin
            const isLast = i === STEPS.length - 1
            return (
              <Reveal key={step.n} delay={i * 70}>
                <div className="relative pl-12">
                  <span className="absolute left-0 top-4">
                    <StepNode n={step.n} active={isStepActive(progress, i, STEPS.length)} />
                  </span>
                  <StepContent step={step} icon={Icon} isLast={isLast} />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const go = () => document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Section id="how-it-works" className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot opacity-25" />
        <div
          className="absolute left-1/2 top-[-18%] h-[480px] w-[880px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, hsl(189 70% 55% / 0.12), hsl(192 80% 45% / 0.04) 50%, transparent 72%)',
          }}
        />
      </div>

      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From route to reservation in{' '}
              <span className="text-gradient-brand">four steps</span>
            </>
          }
          description="A simple, transparent process - no account, no jargon, no commitment to fly."
        />

        <Reveal delay={40} className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {HIGHLIGHTS.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
            >
              <item.icon className="size-3.5 text-primary" />
              {item.label}
            </span>
          ))}
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <StepsTimeline />
        </div>

        <Reveal delay={280} className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
          <Button
            onClick={go}
            size="lg"
            className="h-12 px-7 font-semibold shadow-[0_10px_30px_-12px_hsl(192_86%_31%_/0.55)]"
          >
            Start your reservation
            <ArrowRight className="size-4" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Most reservations delivered in minutes · Verifiable on the airline&apos;s site
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
