import type { Metadata } from 'next';
import BrandDetails from '@/components/our-brands/brand-details';
import { getBrandBySlug } from '@/query';
import type { SeoSchema } from '@/schema/seo-schema';
import type { FileSchema } from '@/schema/upload-schema';
import { generatePageBilingualSeo } from '../../../generate-bilingual-seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en'; brandSlug: string }>;
}): Promise<Metadata> {
  const { locale, brandSlug } = await params;
  const { seo, ar_name, en_name, logo } = await getBrandBySlug(brandSlug);

  const images = logo
    ? [
      {
        path: (logo as FileSchema)?.path,
        alt: locale === 'ar' ? ar_name : en_name,
        width: 300,
        height: 300,
      },
    ]
    : [];

  const dictionary = generatePageBilingualSeo(
    (seo as SeoSchema) ?? {},
    `/our-brands/${brandSlug}`,
    images,
  )[locale];

  return dictionary;
}

export default async function Page({ params }: { params: Promise<{ brandSlug: string }> }) {
  const { brandSlug } = await params;
  return <BrandDetails dataPromise={getBrandBySlug(brandSlug)} />;
}
