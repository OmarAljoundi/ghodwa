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
  params: Promise<{ locale: "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { seoStaticPagesManagementSystems } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesManagementSystems?.seo ?? {},
    "/alghodwa/management-systems"
  )[locale];

  return dictionary;
}

export default async function Page() {
  const { managementSystems } = await getSettings();

  if (!managementSystems.showPage) return notFound();

  return (
    <BlurFade inView>
      <InnerPageClient currentPage={"Management Systems"} />
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: "/management-systems",
          label: "Management Systems",
        }}
      />
      <ContentDetails
        ar_content={managementSystems.ar_content}
        en_content={managementSystems.en_content}
        title="Management Systems"
      />
    </BlurFade>
  );
}
