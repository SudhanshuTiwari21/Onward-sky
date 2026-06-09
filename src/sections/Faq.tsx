import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Container, DividerList, Section, Reveal } from '@/components/site/primitives'
import { FAQS } from '@/lib/site-data'

const HOMEPAGE_FAQS = FAQS.slice(0, 4)

export function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <Section id="faq" className="border-t border-border/60 bg-[#f4f9fb] py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#2FB0C6]">
            FAQ
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold text-[#082C42] sm:text-3xl">
            Quick answers
          </h2>
        </Reveal>

        <Reveal delay={60} className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            <DividerList>
              {HOMEPAGE_FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-0">
                  <AccordionTrigger className="gap-4 py-4 text-left hover:no-underline">
                    <span className="text-base font-semibold leading-snug text-[#082C42]">
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </DividerList>
          </Accordion>
        </Reveal>
      </Container>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  )
}
