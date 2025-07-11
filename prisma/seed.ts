import { prisma } from '@/lib/prisma'

async function main() {
  await prisma.user.upsert({
    where: { email: 'teste@email.com' },
    update: {
      income: {
        create: [
          {
            type: 'FIXED',
            value: 340050,
            date: new Date(),
            description: 'salário'
          },
          {
            type: 'VARIABLE',
            value: 25000,
            date: new Date(),
            description: 'freela'
          }
        ]
      },
      expense: {
        create: [
          {
            type: 'FIXED',
            value: 125050,
            category: 'HOUSE',
            date: new Date(),
            description: 'aluguel',
            paid: true
          },
          {
            type: 'VARIABLE',
            value: 104095,
            category: 'FOOD',
            date: new Date(),
            description: 'Alimentação',
            paid: false
          }
        ]
      }
    },

    create: {
      email: 'teste@email.com'
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
