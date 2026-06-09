export const SITE = {
  name: 'OnwardSky',
  priceFrom: '$9.99',
  delivery: 'Delivered in minutes',
  rating: 4.9,
  reviewCount: 4200,
  travelersServed: '120,000+',
  airlinesSupported: '600+',
  countriesServed: '190+',
}

/** Royalty-free travel photography (Unsplash License) — stored in /public/assets/visuals */
export type TravelPhoto = {
  src: string
  alt: string
  label: string
}

export const TRAVEL_PHOTOS = {
  airportWindow: {
    src: '/assets/visuals/airport-window.jpg',
    alt: 'View of an airplane wing through an airport terminal window',
    label: 'Departure day',
  },
  boardingPass: {
    src: '/assets/visuals/boarding-pass.jpg',
    alt: 'Traveler holding a passport and boarding pass',
    label: 'Boarding pass ready',
  },
  cabinInterior: {
    src: '/assets/visuals/cabin-interior.jpg',
    alt: 'Interior of a passenger airplane cabin',
    label: 'In the cabin',
  },
  wingSky: {
    src: '/assets/visuals/wing-sky.jpg',
    alt: 'Sunrise seen from an airplane window above the clouds',
    label: 'Above the clouds',
  },
  airportTerminal: {
    src: '/assets/visuals/airport-terminal.jpg',
    alt: 'Travelers walking through a bright airport terminal',
    label: 'Airport terminal',
  },
} as const satisfies Record<string, TravelPhoto>

export const TRAVEL_MOMENTS = [
  TRAVEL_PHOTOS.airportWindow,
  TRAVEL_PHOTOS.boardingPass,
  TRAVEL_PHOTOS.cabinInterior,
] as const

export type NavLink = { label: string; href: string }

export const NAV_LINKS: NavLink[] = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Verification', href: '#verification' },
  { label: 'Countries', href: '#countries' },
  { label: 'Airlines', href: '#airlines' },
  { label: 'FAQ', href: '#faq' },
]

export const TRUST_POINTS = [
  'Real airline reservations',
  'Verifiable PNR',
  'Secure checkout',
  'Delivered in minutes',
]

export type Step = {
  n: string
  title: string
  desc: string
}

export const STEPS: Step[] = [
  {
    n: '01',
    title: 'Enter your route',
    desc: 'Tell us your departure, destination and travel date. Takes under a minute, no account required.',
  },
  {
    n: '02',
    title: 'We issue the reservation',
    desc: 'Our system books a real reservation in the airline’s system and generates a genuine PNR.',
  },
  {
    n: '03',
    title: 'Verify the PNR',
    desc: 'Check the booking reference directly on the airline’s website or a global PNR lookup.',
  },
  {
    n: '04',
    title: 'Travel confidently',
    desc: 'Use it for airline check-in and proof of onward travel documentation.',
  },
]

export type Benefit = {
  title: string
  desc: string
  icon: 'zap' | 'shield' | 'search' | 'refresh' | 'globe' | 'lock'
}

export const BENEFITS: Benefit[] = [
  {
    icon: 'zap',
    title: 'Delivered in minutes',
    desc: 'Built for travelers at the airport or embassy - most reservations land in your inbox fast.',
  },
  {
    icon: 'globe',
    title: 'Built for compliance',
    desc: 'Onward travel rules, airline check-in, and visa documentation - one reservation format.',
  },
  {
    icon: 'refresh',
    title: 'Flexible & low cost',
    desc: `From ${SITE.priceFrom} - a fraction of a refundable fare, with no commitment to fly.`,
  },
  {
    icon: 'lock',
    title: 'Secure checkout',
    desc: 'Encrypted payments and privacy-first handling of your traveler details.',
  },
]

export type ComplianceResource = {
  title: string
  desc: string
  href: string
  slug: string
}

export const COMPLIANCE_RESOURCES: ComplianceResource[] = [
  {
    title: 'What is proof of onward travel?',
    desc: 'Why airlines and borders ask for it.',
    href: '/guides/proof-of-onward-travel/',
    slug: 'proof-of-onward-travel',
  },
  {
    title: 'What is a dummy ticket?',
    desc: 'How it differs from a real reservation.',
    href: '/guides/dummy-ticket/',
    slug: 'dummy-ticket',
  },
  {
    title: 'How to verify a PNR',
    desc: 'Check a booking on the airline’s site.',
    href: '/guides/verify-pnr/',
    slug: 'verify-pnr',
  },
  {
    title: 'Flight reservation for visa',
    desc: 'Embassy-ready itinerary format.',
    href: '/flight-itinerary-for-visa/',
    slug: 'flight-itinerary-visa',
  },
]

export type Review = {
  name: string
  role: string
  location: string
  initials: string
  rating: number
  text: string
}

export const REVIEWS: Review[] = [
  {
    name: 'Mara V.',
    role: 'Digital nomad',
    location: 'Lisbon → Bangkok',
    initials: 'MV',
    rating: 5,
    text: 'Check-in agent asked for proof of onward travel. I pulled up the PNR on the airline site right at the counter - boarded with zero issues.',
  },
  {
    name: 'Daniel K.',
    role: 'Backpacker',
    location: 'Berlin → Bali',
    initials: 'DK',
    rating: 5,
    text: 'Booked it from the airport in about three minutes. The reservation was real and verifiable, which is exactly what I needed.',
  },
  {
    name: 'Priya S.',
    role: 'Visa applicant',
    location: 'Dubai → Manila',
    initials: 'PS',
    rating: 5,
    text: 'Used it as part of my travel documentation. Clean PDF, looked exactly like a normal airline itinerary. Fast support too.',
  },
  {
    name: 'Tom R.',
    role: 'Business traveler',
    location: 'London → Singapore',
    initials: 'TR',
    rating: 5,
    text: 'Feels like a proper software product, not a sketchy ticket site. The verification step is what sold me.',
  },
  {
    name: 'Elena G.',
    role: 'Student',
    location: 'Madrid → Tokyo',
    initials: 'EG',
    rating: 5,
    text: 'Cheaper than a refundable fare and I didn’t have to commit to a flight. Reservation arrived almost instantly.',
  },
  {
    name: 'Jccob M.',
    role: 'Digital nomad',
    location: 'Mexico City → Medellín',
    initials: 'JM',
    rating: 4,
    text: 'Solid experience. Looked up the booking reference on the carrier’s manage-booking page and it was right there.',
  },
]

export type Country = {
  name: string
  flag: string
  slug: string
  note: string
}

export const COUNTRIES: Country[] = [
  { name: 'Thailand', flag: '🇹🇭', slug: 'thailand', note: 'Onward travel often checked at check-in' },
  { name: 'Indonesia', flag: '🇮🇩', slug: 'indonesia', note: 'Proof of onward travel commonly requested' },
  { name: 'Philippines', flag: '🇵🇭', slug: 'philippines', note: 'Return/onward ticket frequently required' },
  { name: 'Costa Rica', flag: '🇨🇷', slug: 'costa-rica', note: 'Exit ticket enforced by airlines' },
  { name: 'Panama', flag: '🇵🇦', slug: 'panama', note: 'Onward travel checks at boarding' },
  { name: 'Colombia', flag: '🇨🇴', slug: 'colombia', note: 'Proof of onward travel may be requested' },
  { name: 'Vietnam', flag: '🇻🇳', slug: 'vietnam', note: 'Onward documentation for some entries' },
  { name: 'Malaysia', flag: '🇲🇾', slug: 'malaysia', note: 'Return/onward ticket checks common' },
  { name: 'Japan', flag: '🇯🇵', slug: 'japan', note: 'Onward travel evidence for visa-free entry' },
]

export type Airline = {
  name: string
  code: string
  slug: string
  domain: string
  /** Local bundled logo under /public/assets/airlines/ */
  logo: string
}

export const AIRLINES: Airline[] = [
  { name: 'AirAsia', code: 'AK', slug: 'airasia', domain: 'airasia.com', logo: '/assets/airlines/airasia.svg' },
  { name: 'Scoot', code: 'TR', slug: 'scoot', domain: 'flyscoot.com', logo: '/assets/airlines/scoot.svg' },
  { name: 'Jetstar', code: 'JQ', slug: 'jetstar', domain: 'jetstar.com', logo: '/assets/airlines/jetstar.svg' },
  { name: 'LATAM', code: 'LA', slug: 'latam', domain: 'latamairlines.com', logo: '/assets/airlines/latam.svg' },
  { name: 'Avianca', code: 'AV', slug: 'avianca', domain: 'avianca.com', logo: '/assets/airlines/avianca.png' },
  { name: 'Copa Airlines', code: 'CM', slug: 'copa-airlines', domain: 'copaair.com', logo: '/assets/airlines/copa-airlines.svg' },
  { name: 'Emirates', code: 'EK', slug: 'emirates', domain: 'emirates.com', logo: '/assets/airlines/emirates.svg' },
  { name: 'Qatar Airways', code: 'QR', slug: 'qatar-airways', domain: 'qatarairways.com', logo: '/assets/airlines/qatar-airways.svg' },
  { name: 'Turkish Airlines', code: 'TK', slug: 'turkish-airlines', domain: 'turkishairlines.com', logo: '/assets/airlines/turkish-airlines.svg' },
  { name: 'Singapore Airlines', code: 'SQ', slug: 'singapore-airlines', domain: 'singaporeair.com', logo: '/assets/airlines/singapore-airlines.svg' },
  { name: 'Lufthansa', code: 'LH', slug: 'lufthansa', domain: 'lufthansa.com', logo: '/assets/airlines/lufthansa.svg' },
]

export type Persona = {
  title: string
  desc: string
  slug: string
  icon: 'laptop' | 'backpack' | 'stamp' | 'briefcase' | 'grad'
}

export const PERSONAS: Persona[] = [
  {
    icon: 'laptop',
    title: 'Digital nomads',
    desc: 'Stay flexible between destinations while meeting onward travel requirements.',
    slug: 'digital-nomads',
  },
  {
    icon: 'backpack',
    title: 'Backpackers',
    desc: 'Open-ended trips without committing to expensive return flights.',
    slug: 'backpackers',
  },
  {
    icon: 'stamp',
    title: 'Visa applicants',
    desc: 'A flight reservation suitable for travel documentation needs.',
    slug: 'visa-applicants',
  },
  {
    icon: 'briefcase',
    title: 'Business travelers',
    desc: 'Fast, verifiable reservations when plans are still moving.',
    slug: 'business-travelers',
  },
  {
    icon: 'grad',
    title: 'Students',
    desc: 'Affordable proof of onward travel for study-abroad journeys.',
    slug: 'students',
  },
]

export type ComparisonRow = {
  criteria: string
  onward: boolean | string
  refundable: boolean | string
  fake: boolean | string
}

export const COMPARISON: ComparisonRow[] = [
  { criteria: 'Real PNR booking reference', onward: true, refundable: true, fake: false },
  { criteria: 'Verifiable on airline website', onward: true, refundable: true, fake: false },
  { criteria: 'Suitable for proof of onward travel', onward: true, refundable: true, fake: 'Risky' },
  { criteria: 'Suitable for travel documentation', onward: true, refundable: true, fake: 'Risky' },
  { criteria: 'Typical cost', onward: `From ${SITE.priceFrom}`, refundable: '$300–$1,500+', fake: 'Varies' },
  { criteria: 'Commitment to fly', onward: 'None', refundable: 'None (if refunded in time)', fake: 'None' },
]

export type Faq = { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: 'Is this a real flight reservation?',
    a: 'Yes. We create a genuine reservation in the airline’s system, which generates a real PNR (booking reference). It is not an edited PDF or a screenshot.',
  },
  {
    q: 'Can I verify the PNR myself?',
    a: 'Absolutely - and we encourage it. You can enter the booking reference on the airline’s “Manage Booking” page or a global PNR lookup to confirm the reservation is live.',
  },
  {
    q: 'What is proof of onward travel?',
    a: 'Many airlines and destinations expect evidence that you intend to leave the country before your authorized stay ends. A verifiable onward reservation is a common, low-cost way to satisfy airline check-in and travel documentation needs.',
  },
  {
    q: 'How fast will I receive it?',
    a: 'Most reservations are delivered to your email within minutes. During peak times it may take a little longer, and our support team is available if you need it sooner.',
  },
  {
    q: 'How long does the reservation stay valid?',
    a: 'Reservations typically remain active in the airline system for a limited window (often up to two weeks). The exact duration is shown at checkout so you can time it to your travel.',
  },
  {
    q: 'Do you guarantee entry or visa approval?',
    a: 'No. We provide a real, verifiable flight reservation suitable for proof of onward travel requirements and airline check-in. Entry and visa decisions are always made by airlines, border officials and authorities.',
  },
]
