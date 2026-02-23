import UserBarSettings from '@/components/UserBarSettings'
import { Suspense } from 'react'
import BarSkeleton from '@/components/BarSkeleton'
import { ResumeCardCredit } from './_components/ResumeCardCredit'
import ResumeSkeleton from '@/components/skeletons/ResumeSkeleton'
import { ModalCreditCard } from './_components/ModalCreditCard'
import { ListCreditCards } from './_components/ListCreditCards'
import { TableUseCards } from './_components/TableUseCards'

export default function CartaoCredito() {
  return (
    <div className='xl:h-full flex flex-col p-3 gap-3 pb-22 xl:pb-1'>
      <Suspense fallback={<BarSkeleton />}>
        <UserBarSettings title='Cartão de Crédito' />
      </Suspense>
      <Suspense fallback={<ResumeSkeleton />}>
        <ResumeCardCredit />
      </Suspense>
      <Suspense fallback={<BarSkeleton />}>
        <ListCreditCards />
      </Suspense>
      <Suspense fallback={<BarSkeleton />}>
        <TableUseCards />
      </Suspense>
      <ModalCreditCard />
    </div>
  )
}
