import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlurFade } from '@/components/ui/blur-fade';
import { getSettings } from '@/query';
import { InnerPageClient } from '@/store/inner-page-client';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';
import { generatePageBilingualSeo } from '../../../generate-bilingual-seo';
import { ContentDetails } from '../components/content-details-page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { seoStaticPagesManagementSystems } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesManagementSystems?.seo ?? {},
    '/alghodwa/management-systems',
  )[locale];

  return dictionary;
}

export default async function Page({ params }: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const { locale } = await params;
  const { managementSystems } = await getSettings();

  if (!managementSystems.showPage) return notFound();

  const label = locale === 'ar' ? managementSystems.ar_page_title : managementSystems.en_page_title;

  return (
    <BlurFade inView>
      <InnerPageClient currentPage={label} />
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: '/management-systems',
          label,
        }}
      />
      <ContentDetails
        ar_content={managementSystems.ar_content}
        en_content={managementSystems.en_content}
        title={label}
      />
    </BlurFade>
  );
}
