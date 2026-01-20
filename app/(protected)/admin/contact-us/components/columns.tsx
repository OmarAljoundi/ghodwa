'use client';

import type { ColumnDef } from '@tanstack/react-table';
import RowDate from '@/components/data-table/common/row-date';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import ToolbarAction from '@/components/toolbar-action';
import type { Contact } from '@/generated/client/client';

export function getNewsColumns(): ColumnDef<Contact>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Name" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Email" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: 'subject',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Subject" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: 'message',
      header: ({ column }) => {
        return <DataTableColumnHeader title="Message" column={column} />;
      },
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      enableHiding: false,
      enableSorting: false,
    },
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
        return (
          <ToolbarAction data={original} tableName="contact" showEdit={false} showDelete={true} />
        );
      },
      size: 40,
    },
  ];
}
