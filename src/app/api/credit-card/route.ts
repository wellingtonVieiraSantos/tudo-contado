import { NextRequest, NextResponse } from 'next/server'
import { creditCardSchema } from '@/validators/formCreditCard'
import { Prisma } from '@prisma/client'
import { getAllCreditCardService } from '@/services/creditCard/getAllCreditCardService'
import { postCreditCardService } from '@/services/creditCard/postCreditCardService'
import { updateCreditCardByIdService } from '@/services/creditCard/updateCreditCardByIdService'
import { deleteCreditCardByIdService } from '@/services/creditCard/deleteCreditCardByIdService'

export async function GET() {
  try {
    const creditCard = await getAllCreditCardService()

    return NextResponse.json(
      { data: creditCard, success: true },
      { status: 200 }
    )
  } catch (e) {
    console.error('GET /credit-card', e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados dos cartões.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const result = creditCardSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', issues: result.error.issues },
        { status: 400 }
      )
    }

    const postedCreditCard = await postCreditCardService(result.data)
    return NextResponse.json(
      {
        success: true,
        data: postedCreditCard,
        message: 'Cartão cadastrado com sucesso.'
      },
      { status: 201 }
    )
  } catch (e) {
    console.error('POST /credit-card', e)
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return NextResponse.json(
        { message: 'Cartão já cadastrado.' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Erro ao cadastrar novo cartão.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const result = creditCardSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', issues: result.error.issues },
        { status: 400 }
      )
    }

    const updatedExpense = await updateCreditCardByIdService(result.data)
    return NextResponse.json(
      { success: true, data: updatedExpense },
      { status: 201 }
    )
  } catch (e) {
    console.error('PUT /credit-card', e)
    return NextResponse.json(
      { error: 'Erro ao atualizar o cartão.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const id = searchParams.get('id')

  try {
    if (!id) return NextResponse.json({ success: false }, { status: 404 })

    const deletedCreditCard = await deleteCreditCardByIdService(id)

    return NextResponse.json(
      { success: true, data: deletedCreditCard },
      { status: 200 }
    )
  } catch (e) {
    console.error('DEL /expense', e)
    return NextResponse.json(
      { error: 'Erro ao apagar o cartão.' },
      { status: 500 }
    )
  }
}
