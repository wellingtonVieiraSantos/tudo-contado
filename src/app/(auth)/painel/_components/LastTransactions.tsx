'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { useGetLastTransactions } from '../_hooks/use-get-lastTransactions'
import { incomeTypeFormatter } from '@/lib/incomeTypeFormatter'
import valueFormatter from '@/lib/valueFormatter'
import { ChevronsUpDown, TrendingDown, TrendingUp } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { dateStringFormatter } from '@/lib/dateStringFormatter'

export default function LastTransactions() {
  const { recentTransactions } = useGetLastTransactions()

  return (
    <Card className='h-full overflow-hidden p-2 xl:row-start-5 xl:col-span-2 xl:row-span-2'>
      <CardHeader>
        <CardTitle>Movimentações Financeiras</CardTitle>
        <CardDescription>
          Ultimas transações financeiras realizadas
        </CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='h-max'>
        {recentTransactions.length === 0 ? (
          <p className='xl:mt-20 text-foreground-secondary text-center'>
            Nenhuma transação recente...
          </p>
        ) : (
          <Table className='w-full'>
            <TableHeader className='bg-hover sticky top-0 z-10'>
              <TableRow className='table w-full table-fixed'>
                <TableHead className='hidden xl:table-cell'>
                  Categoria
                </TableHead>
                <TableHead className='hidden xl:table-cell'>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='block max-h-50 overflow-y-auto scrollbar-custom'>
              {recentTransactions?.map(transaction => (
                <TableRow
                  key={transaction.id}
                  className='table w-full table-fixed'
                >
                  <TableCell className='hidden xl:table-cell'>
                    {transaction.transationKind === 'income' ? (
                      <TrendingUp
                        size={35}
                        strokeWidth={1.5}
                        className='text-success'
                      />
                    ) : (
                      <TrendingDown
                        size={35}
                        strokeWidth={1.5}
                        className='text-destructive'
                      />
                    )}
                  </TableCell>
                  <TableCell className='hidden xl:table-cell'>
                    {incomeTypeFormatter(transaction.type) ||
                      categoryFormatter(transaction.category)}
                  </TableCell>
                  <TableCell>{dateStringFormatter(transaction.date)}</TableCell>
                  <TableCell>{valueFormatter(transaction.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
