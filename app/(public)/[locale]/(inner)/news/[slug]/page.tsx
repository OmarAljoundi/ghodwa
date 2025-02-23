import { NewsDetails } from "@/components/news/news-details";
import { getNewsBySlug } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import { Metadata } from "next";
import React from "react";
import { generatePageBilingualSeo } from "../../../generate-bilingual-seo";
import { SeoSchema } from "@/schema/seo-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ar" | "en"; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { seo, image, ar_title, en_title } = await getNewsBySlug(slug);

  const images = image?.map((img: any) => ({
    url: img.url,
    alt: locale === "ar" ? ar_title : en_title,
    width: 400,
    height: 300,
  }));

  const dictionary = generatePageBilingualSeo(
    (seo as SeoSchema) ?? {},
    `/news/${slug}`,
    images
  )[locale];

  return dictionary;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <InnerPageClient currentPage={"News"} />
      <NewsDetails dataPromise={getNewsBySlug(slug)} />
    </div>
  );
}
