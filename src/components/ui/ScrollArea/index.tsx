import * as ScrollAreaRadix from '@radix-ui/react-scroll-area'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useScrollArea from './useScrollArea'

const ScrollArea = forwardRef<
  React.ComponentRef<typeof ScrollAreaRadix.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaRadix.Root> & {
    orientation?: 'vertical' | 'horizontal'
  }
>(({ className, children, orientation = 'horizontal', ...props }, ref) => {
  const { scrollRef, start, end, scroll, handleScroll } = useScrollArea()

  return (
    <ScrollAreaRadix.Root
      className={twMerge(
        `relative overflow-hidden bg-card rounded group`,
        className
      )}
      ref={ref}
      {...props}
    >
      <ScrollAreaRadix.Viewport
        className='size-full'
        ref={scrollRef}
        onScroll={e => handleScroll(e)}
      >
        {children}
      </ScrollAreaRadix.Viewport>
      {orientation === 'horizontal' && (
        <>
          <Button
            variant='border'
            size='icon'
            onClick={() => scroll('left')}
            className={twMerge(
              `justify-center items-center border-none text-foreground-secondary
           size-10 absolute left-1 top-1/2 -translate-y-1/2 [&>svg]:size-10 disabled:[&>svg]:text-disabled`,
              start && 'hidden'
            )}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant='border'
            size='icon'
            onClick={() => scroll('right')}
            className={twMerge(
              `justify-center items-center border-none text-foreground-secondary
            size-10 absolute right-1 top-1/2 -translate-y-1/2 [&>svg]:size-10 disabled:[&>svg]:text-disabled`,
              end && 'hidden'
            )}
          >
            <ChevronRight />
          </Button>
        </>
      )}
      <Scrollbar />
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  )
})

ScrollArea.displayName = ScrollAreaRadix.Root.displayName

const Scrollbar = forwardRef<
  React.ComponentRef<typeof ScrollAreaRadix.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaRadix.ScrollAreaScrollbar>
>(({ className, orientation = 'horizontal', ...props }, ref) => {
  return (
    <ScrollAreaRadix.Scrollbar
      orientation={orientation}
      className={twMerge(
        `flex touch-none select-none transition-colors group`,
        orientation === 'vertical' &&
          'h-[var(--scrollbar-size)] w-3 flex-col p-px border-l border-l-transparent',
        orientation === 'horizontal' &&
          'w-[var(--scrollbar-size)] h-3 border-t border-t-transparent p-px',
        className
      )}
      ref={ref}
      {...props}
    >
      <ScrollAreaRadix.Thumb className='relative flex-1 rounded-full bg-border group:data-[orientation=vertical]:bg-border' />
    </ScrollAreaRadix.Scrollbar>
  )
})

Scrollbar.displayName = ScrollAreaRadix.ScrollAreaScrollbar.displayName

export { ScrollArea, Scrollbar }
