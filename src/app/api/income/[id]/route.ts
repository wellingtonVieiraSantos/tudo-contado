import { getIncomeByIdService } from '@/modules/incomes/incomes.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const income = await getIncomeByIdService(id)

    if (!income)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json({ data: income, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /income/id', e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados do rendimento.' },
      { status: 500 }
    )
  }
}
