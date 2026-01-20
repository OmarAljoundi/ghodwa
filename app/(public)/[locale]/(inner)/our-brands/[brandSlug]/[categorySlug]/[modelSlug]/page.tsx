import type { Metadata } from 'next';
import { generatePageBilingualSeo } from '@/app/(public)/[locale]/generate-bilingual-seo';
import { ModelDetails } from '@/components/model-details';
import { getModelBySlug, getSettings } from '@/query';
import type { SeoSchema } from '@/schema/seo-schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: 'ar' | 'en';
    categorySlug: string;
    brandSlug: string;
    modelSlug: string;
  }>;
}): Promise<Metadata> {
  const { locale, categorySlug, brandSlug, modelSlug } = await params;
  const { currentModel } = await getModelBySlug(modelSlug, categorySlug);

  const images = currentModel?.image.map((modelImage) => ({
    url: (modelImage as any)?.url,
    width: 1000,
    height: 500,
    alt: locale === 'ar' ? currentModel.ar_name : currentModel.en_name,
  }));

  const dictionary = generatePageBilingualSeo(
    (currentModel?.seo as SeoSchema) ?? {},
    `/our-brands/${brandSlug}/${categorySlug}/${modelSlug}`,
    images,
  )[locale];

  return dictionary;
}

export default async function Page({
  params,
}: {
  params: Promise<{ modelSlug: string; categorySlug: string }>;
}) {
  const { modelSlug, categorySlug } = await params;

  return (
    <ModelDetails
      dataPromise={getModelBySlug(modelSlug, categorySlug)}
      dataPromiseSetting={getSettings()}
    />
  );
}
