import type { Metadata } from 'next';
import { ServiceDetails } from '@/components/services/service-details';
import { getServiceBySlug } from '@/query';
import type { SeoSchema } from '@/schema/seo-schema';
import { InnerPageClient } from '@/store/inner-page-client';
import { generatePageBilingualSeo } from '../../../generate-bilingual-seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en'; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { seo } = await getServiceBySlug(slug);

  const dictionary = generatePageBilingualSeo((seo as SeoSchema) ?? {}, `/services/${slug}`)[
    locale
  ];

  return dictionary;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div>
      <InnerPageClient currentPage={'Services'} />
      <ServiceDetails dataPromise={getServiceBySlug(slug)} />
    </div>
  );
}
