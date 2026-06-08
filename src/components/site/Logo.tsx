import { cn } from '@/lib/utils'

const HORIZONTAL = '/assets/logo-horizontal.png'
const MARK = '/assets/logo-mark.png'

/** Square logo icon (no wordmark). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={MARK}
      alt=""
      aria-hidden="true"
      className={cn('size-8 w-auto select-none', className)}
      loading="eager"
      decoding="async"
    />
  )
}

/** Full horizontal logo lockup (icon + wordmark). */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  if (!showWordmark) {
    return <BrandMark className={className} />
  }
  return (
    <img
      src={HORIZONTAL}
      alt="OnwardSky"
      className={cn('h-8 w-auto select-none', className)}
      loading="eager"
      decoding="async"
    />
  )
}
