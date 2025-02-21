"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getBrandBySlug } from "@/query";
import { useAddInnerPage } from "@/store/inner-page";
import { Category } from "@prisma/client";
import React, { use } from "react";
import { BlurFade } from "../ui/blur-fade";
import { CommonCard } from "../common-card";

export default function BrandDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getBrandBySlug>;
}) {
  const brand = use(dataPromise);
  const { name, categories, slug } = useFilteredLanguageData(brand);
  useAddInnerPage(name);

  return (
    <div className="flex flex-wrap items-center sm:justify-center sm:justify-items-center sm:place-items-center">
      {categories?.map((props, index) => (
        <BlurFade
          delay={index * 0.2}
          className="basis-full sm:basis-1/2  lg:basis-1/3 xl:basis-1/4 p-4"
          key={props.id}
        >
          <BrandCategory brandSlug={slug} category={props} />
        </BlurFade>
      ))}
    </div>
  );
}

function BrandCategory({
  category,
  brandSlug,
}: {
  brandSlug: string;
  category: Category;
}) {
  const { image, name, slug } = useFilteredLanguageData(category);
  return (
    <CommonCard
      imageUrl={(image as any)?.url}
      name={name}
      slug={`/our-brands/${brandSlug}/${slug}`}
    />
  );
}
