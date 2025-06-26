import { forwardRef } from 'react'
import * as SeparatorRadix from '@radix-ui/react-separator'
import { twMerge } from 'tailwind-merge'

const Divider = forwardRef<
  React.ComponentRef<typeof SeparatorRadix.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorRadix.Root>
>(
  (
    { orientation = 'horizontal', decorative = true, className, ...props },
    ref
  ) => {
    return (
      <SeparatorRadix.Root
        ref={ref}
        orientation={orientation}
        decorative={decorative}
        className={twMerge(
          `shrink-0 bg-border`,
          orientation === 'horizontal' ? ' h-[1px] flex-1' : 'w-[1px] h-full',
          className
        )}
        {...props}
      />
    )
  }
)

Divider.displayName = SeparatorRadix.Root.displayName

export { Divider }
