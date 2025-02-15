import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { SettingSchema } from "@/schema/setting-schema";
import React from "react";
import { ColumnItemGroup } from "./column-item-group";

export function ColumnGroup({
  item,
}: {
  item: SettingSchema["footer"]["items"][number];
}) {
  const { columns, group_title } = useFilteredLanguageData(item);
  return (
    <React.Fragment>
      <h3 className="text-orange-400 font-semibold mb-4">{group_title}</h3>
      <ul className="space-y-2">
        {columns.map((props, index) => (
          <ColumnItemGroup item={props} key={index} />
        ))}
      </ul>
    </React.Fragment>
  );
}
