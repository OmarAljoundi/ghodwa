-- CreateEnum
CREATE TYPE "BrandType" AS ENUM ('default', 'security_defence');

-- AlterTable
ALTER TABLE "brand" ADD COLUMN     "type" "BrandType" NOT NULL DEFAULT 'default';
