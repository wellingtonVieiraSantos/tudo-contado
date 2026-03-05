import UserBarSettings from '@/components/UserBarSettings'
import { FilterExpenses } from './_components/FilterExpenses'
import { Suspense } from 'react'
import BarSkeleton from '@/components/BarSkeleton'
import { ResumeExpense } from './_components/ResumeExpense'
import ResumeSkeleton from '@/components/skeletons/ResumeSkeleton'
import FilterSkeleton from '@/components/skeletons/FilterSkeleton'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import { ModalExpense } from './_components/ModalExpense'
import Wrapper from '@/components/Wrapper'
import { Transactions } from './_components/Transactions'

export default function Expense() {
  return (
    <Wrapper>
      <Suspense fallback={<BarSkeleton />}>
        <UserBarSettings title='Despesas' />
      </Suspense>
      <Suspense fallback={<ResumeSkeleton />}>
        <ResumeExpense />
      </Suspense>
      <Suspense fallback={<FilterSkeleton />}>
        <FilterExpenses />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <Transactions />
      </Suspense>
      <ModalExpense />
    </Wrapper>
  )
}
