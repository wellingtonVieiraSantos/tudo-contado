import { forwardRef } from 'react'
import * as AccordionRadix from '@radix-ui/react-accordion'
import { twMerge } from 'tailwind-merge'
import { ChevronDown } from 'lucide-react'

const Accordion = AccordionRadix.Root
const AccordionItem = AccordionRadix.Item

const AccordionTrigger = forwardRef<
  React.ComponentRef<typeof AccordionRadix.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionRadix.Trigger>
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionRadix.Header className='flex'>
      <AccordionRadix.Trigger
        ref={ref}
        {...props}
        className={twMerge(
          `rounded flex-1 px-3 py-4 flex justify-between items-center group cursor-pointer
          data-disabled:cursor-not-allowed data-disabled:text-disabled`,
          className
        )}
      >
        {children}
        <ChevronDown className='size-6 group-data-[state=open]:rotate-180 transition duration-300' />
      </AccordionRadix.Trigger>
    </AccordionRadix.Header>
  )
})

AccordionTrigger.displayName = AccordionRadix.Trigger.displayName

const AccordionContent = forwardRef<
  React.ComponentRef<typeof AccordionRadix.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionRadix.Content>
>(({ className, ...props }, ref) => {
  return (
    <AccordionRadix.Content
      ref={ref}
      {...props}
      className={twMerge(
        `mb-1 w-full rounded-b overflow-hidden p-1 text-justify data-[state=open]:animate-AccordionSlideDown data-[state=closed]:animate-AccordionSlideUp`,
        className
      )}
    />
  )
})

AccordionContent.displayName = AccordionRadix.Content.displayName

export { Accordion, AccordionItem, AccordionContent, AccordionTrigger }
