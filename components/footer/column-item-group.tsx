"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ColumnItemGroup<
  T extends {
    title: string;
    url: string;
  }
>({ item }: { item: T }) {
  const { t } = useTranslation("common");
  return (
    <li>
      <Link href={item.url} className="hover:text-primary">
        {t(item.title)}
      </Link>
    </li>
  );
}
