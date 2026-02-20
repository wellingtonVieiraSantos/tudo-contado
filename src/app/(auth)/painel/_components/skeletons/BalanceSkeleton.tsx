import Skeleton from '@/components/ui/Skeleton'

export default function BalanceSkeleton() {
  return (
    <div className='lg:h-34 col-span-2 row-start-2 gap-3 flex flex-col lg:flex-row'>
      <Skeleton className='flex-1' />
      <Skeleton className='flex-1' />
      <Skeleton className='flex-1' />
    </div>
  )
}
