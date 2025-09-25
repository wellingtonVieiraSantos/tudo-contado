import { prisma } from '@/lib/prisma'

/* async function main() {
    const user2 = await prisma.user.create({
    data: {
      email: 'teste2@email.com',
      password: '12345',
      name: 'Joan Doe'
    }
  })

  await prisma.user.upsert({
    where: { email: 'teste@email.com' },
    update: {},
    create: {
      email: 'teste@email.com',
      password: '12345',
      name: 'John Doe',
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
    }
  }) 

     await prisma.product.createMany({
    data: [
      { name: 'cenoura', category: 'FOOD' },
      { name: 'batata', category: 'FOOD' }
    ]
  })

  const sabonete = await prisma.product.findFirst({
    where: { name: 'sabonete', category: 'PERSONAL_CARE' }
  }) 

  const brands2 = await prisma.brand.findFirst({
    where: { name: 'Dove' }
  })
  const brands3 = await prisma.brand.findFirst({
    where: { name: 'Lux' }
  })

  const productId = await prisma.product.findFirst({
    where: { name: 'sabonete' }
  })

  await prisma.productVariant.createMany({
    data: [
      {
        productId: productId!.id,
        brandId: brands2!.id
      },
      {
        productId: productId!.id,
        brandId: brands3!.id
      }
    ]
  })
    const dove = await prisma.productVariant.create({
    data: {
      brand: 'Dove',
      productId: sabonete.id
    }
  })
  await prisma.productPrice.create({
    data: {
      value: 250,
      date: new Date(),
      location: 'Comper Planaltina',
      productVariantId: dove.id,
      userId: user2.id
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
  }) */

async function main() {
  // pega todas as despesas que ainda não têm expenseDate
  const expenses = await prisma.expense.findMany({
    where: { expenseDate: null },
    select: { id: true, date: true, createdAt: true }
  })

  // atualiza cada uma
  for (const exp of expenses) {
    await prisma.expense.update({
      where: { id: exp.id },
      data: {
        // escolhe qual campo usar como base
        expenseDate: exp.date ?? exp.createdAt
      }
    })
  }

  console.log('Backfill concluído')
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
