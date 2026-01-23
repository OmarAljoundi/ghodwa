'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import RowDate from '@/components/data-table/common/row-date';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import ToolbarAction from '@/components/toolbar-action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { resolveUrl } from '@/lib/utils';
import type { BrandSchema } from '@/schema';

export function getBrandColumns(): ColumnDef<BrandSchema>[] {
  return [
    {
      accessorKey: 'logo',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Logo" column={column} />;
      },
      cell: ({ row: { original } }) => (
        <Avatar className="dark:bg-white">
          <AvatarImage
            src={original.logo?.path ? resolveUrl(original.logo?.path) : ''}
            alt="logo"
            width={50}
            className="object-contain"
          />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
      ),
      enableHiding: false,
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: 'ar_name',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Arabic Title" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: 'en_name',
      header: ({ column }) => {
        return <DataTableColumnHeader title="English Title" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: 'slug',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Slug" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    // {
    //   accessorKey: "is_published",
    //   header: ({ column }) => {
    //     return <DataTableColumnHeader title="Status" column={column} />;
    //   },
    //   cell: ({ getValue }) => <RowStatus isPublished={getValue<boolean>()} />,
    //   enableHiding: false,
    //   enableSorting: false,
    // },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Created At" column={column} />;
      },
      cell: ({ getValue }) => <RowDate date={getValue<string>()} />,
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: function Cell({ row: { original } }) {
        const route = useRouter();
        return (
          <ToolbarAction
            data={original}
            tableName="brand"
            onEditRedirectTo={(id) => route.push(`/admin/collections/brands/${id}`)}
          />
        );
      },
      size: 40,
    },
  ];
}
