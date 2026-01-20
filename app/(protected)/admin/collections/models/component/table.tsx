'use client';
import Link from 'next/link';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/use-data-table';
import type { getAll } from '@/lib/generic.server';
import type { ModelSchema } from '@/schema';
import { getModelColumns } from './columns';

export function ModelTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<ModelSchema>>;
}) {
  const { data } = React.use(dataPromise);
  const columns = React.useMemo(() => getModelColumns(), []);

  const { table } = useDataTable({
    data: data ?? [],
    columns,
    rowCount: data?.length ?? 0,
    initialState: {
      columnPinning: { right: ['actions'] },
    },
  });

  return (
    <DataTable table={table}>
      <div className="flex items-center justify-between">
        <Link href={'/admin/collections/models/new'}>
          <Button size={'sm'}>Create new model</Button>
        </Link>
      </div>
    </DataTable>
  );
}
