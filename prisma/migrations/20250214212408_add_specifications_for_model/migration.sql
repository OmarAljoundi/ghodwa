/*
  Warnings:

  - You are about to drop the column `bucketSize` on the `model` table. All the data in the column will be lost.
  - You are about to drop the column `grossOperatingWeight` on the `model` table. All the data in the column will be lost.
  - You are about to drop the column `maxBrakePower` on the `model` table. All the data in the column will be lost.
  - You are about to drop the column `maxHorsePower` on the `model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "model" DROP COLUMN "bucketSize",
DROP COLUMN "grossOperatingWeight",
DROP COLUMN "maxBrakePower",
DROP COLUMN "maxHorsePower",
ADD COLUMN     "ar_specification" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "en_specification" JSONB[] DEFAULT ARRAY[]::JSONB[];
