'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import type { Brand } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { resolveUrl } from '@/lib/utils';
import type { getBrands } from '@/query';

export function BrandList({ dataPromise }: { dataPromise: ReturnType<typeof getBrands> }) {
  const brands = use(dataPromise);

  if (brands.length === 0) return notFound();

  return (
    <div className="flex flex-wrap items-center justify-center justify-items-center place-items-center">
      {brands?.map((props) => (
        <div className="lg:basis-1/3 xl:basis-1/4 p-4" key={props.id}>
          <BrandItem {...props} />
        </div>
      ))}
    </div>
  );
}

function BrandItem(prop: Brand) {
  const { logo, name, slug } = useFilteredLanguageData(prop);
  return (
    <Link
      href={`/our-brands/${slug}`}
      className="bg-white  hover:bg-primary/30 transition-all duration-300 cursor-pointer  shadow-sm min-h-40 flex items-center justify-center h-full rounded-xl"
    >
      <Image
        src={resolveUrl((logo as any)?.path)}
        className="p-6 w-32"
        width={300}
        height={300}
        quality={100}
        alt={name}
        aria-label={name}
      />
    </Link>
  );
}
