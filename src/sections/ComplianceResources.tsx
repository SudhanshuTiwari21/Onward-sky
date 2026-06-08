import { ArrowUpRight, BookOpen, FileQuestion, Plane, Search } from 'lucide-react'
import { Container, DividerList, Reveal } from '@/components/site/primitives'
import { COMPLIANCE_RESOURCES } from '@/lib/site-data'

const ICONS = [BookOpen, FileQuestion, Search, Plane]

export function ComplianceResources() {
  return (
    <section id="resources" className="border-y border-border/60 bg-[hsl(200_33%_97%_/0.5)] py-8 sm:py-10">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Travel compliance
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Guides for onward travel & documentation
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Short reads on proof of onward travel, PNR verification, and visa itineraries.
          </p>
        </div>

        <Reveal delay={40} className="mt-5">
          <DividerList>
            {COMPLIANCE_RESOURCES.map((item, i) => {
              const Icon = ICONS[i] ?? BookOpen
              return (
                <a
                  key={item.slug}
                  href={item.href}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-primary sm:py-5"
                >
                  <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.75} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{item.desc}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </a>
              )
            })}
          </DividerList>
        </Reveal>
      </Container>
    </section>
  )
}
