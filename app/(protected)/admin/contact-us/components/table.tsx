"use client";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getNewsColumns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import { getAll } from "@/lib/generic.server";
import { Contact } from "@prisma/client";

export function ContactTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<Contact>>;
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

  return <DataTable table={table} />;
}
