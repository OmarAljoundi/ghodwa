'use client';
import { notFound } from 'next/navigation';
import { use } from 'react';
import type { Model } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { resolveUrl } from '@/lib/utils';
import type { getCategoryBySlug } from '@/query';
import { useAddInnerPage } from '@/store/inner-page';
import { CommonCard } from '../common-card';
import { BlurFade } from '../ui/blur-fade';

export function ModelList({ dataPromise }: { dataPromise: ReturnType<typeof getCategoryBySlug> }) {
  const category = use(dataPromise);
  const { name } = useFilteredLanguageData(category);
  useAddInnerPage(name);

  if (!category || category.models.length === 0) {
    return notFound();
  }

  return (
    <div className="flex flex-wrap items-center sm:justify-center sm:justify-items-center sm:place-items-center ">
      {category?.models?.map((props, index) => (
        <BlurFade
          delay={index * 0.2}
          className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-4"
          key={props.id}
        >
          <ModelItem categorySlug={category.slug} model={props} />
        </BlurFade>
      ))}
    </div>
  );
}

function ModelItem({ model, categorySlug }: { categorySlug: string; model: Model }) {
  const { image, name, slug } = useFilteredLanguageData(model);
  return (
    <CommonCard
      imageUrl={resolveUrl((image?.[0] as any)?.path)}
      name={name}
      slug={`${categorySlug}/${slug}`}
    />
  );
}
