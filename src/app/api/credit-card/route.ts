import { NextRequest, NextResponse } from 'next/server'

import {
  deleteCreditCardById,
  getCreditCard,
  postCreditCard,
  updateCreditCardById
} from '@/lib/dal/creditCard'
import { creditCardSchema } from '@/validators/formCreditCard'
import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const rawCreditCard = await getCreditCard()

    //normalize value and type to show in component, get in centavos, return in reais
    const creditCard = rawCreditCard.map(cc => ({
      ...cc,
      creditLimit: cc.creditLimit / 100
    }))

    return NextResponse.json(
      { data: creditCard, success: true },
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
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
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const { creditLimit: rawValue } = result.data

    const creditLimit = rawValue * 100

    const data = {
      ...result.data,
      creditLimit
    }

    const postedCreditCard = await postCreditCard(data)
    return NextResponse.json(
      { success: true, data: postedCreditCard },
      { status: 201 }
    )
  } catch (e) {
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
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const { creditLimit: rawValue } = result.data

    const creditLimit = rawValue * 100

    const id = result.data.id!
    const data = { ...result.data, creditLimit }

    const updatedExpense = await updateCreditCardById(id, data)
    return NextResponse.json(
      { success: true, data: updatedExpense },
      { status: 201 }
    )
  } catch (e) {
    console.log(e)
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

    await deleteCreditCardById(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao apagar o cartão.' },
      { status: 500 }
    )
  }
}
