'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LangTabs } from '@/components/lang-tabs';
import { Form } from '@/components/ui/form';
import { type getAll, updateOne } from '@/lib/generic.server';
import {
  type BrandSchema,
  type BrandWithRelationsSchema,
  type CategorySchema,
  type UpdateBrandSchema,
  updateBrandSchema,
} from '@/schema';
import { BrandForm } from './form';

export function UpdateBrand({
  dataPromise,
  datePromiseCategory,
}: {
  dataPromise: ReturnType<typeof getAll<BrandWithRelationsSchema>>;
  datePromiseCategory: ReturnType<typeof getAll<CategorySchema>>;
}) {
  const { data: categories } = use(datePromiseCategory);
  const { data } = use(dataPromise);

  const form = useForm({
    resolver: zodResolver(updateBrandSchema),
    defaultValues: {
      ...data?.[0],
      categories: {
        connect:
          data?.[0]?.categories?.map((o) => {
            return { id: o.id };
          }) ?? [],
        disconnect: [],
      },
    },
  });

  const route = useRouter();

  async function onSubmit(body: UpdateBrandSchema) {
    const response = await updateOne<BrandSchema>('brand', data![0]!.id, body);

    if (response.success) {
      toast.success('Brand update successfully');
      route.replace(`/admin/collections/brands`);
      return;
    }

    toast.error('Brand couldnt be updated');
  }

  if (!data || data.length === 0) return notFound();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto flex flex-col gap-x-8 gap-y-4">
          <div className=" space-y-4 ">
            <LangTabs>
              <BrandForm lang="en_" categories={categories ?? []} />
              <BrandForm lang="ar_" categories={categories ?? []} />
            </LangTabs>
          </div>

          <div className=" space-y-4 "></div>
        </div>
      </form>
    </Form>
  );
}
