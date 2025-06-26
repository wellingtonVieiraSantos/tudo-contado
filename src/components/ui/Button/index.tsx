import { Check, X } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const sizeClasses = {
  sm: 'h-8 px-3 text-sm gap-2 [&>svg]:size-4',
  md: 'h-11 px-6 gap-2 [&>svg]:size-5',
  lg: 'h-13 px-9 gap-2 [&>svg]:size-6',
  icon: 'size-8 [&>svg]:size-5'
}

const variantClasses = {
  default: 'bg-button text-button-foreground hover:bg-button/70',
  border: 'border hover:border-foreground',
  ghost: 'hover:bg-button-ghost hover:text-button-ghost-foreground',
  link: ' after:absolute after:bottom-1 after:w-0 after:h-[1px] after:bg-foreground hover:after:w-full after:transition-all after:duration-300',
  loading: 'bg-button/70 cursor-wait text-button-foreground',
  success:
    'bg-success text-success-foreground pointer-events-none animate-shake',
  error:
    'bg-destructive text-destructive-foreground pointer-events-none animate-shake'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizeClasses
  variant?: keyof typeof variantClasses
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size = 'sm', variant = 'default', className, children, ...props },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          `w-max relative flex items-center justify-center rounded cursor-pointer transition-color duration-300
           disabled:bg-disabled disabled:cursor-not-allowed`,
          sizeClasses[size],
          variantClasses[variant],
          variant === 'link' &&
            'disabled:bg-transparent disabled:pointer-events-none',
          className
        )}
        ref={ref}
        {...props}
      >
        {variant === 'loading' && (
          <div className='size-4 border-1 border-b-button-foreground rounded-full animate-spin' />
        )}
        {variant === 'success' && <Check />}
        {variant === 'error' && <X />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
