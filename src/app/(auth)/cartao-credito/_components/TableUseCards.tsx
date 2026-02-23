'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { useGetCreditCard } from '../_hooks/use-get-creditcards'
import valueFormatter from '@/lib/valueFormatter'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import { categoryFormatter } from '@/lib/categoryFormatter'

export const TableUseCards = () => {
  const { creditCard, lastCreditTransactions } = useGetCreditCard()

  return (
    <Card className='w-full p-2 xl:h-full'>
      <CardHeader>
        <CardTitle>Transações no crédito</CardTitle>
        <CardDescription>
          Ultimas transações financeiras realizadas no crédito
        </CardDescription>
        <Divider />
      </CardHeader>
      <CardContent>
        {!creditCard.meta.total_items ? (
          <div className='w-full m-auto flex justify-center items-center xl:h-[200px]'>
            <p className='text-foreground-secondary text-center'>
              Nenhuma transação recente...
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader className='bg-hover'>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Cartão</TableHead>
                <TableHead className='text-center'>Parcelas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lastCreditTransactions.map(card => (
                <TableRow key={card.id}>
                  <TableCell>
                    <span>{dateStringFormatter(card.date)}</span>
                  </TableCell>
                  <TableCell>
                    <span>{valueFormatter(card.value)}</span>
                  </TableCell>
                  <TableCell>
                    <span>{card.description}</span>
                  </TableCell>
                  <TableCell>
                    <span>{categoryFormatter(card.category)}</span>
                  </TableCell>
                  <TableCell>
                    <span>**** **** **** {card.lastNumber}</span>
                  </TableCell>
                  <TableCell className='text-center'>
                    <span>{card.installments}x</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
