import UserBarSettings from '@/components/UserBarSettings'
import ChartPie from './_components/ChartPie'
import ChartLine from './_components/ChartLine'
import Balance from './_components/Balance'
import LastTransactions from './_components/LastTransactions'
import CreditCardDashboard from './_components/CreditCard'

import { Suspense } from 'react'
import BalanceSkeleton from './_components/skeletons/BalanceSkeleton'
import ChartLineSkeleton from './_components/skeletons/ChartLineSkeleton'
import ChartPieSkeleton from './_components/skeletons/ChartPieSkeleton'
import CreditCardSkeleton from './_components/skeletons/CreditCardSkeleton'
import LastTransSkeleton from './_components/skeletons/LastTransSkeleton'
import BarSkeleton from '@/components/BarSkeleton'

export default function Dashboard() {
  return (
    <div className='w-full xl:h-full grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-[auto_auto_1fr_1fr_1fr_1fr] gap-3 p-3 pb-22 xl:pb-1'>
      <Suspense fallback={<BarSkeleton />}>
        <UserBarSettings title='Dashboard' />
      </Suspense>
      <Suspense fallback={<BalanceSkeleton />}>
        <Balance />
      </Suspense>
      <Suspense fallback={<ChartPieSkeleton />}>
        <ChartPie />
      </Suspense>
      <Suspense fallback={<ChartLineSkeleton />}>
        <ChartLine />
      </Suspense>
      <Suspense fallback={<CreditCardSkeleton />}>
        <CreditCardDashboard />
      </Suspense>
      <Suspense fallback={<LastTransSkeleton />}>
        <LastTransactions />
      </Suspense>
    </div>
  )
}
