/*
  Warnings:

  - Added the required column `ar_content` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `en_content` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "ar_content" TEXT NOT NULL,
ADD COLUMN     "en_content" TEXT NOT NULL;
