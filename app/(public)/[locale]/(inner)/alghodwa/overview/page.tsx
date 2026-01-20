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
  const { seoStaticPagesOverview } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesOverview?.seo ?? {},
    '/alghodwa/overview',
  )[locale];

  return dictionary;
}

export default async function Page({ params }: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const { locale } = await params;
  const { overview } = await getSettings();

  if (!overview.showPage) return notFound();

  const label = locale === 'ar' ? overview.ar_page_title : overview.en_page_title;

  return (
    <BlurFade inView>
      <InnerPageClient currentPage={label} />
      <RegisterBreadcrumbClient breadcrumb={{ href: '/overview', label }} />
      <ContentDetails
        ar_content={overview.ar_content}
        en_content={overview.en_content}
        title={label}
      />
    </BlurFade>
  );
}
