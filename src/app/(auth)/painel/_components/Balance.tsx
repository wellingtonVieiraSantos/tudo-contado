import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useGetExpenseSumByMonth } from '@/hooks/use-get-expense-sum'
import { useGetIncomeSumByMonth } from '@/hooks/use-get-income-sum'
import valueFormatter from '@/lib/valueFormatter'
import { Sigma, TrendingDown, TrendingUp } from 'lucide-react'
import { useBadgeBalanceConfig } from '../_hooks/useBadgeBalanceConfig'

export default function Balance() {
  const { expenseSum } = useGetExpenseSumByMonth()
  const { incomeSum } = useGetIncomeSumByMonth()

  const [sumIncomeLastMonth = 0, sumIncomeActualMonth = 0] =
    incomeSum?.slice(-2).map(i => i.total) ?? []

  const [sumExpenseLastMonth = 0, sumExpenseActualMonth = 0] =
    expenseSum?.slice(-2).map(i => i.total) ?? []

  const percentChange = (current: number, previous: number): number | null => {
    if (previous === 0) return null

    const value = ((current - previous) / Math.abs(previous)) * 100
    return Math.round(value * 100) / 100
  }

  const incomeBalance = percentChange(sumIncomeActualMonth, sumIncomeLastMonth)

  const expenseBalance = percentChange(
    sumExpenseActualMonth,
    sumExpenseLastMonth
  )

  const balance = percentChange(
    sumIncomeActualMonth - sumExpenseActualMonth,
    sumIncomeLastMonth - sumExpenseLastMonth
  )

  const balanceConfig = useBadgeBalanceConfig(balance)
  const expenseConfig = useBadgeBalanceConfig(expenseBalance)
  const incomeConfig = useBadgeBalanceConfig(incomeBalance)

  return (
    <div className='lg:h-34 col-span-2 row-start-2 gap-3 flex flex-col lg:flex-row'>
      <Card className='flex-1 '>
        <CardHeader>
          <CardTitle className='flex gap-3 items-center tracking-wide'>
            <Sigma size={26} strokeWidth={1.3} className='text-warning' />
            Balança Financeira
          </CardTitle>
        </CardHeader>
        <CardContent className='items-start pl-5'>
          <h2
            className={`text-3xl tracking-wide text-center ${
              sumIncomeActualMonth - sumExpenseActualMonth < 0
                ? 'text-destructive'
                : 'text-success'
            }`}
          >
            {valueFormatter(sumIncomeActualMonth - sumExpenseActualMonth)}
          </h2>
          <Badge
            variant={balanceConfig.variant}
            className={balanceConfig.className}
          >
            {balanceConfig.message}
          </Badge>
        </CardContent>
      </Card>

      <Card className='flex-1'>
        <CardHeader>
          <CardTitle className='flex gap-3 items-center tracking-wide'>
            <TrendingUp size={26} strokeWidth={1.3} className='text-success' />
            Rendimentos
          </CardTitle>
        </CardHeader>
        <CardContent className='items-start pl-5'>
          <h2 className={`text-2xl font-poppins tracking-wide`}>
            {valueFormatter(sumIncomeActualMonth)}
          </h2>
          <Badge
            variant={incomeConfig.variant}
            className={incomeConfig.className}
          >
            {incomeConfig.message}
          </Badge>
        </CardContent>
      </Card>
      <Card className='flex-1'>
        <CardHeader>
          <CardTitle className='flex gap-3 items-center tracking-wide'>
            <TrendingDown
              size={26}
              strokeWidth={1.3}
              className='text-destructive'
            />
            Despesas
          </CardTitle>
        </CardHeader>
        <CardContent className='items-start pl-5'>
          <h2 className={`text-2xl font-poppins tracking-wide`}>
            {valueFormatter(sumExpenseActualMonth)}
          </h2>
          <Badge
            variant={expenseConfig.variant}
            className={expenseConfig.className}
          >
            {expenseConfig.message}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
