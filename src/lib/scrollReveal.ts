import { gsap } from '@/lib/gsap'

type RevealOptions = {
  trigger: Element
  targets: gsap.TweenTarget
  start?: string
  y?: number
  stagger?: number
  duration?: number
}

/**
 * Scroll-triggered motion reveal that never hides content behind opacity:0.
 * Conversion sections must stay readable even if ScrollTrigger misfires.
 */
export function revealOnScroll({
  trigger,
  targets,
  start = 'top 85%',
  y = 28,
  stagger = 0.12,
  duration = 0.65,
}: RevealOptions): gsap.Context {
  const items = gsap.utils.toArray(targets)
  if (items.length === 0) {
    return gsap.context(() => {})
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return gsap.context(() => {
    gsap.set(items, { opacity: 1, y: 0 })

    if (reducedMotion) return

    const tween = gsap.from(items, {
      y,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    })

    // If the section is already on screen when triggers are created, play now.
    const playIfVisible = () => {
      const rect = trigger.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
      if (inView) tween.progress(1)
    }

    requestAnimationFrame(playIfVisible)
    window.setTimeout(playIfVisible, 400)
  }, trigger)
}
