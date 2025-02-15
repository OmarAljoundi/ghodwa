import BrandDetails from "@/components/our-brands/brand-details";
import { getBrandBySlug } from "@/query";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const { brandSlug } = await params;
  return (
    <React.Fragment>
      <BrandDetails dataPromise={getBrandBySlug(brandSlug)} />
    </React.Fragment>
  );
}
