import * as DialogRadix from '@radix-ui/react-dialog'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { X } from 'lucide-react'

const Modal = DialogRadix.Root
const ModalTrigger = DialogRadix.Trigger
const ModalPortal = DialogRadix.Portal
const ModalTitle = DialogRadix.Title
const ModalDescription = DialogRadix.Description
const ModalClose = DialogRadix.Close

const ModalOverlay = forwardRef<
  React.ComponentRef<typeof DialogRadix.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogRadix.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogRadix.Overlay
      ref={ref}
      {...props}
      className={twMerge(
        `fixed inset-0 backdrop-blur grid place-content-center z-20`,
        className
      )}
    />
  )
})

ModalOverlay.displayName = DialogRadix.Overlay.displayName

const ModalContent = forwardRef<
  React.ComponentRef<typeof DialogRadix.Content>,
  React.ComponentPropsWithoutRef<typeof DialogRadix.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogRadix.Content
        ref={ref}
        {...props}
        className={twMerge(
          `fixed z-20 inset-1/2 -translate-1/2 w-full max-w-lg min-h-fit bg-card p-6
          grid gap-4 data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut border rounded`,
          className
        )}
      >
        {children}
        <ModalClose
          className='text-foreground-secondary hover:text-foreground absolute top-2 right-2 cursor-pointer
        transition duration-300 rounded'
        >
          <X className='size-5' />
        </ModalClose>
      </DialogRadix.Content>
    </ModalPortal>
  )
})

ModalContent.displayName = DialogRadix.Content.displayName

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={twMerge(`grid text-center space-y-2 sm:text-left`, className)}
    />
  )
}

ModalHeader.displayName = 'ModalHeader'

const ModalActions = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={twMerge(
        `flex flex-col sm:flex-row gap-2 sm:justify-end items-center`,
        className
      )}
    />
  )
}

ModalActions.displayName = 'ModalActions'

export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalHeader,
  ModalActions,
  ModalClose
}
