'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { use } from 'react';
import type { Brand } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { resolveUrl } from '@/lib/utils';
import type { getSecurityDefenceBrands, getSettings } from '@/query';

export function SecurityDefenceProducts({
  dataPromise,
  dataPromiseSettings,
}: {
  dataPromise: ReturnType<typeof getSecurityDefenceBrands>;
  dataPromiseSettings: ReturnType<typeof getSettings>;
}) {
  const settings = use(dataPromiseSettings);
  const brands = use(dataPromise);
  const t = useTranslations();
  const heading = settings.securityDefence?.productsHeading;
  const filtered = useFilteredLanguageData(heading);
  const title = filtered?.title;

  if (!brands || brands.length === 0) return null;

  return (
    <div className="container mx-auto flex flex-col items-center gap-y-8 lg:gap-y-12">
      <h2 className="text-3xl lg:text-5xl text-center text-primary">
        {(title as string) || t('Security and defence products')}
      </h2>

      <div className="flex flex-wrap items-stretch justify-center gap-6 lg:gap-8 w-full">
        {brands.map((brand) => (
          <SecurityDefenceBrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function SecurityDefenceBrandCard({ brand }: { brand: Brand }) {
  const { logo, name, slug } = useFilteredLanguageData(brand);
  const path = (logo as { path?: string } | null)?.path;

  return (
    <Link
      href={`/security-and-defence/${slug}`}
      aria-label={name}
      className="group bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full sm:w-[300px] lg:w-[340px] h-[150px] lg:h-[170px] px-8"
    >
      {path && (
        <Image
          src={resolveUrl(path)}
          alt={name}
          aria-label={name}
          width={400}
          height={200}
          quality={100}
          className="max-h-[80px] lg:max-h-[90px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </Link>
  );
}
