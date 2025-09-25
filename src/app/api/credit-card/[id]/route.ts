import { getCreditCardById } from '@/dal/creditCard'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const rawExpense = await getCreditCardById(id)

    if (!rawExpense)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    //normalize value and type to show in component, get in centavos, return in reais
    const creditCard = {
      ...rawExpense
    }

    return NextResponse.json(
      { data: creditCard, success: true },
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados do cartão de crédito.' },
      { status: 500 }
    )
  }
}
