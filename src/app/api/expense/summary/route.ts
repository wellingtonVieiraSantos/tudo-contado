import { getSumExpensesValuesByMonthRangeService } from '@/services/expenses/getExpenseByMonthRangeService'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const expense = await getSumExpensesValuesByMonthRangeService(0)

    if (!expense)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json({ data: expense, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /expense/summary', e)
    return NextResponse.json(
      { error: 'Erro ao buscar soma das despesa.' },
      { status: 500 }
    )
  }
}
