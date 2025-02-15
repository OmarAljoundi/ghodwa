-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "ar_title" TEXT NOT NULL,
    "en_title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "en_content" TEXT NOT NULL,
    "ar_content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL,
    "seo" JSONB,
    "image" JSONB,
    "ar_icon" JSONB,
    "en_icon" JSONB,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_slug_key" ON "service"("slug");
