import {
  AlertTriangle,
  BadgeCheck,
  Check,
  Minus,
  ShieldCheck,
  Ticket,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container, Section, SectionHeading, Reveal } from '@/components/site/primitives'
import { COMPARISON, SITE } from '@/lib/site-data'

const columns = [
  {
    key: 'onward' as const,
    label: 'Verified onward ticket',
    short: 'OnwardSky',
    highlight: true,
    icon: ShieldCheck,
    verdict: 'Recommended',
    verdictClass: 'border-primary/25 bg-primary/10 text-primary',
    blurb: 'Real PNR, verifiable, and built for proof of onward travel - without buying a ticket.',
  },
  {
    key: 'refundable' as const,
    label: 'Refundable airline ticket',
    short: 'Refundable fare',
    highlight: false,
    icon: Ticket,
    verdict: 'Premium option',
    verdictClass: 'border-border bg-secondary/70 text-foreground/80',
    blurb: 'Legitimate but costly. Works when you can afford the hold and refund window.',
  },
  {
    key: 'fake' as const,
    label: 'Non-verifiable document',
    short: 'Edited PDF',
    highlight: false,
    icon: AlertTriangle,
    verdict: 'High risk',
    verdictClass: 'border-warning/25 bg-warning/10 text-[hsl(35_72%_38%)]',
    blurb: 'May look fine on paper but fails when an agent checks the booking reference.',
  },
]

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (value === true)
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
          highlight ? 'bg-success/15 text-success' : 'bg-success/10 text-success'
        )}
      >
        <Check className="size-3.5" strokeWidth={2.5} />
        Yes
      </span>
    )
  if (value === false)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
        <X className="size-3.5" />
        No
      </span>
    )
  if (value === 'Risky')
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/12 px-2.5 py-1 text-xs font-semibold text-[hsl(35_72%_38%)]">
        <Minus className="size-3.5" />
        Risky
      </span>
    )
  return (
    <span
      className={cn(
        'text-sm font-semibold',
        highlight && value === SITE.priceFrom ? 'text-primary' : 'text-foreground/85'
      )}
    >
      {value}
    </span>
  )
}

function VerdictCards() {
  return (
    <div className="flex flex-col gap-3">
      {columns.map((col) => (
        <div
          key={col.key}
          className={cn(
            'rounded-xl border p-4 transition-colors',
            col.highlight
              ? 'border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/15 shadow-[0_12px_32px_-24px_hsl(192_60%_35%_/0.35)]'
              : 'border-border/80 bg-background/90'
          )}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset',
                col.highlight
                  ? 'bg-primary/15 text-primary ring-primary/20'
                  : 'bg-secondary text-muted-foreground ring-border'
              )}
            >
              <col.icon className="size-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold">{col.short}</h3>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                    col.verdictClass
                  )}
                >
                  {col.verdict}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{col.blurb}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function DocumentComparison() {
  return (
    <Section id="compare" className="overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot opacity-30" />
        <div
          className="absolute right-[-6%] top-[20%] h-[480px] w-[720px] rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, hsl(201 70% 60% / 0.1), hsl(189 70% 55% / 0.04) 55%, transparent 75%)',
          }}
        />
      </div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-start lg:gap-10 xl:gap-12">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Know your options"
              title="Which travel document actually holds up?"
              description="Not all proof of onward travel is equal. Here’s how a verifiable onward ticket compares to the alternatives."
            />
            <Reveal delay={80} className="mt-6 hidden lg:block">
              <VerdictCards />
            </Reveal>
          </div>

          <div>
            <Reveal delay={100}>
              <div className="card-elevated overflow-hidden rounded-2xl ring-hairline">
                <div className="border-b border-border bg-gradient-to-r from-secondary/60 via-background to-accent/20 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <BadgeCheck className="size-3.5 text-primary" />
                    Side-by-side capability comparison
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border bg-background/80">
                        <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:px-5">
                          Capability
                        </th>
                        {columns.map((col) => (
                          <th
                            key={col.key}
                            className={cn(
                              'px-3 py-3.5 text-center align-bottom sm:px-4',
                              col.highlight && 'relative bg-primary/[0.05]'
                            )}
                          >
                            {col.highlight ? (
                              <>
                                <span className="absolute inset-x-3 top-0 h-1 rounded-b-full bg-gradient-to-r from-primary to-[hsl(189_62%_48%)] sm:inset-x-4" />
                                <span className="mb-1.5 inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                                  Best value
                                </span>
                              </>
                            ) : null}
                            <div className="flex flex-col items-center gap-1.5">
                              <col.icon
                                className={cn(
                                  'size-4',
                                  col.highlight ? 'text-primary' : 'text-muted-foreground'
                                )}
                              />
                              <span
                                className={cn(
                                  'max-w-[9rem] text-xs font-semibold leading-tight sm:text-sm',
                                  col.highlight ? 'text-primary' : 'text-foreground/80'
                                )}
                              >
                                {col.label}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map((row, i) => (
                        <tr
                          key={row.criteria}
                          className={cn(
                            'border-b border-border/60 last:border-0',
                            i % 2 === 1 && 'bg-secondary/20'
                          )}
                        >
                          <td className="px-4 py-3 font-medium text-foreground/90 sm:px-5 sm:py-3.5">
                            {row.criteria}
                          </td>
                          {columns.map((col) => (
                            <td
                              key={col.key}
                              className={cn(
                                'px-3 py-3 text-center sm:px-4 sm:py-3.5',
                                col.highlight && 'bg-primary/[0.04]'
                              )}
                            >
                              <Cell value={row[col.key]} highlight={col.highlight} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180} className="mt-4 lg:hidden">
              <VerdictCards />
            </Reveal>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:mt-5">
              Entry and visa decisions are always made by airlines and authorities. OnwardSky provides
              a verifiable reservation suitable for proof of onward travel and check-in.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
