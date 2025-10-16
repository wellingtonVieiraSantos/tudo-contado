import { getCreditCardByIdService } from '@/services/creditCard/getCreditCardByIdService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const creditCard = await getCreditCardByIdService(id)

    if (!creditCard)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json(
      { data: creditCard, success: true },
      { status: 200 }
    )
  } catch (e) {
    console.error('GET /credit-card/id', e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados do cartão de crédito.' },
      { status: 500 }
    )
  }
}
