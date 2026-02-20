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
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverPortal>
      <PopoverRadix.Content
        align='start'
        sideOffset={3}
        className={twMerge(
          `relative bg-card w-full z-20 border flex text-foreground rounded p-3 focus-visible:ring-0 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        <PopoverArrow className='fill-card' height={12} width={16} />
        <PopoverClose />
      </PopoverRadix.Content>
    </PopoverPortal>
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
