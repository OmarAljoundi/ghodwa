import type { Metadata } from 'next';
import React from 'react';
import { SecurityDefenceIntro } from '@/components/security-defence/sd-intro';
import { SecurityDefenceProducts } from '@/components/security-defence/sd-products';
import { SecurityDefenceServices } from '@/components/security-defence/sd-services';
import { BlurFade } from '@/components/ui/blur-fade';
import { resolveUrl } from '@/lib/utils';
import { getSecurityDefenceBrands, getSettings } from '@/query';
import type { SeoSchema } from '@/schema/seo-schema';
import { InnerPageClient } from '@/store/inner-page-client';
import { generatePageBilingualSeo } from '../../generate-bilingual-seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [settings, brands] = await Promise.all([getSettings(), getSecurityDefenceBrands()]);

  const images = brands
    .filter((x) => (x.logo as any)?.path)
    .map((brand) => ({
      path: resolveUrl((brand?.logo as any)?.path),
      width: 300,
      height: 300,
      alt: locale === 'ar' ? brand.ar_name : brand.en_name,
    }));

  const dictionary = generatePageBilingualSeo(
    settings?.seoStaticPagesSecurityDefence?.seo ?? ({} as SeoSchema),
    '/security-and-defence',
    images,
  )[locale];

  return dictionary;
}

export default function Page() {
  return (
    <React.Fragment>
      <InnerPageClient currentPage={'Security and Defence'} />
      <div className="space-y-12 lg:space-y-20">
        <BlurFade inView>
          <SecurityDefenceIntro dataPromise={getSettings()} />
        </BlurFade>
        <BlurFade inView>
          <SecurityDefenceProducts
            dataPromise={getSecurityDefenceBrands()}
            dataPromiseSettings={getSettings()}
          />
        </BlurFade>
        <BlurFade inView>
          <SecurityDefenceServices dataPromise={getSettings()} />
        </BlurFade>
      </div>
    </React.Fragment>
  );
}
