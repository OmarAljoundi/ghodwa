import { NewsContainer } from "@/components/news/news-container";
import { getNews, getSettings } from "@/query";
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
  const { seoStaticPagesNewsListing } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesNewsListing?.seo ?? {},
    "/news"
  )[locale];

  return dictionary;
}

export default function Page() {
  return (
    <React.Fragment>
      <InnerPageClient currentPage={"News"} />
      <Suspense fallback={<h1>Loading..</h1>}>
        <NewsContainer dataPromise={getNews()} />
      </Suspense>
    </React.Fragment>
  );
}
