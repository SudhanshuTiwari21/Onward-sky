import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from './Button'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  onOpenBooking: () => void
}

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Visa Applications', href: '#embassy' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#footer' },
]

export function Header({ onOpenBooking }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0,
      })
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center px-6 md:px-12 transition-all duration-400 ${
          scrolled
            ? 'bg-jet/[0.95] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-body font-bold text-[1.1rem] uppercase tracking-[0.25em] text-cloud flex items-center gap-1">
            ONWARD
            <span className="w-1.5 h-1.5 rounded-full bg-sky inline-block" />
            SKY
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-body font-medium text-[1.1rem] uppercase tracking-[0.18em] text-silver hover:text-cloud transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="primary" size="sm" onClick={onOpenBooking}>
              Generate Ticket
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-cloud p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[2000] bg-jet/[0.98]">
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-end">
              <button
                className="text-cloud p-2"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body font-medium text-[2rem] uppercase tracking-[0.12em] text-silver hover:text-cloud transition-colors"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="primary" size="md" onClick={onOpenBooking} className="mt-8">
                Generate Ticket
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
