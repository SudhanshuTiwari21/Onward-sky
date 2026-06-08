import { Container } from '@/components/site/primitives'
import { AirlineLogo } from '@/components/site/AirlineLogo'
import { SITE, AIRLINES } from '@/lib/site-data'

export function TrustBar() {
  const marquee = [...AIRLINES, ...AIRLINES]

  return (
    <section className="border-y border-border/70 bg-[hsl(201_70%_16%_/0.02)]">
      <Container className="py-4 sm:py-5">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <div className="shrink-0 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Trusted by travelers worldwide
            </p>
            <p className="mt-0.5 text-sm font-medium text-foreground/85">
              Reservations across {SITE.airlinesSupported} airlines
            </p>
          </div>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-10 py-1 sm:gap-12">
              {marquee.map((a, i) => (
                <AirlineLogo key={`${a.slug}-${i}`} name={a.name} logo={a.logo} code={a.code} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
