'use client';

import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { getSettings } from '@/query';
import { BannerSection } from '../banner-section';

export function SecurityDefenceServices({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getSettings>;
}) {
  const settings = use(dataPromise);
  const services = settings.securityDefence?.services;

  const filtered = useFilteredLanguageData(services);
  const cta = useFilteredLanguageData(filtered?.callToAction);

  if (!services || !filtered) return null;

  const { subtitle, title, media, mobile_media } = filtered;

  return (
    <div className="container mx-auto">
      <BannerSection
        largeSrc={(media as any)?.path}
        smallSrc={(mobile_media as any)?.path}
        title={title as string}
        subtitle={subtitle as string}
        url={cta?.url as string}
        ctaText={cta?.text as string}
        overlayClassName="sd-services-gradient-overlay !bg-black/70 lg:!bg-transparent"
        heading="h2"
        buttonClassName="bg-primary text-white"
        ctaArrowWrapClassName="bg-brand-accent"
        ctaArrowClassName="text-black"
      />
    </div>
  );
}
