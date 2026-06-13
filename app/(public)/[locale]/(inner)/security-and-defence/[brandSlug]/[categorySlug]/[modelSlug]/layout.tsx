import type { ReactNode } from 'react';
import { getModelBySlug } from '@/query';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';

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
    locale === 'ar' ? modelDetails?.currentModel?.ar_name : modelDetails?.currentModel?.en_name;

  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: `/security-and-defence/${brandSlug}/${categorySlug}/${modelDetails?.currentModel?.slug}`,
          label: label ?? 'Not found',
        }}
      />
      {children}
    </>
  );
}
