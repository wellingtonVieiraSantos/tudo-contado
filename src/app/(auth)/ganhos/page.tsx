import UserBarSettings from '@/components/UserBarSettings'
import { FilterIncomes } from './_components/FilterIncomes'
import { ResumeIncome } from './_components/ResumeIncome'
import { Suspense } from 'react'
import { ModalIncome } from './_components/ModalIncome'
import BarSkeleton from '@/components/BarSkeleton'
import ResumeSkeleton from '@/components/skeletons/ResumeSkeleton'
import FilterSkeleton from '@/components/skeletons/FilterSkeleton'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import Wrapper from '@/components/Wrapper'
import { Transactions } from './_components/Transactions'

export default function Income() {
  return (
    <Wrapper>
      <Suspense fallback={<BarSkeleton />}>
        <UserBarSettings title='Renda' />
      </Suspense>
      <Suspense fallback={<ResumeSkeleton />}>
        <ResumeIncome />
      </Suspense>
      <Suspense fallback={<FilterSkeleton />}>
        <FilterIncomes />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <Transactions />
      </Suspense>
      <ModalIncome />
    </Wrapper>
  )
}
