import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class CreditCardRepository {
  async getAll(userId: string) {
    return await prisma.creditCard.findMany({
      where: {
        user: { id: userId }
      },
      select: {
        id: true,
        lastNumber: true,
        holder: true,
        expMonth: true,
        expYear: true,
        cardBrand: true,
        creditLimit: true
      },
      orderBy: {
        expYear: 'desc'
      }
    })
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
        billingDay: true,
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
