import { getNewsBySlug } from "@/query";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React, { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ slug: string; locale: string }>;
  children: ReactNode;
}) {
  const { locale, slug } = await params;

  const { ar_title, en_title, slug: newsSlug } = await getNewsBySlug(slug);

  const label = locale == "ar" ? ar_title : en_title;

  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{ href: `/news/${newsSlug}`, label }}
      />
      {children}
    </>
  );
}
