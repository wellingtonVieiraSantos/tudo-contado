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
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

export default function LastTransactions() {
  const { recentTransactions } = useGetLastTransactions()

  return (
    <Card className='h-full overflow-hidden p-2 row-start-5 col-span-2 row-span-2'>
      <CardHeader>
        <CardTitle>Movimentações Financeiras</CardTitle>
        <CardDescription>
          Ultimas transações financeiras realizadas
        </CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='h-max'>
        {!recentTransactions && (
          <p className='lg:mt-20 text-foreground-secondary text-center'>
            Nenhuma transação recente...
          </p>
        )}
        <Table className='w-full'>
          <TableHeader className='bg-hover sticky top-0 z-10'>
            <TableRow className='table w-full table-fixed'>
              <TableHead>Categoria</TableHead>
              <TableHead>
                <div className='flex items-center gap-2'>
                  Tipo
                  <ChevronsUpDown size={22} />
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-2'>
                  Data
                  <ChevronsUpDown size={22} />
                </div>
              </TableHead>
              <TableHead>
                <div className='flex items-center gap-2'>
                  Valor
                  <ChevronsUpDown size={22} />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='block max-h-50 overflow-y-auto scrollbar-custom'>
            {recentTransactions?.map(transaction => (
              <TableRow
                key={transaction.id}
                className='table w-full table-fixed'
              >
                <TableCell>
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
                <TableCell>
                  {incomeTypeFormatter(transaction.type) ||
                    categoryFormatter(transaction.category)}
                </TableCell>
                <TableCell>
                  {format(
                    parse(transaction.date, 'yyyy-MM-dd', new Date()),
                    'dd-MM-yyyy',
                    { locale: ptBR }
                  )}
                </TableCell>
                <TableCell>{valueFormatter(transaction.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
