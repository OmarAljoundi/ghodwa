"use client";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getBrandColumns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDataTable } from "@/hooks/use-data-table";
import { getAll } from "@/lib/generic.server";
import { BrandSchema } from "@/schema";

export function BrandTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<BrandSchema>>;
}) {
  const { data } = React.use(dataPromise);
  const columns = React.useMemo(() => getBrandColumns(), []);

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
        <Link href={"/admin/collections/brands/new"}>
          <Button size={"sm"}>Create new brand</Button>
        </Link>
      </div>
    </DataTable>
  );
}
