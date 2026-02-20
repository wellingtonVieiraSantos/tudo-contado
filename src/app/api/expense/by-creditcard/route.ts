import { getActualMonthCreditCardExpenseSumService } from '@/modules/expenses/expenses.service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const expense = await getActualMonthCreditCardExpenseSumService()

    if (!expense)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json({ data: expense, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /expense/by-creditcard', e)
    return NextResponse.json(
      { error: 'Erro ao buscar soma das despesas por cartão de crédito.' },
      { status: 500 }
    )
  }
}
