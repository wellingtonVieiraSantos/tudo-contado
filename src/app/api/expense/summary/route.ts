import { getSumExpensesValuesByMonthRangeService } from '@/modules/expenses/expenses.service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const expense = await getSumExpensesValuesByMonthRangeService()

    if (!expense)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json({ data: expense, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /expense/summary', e)
    return NextResponse.json(
      { error: 'Erro ao buscar soma das despesas.' },
      { status: 500 }
    )
  }
}
