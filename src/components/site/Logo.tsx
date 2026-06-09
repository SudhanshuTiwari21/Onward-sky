import { cn } from '@/lib/utils'

/** Official horizontal lockup — derived from `public/assets/onward sky logo.svg`. */
const LOGO_SRC = '/assets/onward-sky-logo.svg'

const ICON_VIEWBOX = '520 2680 1480 1480'

const ICON_PATHS = (
  <>
    <path
      stroke="#1D6675"
      strokeWidth="41.67"
      fill="none"
      d="M1095.91 3967.88c-92.15,-128.29 -146.43,-285.65 -146.43,-455.67 0,-431.83 350.07,-781.91 781.91,-781.91 172.23,0 331.47,55.69 460.66,150.04"
    />
    <path
      fill="#1D6675"
      d="M2049.27 3141.77l90.78 -157.11c0,0 -405.02,-331.7 -837.95,24.43 -432.93,356.13 -132.76,905.6 -87.28,893.81 90.78,-23.54 171.09,-80.3 171.09,-80.3 0,0 -328.2,-376.88 20.95,-677.35 349.15,-300.47 642.43,-3.49 642.43,-3.49z"
    />
    <path
      fill="#2FB0C6"
      d="M2297.17 3162.72l-90.79 209.49c0,0 83.8,286.29 -125.69,478.33 -209.49,192.04 -338.66,132.67 -338.66,132.67l-188.54 143.15c0,0 272.33,132.69 604.02,-115.21 331.69,-247.89 237.42,-719.24 139.67,-848.43z"
    />
    <path
      fill="#082C42"
      d="M589.84 4098.43c0,0 534.19,94.26 1054.42,-380.57 520.23,-474.83 659.88,-932.22 659.88,-932.22 0,0 -10.47,530.7 -534.19,1071.88 -523.72,541.18 -904.28,398.02 -904.28,398.02 0,0 -192.04,-48.87 -275.82,-157.11z"
    />
    <path
      fill="#2C8EA7"
      d="M2206.97 2804.97c0,0 66.31,-13.28 90.86,-12.28 24.54,1 73.97,26.56 85.96,56.48 8.99,22.43 -22.2,-51.02 -33.15,-97.01 -10.95,-46 -9.82,-93.31 -9.82,-93.31 0,0 -33.71,54.48 -56.48,81.04 -22.77,26.56 -77.36,65.08 -77.36,65.08z"
    />
    <path
      stroke="#2FB0C6"
      strokeWidth="41.67"
      fill="none"
      d="M2331.79 3020.98c108.12,134.11 172.85,304.7 172.85,490.38 0,431.83 -350.07,781.9 -781.9,781.9 -107.52,0 -209.99,-21.7 -303.22,-60.96"
    />
  </>
)

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      fill="none"
      aria-hidden="true"
      className={cn('aspect-square size-8 shrink-0 select-none', className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {ICON_PATHS}
    </svg>
  )
}

/** Full logo from official brand SVG file. */
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
      src={LOGO_SRC}
      alt="OnwardSky"
      width={820}
      height={168}
      decoding="async"
      className={cn('block h-9 w-auto shrink-0 object-contain sm:h-10', className)}
    />
  )
}

export const logoAssetSrc = LOGO_SRC
