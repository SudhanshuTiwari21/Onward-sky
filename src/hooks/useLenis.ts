import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Sync ScrollTrigger with Lenis scroll position (not window.scrollY alone).
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    lenis.on('scroll', ScrollTrigger.update)

    // Safety net: also drive ScrollTrigger from the native scroll event. In
    // environments where the smooth-scroll layer does not emit (or is bypassed),
    // this guarantees entrance animations still fire and content is never left
    // stuck at opacity:0.
    const onNativeScroll = () => ScrollTrigger.update()
    window.addEventListener('scroll', onNativeScroll, { passive: true })

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)

    gsap.ticker.lagSmoothing(0)

    // Recalculate ScrollTrigger start/end positions once the page layout has
    // fully settled (fonts, hero image, lazy media). Without this, triggers
    // recorded while the document was still short can get stale positions and
    // leave entrance-animated content stuck at opacity:0.
    const refresh = () => ScrollTrigger.refresh()
    const refreshTimers = [
      window.setTimeout(refresh, 200),
      window.setTimeout(refresh, 800),
      window.setTimeout(refresh, 1600),
    ]
    window.addEventListener('load', refresh)

    return () => {
      refreshTimers.forEach((t) => window.clearTimeout(t))
      window.removeEventListener('load', refresh)
      window.removeEventListener('scroll', onNativeScroll)
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
