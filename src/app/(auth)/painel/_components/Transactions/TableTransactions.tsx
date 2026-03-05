'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import valueFormatter from '@/lib/valueFormatter'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { incomeTypeFormatter } from '@/lib/incomeTypeFormatter'
import { CategoryType, IncomeType, PaymentMethodType } from '@prisma/client'
import { categoryFormatter } from '@/lib/categoryFormatter'

export default function TableTransactions({
  recentTransactions
}: {
  recentTransactions: {
    id: string
    value: number
    description: string
    date: string
    type: IncomeType
    category: CategoryType
    method: PaymentMethodType
    transationKind: 'income' | 'expense'
  }[]
}) {
  return (
    <div className='hidden lg:flex flex-col gap-3'>
      <Table className='w-full'>
        <TableHeader className='bg-hover sticky top-0 z-10'>
          <TableRow className='table w-full table-fixed'>
            <TableHead>Categoria</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='block max-h-50 overflow-y-auto scrollbar-custom'>
          {recentTransactions.map(transaction => (
            <TableRow key={transaction.id} className='table w-full table-fixed'>
              <TableCell>
                {transaction.transationKind === 'income' ? (
                  <TrendingUp
                    size={35}
                    strokeWidth={1.1}
                    className='text-success'
                  />
                ) : (
                  <TrendingDown
                    size={35}
                    strokeWidth={1.1}
                    className='text-destructive'
                  />
                )}
              </TableCell>
              <TableCell>
                {incomeTypeFormatter(transaction.type) ||
                  categoryFormatter(transaction.category)}
              </TableCell>
              <TableCell>{dateStringFormatter(transaction.date)}</TableCell>
              <TableCell>{valueFormatter(transaction.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
