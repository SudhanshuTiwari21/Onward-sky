import { Container } from '@/components/site/primitives'
import { Logo } from '@/components/site/Logo'

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Onward ticket', href: '#hero-form' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'PNR verification', href: '#verification' },
      { label: 'Pricing', href: '#hero-form' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Thailand', href: '/countries/thailand/' },
      { label: 'Indonesia', href: '/countries/indonesia/' },
      { label: 'Philippines', href: '/countries/philippines/' },
      { label: 'All countries', href: '/countries/' },
    ],
  },
  {
    title: 'Airlines',
    links: [
      { label: 'AirAsia', href: '/airlines/airasia/' },
      { label: 'Scoot', href: '/airlines/scoot/' },
      { label: 'Emirates', href: '/airlines/emirates/' },
      { label: 'All airlines', href: '/airlines/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Proof of onward travel', href: '/help/what-is-proof-of-onward-travel/' },
      { label: 'What is a dummy ticket?', href: '/help/what-is-a-dummy-ticket/' },
      { label: 'How to verify a PNR', href: '/help/how-to-verify-pnr/' },
      { label: 'Flight itinerary for visa', href: '/flight-itinerary-for-visa/' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Real, verifiable airline flight reservations for proof of onward travel and airline
              check-in. Delivered in minutes.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OnwardSky. A verifiable reservation is suitable for proof
            of onward travel and check-in. Entry decisions rest with airlines and authorities.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="/privacy/" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="/terms/" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="/refunds/" className="transition-colors hover:text-foreground">
              Refunds
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
