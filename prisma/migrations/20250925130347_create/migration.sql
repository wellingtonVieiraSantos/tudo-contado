/*
  Warnings:

  - You are about to drop the column `creditCardId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `installments` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Expense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_creditCardId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "creditCardId",
DROP COLUMN "installments",
DROP COLUMN "kind",
DROP COLUMN "paymentMethod",
DROP COLUMN "type",
ADD COLUMN     "expenseDate" DATE,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "ExpenseKind";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "method" "PaymentMethodType" NOT NULL,
    "creditCardId" TEXT,
    "installments" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
