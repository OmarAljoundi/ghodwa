'use client';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import type { Contact } from '@/generated/client/client';
import { useDataTable } from '@/hooks/use-data-table';
import type { getAll } from '@/lib/generic.server';
import { getNewsColumns } from './columns';

export function ContactTable({ dataPromise }: { dataPromise: ReturnType<typeof getAll<Contact>> }) {
  const { data } = React.use(dataPromise);
  const columns = React.useMemo(() => getNewsColumns(), []);

  const { table } = useDataTable({
    data: data ?? [],
    columns,
    rowCount: data?.length ?? 0,
    initialState: {
      columnPinning: { right: ['actions'] },
    },
  });

  return <DataTable table={table} />;
}
