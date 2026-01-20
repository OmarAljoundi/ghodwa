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
  const { seoStaticPagesMission } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesMission?.seo ?? {},
    '/alghodwa/mission-vision',
  )[locale];

  return dictionary;
}

export default async function Page({ params }: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const { locale } = await params;
  const { missionVision } = await getSettings();

  if (!missionVision.showPage) return notFound();

  const label = locale === 'ar' ? missionVision.ar_page_title : missionVision.en_page_title;

  return (
    <BlurFade inView>
      <InnerPageClient currentPage={label} />
      <RegisterBreadcrumbClient breadcrumb={{ href: '/mission-vision', label }} />
      <ContentDetails
        ar_content={missionVision.ar_content}
        en_content={missionVision.en_content}
        title={label}
      />
    </BlurFade>
  );
}
