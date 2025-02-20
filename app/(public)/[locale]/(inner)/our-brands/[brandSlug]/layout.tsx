import { getBrandBySlug } from "@/query";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React, { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ brandSlug: string; locale: string }>;
  children: ReactNode;
}) {
  const { brandSlug, locale } = await params;
  const brandDetails = await getBrandBySlug(brandSlug);

  const label = locale == "ar" ? brandDetails.ar_name : brandDetails.en_name;

  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{ href: `/our-brands/${brandDetails.slug}`, label }}
      />
      {children}
    </>
  );
}
