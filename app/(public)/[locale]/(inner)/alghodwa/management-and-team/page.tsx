import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlurFade } from '@/components/ui/blur-fade';
import { getSettings } from '@/query';
import { InnerPageClient } from '@/store/inner-page-client';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';
import { generatePageBilingualSeo } from '../../../generate-bilingual-seo';
import { TeamMember } from '../components/team-member';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { seoStaticPagesManagementTeam } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesManagementTeam?.seo ?? {},
    '/alghodwa/management-and-team',
  )[locale];

  return dictionary;
}

export default async function Page({ params }: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const { locale } = await params;
  const { managementTeam } = await getSettings();
  if (!managementTeam.showPage) return notFound();

  const label = locale === 'ar' ? managementTeam.ar_page_title : managementTeam.en_page_title;

  return (
    <BlurFade inView>
      <InnerPageClient currentPage={label} />
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: '/management-and-team',
          label,
        }}
      />
      <TeamMember teamMember={managementTeam} />
    </BlurFade>
  );
}
