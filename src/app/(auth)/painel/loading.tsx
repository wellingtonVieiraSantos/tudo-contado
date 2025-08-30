import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className='w-full lg:h-screen grid grid-cols-1 lg:grid-rows-[auto_1fr_1fr_1fr] lg:grid-cols-3 gap-3 p-3 pb-24 lg:pb-0'>
      <Skeleton className='h-13 lg:h-20 lg:col-span-3' />
      <Skeleton className='h-68 lg:h-82 w-full lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3' />
      <Skeleton className='h-70 lg:h-auto lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3' />
      <Skeleton className='h-80 lg:h-auto lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-5' />
      <Skeleton className='h-150 lg:h-auto lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4' />
      <Skeleton className='h-40 lg:h-auto lg:col-start-3 lg:col-end-4 lg:row-start-4 lg:row-end-5' />
    </div>
  )
}
