/*
  Warnings:

  - You are about to drop the column `showOnHomePage` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `showOnMeun` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `showOnMeun` on the `service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brand" DROP COLUMN "showOnHomePage",
DROP COLUMN "showOnMeun",
ADD COLUMN     "showOnMenu" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "service" DROP COLUMN "showOnMeun",
ADD COLUMN     "showOnMenu" BOOLEAN NOT NULL DEFAULT true;
