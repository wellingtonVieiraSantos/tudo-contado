'use client'
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
import valueFormatter from '@/lib/valueFormatter'
import { useGetCreditCard } from '../../_hooks/use-get-creditcards'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/Tooltip'

export default function TableTransactions() {
  const { lastCreditTransactions } = useGetCreditCard()
  return (
    <Table className='hidden lg:inline-table'>
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
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{card.description}</span>
                  </TooltipTrigger>
                  <TooltipContent>{card.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
  )
}
