import Skeleton from '@/components/ui/Skeleton'

export default function BalanceSkeleton() {
  return (
    <div className='col-span-3 xl:h-auto xl:col-span-2 gap-3 flex flex-col xl:flex-row'>
      <Skeleton className='min-h-32 xl:flex-1' />
      <Skeleton className='min-h-32 xl:flex-1' />
      <Skeleton className='min-h-32 xl:flex-1' />
    </div>
  )
}
