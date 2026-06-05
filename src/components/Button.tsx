import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-lg font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer',
    size === 'sm' && 'text-[1.1rem] px-5 py-[10px]',
    size === 'md' && 'text-[1.3rem] px-8 py-[14px]',
    size === 'lg' && 'text-[1.5rem] px-10 py-4',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'ghost' && 'bg-transparent text-silver hover:text-cloud',
    fullWidth && 'w-full',
    className
  )

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      {children}
    </button>
  )
}
