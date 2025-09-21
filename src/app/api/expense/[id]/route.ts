import { getExpenseById } from '@/lib/dal/expenses'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const rawExpense = await getExpenseById(id)

    if (!rawExpense)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    //normalize value and type to show in component, get in centavos, return in reais
    const expenses = {
      ...rawExpense,
      value: rawExpense.value / 100
    }

    return NextResponse.json({ data: expenses, success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados das despesas.' },
      { status: 500 }
    )
  }
}
