import { useId } from 'react'
import { cn } from '@/lib/utils'

const LINE = 'hsl(192 70% 38% / 0.72)'
const LINE_SOFT = 'hsl(192 55% 42% / 0.48)'
const ACCENT = 'hsl(189 62% 42%)'
const ROUTE = 'hsl(192 80% 38% / 0.75)'

const MERIDIANS = [0.18, 0.32, 0.5, 0.68, 0.82]
const LATitudes = [60, 95, 130, 165, 200, 235, 270, 305, 340]

const ROUTES = [
  { d: 'M118 142 Q 200 118 282 156', delay: '0s' },
  { d: 'M92 228 Q 200 196 308 244', delay: '1.2s' },
  { d: 'M156 288 Q 228 248 296 118', delay: '2.4s' },
]

const HUBS = [
  { cx: 118, cy: 142, delay: '0s' },
  { cx: 282, cy: 156, delay: '0.8s' },
  { cx: 92, cy: 228, delay: '1.6s' },
  { cx: 308, cy: 244, delay: '2.2s' },
  { cx: 296, cy: 118, delay: '1s' },
  { cx: 200, cy: 200, delay: '0.4s' },
]

/**
 * Subtle "global reach" motif: a dotted longitude/latitude sphere.
 * Reads as travel/global without airplane or stock-photo clichés.
 */
export function GlobeGrid({
  className,
  emphasis = 'subtle',
  blend = false,
}: {
  className?: string
  emphasis?: 'subtle' | 'hero'
  blend?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const fadeId = `globeFade-${uid}`
  const meridians = [0.18, 0.38, 0.62, 0.82]
  const line =
    emphasis === 'hero' ? 'hsl(192 58% 40% / 0.4)' : 'hsl(196 45% 38% / 0.18)'
  const routeStroke =
    emphasis === 'hero' ? 'hsl(192 70% 38% / 0.48)' : 'hsl(192 70% 40% / 0.55)'
  const hubFill = emphasis === 'hero' ? 'hsl(192 70% 40% / 0.55)' : 'hsl(189 62% 46%)'
  const strokeW = emphasis === 'hero' ? 1.1 : 1
  const fillOpacity = emphasis === 'hero' ? 0.45 : 0.5
  return (
    <svg
      className={cn('pointer-events-none select-none', blend && 'mask-globe-hero', className)}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={fadeId} cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="hsl(189 62% 48%)" stopOpacity={emphasis === 'hero' ? 0.28 : 0.35} />
          <stop offset="70%" stopColor="hsl(189 62% 48%)" stopOpacity={emphasis === 'hero' ? 0.12 : 0.08} />
          <stop offset="100%" stopColor="hsl(189 62% 48%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="160" stroke={line} strokeWidth={strokeW} />
      <circle cx="200" cy="200" r="160" fill={`url(#${fadeId})`} opacity={fillOpacity} />
      {[60, 110, 160, 200, 240, 290, 340].map((cy, i) => {
        const dy = cy - 200
        const ry = Math.max(6, Math.sqrt(Math.max(0, 160 * 160 - dy * dy)))
        return (
          <ellipse
            key={`lat-${i}`}
            cx="200"
            cy="200"
            rx={ry}
            ry={ry * 0.26}
            transform={`translate(0 ${dy})`}
            stroke={line}
            strokeWidth={strokeW}
          />
        )
      })}
      {meridians.map((m, i) => (
        <ellipse
          key={`mer-${i}`}
          cx="200"
          cy="200"
          rx={160 * Math.abs(m - 0.5) * 2}
          ry="160"
          stroke={line}
          strokeWidth={strokeW}
        />
      ))}
      <circle cx="150" cy="120" r={emphasis === 'hero' ? 2.75 : 2.5} fill={hubFill} />
      <circle cx="270" cy="250" r={emphasis === 'hero' ? 2.75 : 2.5} fill={hubFill} />
      <path
        d="M150 120 Q 230 150 270 250"
        stroke={routeStroke}
        strokeWidth={emphasis === 'hero' ? 1.6 : 1.2}
        strokeDasharray="2 4"
        fill="none"
      />
    </svg>
  )
}

/** Layered hero globe - soft glow, radial fade, blends into copy + form column. */
export function HeroGlobeBlend({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)} aria-hidden="true">
      <div
        className="absolute left-[54%] top-[46%] h-[min(420px,95%)] w-[min(420px,95%)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[72px] sm:left-[56%]"
        style={{
          background:
            'radial-gradient(circle, hsl(189 70% 55% / 0.14) 0%, hsl(192 60% 45% / 0.06) 45%, transparent 72%)',
        }}
      />
      <GlobeGrid
        emphasis="hero"
        blend
        className="absolute left-[54%] top-[44%] h-[min(400px,92%)] w-[min(400px,92%)] -translate-x-1/2 -translate-y-1/2 opacity-90 sm:left-[56%] lg:h-[min(440px,100%)] lg:w-[min(440px,100%)]"
      />
      <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-background from-30% via-background/70 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-background/80 to-transparent" />
      <div className="absolute inset-x-[-8%] bottom-0 h-28 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/70 to-transparent" />
    </div>
  )
}

/**
 * Hero backdrop - slowly rotating wireframe globe with animated route arcs.
 * Kept at low opacity so content stays readable.
 */
export function AnimatedGlobeBackground({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  const fadeId = `globeFade-${uid}`

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 select-none',
        className
      )}
      aria-hidden="true"
    >
      <div className="motion-safe:animate-globe-spin h-full w-full" style={{ transformOrigin: 'center center' }}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="h-full w-full"
        style={{
          maskImage: 'radial-gradient(circle, #000 58%, transparent 94%)',
          WebkitMaskImage: 'radial-gradient(circle, #000 58%, transparent 94%)',
        }}
      >
        <defs>
          <radialGradient id={fadeId} cx="50%" cy="46%" r="58%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.32" />
            <stop offset="55%" stopColor={ACCENT} stopOpacity="0.14" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer sphere */}
        <circle cx="200" cy="200" r="168" stroke={LINE} strokeWidth="1.5" />
        <circle cx="200" cy="200" r="168" fill={`url(#${fadeId})`} />
        <circle cx="200" cy="200" r="168" fill="hsl(189 62% 48% / 0.1)" />

        {/* Static latitudes */}
        <g opacity="0.9">
          {LATitudes.map((cy, i) => {
            const dy = cy - 200
            const ry = Math.max(8, Math.sqrt(Math.max(0, 168 * 168 - dy * dy)))
            return (
              <ellipse
                key={`lat-${i}`}
                cx="200"
                cy="200"
                rx={ry}
                ry={ry * 0.24}
                transform={`translate(0 ${dy})`}
                stroke={LINE_SOFT}
                strokeWidth="1"
              />
            )
          })}
        </g>

        {/* Meridians - counter-rotate inside the spinning wrapper for parallax */}
        <g
          className="motion-safe:animate-globe-spin-reverse"
          style={{ transformOrigin: '200px 200px' }}
        >
          {MERIDIANS.map((m, i) => (
            <ellipse
              key={`mer-${i}`}
              cx="200"
              cy="200"
              rx={168 * Math.abs(m - 0.5) * 2}
              ry="168"
              stroke={LINE}
              strokeWidth="1"
            />
          ))}
          <ellipse cx="200" cy="200" rx="118" ry="168" stroke={LINE_SOFT} strokeWidth="0.85" opacity="0.7" />
          <ellipse cx="200" cy="200" rx="56" ry="168" stroke={LINE_SOFT} strokeWidth="0.85" opacity="0.7" />
        </g>

        {/* Animated route arcs */}
        {ROUTES.map((route, i) => (
          <path
            key={`route-${i}`}
            d={route.d}
            stroke={ROUTE}
            strokeWidth="1.4"
            strokeDasharray="4 6"
            strokeLinecap="round"
            fill="none"
            className="motion-safe:animate-route-dash"
            style={{ animationDelay: route.delay }}
          />
        ))}

        {/* Hub dots */}
        {HUBS.map((hub, i) => (
          <g key={`hub-${i}`}>
            <circle
              cx={hub.cx}
              cy={hub.cy}
              r="5"
              fill={ACCENT}
              opacity="0.18"
              className="motion-safe:animate-globe-pulse"
              style={{ animationDelay: hub.delay, transformOrigin: `${hub.cx}px ${hub.cy}px` }}
            />
            <circle cx={hub.cx} cy={hub.cy} r="2.25" fill={ACCENT} opacity="0.75" />
          </g>
        ))}
      </svg>
      </div>
    </div>
  )
}

/** Ambient page background: faint grid + soft brand glow. */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-70" />
      <div
        className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, hsl(189 70% 55% / 0.22), transparent 60%)',
        }}
      />
    </div>
  )
}
