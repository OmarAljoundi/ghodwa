import { SettingSchema } from "@/schema/setting-schema";
import React from "react";
import { ColumnGroup } from "./column-group";

export function SecondFooterLayer({
  items,
}: {
  items: SettingSchema["footer"]["items"];
}) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {items.slice(1).map((props, index) => (
        <div key={index}>
          <ColumnGroup item={props} />
        </div>
      ))}
    </div>
  );
}
