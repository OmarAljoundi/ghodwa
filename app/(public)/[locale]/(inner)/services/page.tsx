import { ServicesContainer } from "@/components/services/services-container";
import { getServices } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import React, { Suspense } from "react";

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
