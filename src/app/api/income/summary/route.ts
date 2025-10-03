import { getSumIncomesValuesPerMonthService } from '@/services/incomes/getSumIncomesValuesPerMonthService'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const income = await getSumIncomesValuesPerMonthService()

    if (!income)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json({ data: income, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /income/summary', e)
    return NextResponse.json(
      { error: 'Erro ao buscar soma dos rendimentos.' },
      { status: 500 }
    )
  }
}
