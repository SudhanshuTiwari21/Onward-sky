import { BadgeCheck, MapPin, PlaneTakeoff, Search } from 'lucide-react'
import { Container, Section, Reveal } from '@/components/site/primitives'
import { STEPS } from '@/lib/site-data'

const ICONS = [MapPin, PlaneTakeoff, Search, BadgeCheck]

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-y border-border/60 bg-[#f4f9fb] py-12 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#2FB0C6]">
            How it works
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((step, i) => {
            const Icon = ICONS[i] ?? MapPin
            return (
              <Reveal key={step.n} delay={i * 50}>
                <div className="flex flex-col items-center text-center">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgba(8,44,66,0.15)] ring-1 ring-border/50">
                    <Icon className="size-6 text-[#082C42]" strokeWidth={1.75} />
                  </span>
                  <span className="mt-3 font-mono text-[11px] font-bold text-[#2FB0C6]">
                    {step.n}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-[#082C42]">{step.title}</h3>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
