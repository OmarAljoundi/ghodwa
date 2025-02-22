/*
  Warnings:

  - The `brochure` column on the `model` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "model" DROP COLUMN "brochure",
ADD COLUMN     "brochure" JSONB;
