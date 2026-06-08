import { ArrowRight, BadgeCheck, CircleHelp, Clock, MessageCircle, Search, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AccentBlock,
  Container,
  DividerList,
  Section,
  SectionHeading,
  Reveal,
} from '@/components/site/primitives'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQS, SITE } from '@/lib/site-data'

const QUICK_TOPICS = [
  { icon: BadgeCheck, label: 'Real reservations', href: '#verification' },
  { icon: Search, label: 'PNR verification', href: '#verification' },
  { icon: Clock, label: SITE.delivery, href: '#how-it-works' },
  { icon: ShieldCheck, label: 'Secure checkout', href: '#hero-form' },
]

export function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const go = () => document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Section id="faq" className="overflow-hidden bg-card/20 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot opacity-25" />
        <div
          className="absolute bottom-[-10%] right-[-6%] h-[480px] w-[680px] rounded-full blur-[120px]"
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
              eyebrow="FAQ"
              title="Questions, answered clearly"
              description="Straight answers about how OnwardSky reservations work and where they're suitable."
            />

            <Reveal delay={80} className="mt-6 space-y-5">
              <AccentBlock>
                <div className="flex items-start gap-3">
                  <CircleHelp className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">{FAQS.length} common questions</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Everything you need to know before booking - from PNR verification to what
                      this is (and isn't) suitable for.
                    </p>
                  </div>
                </div>
              </AccentBlock>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {QUICK_TOPICS.map((topic) => (
                  <a
                    key={topic.label}
                    href={topic.href}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/85 transition-colors hover:text-primary"
                  >
                    <topic.icon className="size-3.5 shrink-0 text-primary" />
                    {topic.label}
                  </a>
                ))}
              </div>

              <AccentBlock className="border-primary/50">
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Still unsure?</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Build a reservation in under a minute - no account required.
                    </p>
                    <Button onClick={go} size="sm" className="mt-3 font-semibold">
                      Get my reservation
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </AccentBlock>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <Accordion type="single" collapsible className="w-full">
              <DividerList>
                {FAQS.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`} className="border-0">
                    <AccordionTrigger className="gap-4 py-4 text-left hover:no-underline sm:py-5">
                      <span className="flex min-w-0 flex-1 items-start gap-3">
                        <span className="mt-0.5 font-mono text-[11px] font-semibold text-primary/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-base font-semibold leading-snug">{f.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-8 text-sm leading-relaxed text-muted-foreground sm:pl-9">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </DividerList>
            </Accordion>
          </Reveal>
        </div>
      </Container>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  )
}
