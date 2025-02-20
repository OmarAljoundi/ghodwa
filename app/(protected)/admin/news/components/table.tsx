"use client";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getNewsColumns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDataTable } from "@/hooks/use-data-table";
import { getAll } from "@/lib/generic.server";
import { NewsSchema } from "@/schema/news-schema";

export function NewsTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<NewsSchema>>;
}) {
  const { data } = React.use(dataPromise);
  const columns = React.useMemo(() => getNewsColumns(), []);

  const { table } = useDataTable({
    data: data ?? [],
    columns,
    rowCount: data?.length ?? 0,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  });

  return (
    <DataTable table={table}>
      <div className="flex items-center justify-between">
        <Link href={"/admin/news/new"}>
          <Button size={"sm"}>Create new news</Button>
        </Link>
      </div>
    </DataTable>
  );
}
