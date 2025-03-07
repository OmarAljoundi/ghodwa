import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React from "react";
import { ContentDetails } from "../components/content-details-page";
import { getSettings } from "@/query";
import { BlurFade } from "@/components/ui/blur-fade";
import { Metadata } from "next";
import { generatePageBilingualSeo } from "../../../generate-bilingual-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ar" | "en"; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { extraAboutPages } = await getSettings();

  const page = extraAboutPages.find((x) => x.slug == slug?.[0]);

  if (!page) {
    const dictionary = generatePageBilingualSeo(
      {
        ar_metaKeywords: [],
        en_metaKeywords: [],
        ar_metaDescription: "",
        ar_metaTitle: "لا يوجد عنوان للصفحة",
        en_metaTitle: "Page not found",
        en_metaDescription: "",
      },
      `/alghodwa/${slug?.[0]}`
    )[locale];

    return dictionary;
  }

  const dictionary = generatePageBilingualSeo(
    page?.seo ?? {
      ar_metaKeywords: [],
      en_metaKeywords: [],
      ar_metaDescription: "",
      ar_metaTitle: "",
      en_metaDescription: "",
      en_metaTitle: "",
    },
    `/alghodwa/${slug?.[0]}`
  )[locale];

  return dictionary;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "ar" | "en"; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const { extraAboutPages } = await getSettings();

  const page = extraAboutPages.find((x) => x.slug == slug?.[0]);

  if (!page || page.showPage == false) return notFound();

  const label = locale == "ar" ? page.ar_title : page.en_title;
  return (
    <BlurFade inView>
      <InnerPageClient currentPage={label} />
      <RegisterBreadcrumbClient breadcrumb={{ href: `/${slug?.[0]}`, label }} />
      <ContentDetails
        ar_content={page.ar_content}
        en_content={page.en_content}
        title={label}
      />
    </BlurFade>
  );
}
