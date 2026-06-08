import { BadgeCheck, Clock, Lock, Search } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { AirlineLogo } from '@/components/site/AirlineLogo'
import { SITE, AIRLINES } from '@/lib/site-data'

const items = [
  { icon: BadgeCheck, label: 'Real airline reservations' },
  { icon: Search, label: 'Verifiable PNR' },
  { icon: Lock, label: 'Secure checkout' },
  { icon: Clock, label: SITE.delivery },
]

export function TrustBar() {
  const marquee = [...AIRLINES, ...AIRLINES]
  return (
    <section className="border-y border-border bg-card/30">
      <Container className="py-6">
        <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-2.5 text-center">
              <item.icon className="size-4 shrink-0 text-primary" />
              <span className="text-sm font-medium text-foreground/85">{item.label}</span>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-border/70">
        <Container className="py-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <span className="shrink-0 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-left">
              Reservations issued
              <br className="hidden sm:block" /> across {SITE.airlinesSupported} airlines
            </span>
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-12 py-1">
                {marquee.map((a, i) => (
                  <AirlineLogo key={`${a.slug}-${i}`} name={a.name} logo={a.logo} code={a.code} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
