import { twMerge } from 'tailwind-merge'

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        `relative rounded-md border bg-border/70 overflow-hidden`,
        className
      )}
      {...props}
    >
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-disabled to-transparent animate-skeletonShimmer' />
    </div>
  )
}
