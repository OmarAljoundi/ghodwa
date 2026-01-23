'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LangTabs } from '@/components/lang-tabs';
import { Form } from '@/components/ui/form';
import { createOne, type getAll } from '@/lib/generic.server';
import {
  type BrandWithRelationsSchema,
  type CreateModelSchema,
  createModelSchema,
  type ModelSchema,
} from '@/schema';
import { ModelForm } from './form';

export function CreateModel({
  dataPromiseBrands,
}: {
  dataPromiseBrands: ReturnType<typeof getAll<BrandWithRelationsSchema>>;
}) {
  const { data: brands } = use(dataPromiseBrands);
  const form = useForm({
    resolver: zodResolver(createModelSchema),
    defaultValues: {
      ar_description: '',
      ar_name: '',
      en_name: '',
      en_description: '',

    },
  });

  const route = useRouter();

  async function onSubmit(body: CreateModelSchema) {
    const result = await createOne<ModelSchema>('model', body);
    if (result.success) {
      toast.success('Model created successfully');
      route.replace(`/admin/collections/models/${result.data?.id}`);
      route.refresh();
    }
  }

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
