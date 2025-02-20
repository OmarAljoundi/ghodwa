import { NewsDetails } from "@/components/news/news-details";
import { getNewsBySlug } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import React from "react";

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
