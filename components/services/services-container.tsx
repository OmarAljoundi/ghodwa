'use client';
import Link from 'next/link';
import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useServicesPages } from '@/hooks/use-render-items';
import type { getServices } from '@/query';
import { ServiceCard } from '../service-card';
import { BlurFade } from '../ui/blur-fade';

export function ServicesContainer({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getServices>;
}) {
  const services = use(dataPromise);
  const serviceItems = useServicesPages(services);
  const filteredServices = useFilteredLanguageData(serviceItems);

  return (
    <div className="grid grid-cols-[12fr] gap-y-4 lg:gap-y-0 lg:grid-cols-[4fr,4fr,4fr] lg:gap-x-4 xl:gap-6 2xl:gap-x-8 ">
      {filteredServices?.map(({ icon, slug, image, addGridBg, title, id }, index) => (
        <BlurFade
          delay={index * 0.3}
          blur="16px"
          inView
          direction="up"
          className="basis-full lg:basis-1/3  p-4 h-60 lg:h-96 "
          key={id}
        >
          <Link href={`/services/${slug}`}>
            <ServiceCard
              addGridBg={addGridBg}
              icon={(icon as any)?.url}
              backgroundImage={(image as any)?.url}
              title={title}
            />
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
