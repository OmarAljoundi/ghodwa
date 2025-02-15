-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_brandId_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "brandId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
