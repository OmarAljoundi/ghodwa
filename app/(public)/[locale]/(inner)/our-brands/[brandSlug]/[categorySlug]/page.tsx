import { ModelList } from "@/components/our-brands/model-list";
import { getCategoryBySlug } from "@/query";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  return (
    <React.Fragment>
      <ModelList dataPromise={getCategoryBySlug(categorySlug)} />
    </React.Fragment>
  );
}
