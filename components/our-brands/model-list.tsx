"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getCategoryBySlug } from "@/query";
import { useAddInnerPage } from "@/store/inner-page";
import { Model } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { BlurFade } from "../ui/blur-fade";

export function ModelList({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getCategoryBySlug>;
}) {
  const category = use(dataPromise);
  const { name } = useFilteredLanguageData(category);
  useAddInnerPage(name);

  return (
    <div className="flex flex-wrap  mt-8 items-center justify-center justify-items-center place-items-center">
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
    <Link
      href={`${categorySlug}/${slug}`}
      className="flex-col group  cursor-pointer  shadow-sm min-h-40 flex items-center justify-center h-full rounded-xl"
    >
      <Image
        src={(image?.[0] as any)?.url}
        className="w-full rounded-3xl rounded-b-none group-hover:scale-105 transition-all duration-300"
        width={600}
        height={600}
        quality={100}
        alt={name}
        aria-label={name}
      />
      <div className="bg-white border-t-2 border-border w-full">
        <div className="p-6 text-center">
          <h1 className="text-2xl">{name}</h1>
        </div>
      </div>
    </Link>
  );
}
