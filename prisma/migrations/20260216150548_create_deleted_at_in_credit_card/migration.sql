/*
  Warnings:

  - You are about to drop the column `closingDay` on the `CreditCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CreditCard" DROP COLUMN "closingDay",
ADD COLUMN     "closeDay" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "paymentDay" SET DEFAULT 5;
