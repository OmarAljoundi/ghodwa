import React from "react";
import { ColumnItemGroup } from "./column-item-group";
import { useTranslation } from "react-i18next";

export function ColumnGroup<
  T extends {
    title: string;
    url: string;
  }
>({ items, title }: { items: T[]; title: string }) {
  const { t } = useTranslation("common");
  return (
    <React.Fragment>
      <h3 className="text-primary font-semibold mb-4">{t(title)}</h3>
      <ul className="space-y-2">
        {items.map((props, index) => (
          <ColumnItemGroup item={props} key={index} />
        ))}
      </ul>
    </React.Fragment>
  );
}
