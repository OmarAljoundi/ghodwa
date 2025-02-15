"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import RowDate from "@/components/data-table/common/row-date";
import { ModelSchema } from "@/schema";
import ToolbarAction from "@/components/toolbar-action";
import { useRouter } from "next/navigation";

export function getModelColumns(): ColumnDef<ModelSchema>[] {
  return [
    {
      accessorKey: "ar_name",
      header: ({ column }) => {
        return <DataTableColumnHeader title="Arabic Name" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "en_name",
      header: ({ column }) => {
        return <DataTableColumnHeader title="English Name" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },

    {
      accessorKey: "slug",
      header: ({ column }) => {
        return <DataTableColumnHeader title="Slug" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return <DataTableColumnHeader title="Created At" column={column} />;
      },
      cell: ({ getValue }) => <RowDate date={getValue<string>()} />,
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: "actions",
      cell: function Cell({ row: { original } }) {
        const route = useRouter();
        return (
          <ToolbarAction
            data={original}
            tableName="model"
            onEditRedirectTo={(id) =>
              route.push(`/admin/collections/models/${id}`)
            }
          />
        );
      },
      size: 40,
    },
  ];
}
