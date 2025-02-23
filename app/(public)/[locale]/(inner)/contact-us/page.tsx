import ContactUsContainer from "@/components/contact-us/container";
import { getSettings } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import { Metadata } from "next";
import React from "react";
import { generatePageBilingualSeo } from "../../generate-bilingual-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { seoStaticPagesContactUs } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesContactUs?.seo ?? {},
    "/contact-us"
  )[locale];

  return dictionary;
}

export default async function Page() {
  const { workingHours, offices } = await getSettings();
  return (
    <React.Fragment>
      <InnerPageClient currentPage={"Contact Us"} />
      <RegisterBreadcrumbClient
        breadcrumb={{ href: "/contact-us", label: "Contact Us" }}
      />
      <ContactUsContainer offices={offices} workingHours={workingHours} />
    </React.Fragment>
  );
}
