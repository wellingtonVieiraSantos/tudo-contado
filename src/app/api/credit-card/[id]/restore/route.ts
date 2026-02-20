import { restoreCreditCardByIdService } from '@/modules/creditCard/creditCard.service'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const creditCard = await restoreCreditCardByIdService(id)

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
    console.error('PUT /credit-card/:id/restore', e)
    return NextResponse.json(
      { error: 'Erro ao restaurar o cartão.' },
      { status: 500 }
    )
  }
}
