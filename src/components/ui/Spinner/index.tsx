import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Spinner = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={twMerge(`grid place-items-center gap-8`, className)}
        ref={ref}
        {...props}
      >
        <div className='size-30 rounded-full border-8 border-transparent border-b-foreground-secondary animate-spin' />
        <p className='text-lg tracking-wider overflow-hidden whitespace-nowrap border-r-[0.12em] border-foreground-secondary w-0 animate-typing'>
          Carregando...
        </p>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

export { Spinner }
