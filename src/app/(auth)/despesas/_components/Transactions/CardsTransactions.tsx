'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import valueFormatter from '@/lib/valueFormatter'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { categories } from '@/app/(auth)/despesas/_components/ModalExpense'
import { Divider } from '@/components/ui/Divider'
import { Badge } from '@/components/ui/Badge'
import {
  BanknoteArrowDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  Trash
} from 'lucide-react'
import { useModalDelStore } from '@/store/modalDelStore'
import { useExpenseModalStore } from '@/store/modalPostPutStore'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'
import { Button } from '@/components/ui/Button'
import { ExpenseWithIdProps } from '@/modules/expenses/expenses.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CardsTransactions({
  expenses
}: {
  expenses: {
    data: ExpenseWithIdProps[]
    meta: {
      totalPages: number
      total_items: number
      page: number
      limit: number
    }
  }
}) {
  const pathname = usePathname()
  const { openModal } = useExpenseModalStore()
  const { openDeleteModal } = useModalDelStore()

  return (
    <div className='flex flex-col gap-3 lg:hidden'>
      {expenses.data.map(exp => (
        <Card className='bg-background rounded p-2' key={exp.id}>
          <CardHeader>
            <CardTitle>
              <span className='flex items-center gap-4 font-poppins'>
                {(() => {
                  const category = categories.find(c => c.type === exp.category)
                  const Icon = category?.icon
                  return Icon ? (
                    <Icon className='text-info' size={30} strokeWidth={1.1} />
                  ) : null
                })()}
                {categoryFormatter(exp.category)}
              </span>
            </CardTitle>
            <Divider />
            <CardDescription className='text-balance'>
              {exp.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-montserrat'>
              {valueFormatter(exp.value)}
            </p>
            <p className='flex items-center gap-3 text-sm py-1'>
              <BanknoteArrowDown strokeWidth={1.1} />
              {paymentMethodFormatter(exp.method)}
            </p>
            <div className='flex justify-between text-foreground-secondary text-sm'>
              <p className='flex items-center gap-3 text-sm py-1'>
                <Calendar size={20} strokeWidth={1.1} />
                {dateStringFormatter(exp.date)}
              </p>
              <Badge variant='info'>{exp.installments ?? 1}x</Badge>
            </div>
            <Button
              onClick={() => openModal('PUT', exp)}
              className='w-full mt-2 bg-foreground text-background hover:bg-foreground/80'
            >
              <RefreshCcw />
              Atualizar
            </Button>
            <Button
              variant='border'
              onClick={() =>
                openDeleteModal({
                  type: 'expense',
                  data: exp
                })
              }
              className='w-full mt-2 hover:border-destructive hover:bg-destructive/20'
            >
              <Trash />
              Deletar
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className='flex items-center justify-evenly'>
        <Link href={`${pathname}?page=${expenses.meta.page - 1}`}>
          <Button
            disabled={expenses.meta.page === 1}
            variant='border'
            className='border-foreground'
          >
            <ChevronLeft />
          </Button>
        </Link>
        <span>
          {expenses.meta.page} de {expenses.meta.totalPages}
        </span>
        <Link href={`${pathname}?page=${expenses.meta.page + 1}`}>
          <Button
            disabled={expenses.meta.page === expenses.meta.totalPages}
            variant='border'
            className='border-foreground'
          >
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  )
}
