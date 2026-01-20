'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LangTabs } from '@/components/lang-tabs';
import { Form } from '@/components/ui/form';
import { type getAll, updateOne } from '@/lib/generic.server';
import { type CategorySchema, type UpdateCategorySchema, updateCategorySchema } from '@/schema';
import { CategoryForm } from './form';

export function UpdateCategory({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<CategorySchema>>;
}) {
  const { data } = React.use(dataPromise);

  const form = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: data?.[0],
  });

  const route = useRouter();

  async function onSubmit(body: UpdateCategorySchema) {
    const response = await updateOne<CategorySchema>('category', data![0]!.id, body);

    if (response.success) {
      toast.success('Category update successfully');
      route.replace(`/admin/collections/categories`);
      return;
    }

    toast.error('Category couldnt be updated');
  }

  // if (!Category)
  //   return <NoResultFound onAddNew={() => route.push("/admin/Categorys/new")} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto flex flex-col gap-x-8 gap-y-4">
          <div className=" space-y-4 ">
            <LangTabs>
              <CategoryForm lang="en_" />
              <CategoryForm lang="ar_" />
            </LangTabs>
          </div>
          <div className=" space-y-4 "></div>
        </div>
      </form>
    </Form>
  );
}
