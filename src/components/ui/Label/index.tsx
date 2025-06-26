import * as LabelRadix from '@radix-ui/react-label'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Label = forwardRef<
  React.ComponentRef<typeof LabelRadix.Root>,
  React.ComponentPropsWithoutRef<typeof LabelRadix.Root>
>(({ className, ...props }, ref) => {
  return (
    <LabelRadix.Root
      className={twMerge(
        `inline-flex flex-col peer-disabled:cursor-not-allowed peer-disabled:text-disabled cursor-pointer`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Label.displayName = LabelRadix.Root.displayName

export { Label }
