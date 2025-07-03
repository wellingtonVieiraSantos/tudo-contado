import { forwardRef } from 'react'
import * as ProgressRadix from '@radix-ui/react-progress'
import { twMerge } from 'tailwind-merge'

const ProgressBar = forwardRef<
  React.ComponentRef<typeof ProgressRadix.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressRadix.Root>
>(({ className, value, max = 100, ...props }, ref) => {
  return (
    <div className='relative w-full py-2'>
      <ProgressRadix.Root
        className={twMerge(
          `relative w-full h-2 bg-foreground rounded-full overflow-hidden`,
          className
        )}
        ref={ref}
        max={max}
        {...props}
      >
        <ProgressRadix.Indicator
          className='w-full h-full flex-1 bg-button rounded-full transition-transform duration-[20] ease-in-out'
          style={{
            transform: `translateX(-${((max - (value || 0)) * 100) / max}%)`
          }}
        />
      </ProgressRadix.Root>
    </div>
  )
})

ProgressBar.displayName = ProgressRadix.Root.displayName

export { ProgressBar }
