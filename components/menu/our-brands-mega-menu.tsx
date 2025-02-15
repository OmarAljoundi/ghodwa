import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { BrandWithRelationsSchema } from "@/schema";
import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default function OurBrandsMegaMenu({
  brands,
}: {
  brands: BrandWithRelationsSchema[];
}) {
  const brandsFilter = useFilteredLanguageData(brands);
  return (
    <div className="w-full h-full bg-white">
      <div className={"grid grid-cols-4 gap-6"}>
        {brandsFilter.map(({ name, categories, slug }) => (
          <div key={name}>
            <h3 className={"dark:text-white text-neutral-950"}>{name}</h3>
            <ul>
              {categories?.map((o) => (
                <CategoryItem
                  brandSlug={slug}
                  category={o as Category}
                  key={o.id}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryItem({
  category,
  brandSlug,
}: {
  category: Category;
  brandSlug: string;
}) {
  const { name, slug } = useFilteredLanguageData(category);
  return (
    <Link href={`/our-brands/${brandSlug}/${slug}`}>
      <li>{name}</li>
    </Link>
  );
}
