import * as TooltipRadix from '@radix-ui/react-tooltip'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const TooltipProvider = TooltipRadix.Provider
const Tooltip = TooltipRadix.Root
const TooltipTrigger = TooltipRadix.Trigger
const TooltipArrow = TooltipRadix.Arrow

const TooltipContent = forwardRef<
  React.ComponentRef<typeof TooltipRadix.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipRadix.Content>
>(({ children, sideOffset = 8, className, ...props }, ref) => {
  return (
    <TooltipRadix.Portal>
      <TooltipRadix.Content
        align='start'
        className={twMerge(
          `z-50 w-fit max-w-md overflow-hidden flex justify-center px-4 py-2 items-center
           bg-background data-[state=delayed-open]:animate-fadeIn
          data-[state=closed]:animate-fadeOut border`,
          className
        )}
        sideOffset={sideOffset}
        ref={ref}
        {...props}
      >
        {children}
      </TooltipRadix.Content>
    </TooltipRadix.Portal>
  )
})

TooltipContent.displayName = TooltipRadix.Content.displayName

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow
}
