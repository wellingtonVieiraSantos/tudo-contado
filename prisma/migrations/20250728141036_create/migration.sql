/*
  Warnings:

  - A unique constraint covering the columns `[normalized_name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[normalized_name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalized_name` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalized_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Brand_name_key";

-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "normalized_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "normalized_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_normalized_name_key" ON "Brand"("normalized_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_normalized_name_key" ON "Product"("normalized_name");
