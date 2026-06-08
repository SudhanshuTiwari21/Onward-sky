import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from './Logo'
import { NAV_LINKS } from '@/lib/site-data'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'pointer-events-auto px-3 transition-all duration-300 sm:px-4',
            scrolled ? 'pt-0' : 'pt-3'
          )}
        >
          <div
            className={cn(
              'header-shell mx-auto flex h-16 max-w-container items-center gap-3 px-3 transition-all duration-300 sm:px-4 lg:px-5',
              scrolled ? 'header-shell-scrolled rounded-none' : 'rounded-2xl'
            )}
          >
            <a
              href="#top"
              className="flex shrink-0 items-center"
              aria-label="OnwardSky home"
              onClick={() => setOpen(false)}
            >
              <Logo className="h-11 w-auto sm:h-12" />
            </a>

            <nav
              className="hidden flex-1 items-center justify-center lg:flex"
              aria-label="Main navigation"
            >
              <div className="inline-flex items-center rounded-full border border-border/70 bg-secondary/50 p-1 shadow-[inset_0_1px_0_hsl(0_0%_100%_/0.6)]">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => go(link.href)}
                    className="rounded-full px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-all hover:bg-background hover:text-foreground hover:shadow-sm xl:px-4"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <button
                onClick={() => go('#hero-form')}
                className="rounded-full px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign in
              </button>
              <Button
                onClick={() => go('#hero-form')}
                className="h-10 rounded-full px-5 font-semibold shadow-[0_8px_24px_-10px_hsl(192_86%_31%_/0.55)]"
              >
                Get a reservation
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <button
              className="ml-auto inline-flex size-10 items-center justify-center rounded-xl border border-border/80 bg-background/80 text-foreground transition-colors hover:bg-secondary lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
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
            'absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />

        <div
          className={cn(
            'header-shell absolute inset-x-3 top-[4.75rem] overflow-hidden rounded-2xl transition-all duration-300 sm:inset-x-4',
            open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          )}
        >
          <nav className="flex flex-col gap-1 p-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium text-foreground/90 transition-colors hover:bg-secondary/80"
              >
                {link.label}
                <ArrowRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-2 border-t border-border/60 p-3">
            <button
              onClick={() => go('#hero-form')}
              className="rounded-xl px-4 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
            >
              Sign in
            </button>
            <Button onClick={() => go('#hero-form')} size="lg" className="h-12 w-full rounded-xl font-semibold">
              Get a reservation
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
