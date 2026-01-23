'use client';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { Edit, Files, FileText, Link2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DeleteAlert from '@/components/delete-alert';
import { EmptyState } from '@/components/empty-state';
import { ServiceCard } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sortable, SortableDragHandle, SortableItem } from '@/components/ui/sortable';
import { deleteOne, type getAll } from '@/lib/generic.server';
import type { ServiceSchema } from '@/schema/service-schema';
import { updateServicesOrder } from '../lib/actions';

export function ServiceTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<ServiceSchema>>;
}) {
  const { data } = React.use(dataPromise);
  const route = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [services, setServices] = useState<ServiceSchema[]>(
    (data ?? [])?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  );

  const handleMove = async ({
    activeIndex,
    overIndex,
  }: {
    activeIndex: number;
    overIndex: number;
  }) => {
    const newUsers = [...services];
    const [movedUser] = newUsers.splice(activeIndex, 1);
    newUsers.splice(overIndex, 0, movedUser);

    const updatedOnes = newUsers.map((user, index) => ({
      ...user,
      order: index + 1,
    }));

    setServices(updatedOnes);

    await updateServicesOrder(
      updatedOnes.map((x) => {
        return { id: x.id, order: x.order };
      }),
    );

    toast.success('Services re-sorted successfully');
  };

  useEffect(() => {
    setServices(data ?? []);
  }, [data]);

  if (!data || data?.length === 0) {
    return (
      <EmptyState
        title="No services are created"
        description="You can create new service  to show it in your site home"
        className="max-w-full"
        icons={[FileText, Link2, Files]}
        action={{
          label: 'Create new service',
          onClick: () => route.push('/admin/services/new'),
        }}
      />
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between ">
            <div className="space-y-1">
              <CardTitle>View and manager your services</CardTitle>
              <CardDescription>
                You can drag and sort your services to show the order you wish to have
              </CardDescription>
            </div>
            <div className="flex items-center justify-between">
              <Link href={'/admin/services/new'}>
                <Button size={'sm'}>Create new service</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Sortable
            uniqueId="id"
            value={services}
            orientation="mixed"
            onMove={handleMove}
            overlay={<div className="h-96 w-full bg-primary/10 " />}
          >
            <div className="grid grid-cols-[12fr] md:grid-cols-[6fr,6fr]  lg:grid-cols-[4fr,4fr,4fr] xl:grid-cols-[3fr,3fr,3fr,3fr] gap-x-8 items-center gap-2 mt-4">
              {services.map((props) => (
                <SortableItem key={props.id} value={props.id} asChild>
                  <div className="flex flex-col gap-y-2 relative h-96">
                    <ServiceCard
                      addGridBg={props.addGridBg}
                      backgroundImage={props.image?.path ?? ''}
                      icon={props.en_icon?.path ?? ''}
                      title={props.en_title}
                    />
                    <div className=" mx-1 rounded-lg  absolute top-4 left-4 z-50">
                      <div className=" py-2 px-2 flex justify-start gap-x-2">
                        <SortableDragHandle variant="outline" size="icon" className="cursor-grab">
                          <DragHandleDots2Icon className="h-4 w-4" aria-hidden="true" />
                        </SortableDragHandle>

                        <Link href={`/admin/services/${props.id}`}>
                          <Button type="button" variant="outline" size="icon">
                            <Edit className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <Button
                          size={'icon'}
                          variant={'destructive'}
                          onClick={() => setDeleteId(props.id)}
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </div>
          </Sortable>
        </CardContent>
      </Card>
      <DeleteAlert
        title="Delete service"
        mutateKey={deleteId?.toString() ?? ''}
        onDelete={() => deleteOne('service', deleteId!)}
        onOpenChange={() => setDeleteId(null)}
        open={!!deleteId}
        description="Are you sure you want to delete this service?"
      />
    </>
  );
}
