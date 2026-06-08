import {
  Globe,
  Lock,
  RefreshCw,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { Container, DividerList, FeatureRow, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { BENEFITS, SITE } from '@/lib/site-data'

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  shield: ShieldCheck,
  search: ShieldCheck,
  refresh: RefreshCw,
  globe: Globe,
  lock: Lock,
}

const STATS = [
  { label: 'Traveler rating', value: `${SITE.rating}/5` },
  { label: 'Reviews', value: `${SITE.reviewCount.toLocaleString()}+` },
  { label: 'Travelers', value: SITE.travelersServed },
  { label: 'From', value: SITE.priceFrom },
]

export function Benefits() {
  return (
    <Section id="benefits" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot opacity-30" />
      </div>

      <Container>
        <SectionHeading
          eyebrow="Why OnwardSky"
          title="Fast, affordable, built for travelers under pressure"
          description="Speed and compliance when you need onward travel proof — without buying a full fare."
        />

        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-border/70 py-6">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-10">
              {i > 0 ? <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" /> : null}
              <div className="text-center sm:text-left">
                <p className="text-xl font-semibold tracking-tight sm:text-2xl">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={60} className="mt-2">
          <DividerList>
            {BENEFITS.map((b) => {
              const Icon = ICONS[b.icon] ?? ShieldCheck
              return (
                <FeatureRow key={b.title} icon={Icon} title={b.title} description={b.desc} />
              )
            })}
          </DividerList>
        </Reveal>
      </Container>
    </Section>
  )
}
