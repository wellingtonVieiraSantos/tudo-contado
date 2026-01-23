'use client'
import { UserBarSettings } from '@/components/UserBarSettings'

import { ChartPie } from './_components/ChartPie'
import { ChartLine } from './_components/ChartLine'

import Balance from './_components/Balance'
import LastTransactions from './_components/LastTransactions'
import CreditCardDashboard from './_components/CreditCard'

export default function Dashboard() {
  return (
    <div className='w-full lg:h-screen grid grid-cols-3 grid-rows-[auto_auto_1fr_1fr_1fr_1fr] gap-3 p-3 pb-24 lg:pb-1'>
      <UserBarSettings title='Dashboard' />
      <Balance />

      <CreditCardDashboard />

      <ChartLine />

      <ChartPie />

      <LastTransactions />
    </div>
  )
}
