/*
  Warnings:

  - You are about to drop the column `ar_specification` on the `model` table. All the data in the column will be lost.
  - You are about to drop the column `en_specification` on the `model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "model" DROP COLUMN "ar_specification",
DROP COLUMN "en_specification",
ADD COLUMN     "specification" JSONB[] DEFAULT ARRAY[]::JSONB[];
