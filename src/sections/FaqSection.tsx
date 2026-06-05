import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { SectionHeader } from '@/components/SectionHeader'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is this a real flight reservation?',
    answer:
      'Yes. We create genuine flight reservations through airline booking systems. You\'ll receive a real PNR (Passenger Name Record) that can be verified on the airline\'s website, just like a regular booking.',
  },
  {
    question: 'Can I verify my onward ticket with the airline?',
    answer:
      'Absolutely. Every reservation includes a valid PNR code. You can enter this code on the airline\'s "Manage My Booking" page to verify your reservation is active in their system.',
  },
  {
    question: 'Does it work for visa applications?',
    answer:
      'Yes. Our flight reservations are accepted by embassies and consulates worldwide for visa applications. We provide the reservation in embassy-ready format with all required details.',
  },
  {
    question: 'Is there a PNR included?',
    answer:
      'Every onward ticket includes a genuine PNR (Passenger Name Record) - the unique booking reference used by airlines worldwide. This is what makes our reservations verifiable.',
  },
  {
    question: 'How long does the reservation remain active?',
    answer:
      'Reservations typically remain active in airline systems for 7-14 days, depending on the airline. This provides ample time for visa processing and travel verification.',
  },
  {
    question: 'What airlines are supported?',
    answer:
      'We work with all major airlines worldwide including Lufthansa, Emirates, Qatar Airways, Singapore Airlines, Air France, British Airways, and 200+ others across Star Alliance, Oneworld, and SkyTeam.',
  },
]

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    const inner = innerRef.current
    if (!content || !inner) return

    if (isOpen) {
      const height = inner.scrollHeight
      gsap.to(content, {
        height,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }
  }, [isOpen])

  return (
    <div
      className={`bg-white/[0.03] border rounded-xl overflow-hidden transition-colors duration-300 ${
        isOpen ? 'border-sky/20' : 'border-white/[0.08]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
      >
        <span className="font-display font-bold text-[1.5rem] md:text-[2rem] text-cloud pr-4">
          {question}
        </span>
        <ChevronDown
          size={24}
          className={`text-silver shrink-0 transition-transform duration-400 ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </button>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div ref={innerRef} className="px-5 md:px-6 pb-5 md:pb-6">
          <p className="text-silver text-[1.4rem] md:text-[1.6rem] leading-[1.7]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.faq-item')
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
          },
          delay: i * 0.08,
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="bg-jet py-[64px] md:py-[88px]">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <SectionHeader
          label="FREQUENTLY ASKED QUESTIONS"
          heading="Got Questions? We've Got Answers"
        />

        <div className="flex flex-col gap-3 mt-12">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
