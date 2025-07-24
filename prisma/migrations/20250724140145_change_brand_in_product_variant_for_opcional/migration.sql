-- CreateEnum
CREATE TYPE "BrandOriginType" AS ENUM ('BRANDED', 'UNBRANDED');

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_brandId_fkey";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "brandOrigin" "BrandOriginType" NOT NULL DEFAULT 'BRANDED',
ALTER COLUMN "brandId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
