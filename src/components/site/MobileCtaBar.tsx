import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site-data'

export function MobileCtaBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = () => document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 lg:hidden',
        'glass border-t border-border',
        'transition-transform duration-300',
        show ? 'translate-y-0' : 'translate-y-full'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="leading-tight">
          <div className="text-sm font-semibold">Onward ticket</div>
          <div className="text-xs text-muted-foreground">
            From {SITE.priceFrom} · {SITE.delivery.toLowerCase()}
          </div>
        </div>
        <Button onClick={go} size="lg" className="font-semibold">
          Get yours
        </Button>
      </div>
    </div>
  )
}
