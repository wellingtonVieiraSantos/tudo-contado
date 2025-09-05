/*
  Warnings:

  - You are about to drop the column `creditCardId` on the `Income` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_creditCardId_fkey";

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "creditCardId";
