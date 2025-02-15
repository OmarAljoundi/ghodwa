-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "ar_name" TEXT NOT NULL,
    "en_name" TEXT NOT NULL,
    "logo" JSONB,
    "ar_description" TEXT,
    "en_description" TEXT,
    "seo" JSONB,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "ar_name" TEXT NOT NULL,
    "en_name" TEXT NOT NULL,
    "image" JSONB,
    "seo" JSONB,
    "ar_description" TEXT,
    "en_description" TEXT,
    "brandId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model" (
    "id" SERIAL NOT NULL,
    "ar_name" TEXT NOT NULL,
    "en_name" TEXT NOT NULL,
    "ar_description" TEXT,
    "en_description" TEXT,
    "maxHorsePower" TEXT NOT NULL,
    "maxBrakePower" TEXT NOT NULL,
    "grossOperatingWeight" TEXT NOT NULL,
    "bucketSize" TEXT NOT NULL,
    "seo" JSONB,
    "image" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "brochure" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "categoryId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_ar_name_key" ON "brand"("ar_name");

-- CreateIndex
CREATE UNIQUE INDEX "brand_en_name_key" ON "brand"("en_name");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "model" ADD CONSTRAINT "model_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
