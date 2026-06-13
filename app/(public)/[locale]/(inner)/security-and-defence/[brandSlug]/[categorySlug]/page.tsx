import type { Metadata } from 'next';
import { generatePageBilingualSeo } from '@/app/(public)/[locale]/generate-bilingual-seo';
import { ModelList } from '@/components/our-brands/model-list';
import { getCategoryBySlug } from '@/query';
import type { SeoSchema } from '@/schema/seo-schema';
import type { FileSchema } from '@/schema/upload-schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: 'ar' | 'en';
    categorySlug: string;
    brandSlug: string;
  }>;
}): Promise<Metadata> {
  const { locale, categorySlug, brandSlug } = await params;
  const { seo, ar_name, en_name, image } = await getCategoryBySlug(categorySlug);

  const images = image
    ? [
        {
          path: (image as FileSchema)?.path,
          alt: locale === 'ar' ? ar_name : en_name,
          width: 400,
          height: 300,
        },
      ]
    : [];

  const dictionary = generatePageBilingualSeo(
    (seo as SeoSchema) ?? {},
    `/security-and-defence/${brandSlug}/${categorySlug}`,
    images,
  )[locale];

  return dictionary;
}

export default async function Page({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  return <ModelList dataPromise={getCategoryBySlug(categorySlug)} />;
}
