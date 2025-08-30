import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3 pr-0 gap-3 pb-22 lg:pb-0'>
      <Skeleton className='h-13 lg:h-16 lg:col-span-2' />
      <Skeleton className='h-45 lg:h-55 col-span-2 mr-3 lg:col-span-1' />
      <Skeleton className='h-20 lg:h-12 lg:col-span-2' />
      <div className='items-start w-full grid gap-3 col-span-2'>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-8 w-60 lg:h-7 lg:w-70' />
      </div>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:col-span-2'>
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className='h-52' />
        ))}
      </div>
    </div>
  )
}
