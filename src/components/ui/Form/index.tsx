import * as FormRadix from '@radix-ui/react-form'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Form = FormRadix.Root
const FormLabel = FormRadix.Label
const FormControl = FormRadix.Control
const FormSubmit = FormRadix.Submit
const FormValidityState = FormRadix.ValidityState

const FormField = forwardRef<
  React.ComponentRef<typeof FormRadix.Field>,
  React.ComponentPropsWithoutRef<typeof FormRadix.Field>
>(({ className, ...props }, ref) => {
  return (
    <FormRadix.Field
      className={twMerge(`flex flex-col gap-1 group`, className)}
      ref={ref}
      {...props}
    />
  )
})

FormField.displayName = FormRadix.Field.displayName

const FormMessage = forwardRef<
  React.ComponentRef<typeof FormRadix.Message>,
  React.ComponentPropsWithoutRef<typeof FormRadix.Message>
>(({ className, ...props }, ref) => {
  return (
    <FormRadix.Message
      className={twMerge(
        `text-sm group-data-[invalid]:text-destructive`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

FormMessage.displayName = FormRadix.Message.displayName

const FormSubmitError = forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'>
>(({ className, ...props }, ref) => {
  return (
    <span
      className={twMerge(
        `h-8 flex justify-center items-center text-sm text-destructive`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

FormSubmitError.displayName = 'FormSubmitError'

export {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormSubmit,
  FormValidityState,
  FormSubmitError
}
