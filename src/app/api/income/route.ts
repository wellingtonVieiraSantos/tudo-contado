import { incomeType } from '@/app/(auth)/incomes/page'
import { auth } from '../../../../auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.email)
      return NextResponse.json(
        { error: 'Usuário não autorizado.' },
        { status: 401 }
      )

    const incomes = await prisma.income.findMany({
      where: {
        user: { email: session.user.email }
      },
      select: {
        id: true,
        value: true,
        description: true,
        date: true,
        type: true
      },
      orderBy: {
        date: 'desc'
      }
    })
    return NextResponse.json({ data: incomes, success: true })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Ops, algo inesperado aconteceu.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const { type, value, date, description }: incomeType = await req.json()

    if (!session?.user?.email)
      return NextResponse.json(
        { error: 'Usuário não autorizado' },
        { status: 401 }
      )

    await prisma.income.create({
      data: {
        type,
        value,
        date,
        description,
        user: {
          connect: { email: session.user.email }
        }
      }
    })
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Ops, algo inesperado aconteceu.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    const { id } = await req.json()

    if (!session?.user?.email)
      return NextResponse.json(
        { error: 'Usuário não autorizado' },
        { status: 401 }
      )

    const incomes = await prisma.income.delete({
      where: { id },
      select: {
        id: true,
        value: true,
        description: true,
        date: true,
        type: true
      }
    })
    return NextResponse.json({ data: incomes, success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Ops, algo inesperado aconteceu.' },
      { status: 500 }
    )
  }
}
