import * as AvatarRadix from '@radix-ui/react-avatar'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Avatar = forwardRef<
  React.ComponentRef<typeof AvatarRadix.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarRadix.Root>
>(({ className, ...props }, ref) => {
  return (
    <AvatarRadix.Root
      className={twMerge(
        `relative size-12 flex shrink-0 overflow-hidden rounded-full`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Avatar.displayName = AvatarRadix.Root.displayName

const AvatarImage = forwardRef<
  React.ComponentRef<typeof AvatarRadix.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarRadix.Image>
>(({ className, ...props }, ref) => {
  return (
    <AvatarRadix.Image
      className={twMerge(`bg-center bg-cover`, className)}
      ref={ref}
      {...props}
    />
  )
})

AvatarImage.displayName = AvatarRadix.Image.displayName

const AvatarFallback = forwardRef<
  React.ComponentRef<typeof AvatarRadix.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarRadix.Fallback>
>(({ className, ...props }, ref) => {
  return (
    <AvatarRadix.Fallback
      className={twMerge(
        `size-full grid place-content-center rounded-full bg-card border font-montserrat`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

AvatarFallback.displayName = AvatarRadix.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
