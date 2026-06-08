import { cn } from '@/lib/utils'

const HORIZONTAL = '/assets/onward-sky-logo.svg'

/** Square logo mark - plane icon from brand SVG. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="600 2550 1400 2750"
      fill="none"
      aria-hidden="true"
      className={cn('size-8 shrink-0 select-none', className)}
    >
      <path
        d="M998.49 2251.74c-177.97,-247.77 -282.8,-551.67 -282.8,-880.03 0,-834 676.09,-1510.09 1510.09,-1510.09 332.62,0 640.16,107.56 889.67,289.78"
        stroke="#1D6675"
        strokeWidth="41.67"
        fill="none"
      />
      <path
        fill="#1D6675"
        d="M2839.69 656.28l175.31 -303.43c0,0 -782.2,-640.6 -1618.32,47.19 -836.12,687.79 -256.4,1748.98 -168.57,1726.21 175.31,-45.47 330.41,-155.08 330.41,-155.08 0,0 -633.86,-727.86 40.46,-1308.15 674.32,-580.29 1240.71,-6.75 1240.71,-6.75z"
      />
      <path
        fill="#2FB0C6"
        d="M3318.45 696.74l-175.33 404.59c0,0 161.84,552.9 -242.74,923.79 -404.59,370.89 -654.06,256.24 -654.06,256.24l-364.13 276.46c0,0 525.95,256.25 1166.54,-222.51 640.58,-478.76 458.52,-1389.07 269.73,-1638.56z"
      />
      <path
        fill="#082C42"
        d="M21.12 1503.88c0,0 1031.68,182.04 2036.39,-735 1004.71,-917.04 1274.42,-1800.39 1274.42,-1800.39 0,0 -20.22,1024.95 -1031.68,2070.12 -1011.46,1045.17 -1746.44,768.69 -1746.44,768.69 0,0 -370.87,-94.39 -532.69,-303.43z"
      />
      <path
        fill="#2C8EA7"
        d="M3144.26 5.83c0,0 128.07,-25.65 175.48,-23.72 47.4,1.93 142.85,51.28 166,109.08 17.36,43.32 -42.87,-98.52 -64.02,-187.35 -21.15,-88.83 -18.97,-180.22 -18.97,-180.22 0,0 -65.11,105.22 -109.08,156.52 -43.98,51.3 -149.41,125.69 -149.41,125.69z"
      />
      <path
        d="M3385.31 423.01c208.82,259.01 333.82,588.46 333.82,947.07 0,833.98 -676.09,1510.07 -1510.07,1510.07 -207.66,0 -405.55,-41.92 -585.61,-117.74"
        stroke="#2FB0C6"
        strokeWidth="41.67"
        fill="none"
      />
    </svg>
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
      className={cn('h-10 w-auto select-none sm:h-11', className)}
      loading="eager"
      decoding="async"
    />
  )
}
