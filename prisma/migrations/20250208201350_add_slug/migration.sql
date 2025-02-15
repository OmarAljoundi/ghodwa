/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `model` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brand" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "model" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "brand_slug_key" ON "brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "model_slug_key" ON "model"("slug");
