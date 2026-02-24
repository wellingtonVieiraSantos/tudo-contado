import UserBarSettings from '@/components/UserBarSettings'
import { Suspense } from 'react'
import BarSkeleton from '@/components/BarSkeleton'
import { ResumeCardCredit } from './_components/ResumeCardCredit'
import ResumeSkeleton from '@/components/skeletons/ResumeSkeleton'
import { ModalCreditCard } from './_components/ModalCreditCard'
import { ListCreditCards } from './_components/ListCreditCards'
import { TableUseCards } from './_components/TableUseCards'
import ListCreditCardsSkeleton from './_components/skeletons/ListCreditCardsSkeleton'
import TableUseCardsSkeleton from './_components/skeletons/TableUseCardsSkeleton'
import Wrapper from '@/components/Wrapper'

export default function CartaoCredito() {
  return (
    <Wrapper>
      <Suspense fallback={<BarSkeleton />}>
        <UserBarSettings title='Cartão de Crédito' />
      </Suspense>
      <Suspense fallback={<ResumeSkeleton />}>
        <ResumeCardCredit />
      </Suspense>
      <Suspense fallback={<ListCreditCardsSkeleton />}>
        <ListCreditCards />
      </Suspense>
      <Suspense fallback={<TableUseCardsSkeleton />}>
        <TableUseCards />
      </Suspense>
      <ModalCreditCard />
    </Wrapper>
  )
}
