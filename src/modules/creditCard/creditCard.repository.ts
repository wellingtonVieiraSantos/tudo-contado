import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class CreditCardRepository {
  async getAll(userId: string) {
    const [total_items, data] = await Promise.all([
      prisma.creditCard.count({
        where: {
          user: { id: userId },
          deletedAt: null
        }
      }),
      prisma.creditCard.findMany({
        where: {
          user: { id: userId }
        },
        select: {
          id: true,
          lastNumber: true,
          creditLimit: true,
          expMonth: true,
          expYear: true,
          holder: true,
          cardBrand: true,
          deletedAt: true,
          paymentDay: true,
          expense: {
            select: {
              id: true,
              value: true,
              date: true,
              installments: true,
              category: true,
              description: true
            },
            orderBy: {
              date: 'desc'
            }
          }
        },
        orderBy: {
          deletedAt: 'desc'
        }
      })
    ])

    return {
      meta: {
        total_items,
        page: 1,
        limit: 10,
        total_pages: Math.ceil(total_items / 10)
      },
      data
    }
  }

  async getById(id: string) {
    return await prisma.creditCard.findUnique({
      where: { id },
      select: {
        id: true,
        lastNumber: true,
        creditLimit: true,
        holder: true,
        expMonth: true,
        expYear: true,
        deletedAt: true,
        paymentDay: true,
        cardBrand: true,
        expense: {
          select: {
            id: true,
            value: true,
            date: true,
            installments: true,
            category: true,
            description: true
          },
          orderBy: {
            date: 'desc'
          }
        }
      }
    })
  }
  async getByCreditCardDeactivate(userId: string) {
    return await prisma.creditCard.findMany({
      where: {
        user: { id: userId },
        deletedAt: { not: null }
      }
    })
  }
  async create(data: Prisma.CreditCardCreateInput) {
    return await prisma.creditCard.create({ data })
  }
  async update(id: string, data: Prisma.CreditCardUpdateInput) {
    return await prisma.creditCard.update({
      where: { id },
      data
    })
  }
  async updateDeactivateCreditCard(id: string) {
    return await prisma.creditCard.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    })
  }
  async updateRestoreCreditCard(id: string) {
    return await prisma.creditCard.update({
      where: { id },
      data: {
        deletedAt: null
      }
    })
  }
  async delete(id: string) {
    return await prisma.creditCard.delete({ where: { id } })
  }
}
