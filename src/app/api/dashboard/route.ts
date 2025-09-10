import { categoryFormatter } from '@/lib/categoryFormatter'
import { getDataFromUserId } from '@/lib/dal/user'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'
import { paymentStatusFormatter } from '@/lib/paymentStatusFormatter'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const rawDashboardInfo = await getDataFromUserId()

    const dashboardInfoExpense = rawDashboardInfo?.expense.map(e => ({
      ...e,
      value: e.value / 100,
      category: categoryFormatter(e.category),
      paymentMethod: paymentMethodFormatter(e.paymentMethod),
      status: paymentStatusFormatter(e.status)
    }))
    const dashboardInfoIncome = rawDashboardInfo?.income.map(i => ({
      ...i,
      value: i.value / 100
    }))

    const dashboardInfo = {
      ...rawDashboardInfo,
      expense: dashboardInfoExpense,
      income: dashboardInfoIncome
    } as const

    return NextResponse.json(
      { data: dashboardInfo, success: true },
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao buscar os dados do usuário.' },
      { status: 500 }
    )
  }
}
