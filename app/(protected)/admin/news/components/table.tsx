'use client';
import Link from 'next/link';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/use-data-table';
import type { getAll } from '@/lib/generic.server';
import type { NewsSchema } from '@/schema/news-schema';
import { getNewsColumns } from './columns';

export function NewsTable({ dataPromise }: { dataPromise: ReturnType<typeof getAll<NewsSchema>> }) {
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

  return (
    <DataTable table={table}>
      <div className="flex items-center justify-between">
        <Link href={'/admin/news/new'}>
          <Button size={'sm'}>Create new news</Button>
        </Link>
      </div>
    </DataTable>
  );
}
