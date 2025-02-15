import { ModelDetails } from "@/components/our-brands/model-details";
import { getModelBySlug } from "@/query";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ modelSlug: string; categorySlug: string }>;
}) {
  const { modelSlug, categorySlug } = await params;

  return (
    <React.Fragment>
      <ModelDetails dataPromise={getModelBySlug(modelSlug, categorySlug)} />
    </React.Fragment>
  );
}
