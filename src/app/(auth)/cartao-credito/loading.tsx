import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className='flex flex-col flex-wrap p-3 gap-3 pb-22 lg:pb-0'>
      <Skeleton className='h-16' />
      <div className=' max-w-3xl w-full m-auto grid gap-3 mt-5'>
        <Skeleton className='w-full h-45 lg:h-55 mt-3 md:w-100 m-auto' />
        <Skeleton className='h-25 mt-3' />
        <Skeleton className='h-30' />
        <Skeleton className='h-30 md:h-35' />
        <Skeleton className='h-30 md:h-60' />
      </div>
    </div>
  )
}
