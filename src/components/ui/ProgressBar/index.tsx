import { forwardRef } from 'react'
import * as ProgressRadix from '@radix-ui/react-progress'
import { twMerge } from 'tailwind-merge'

const ProgressBar = forwardRef<
  React.ComponentRef<typeof ProgressRadix.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressRadix.Root>
>(({ className, value, ...props }, ref) => {
  return (
    <div className='relative w-full'>
      <ProgressRadix.Root
        className={twMerge(
          `relative w-full h-2 bg-disabled rounded-full overflow-hidden`,
          className
        )}
        ref={ref}
        {...props}
      >
        <ProgressRadix.Indicator
          className='w-full h-full flex-1 bg-foreground rounded-full transition-transform duration-[20] ease-in-out'
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`
          }}
        />
      </ProgressRadix.Root>
    </div>
  )
})

ProgressBar.displayName = ProgressRadix.Root.displayName

export { ProgressBar }
