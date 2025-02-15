-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "ar_title" TEXT NOT NULL,
    "en_title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ar_summary" TEXT,
    "en_summary" TEXT,
    "is_published" BOOLEAN NOT NULL,
    "seo" JSONB,
    "image" JSONB,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");
