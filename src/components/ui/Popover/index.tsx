import * as PopoverRadix from '@radix-ui/react-popover'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Popover = PopoverRadix.Root
const PopoverAnchor = PopoverRadix.Anchor
const PopoverTrigger = PopoverRadix.Trigger
const PopoverClose = PopoverRadix.Close
const PopoverArrow = PopoverRadix.Arrow
const PopoverPortal = PopoverRadix.Portal

const PopoverContent = forwardRef<
  React.ComponentRef<typeof PopoverRadix.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverRadix.Content>
>(({ className, ...props }, ref) => {
  return (
    <PopoverRadix.Content
      className={twMerge(
        `relative bg-card min-w-[350px] z-20 h-fit border rounded p-2 focus-visible:ring-0`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

PopoverContent.displayName = PopoverRadix.Content.displayName

export {
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  PopoverClose,
  PopoverContent,
  PopoverArrow,
  PopoverPortal
}
