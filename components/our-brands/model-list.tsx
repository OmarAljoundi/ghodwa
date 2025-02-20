"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getCategoryBySlug } from "@/query";
import { useAddInnerPage } from "@/store/inner-page";
import { Model } from "@prisma/client";
import React, { use } from "react";
import { BlurFade } from "../ui/blur-fade";
import { CommonCard } from "../common-card";

export function ModelList({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getCategoryBySlug>;
}) {
  const category = use(dataPromise);
  const { name } = useFilteredLanguageData(category);
  useAddInnerPage(name);

  return (
    <div className="flex flex-wrap items-center justify-center justify-items-center place-items-center ">
      {category?.models?.map((props, index) => (
        <BlurFade
          delay={index * 0.2}
          className="lg:basis-1/3 xl:basis-1/4 p-4"
          key={props.id}
        >
          <ModelItem categorySlug={category.slug} model={props} />
        </BlurFade>
      ))}
    </div>
  );
}

function ModelItem({
  model,
  categorySlug,
}: {
  categorySlug: string;
  model: Model;
}) {
  const { image, name, slug } = useFilteredLanguageData(model);
  return (
    <CommonCard
      imageUrl={(image?.[0] as any)?.url}
      name={name}
      slug={`${categorySlug}/${slug}`}
    />
  );
}
