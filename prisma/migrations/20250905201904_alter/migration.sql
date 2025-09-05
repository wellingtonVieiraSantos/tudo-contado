/*
  Warnings:

  - You are about to drop the column `paid` on the `Expense` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('PAID', 'PENDING', 'OVERDUE');

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "paid",
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "installments" INTEGER,
ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'PAID';
