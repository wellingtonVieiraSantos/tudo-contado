import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={twMerge(
        `border w-full px-4 py-2
        resize-none scrollbar-custom rounded placeholder:text-foreground-secondary`,
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
