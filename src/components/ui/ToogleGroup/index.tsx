import * as ToggleGroupRadix from '@radix-ui/react-toggle-group'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const ToggleGroup = forwardRef<
  React.ComponentRef<typeof ToggleGroupRadix.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupRadix.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupRadix.Root
      {...props}
      ref={ref}
      className={twMerge(
        `grid grid-co-1 sm:grid-cols-2 w-full gap-2 pb-3 `,
        className
      )}
    />
  )
})

ToggleGroup.displayName = ToggleGroupRadix.Root.displayName

const ToggleGroupItem = forwardRef<
  React.ComponentRef<typeof ToggleGroupRadix.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupRadix.Item>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupRadix.Item
      ref={ref}
      {...props}
      className={twMerge(
        `inline-flex flex-wrap items-center justify-center gap-3 rounded p-3 border
        border-disabled data-[state=off]:bg-button-ghost/10 data-[state=on]:bg-button/10 data-[state=on]:border-button
        hover:bg-hover cursor-pointer transition duration-300 disabled:cursor-not-allowed
        disabled:bg-disabled disabled:text-foreground-secondary`,
        className
      )}
    />
  )
})

ToggleGroupItem.displayName = ToggleGroupRadix.Item.displayName

export { ToggleGroup, ToggleGroupItem }
