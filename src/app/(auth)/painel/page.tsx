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
    <div className='w-full lg:h-screen grid grid-cols-3 grid-rows-[auto_auto_1fr_1fr_1fr_1fr] gap-3 p-3 pb-24 lg:pb-1'>
      <Suspense fallback={<BarSkeleton />}>
        <UserBarSettings title='Dashboard' />
      </Suspense>
      <Suspense fallback={<BalanceSkeleton />}>
        <Balance />
      </Suspense>
      <Suspense fallback={<CreditCardSkeleton />}>
        <CreditCardDashboard />
      </Suspense>
      <Suspense fallback={<ChartLineSkeleton />}>
        <ChartLine />
      </Suspense>
      <Suspense fallback={<ChartPieSkeleton />}>
        <ChartPie />
      </Suspense>
      <Suspense fallback={<LastTransSkeleton />}>
        <LastTransactions />
      </Suspense>
    </div>
  )
}
