'use client';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { getBrands, getSettings } from '@/query';
import { Marquee } from '../ui/marquee';

export function BrandSection({
  dataPromise,
  dataPromiseSettings,
}: {
  dataPromise: ReturnType<typeof getBrands>;
  dataPromiseSettings: ReturnType<typeof getSettings>;
}) {
  const brands = use(dataPromise);
  const {
    home: { brand },
  } = use(dataPromiseSettings);
  const { title } = useFilteredLanguageData(brand);
  const filterdBrands = useFilteredLanguageData(brands);
  return (
    <div className="flex-col flex mx-auto items-center gap-y-2 lg:gap-y-8 overflow-hidden">
      <div className="container ">
        <h1 className="text-2xl lg:text-3xl text-center ">{title}</h1>
      </div>
      <Marquee repeat={15} pauseOnHover className="[--duration:20s] [--gap:2rem] [gap:var(--gap)]">
        {filterdBrands.map(({ logo, name, slug }, index) => (
          <Link key={index} href={`/our-brands/${slug}`}>
            <div className="hover:bg-white duration-300 transition-all rounded-lg p-2 cursor-pointer">
              <Image
                key={index}
                alt={name}
                aria-label={name}
                src={(logo as { url: string })?.url ?? ''}
                width={100}
                className="object-contain size-16 lg:size-28"
                height={100}
              />
            </div>
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
