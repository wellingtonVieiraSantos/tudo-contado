import * as SelectRadix from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Select = SelectRadix.Root
const SelectValue = SelectRadix.Value
const SelectGroup = SelectRadix.Group

const SelectTrigger = forwardRef<
  React.ComponentRef<typeof SelectRadix.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectRadix.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectRadix.Trigger
      className={twMerge(
        `border flex justify-between items-center w-full h-8 px-2 rounded
         data-placeholder:text-foreground-secondary data-[state=open]:[&>svg]:rotate-180 [&>span]:line-clamp-1
         data-disabled:cursor-not-allowed data-disabled:bg-disabled`,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <SelectRadix.Icon asChild>
        <ChevronDown className='size-5 transition duration-300' />
      </SelectRadix.Icon>
    </SelectRadix.Trigger>
  )
})

SelectTrigger.displayName = SelectRadix.Trigger.displayName

const SelectScrollUpButton = forwardRef<
  React.ComponentRef<typeof SelectRadix.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectRadix.ScrollUpButton>
>(({ className, ...props }, ref) => {
  return (
    <SelectRadix.ScrollUpButton
      className={twMerge(
        `h-8 flex justify-center items-center py-1`,
        className
      )}
      ref={ref}
      {...props}
    >
      <ChevronUp className='size-5' />
    </SelectRadix.ScrollUpButton>
  )
})

SelectScrollUpButton.displayName = SelectRadix.ScrollUpButton.displayName

const SelectScrollDownButton = forwardRef<
  React.ComponentRef<typeof SelectRadix.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectRadix.ScrollDownButton>
>(({ className, ...props }, ref) => {
  return (
    <SelectRadix.ScrollDownButton
      className={twMerge(
        `h-8 flex justify-center items-center py-1`,
        className
      )}
      ref={ref}
      {...props}
    >
      <ChevronDown className='size-5' />
    </SelectRadix.ScrollDownButton>
  )
})

SelectScrollDownButton.displayName = SelectRadix.ScrollDownButton.displayName

const SelectContent = forwardRef<
  React.ComponentRef<typeof SelectRadix.Content>,
  React.ComponentPropsWithoutRef<typeof SelectRadix.Content>
>(
  (
    { className, children, position = 'popper', sideOffset = 4, ...props },
    ref
  ) => {
    return (
      <SelectRadix.Portal>
        <SelectRadix.Content
          className={twMerge(
            `z-20 max-h-[var(--radix-select-content-available-height)] w-full
            overflow-y-auto overflow-x-hidden rounded border bg-background
            data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut origin-[var(--radix-select-content-transform-origin)]`,
            className
          )}
          ref={ref}
          position={position}
          sideOffset={sideOffset}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectRadix.Viewport
            className={twMerge(
              'py-1',
              position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
              className
            )}
          >
            {children}
          </SelectRadix.Viewport>
          <SelectScrollDownButton />
        </SelectRadix.Content>
      </SelectRadix.Portal>
    )
  }
)

SelectContent.displayName = SelectRadix.Content.displayName

const SelectItem = forwardRef<
  React.ComponentRef<typeof SelectRadix.Item>,
  React.ComponentPropsWithoutRef<typeof SelectRadix.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectRadix.SelectItem
      className={twMerge(
        `relative h-8 p-1.5 pl-2 pr-8 flex w-full cursor-default select-none items-center
         hover:bg-hover rounded-none data-[state=checked]:bg-button data-[state=checked]:text-button-foreground
         data-disabled:cursor-not-allowed data-disabled:text-disabled`,
        className
      )}
      ref={ref}
      {...props}
    >
      <span className='absolute right-4 top-1.5 size-3.5'>
        <SelectRadix.ItemIndicator>
          <Check className='size-5' />
        </SelectRadix.ItemIndicator>
      </span>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.SelectItem>
  )
})

SelectItem.displayName = SelectRadix.Item.displayName

const SelectLabel = forwardRef<
  React.ComponentRef<typeof SelectRadix.Label>,
  React.ComponentPropsWithoutRef<typeof SelectRadix.Label>
>(({ className, ...props }, ref) => {
  return (
    <SelectRadix.Label
      className={twMerge(`h-8 px-2 flex items-center font-semibold`, className)}
      ref={ref}
      {...props}
    />
  )
})

SelectLabel.displayName = SelectRadix.Label.displayName

const SelectSeparator = forwardRef<
  React.ComponentRef<typeof SelectRadix.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectRadix.Separator>
>(({ className, ...props }, ref) => {
  return (
    <SelectRadix.Separator
      className={twMerge(`w-full h-[1px] bg-border`, className)}
      ref={ref}
      {...props}
    />
  )
})

SelectSeparator.displayName = SelectRadix.Separator.displayName

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator
}
