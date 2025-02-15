import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { SettingSchema } from "@/schema/setting-schema";
import Link from "next/link";

export function ColumnItemGroup({
  item,
}: {
  item: SettingSchema["footer"]["items"][number]["columns"][number];
}) {
  const { title, url } = useFilteredLanguageData(item);
  return (
    <li>
      <Link href={url} className="hover:text-orange-400">
        {title}
      </Link>
    </li>
  );
}
