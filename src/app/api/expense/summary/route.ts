import { getSumExpensesValuesByMonthRangeService } from '@/services/expenses/getExpenseByMonthRangeService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams

    const qtdMonth = Number(searchParams.get('qtdMonth'))

    if (isNaN(qtdMonth)) {
      return NextResponse.json(
        { error: 'Parâmetro inválido: qtdMonth deve ser um número.' },
        { status: 400 }
      )
    }

    const expense = await getSumExpensesValuesByMonthRangeService(qtdMonth)

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
