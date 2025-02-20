import { ServiceDetails } from "@/components/services/service-details";
import { getServiceBySlug } from "@/query";
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
      <InnerPageClient currentPage={"Services"} />
      <ServiceDetails dataPromise={getServiceBySlug(slug)} />
    </div>
  );
}
