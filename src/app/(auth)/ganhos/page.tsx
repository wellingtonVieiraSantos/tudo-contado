import UserBarSettings from '@/components/UserBarSettings'
import { FilterIncomes } from './_components/FilterIncomes'
import Loading from './loading'
import { ResumeIncome } from './_components/ResumeIncome'
import { Suspense } from 'react'
import { TableIncomes } from './_components/TableIncomes'
import { DeleteModal } from './_components/ModalDelIncome'
import { ModalIncome } from './_components/ModalIncome'

export default function Income() {
  return (
    <div className='flex flex-col flex-wrap p-3 gap-3 pb-22 lg:pb-0'>
      <UserBarSettings title='Renda' />
      <Suspense fallback={<Loading />}>
        <ResumeIncome />
      </Suspense>
      <FilterIncomes />
      <h2 className='pl-2'>Ganhos</h2>
      <p className='text-foreground-secondary text-sm -mt-2 pl-2 mb-2'>
        Acompanhamento de ganhos detalhadamente
      </p>
      <TableIncomes />
      <DeleteModal />
      <ModalIncome />
    </div>
  )
}
