import { getActualMonthExpensesByCategoryService } from '@/services/expenses/getActualMonthExpensesByCategoryService'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const expense = await getActualMonthExpensesByCategoryService()

    if (!expense)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json({ data: expense, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /expense/by-category', e)
    return NextResponse.json(
      { error: 'Erro ao buscar soma das despesas por categoria.' },
      { status: 500 }
    )
  }
}
