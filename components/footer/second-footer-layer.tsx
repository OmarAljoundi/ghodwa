import React, { useMemo } from "react";
import { ColumnGroup } from "./column-group";
import { Service } from "@prisma/client";
import { AlGhodwaMenu } from "../menu/nav-items";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";

export function SecondFooterLayer({ services }: { services: Service[] }) {
  const memoItems = useMemo(() => {
    return services.map((o) => {
      return {
        ar_title: o.ar_title,
        en_title: o.en_title,
        url: `/services/${o.slug}`,
      };
    });
  }, [services]);

  const itemsFiltered = useFilteredLanguageData(memoItems);

  const alGhodwaMenuFiltered = useFilteredLanguageData(AlGhodwaMenu);
  return (
    <div className="grid grid-cols-1 gap-8">
      <div>
        <ColumnGroup items={itemsFiltered} title="Services" />
      </div>
      <div>
        <ColumnGroup items={alGhodwaMenuFiltered} title="Al Ghodwa" />
      </div>
    </div>
  );
}
