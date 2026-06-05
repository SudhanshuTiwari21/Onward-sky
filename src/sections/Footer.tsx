import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Mail } from 'lucide-react'

const columns = [
  {
    title: 'Product',
    links: ['Onward Ticket', 'Round-Trip Reservation', 'Multi-City Booking', 'Group Reservations'],
  },
  {
    title: 'Company',
    links: ['About Us', 'How It Works', 'Blog', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['FAQ', 'Visa Guide', 'Airline Partners', 'Help Center'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
  },
]

const socialIcons = [
  {
    name: 'Facebook',
    href: '#',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cols = el.querySelectorAll('.footer-col')
      cols.forEach((col, i) => {
        gsap.from(col, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          delay: i * 0.1,
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <footer id="footer" ref={footerRef} className="bg-night border-t border-white/[0.05]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-8 md:pb-10">
        {/* Logo */}
        <div className="mb-12 text-center md:text-left">
          <span className="font-body font-bold text-[1.1rem] uppercase tracking-[0.25em] text-cloud inline-flex items-center gap-1">
            ONWARD
            <span className="w-1.5 h-1.5 rounded-full bg-sky inline-block" />
            SKY
          </span>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h4 className="font-body font-semibold text-[1.2rem] uppercase tracking-[0.12em] text-silver mb-5">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-cloud text-[1.3rem] hover:text-sky transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 gap-6">
          <a
            href="mailto:support@onwardsky.com"
            className="flex items-center gap-2 text-silver text-[1.3rem] hover:text-cloud transition-colors"
          >
            <Mail size={16} />
            support@onwardsky.com
          </a>

          <div className="flex items-center gap-4">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-silver hover:text-cloud transition-all duration-200 hover:scale-110"
                aria-label={social.name}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.05] mt-8 pt-6 text-center">
          <p className="text-silver/60 text-[1.1rem]">
            &copy; 2026 Onward Sky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
