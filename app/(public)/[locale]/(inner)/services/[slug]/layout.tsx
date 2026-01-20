import type { ReactNode } from 'react';
import { getServiceBySlug } from '@/query';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ slug: string; locale: string }>;
  children: ReactNode;
}) {
  const { locale, slug } = await params;

  const { ar_title, en_title, slug: serviceSlug } = await getServiceBySlug(slug);

  const label = locale === 'ar' ? ar_title : en_title;

  return (
    <>
      <RegisterBreadcrumbClient breadcrumb={{ href: `/services/${serviceSlug}`, label }} />
      {children}
    </>
  );
}
