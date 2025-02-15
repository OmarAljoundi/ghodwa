-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);
