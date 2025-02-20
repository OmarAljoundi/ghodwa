import React, { useMemo } from "react";
import { ColumnGroup } from "./column-group";
import { BrandWithRelationsSchema } from "@/schema";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";

export function FirstFooterLayer({
  brands,
}: {
  brands: BrandWithRelationsSchema[];
}) {
  const items = useMemo(() => {
    return brands.map((o) => {
      return {
        ar_title: o.ar_name,
        en_title: o.en_name,
        url: `/our-brands/${o.slug}`,
      };
    });
  }, [brands]);

  const filtredItems = useFilteredLanguageData(items);

  return (
    <div className="col-span-full md:col-span-1">
      <ColumnGroup items={filtredItems} title="Our Brands" />
    </div>
  );
}
