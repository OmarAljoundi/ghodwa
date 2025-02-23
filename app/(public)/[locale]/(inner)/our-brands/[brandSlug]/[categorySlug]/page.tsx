import { generatePageBilingualSeo } from "@/app/(public)/[locale]/generate-bilingual-seo";
import { ModelList } from "@/components/our-brands/model-list";
import { getCategoryBySlug } from "@/query";
import { SeoSchema } from "@/schema/seo-schema";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "ar" | "en";
    categorySlug: string;
    brandSlug: string;
  }>;
}): Promise<Metadata> {
  const { locale, categorySlug, brandSlug } = await params;
  const { seo, ar_name, en_name, image } = await getCategoryBySlug(
    categorySlug
  );

  const images = image
    ? [
        {
          url: (image as any).url,
          alt: locale === "ar" ? ar_name : en_name,
          width: 400,
          height: 300,
        },
      ]
    : [];

  const dictionary = generatePageBilingualSeo(
    (seo as SeoSchema) ?? {},
    `/our-brands/${brandSlug}/${categorySlug}`,
    images
  )[locale];

  return dictionary;
}

export default async function Page({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  return (
    <React.Fragment>
      <ModelList dataPromise={getCategoryBySlug(categorySlug)} />
    </React.Fragment>
  );
}
