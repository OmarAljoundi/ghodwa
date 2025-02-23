import { ServicesContainer } from "@/components/services/services-container";
import { getServices, getSettings } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { generatePageBilingualSeo } from "../../generate-bilingual-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { seoStaticPagesServicesListing } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesServicesListing?.seo ?? {},
    "/services"
  )[locale];

  return dictionary;
}

export default function Page() {
  return (
    <React.Fragment>
      <InnerPageClient currentPage={"Services"} />
      <Suspense fallback={<h1>Loading..</h1>}>
        <ServicesContainer dataPromise={getServices()} />
      </Suspense>
    </React.Fragment>
  );
}
