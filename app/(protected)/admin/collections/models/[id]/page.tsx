import { Suspense } from 'react';
import ContentWrapper from '@/components/admin-panel/contet-wrapper';
import { FormLoading } from '@/components/form-loading';
import { getAll } from '@/lib/generic.server';
import { isCreationPage } from '@/lib/utils';
import { CreateModel } from '../component/create';
import { UpdateModel } from '../component/update';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramsId } = await params;
  const { isCreation, id } = isCreationPage(paramsId);
  const currentBreadcrumb = isCreation ? { item: 'New Model' } : { item: `Edit Model ${id}` };

  return (
    <ContentWrapper
      breadcrumbs={[
        { item: 'Dashboard', url: '/admin' },
        { item: 'All Model', url: '/admin/collections/models' },
        { ...currentBreadcrumb, currentPage: true },
      ]}
    >
      <Suspense fallback={<FormLoading />}>
        {isCreation ? (
          <CreateModel
            dataPromiseBrands={getAll('brand', {
              orderBy: { id: 'desc' },
              include: { categories: true },
            })}
          />
        ) : (
          <UpdateModel
            dataPromiseBrands={getAll('brand', {
              orderBy: { id: 'desc' },
              include: { categories: true },
            })}
            dataPromise={getAll('model', { where: { id: Number(id) } })}
          />
        )}
      </Suspense>
    </ContentWrapper>
  );
}
