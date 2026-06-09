import { Plane } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRAVEL_PHOTOS, type TravelPhoto } from '@/lib/site-data'

function airportCode(value: string, fallback: string) {
  const t = value.trim().toUpperCase()
  if (t.length >= 3) return t.slice(0, 3)
  return fallback
}

export function TravelPhoto({
  photo,
  className,
  imgClassName,
  overlay = 'none',
}: {
  photo: TravelPhoto
  className?: string
  imgClassName?: string
  overlay?: 'none' | 'dark' | 'bottom'
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={photo.src}
        alt={photo.alt}
        className={cn('h-full w-full object-cover', imgClassName)}
        loading="lazy"
        decoding="async"
      />
      {overlay === 'dark' ? (
        <div className="absolute inset-0 bg-[#082C42]/55" aria-hidden="true" />
      ) : null}
      {overlay === 'bottom' ? (
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#082C42]/80 via-[#082C42]/20 to-transparent"
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}

export function SkyHeroBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <img
        src={TRAVEL_PHOTOS.wingSky.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-50 sm:opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#082C42_0%,#0d4a6e_42%,#1a6b8a_72%,#e8f6fa_100%)] mix-blend-multiply opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,44,66,0.4)_0%,rgba(8,44,66,0.12)_45%,rgba(232,246,250,0.9)_100%)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.22]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M-40 420 Q 280 280 520 340 T 920 260 T 1280 180"
          stroke="#2FB0C6"
          strokeWidth="2"
          strokeDasharray="8 12"
        />
        <path
          d="M80 480 Q 360 360 600 400 T 1100 320"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <circle cx="520" cy="340" r="5" fill="#2FB0C6" />
        <circle cx="920" cy="260" r="4" fill="white" fillOpacity="0.6" />
      </svg>
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#2FB0C6]/20 blur-3xl" />
      <div className="absolute -left-16 bottom-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
    </div>
  )
}

export function HeroTicketPreview({
  from = '',
  to = '',
  className,
}: {
  from?: string
  to?: string
  className?: string
}) {
  const origin = airportCode(from, 'LIS')
  const dest = airportCode(to, 'BKK')

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-[0_24px_60px_-20px_rgba(8,44,66,0.45)] backdrop-blur-sm',
        className
      )}
    >
      <div
        className="absolute left-0 right-0 top-[4.5rem] border-t border-dashed border-border/80"
        aria-hidden="true"
      />
      <div className="border-b border-border/60 bg-[#082C42] px-4 py-3 text-white sm:px-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              OnwardSky · E-Ticket
            </p>
            <p className="mt-0.5 text-sm font-semibold">Flight reservation</p>
          </div>
          <span className="rounded-md bg-[#2FB0C6] px-2 py-1 font-mono text-[11px] font-bold tracking-wider">
            K7G2QP
          </span>
        </div>
      </div>

      <div className="relative px-4 py-5 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-3xl font-bold tracking-tight text-[#082C42]">{origin}</p>
            <p className="text-xs text-muted-foreground">09:40</p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-center gap-2">
              <span className="h-px flex-1 bg-border" />
              <span className="flex size-9 items-center justify-center rounded-full bg-[#2FB0C6]/15 text-[#2FB0C6]">
                <Plane className="size-4 rotate-90" />
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Confirmed
            </span>
          </div>
          <div className="text-right">
            <p className="font-mono text-3xl font-bold tracking-tight text-[#082C42]">{dest}</p>
            <p className="text-xs text-muted-foreground">06:15+1</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 text-[11px]">
          <div>
            <p className="text-muted-foreground">Passenger</p>
            <p className="font-medium">A. TRAVELER</p>
          </div>
          <div>
            <p className="text-muted-foreground">Flight</p>
            <p className="font-mono font-medium">TP 1234</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Status</p>
            <p className="font-semibold text-[#2FB0C6]">Held</p>
          </div>
        </div>

        <div
          className="mt-4 flex h-10 items-end justify-center gap-[3px] overflow-hidden rounded-md bg-secondary/50 px-3 py-2"
          aria-hidden="true"
        >
          {Array.from({ length: 42 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] shrink-0 rounded-sm bg-[#082C42]/70"
              style={{ height: `${28 + ((i * 7) % 18)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
