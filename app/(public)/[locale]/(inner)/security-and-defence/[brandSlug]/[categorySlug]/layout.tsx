import type { ReactNode } from 'react';
import { getCategoryBySlug } from '@/query';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ categorySlug: string; brandSlug: string; locale: string }>;
  children: ReactNode;
}) {
  const { categorySlug, brandSlug, locale } = await params;
  const categoryDetails = await getCategoryBySlug(categorySlug);

  const label = locale === 'ar' ? categoryDetails.ar_name : categoryDetails.en_name;

  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: `/security-and-defence/${brandSlug}/${categoryDetails.slug}`,
          label,
        }}
      />
      {children}
    </>
  );
}
