import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const variantClasses = {
  default: 'bg-badge text-badge-foreground',
  outline: 'border',
  info: 'bg-info text-info-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  error: 'bg-destructive text-destructive-foreground',
  notification:
    'absolute px-1 -top-1 -right-3 rounded-full px-0 bg-badge text-badge-foreground'
}

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantClasses
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          `min-w-6 h-6 w-fit px-2 text-sm flex justify-center items-center gap-1
          rounded-md pointer-events-none`,
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
