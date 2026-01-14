import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Pagination = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge(`grid place-content-center text-lg`, className)}
      {...props}
    />
  )
}

Pagination.displayName = 'Pagination'

const PaginationContent = forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => {
  return (
    <ul
      className={twMerge(
        `flex flex-row justify-center items-center gap-2 p-2`,
        className
      )}
      ref={ref}
      {...props}
    ></ul>
  )
})

PaginationContent.displayName = 'PaginationContent'

const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => {
    return (
      <li
        className={twMerge(
          `min-w-9 h-9 flex items-center justify-center`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

PaginationItem.displayName = 'PaginationItem'

interface PaginationLinkProps extends React.ComponentProps<typeof Link> {
  isActive?: boolean
  disabled?: boolean
}

const PaginationLink = ({
  isActive,
  disabled,
  className,
  ...props
}: PaginationLinkProps) => {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={twMerge(
        `h-full flex-1 grid place-items-center rounded transition duration-300 hover:bg-hover`,
        isActive && 'bg-button hover:bg-button/70 text-button-foreground',
        disabled &&
          'pointer-events-none bg-disabled text-foreground-secondary ',
        className
      )}
      {...props}
    />
  )
}

PaginationLink.displayName = 'PaginationLink'

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink {...props}>
      <div className={twMerge(`flex justify-center w-9`, className)}>
        <span className='sr-only'>Next</span>
        <ChevronRight />
      </div>
    </PaginationLink>
  )
}

PaginationNext.displayName = PaginationNext

const PaginationPrev = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink {...props}>
      <div className={twMerge(`flex justify-center w-9`, className)}>
        <ChevronLeft />
        <span className='sr-only'>Previous</span>
      </div>
    </PaginationLink>
  )
}

PaginationPrev.displayName = 'PaginationPrev'

const PaginationElipse = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  return (
    <span className={twMerge(``, className)} {...props}>
      <MoreHorizontal />
      <span className='sr-only'>More pages</span>
    </span>
  )
}

PaginationElipse.displayName = 'PaginationElipse'

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrev,
  PaginationNext,
  PaginationElipse
}
