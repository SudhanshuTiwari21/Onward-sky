import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/site/primitives'
import { Logo } from './Logo'
import { NAV_LINKS } from '@/lib/site-data'

const SCROLL_SOLID_THRESHOLD = 48

export function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SCROLL_SOLID_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
          solid
            ? 'border-b border-border/60 bg-white/95 backdrop-blur-md'
            : 'border-b border-white/10 bg-transparent'
        )}
      >
        <Container className="flex h-[3.75rem] items-center gap-3 sm:h-16">
          <a
            href="#top"
            className="flex shrink-0 items-center"
            aria-label="OnwardSky home"
            onClick={() => setOpen(false)}
          >
            <Logo variant={solid ? 'default' : 'white'} />
          </a>

          <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Main navigation">
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className={cn(
                    'rounded-md px-3 py-2 text-[13px] font-medium transition-colors',
                    solid
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-white/75 hover:text-white'
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Button
              onClick={() => go('#hero-form')}
              className={cn(
                'h-10 rounded-lg px-5 font-semibold transition-colors',
                solid
                  ? 'bg-[#082C42] hover:bg-[#0a3550]'
                  : 'bg-white text-[#082C42] hover:bg-white/90'
              )}
            >
              Get a reservation
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <button
            className={cn(
              'ml-auto inline-flex size-10 items-center justify-center rounded-lg border transition-colors lg:hidden',
              solid
                ? 'border-border text-foreground hover:bg-secondary'
                : 'border-white/25 text-white hover:bg-white/10'
            )}
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
