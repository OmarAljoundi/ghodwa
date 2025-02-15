import { SettingSchema } from "@/schema/setting-schema";
import React from "react";
import { ColumnGroup } from "./column-group";

export function FirstFooterLayer({
  items,
}: {
  items: SettingSchema["footer"]["items"];
}) {
  return (
    <div className="col-span-full md:col-span-1">
      <ColumnGroup item={items[0]} />
    </div>
  );
}
