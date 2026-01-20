import type { Metadata } from 'next';
import React from 'react';
import { BrandList } from '@/components/our-brands/brand-list';
import { getBrands, getSettings } from '@/query';
import { InnerPageClient } from '@/store/inner-page-client';
import { generatePageBilingualSeo } from '../../generate-bilingual-seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [settings, brands] = await Promise.all([getSettings(), getBrands()]);
  const images = brands
    .filter((x) => (x.logo as any)?.url)
    .map((brand) => ({
      url: (brand?.logo as any)?.url,
      width: 300,
      height: 300,
      alt: locale === 'ar' ? brand.ar_name : brand.en_name,
    }));

  const dictionary = generatePageBilingualSeo(
    settings?.seoStaticPagesBrandListing?.seo ?? {},
    '/our-brands',
    images,
  )[locale];

  return dictionary;
}

export default function Page() {
  return (
    <React.Fragment>
      <InnerPageClient currentPage={'Our Brands'} />
      <BrandList dataPromise={getBrands()} />
    </React.Fragment>
  );
}
