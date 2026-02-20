import { incomeSchema } from '@/modules/incomes/incomes.schema'
import {
  getAllIncomesService,
  postIncomeService,
  updateIncomeByIdService,
  deleteIncomeByIdService
} from '@/modules/incomes/incomes.service'
import { ListIncomeQuery } from '@/modules/incomes/incomes.types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const params = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    type: (searchParams.get('type') as ListIncomeQuery['type']) || undefined
  }

  try {
    const income = await getAllIncomesService(params)

    return NextResponse.json({ data: income, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /income', e)

    return NextResponse.json(
      { error: 'Erro ao buscar dados dos rendimentos.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const result = incomeSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', issues: result.error.issues },
        { status: 400 }
      )
    }

    const postedIncome = await postIncomeService(result.data)
    return NextResponse.json(
      { success: true, data: postedIncome },
      { status: 201 }
    )
  } catch (e) {
    console.error('POST /income', e)
    return NextResponse.json(
      { error: 'Erro ao cadastrar novo rendimento.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const result = incomeSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', issues: result.error.issues },
        { status: 400 }
      )
    }

    const updatedIncome = await updateIncomeByIdService(result.data)
    return NextResponse.json(
      { success: true, data: updatedIncome },
      { status: 201 }
    )
  } catch (e) {
    console.error('PUT /income', e)
    return NextResponse.json(
      { error: 'Erro ao atualizar o rendimento.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id: string = await req.json()
    if (!id) {
      return NextResponse.json(
        { error: 'Erro id não encontrado.' },
        { status: 400 }
      )
    }

    const deletedIncome = await deleteIncomeByIdService(id)

    return NextResponse.json(
      { success: true, data: deletedIncome },
      { status: 200 }
    )
  } catch (e) {
    console.error('DEL /income', e)
    return NextResponse.json(
      { error: 'Erro ao apagar o rendimento.' },
      { status: 500 }
    )
  }
}
