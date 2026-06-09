import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/site/primitives'
import { Logo } from './Logo'
import { NAV_LINKS } from '@/lib/site-data'

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md">
        <Container className="flex h-[3.75rem] items-center gap-3 sm:h-16">
          <a
            href="#top"
            className="flex shrink-0 items-center"
            aria-label="OnwardSky home"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </a>

          <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Main navigation">
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Button
              onClick={() => go('#hero-form')}
              className="h-10 rounded-lg bg-[#082C42] px-5 font-semibold hover:bg-[#0a3550]"
            >
              Get a reservation
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <button
            className="ml-auto inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <button
          className={cn(
            'absolute inset-0 bg-foreground/25 backdrop-blur-sm transition-opacity duration-200',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />

        <div
          className={cn(
            'absolute inset-x-0 top-[3.75rem] border-b border-border bg-background shadow-lg transition-all duration-200 sm:top-16',
            open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
          )}
        >
          <nav className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="flex items-center justify-between rounded-lg px-4 py-3.5 text-left text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
              >
                {link.label}
                <ArrowRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <Button
              onClick={() => go('#hero-form')}
              size="lg"
              className="h-12 w-full rounded-lg bg-[#082C42] font-semibold hover:bg-[#0a3550]"
            >
              Get a reservation
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
