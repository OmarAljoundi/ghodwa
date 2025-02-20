import { getModelBySlug } from "@/query";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React, { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{
    categorySlug: string;
    brandSlug: string;
    modelSlug: string;
    locale: string;
  }>;
  children: ReactNode;
}) {
  const { categorySlug, brandSlug, modelSlug, locale } = await params;
  const modelDetails = await getModelBySlug(modelSlug, categorySlug);

  const label =
    locale == "ar"
      ? modelDetails?.currentModel?.ar_name
      : modelDetails?.currentModel?.en_name;

  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: `/our-brands/${brandSlug}/${categorySlug}/${modelDetails?.currentModel?.slug}`,
          label: label ?? "Not found",
        }}
      />
      {children}
    </>
  );
}
