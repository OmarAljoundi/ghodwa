'use client';
import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { getSettings } from '@/query';
import { BannerSection } from '../banner-section';

export function SubHeroSection({ dataPromise }: { dataPromise: ReturnType<typeof getSettings> }) {
  const {
    home: { moreSection },
  } = use(dataPromise);
  const { callToAction, subtitle, title, media, mobile_media } =
    useFilteredLanguageData(moreSection);
  const { url, text } = useFilteredLanguageData(callToAction);

  return (
    <div className="px-4 lg:px-0">
      <BannerSection
        largeSrc={media?.path}
        smallSrc={mobile_media?.path}
        title={title}
        subtitle={subtitle}
        url={url}
        ctaText={text}
        overlayClassName="gradient-overlay !bg-black/70 lg:!bg-transparent"
        heading="h1"
      />
    </div>
  );
}
