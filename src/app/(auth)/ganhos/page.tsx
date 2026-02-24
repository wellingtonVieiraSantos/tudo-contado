import UserBarSettings from '@/components/UserBarSettings'
import { FilterIncomes } from './_components/FilterIncomes'
import { ResumeIncome } from './_components/ResumeIncome'
import { Suspense } from 'react'
import { TableIncomes } from './_components/TableIncomes'
import { ModalIncome } from './_components/ModalIncome'
import BarSkeleton from '@/components/BarSkeleton'
import ResumeSkeleton from '@/components/skeletons/ResumeSkeleton'
import FilterSkeleton from '@/components/skeletons/FilterSkeleton'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import Wrapper from '@/components/Wrapper'

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
      <h2 className='pl-2'>Ganhos</h2>
      <p className='text-foreground-secondary text-sm -mt-2 pl-2 mb-2'>
        Acompanhamento de ganhos detalhadamente
      </p>
      <Suspense fallback={<TableSkeleton />}>
        <TableIncomes />
      </Suspense>
      <ModalIncome />
    </Wrapper>
  )
}
