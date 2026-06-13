import type { ReactNode } from 'react';
import { getBrandBySlug } from '@/query';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ brandSlug: string; locale: string }>;
  children: ReactNode;
}) {
  const { brandSlug, locale } = await params;
  const brandDetails = await getBrandBySlug(brandSlug, 'security_defence');

  const label = locale === 'ar' ? brandDetails.ar_name : brandDetails.en_name;

  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{ href: `/security-and-defence/${brandDetails.slug}`, label }}
      />
      {children}
    </>
  );
}
