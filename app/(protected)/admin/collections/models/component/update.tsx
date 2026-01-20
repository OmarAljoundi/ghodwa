'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LangTabs } from '@/components/lang-tabs';
import { Form } from '@/components/ui/form';
import { type getAll, updateOne } from '@/lib/generic.server';
import {
  type BrandWithRelationsSchema,
  type ModelSchema,
  type UpdateModelSchema,
  updateModelSchema,
} from '@/schema';
import { ModelForm } from './form';

export function UpdateModel({
  dataPromise,
  dataPromiseBrands,
}: {
  dataPromise: ReturnType<typeof getAll<ModelSchema>>;
  dataPromiseBrands: ReturnType<typeof getAll<BrandWithRelationsSchema>>;
}) {
  const { data } = React.use(dataPromise);
  const { data: brands } = React.use(dataPromiseBrands);

  const form = useForm({
    resolver: zodResolver(updateModelSchema),
    defaultValues: data?.[0],
  });

  const route = useRouter();

  async function onSubmit(body: UpdateModelSchema) {
    const response = await updateOne<ModelSchema>('model', data![0]!.id, body);

    if (response.success) {
      toast.success('Model update successfully');
      route.replace(`/admin/collections/models`);
      return;
    }

    toast.error('Model couldnt be updated');
  }

  // if (!Model)
  //   return <NoResultFound onAddNew={() => route.push("/admin/Models/new")} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto flex flex-col gap-x-8 gap-y-4">
          <div className=" space-y-4 ">
            <LangTabs>
              <ModelForm lang="en_" brands={brands ?? []} />
              <ModelForm lang="ar_" brands={brands ?? []} />
            </LangTabs>
          </div>
          <div className=" space-y-4 "></div>
        </div>
      </form>
    </Form>
  );
}
