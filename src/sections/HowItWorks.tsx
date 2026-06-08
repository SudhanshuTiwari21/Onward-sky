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
import { STEPS } from '@/lib/site-data'

const STEP_ICONS: LucideIcon[] = [MapPin, PlaneTakeoff, Search, BadgeCheck]

const HIGHLIGHTS = [
  { icon: Clock, label: 'Under 2 minutes' },
  { icon: Sparkles, label: 'No account needed' },
  { icon: BadgeCheck, label: 'Real airline PNR' },
]

function StepCard({
  step,
  icon: Icon,
  isLast,
}: {
  step: (typeof STEPS)[0]
  icon: LucideIcon
  isLast: boolean
}) {
  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background p-5',
        'shadow-[inset_0_1px_0_hsl(0_0%_100%_/0.9),0_12px_32px_-24px_hsl(192_60%_35%_/0.3)]',
        'transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30',
        'hover:shadow-[0_20px_44px_-24px_hsl(192_60%_35%_/0.32)]'
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/25 opacity-0 transition-opacity group-hover:opacity-100"
      />

      <div className="relative flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
          <Icon className="size-[1.15rem]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-primary/70">
              Step {step.n}
            </span>
            {isLast ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                <BadgeCheck className="size-3" />
                Done
              </span>
            ) : null}
          </div>
          <h3 className="mt-1.5 text-[15px] font-semibold tracking-tight">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
        </div>
      </div>
    </div>
  )
}

function StepNode({ n }: { n: string }) {
  return (
    <span className="relative z-10 flex size-11 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground shadow-[0_0_0_4px_hsl(var(--background)),0_6px_18px_-4px_hsl(192_86%_31%_/0.5)]">
      {n}
    </span>
  )
}

/** Desktop + tablet: grid timeline — no absolute positioning. */
function StepsTimeline() {
  return (
    <>
      {/* Desktop: 4-col timeline */}
      <div className="hidden lg:block">
        <div className="relative mb-6 grid grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[1.375rem] h-0.5 overflow-hidden rounded-full bg-border"
          >
            <div className="h-full w-full bg-gradient-to-r from-primary/20 via-primary/50 to-primary/25" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,hsl(var(--background))_8px,hsl(var(--background))_14px)] opacity-40" />
          </div>
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 60} className="flex justify-center">
              <StepNode n={step.n} />
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 xl:gap-5">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? MapPin
            const isLast = i === STEPS.length - 1
            return (
              <Reveal key={step.n} delay={80 + i * 70} className="h-full">
                <StepCard step={step} icon={Icon} isLast={isLast} />
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
                <StepCard step={step} icon={Icon} isLast={isLast} />
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Mobile: vertical rail */}
      <div className="relative sm:hidden">
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[1.375rem] top-2 w-px bg-gradient-to-b from-primary/35 via-border to-primary/15"
        />
        <div className="flex flex-col gap-4">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? MapPin
            const isLast = i === STEPS.length - 1
            return (
              <Reveal key={step.n} delay={i * 70}>
                <div className="relative pl-12">
                  <span className="absolute left-0 top-4">
                    <StepNode n={step.n} />
                  </span>
                  <StepCard step={step} icon={Icon} isLast={isLast} />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </>
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
          description="A simple, transparent process — no account, no jargon, no commitment to fly."
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
