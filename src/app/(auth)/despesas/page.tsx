'use client'
import UserBarSettings from '@/components/UserBarSettings'
import { FilterExpenses } from './_components/FilterExpenses'
import { Suspense } from 'react'
import BarSkeleton from '@/components/BarSkeleton'
import { ResumeExpense } from './_components/ResumeExpense'
import ResumeSkeleton from '@/components/skeletons/ResumeSkeleton'
import FilterSkeleton from '@/components/skeletons/FilterSkeleton'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import { TableExpenses } from './_components/TableExpenses'
import { ModalExpense } from './_components/ModalExpense'

export default function Expense() {
  return (
    <div className='flex flex-col flex-wrap p-3 gap-3 pb-22 lg:pb-0'>
      <Suspense fallback={<BarSkeleton />}>
        <UserBarSettings title='Despesas' />
      </Suspense>
      <Suspense fallback={<ResumeSkeleton />}>
        <ResumeExpense />
      </Suspense>
      <Suspense fallback={<FilterSkeleton />}>
        <FilterExpenses />
      </Suspense>
      <h2 className='pl-2'>Gastos</h2>
      <p className='text-foreground-secondary text-sm -mt-2 pl-2 mb-2'>
        Acompanhamento de gastos detalhadamente
      </p>
      <Suspense fallback={<TableSkeleton />}>
        <TableExpenses />
      </Suspense>
      <ModalExpense />
    </div>
  )
}
