'use client';
import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { getSettings } from '@/query';
import { BannerSection } from '../banner-section';

/**
 * Home-page "Security and defence" promo block. Reads
 * `home.securityDefenceSection` and uses the SD home-banner gradient overlay.
 * CTA defaults to the SD landing.
 */
export function SecurityDefenceSection({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getSettings>;
}) {
  const {
    home: { securityDefenceSection },
  } = use(dataPromise);

  const filtered = useFilteredLanguageData(securityDefenceSection);
  const cta = useFilteredLanguageData(filtered?.callToAction);

  if (!securityDefenceSection || !filtered) return null;

  const { subtitle, title, media, mobile_media } = filtered;

  return (
    <div className="px-4 lg:px-0">
      <BannerSection
        largeSrc={(media as any)?.path}
        smallSrc={(mobile_media as any)?.path}
        title={title as string}
        subtitle={subtitle as string}
        url={cta?.url as string}
        ctaText={cta?.text as string}
        fallbackUrl="/security-and-defence"
        overlayClassName="sd-home-gradient-overlay !bg-black/70 lg:!bg-transparent"
        heading="h2"
      />
    </div>
  );
}
