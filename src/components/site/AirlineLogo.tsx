import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Renders a bundled airline brand logo with a styled text fallback if the asset
 * fails to load.
 */
export function AirlineLogo({
  name,
  logo,
  code,
  colorful = true,
  contained = false,
  className,
}: {
  name: string
  logo: string
  code?: string
  /** When true (default), show the logo in full brand color. */
  colorful?: boolean
  /** Fit inside a fixed badge - scales down without overflowing. */
  contained?: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={cn('inline-flex items-center gap-2 opacity-75', className)} title={name}>
        {code ? (
          <span className="grid size-6 place-items-center rounded-md bg-foreground/[0.06] font-mono text-[10px] font-semibold text-muted-foreground ring-hairline">
            {code}
          </span>
        ) : null}
        <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-muted-foreground">
          {name}
        </span>
      </span>
    )
  }

  return (
    <img
      src={logo}
      alt={`${name} logo`}
      title={name}
      {...(contained ? {} : { width: 120, height: 32 })}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        contained
          ? 'block max-h-6 max-w-[2rem] min-h-0 min-w-0 object-contain object-center'
          : 'h-8 w-auto max-w-[148px] object-contain',
        'transition duration-300',
        colorful
          ? 'opacity-95 saturate-100 hover:opacity-100'
          : 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0',
        className
      )}
    />
  )
}

/** Circular badge for airline cards - clips and centers the logo. */
export function AirlineLogoBadge({
  name,
  logo,
  code,
  className,
}: {
  name: string
  logo: string
  code?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'grid size-11 shrink-0 place-items-center overflow-hidden rounded-full',
        'bg-secondary/80 ring-1 ring-inset ring-border/80',
        className
      )}
    >
      <AirlineLogo name={name} logo={logo} code={code} contained />
    </span>
  )
}
