import { Suspense } from 'react';
import ContentWrapper from '@/components/admin-panel/contet-wrapper';
import { FormLoading } from '@/components/form-loading';
import { getAll } from '@/lib/generic.server';
import { isCreationPage } from '@/lib/utils';
import { CreateService } from '../components/create';
import { UpdateService } from '../components/update';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramsId } = await params;
  const { isCreation, id } = isCreationPage(paramsId);
  const currentBreadcrumb = isCreation ? { item: 'New Service' } : { item: `Edit Service ${id}` };

  return (
    <ContentWrapper
      breadcrumbs={[
        { item: 'Dashboard', url: '/admin' },
        { item: 'All Service', url: '/admin/services' },
        { ...currentBreadcrumb, currentPage: true },
      ]}
    >
      <Suspense fallback={<FormLoading />}>
        {isCreation ? (
          <CreateService />
        ) : (
          <UpdateService
            dataPromise={getAll('service', {
              where: {
                id: Number(id),
              },
            })}
          />
        )}
      </Suspense>
    </ContentWrapper>
  );
}
