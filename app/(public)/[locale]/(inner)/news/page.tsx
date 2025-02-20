import { NewsContainer } from "@/components/news/news-container";
import { getNews } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import React, { Suspense } from "react";

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
