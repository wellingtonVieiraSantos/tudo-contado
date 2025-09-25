import { getExpenseByIdService } from '@/services/expenses/getExpenseByIdService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const expense = await getExpenseByIdService(id)

    if (!expense)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json({ data: expense, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /expense/id', e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados da despesa.' },
      { status: 500 }
    )
  }
}
