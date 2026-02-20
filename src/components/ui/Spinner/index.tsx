import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Spinner = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        role='spinner'
        className='flex flex-col justify-center items-center gap-2 font-inter text-lg text-foreground tracking-wide'
        ref={ref}
        {...props}
      >
        <div
          className={twMerge(
            `size-14 rounded-full relative animate-spin after:absolute after:inset-0 after:rounded-full after:border-4 after:border-foreground after:animate-loader`,
            className
          )}
        />
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

export { Spinner }
