'use client';
import Link from 'next/link';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/use-data-table';
import type { getAll } from '@/lib/generic.server';
import type { CategorySchema } from '@/schema';
import { getCategoryColumns } from './columns';

export function CategoryTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<CategorySchema>>;
}) {
  const { data } = React.use(dataPromise);
  const columns = React.useMemo(() => getCategoryColumns(), []);

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
        <Link href={'/admin/collections/categories/new'}>
          <Button size={'sm'}>Create new category</Button>
        </Link>
      </div>
    </DataTable>
  );
}
