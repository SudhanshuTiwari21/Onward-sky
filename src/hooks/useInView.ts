import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

interface UseInViewOptions {
  threshold?: number
  once?: boolean
  onEnter?: () => void
}

export function useInView<T extends HTMLElement>(options: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const { threshold = 0.2, once = true, onEnter } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top ${(1 - threshold) * 100}%`,
      once,
      onEnter: () => {
        onEnter?.()
      },
    })

    return () => {
      trigger.kill()
    }
  }, [threshold, once, onEnter])

  return ref
}

export function useAnimateIn<T extends HTMLElement>(
  animation: (el: T) => gsap.core.Tween | gsap.core.Timeline | void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = animation(el)
    return () => {
      if (tween) tween.kill()
    }
  }, deps)

  return ref
}
