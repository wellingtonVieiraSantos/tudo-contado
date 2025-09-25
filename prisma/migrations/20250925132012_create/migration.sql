/*
  Warnings:

  - You are about to drop the column `date` on the `Expense` table. All the data in the column will be lost.
  - Made the column `expenseDate` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "date",
ALTER COLUMN "expenseDate" SET NOT NULL;
