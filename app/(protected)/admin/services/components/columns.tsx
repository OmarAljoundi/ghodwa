"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import RowDate from "@/components/data-table/common/row-date";
import ToolbarAction from "@/components/toolbar-action";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceSchema } from "@/schema/service-schema";
import RowStatus from "@/components/data-table/common/row-status";

export function getServiceColumns(): ColumnDef<ServiceSchema>[] {
  return [
    {
      accessorKey: "image",
      header: ({ column }) => {
        return <DataTableColumnHeader title="Logo" column={column} />;
      },
      cell: ({ row: { original } }) => (
        <Avatar className="dark:bg-white">
          <AvatarImage
            src={original.image?.url}
            alt="logo"
            width={50}
            className="object-contain"
          />
          <AvatarFallback>SV</AvatarFallback>
        </Avatar>
      ),
      enableHiding: false,
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: "ar_title",
      header: ({ column }) => {
        return <DataTableColumnHeader title="Arabic Title" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "en_title",
      header: ({ column }) => {
        return <DataTableColumnHeader title="English Title" column={column} />;
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
      accessorKey: "is_published",
      header: ({ column }) => {
        return <DataTableColumnHeader title="Status" column={column} />;
      },
      cell: ({ getValue }) => <RowStatus isPublished={getValue<boolean>()} />,
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
            tableName="brand"
            onEditRedirectTo={(id) => route.push(`/admin/services/${id}`)}
          />
        );
      },
      size: 40,
    },
  ];
}
