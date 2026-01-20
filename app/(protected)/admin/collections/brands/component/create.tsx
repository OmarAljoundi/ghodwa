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
  type BrandSchema,
  type CategorySchema,
  type CreateBrandSchema,
  createBrandSchema,
} from '@/schema';
import { BrandForm } from './form';

export function CreateBrand({
  datePromiseCategory,
}: {
  datePromiseCategory: ReturnType<typeof getAll<CategorySchema>>;
}) {
  const { data: categories } = use(datePromiseCategory);
  const form = useForm({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      ar_description: '',
      ar_name: '',
      en_name: '',
      en_description: '',
      categories: {
        connect: [],
        disconnect: [],
      },
    },
  });

  const route = useRouter();

  async function onSubmit(body: CreateBrandSchema) {
    const result = await createOne<BrandSchema>('brand', body);
    if (result.success) {
      toast.success('Artwork created successfully');
      route.replace(`/admin/collections/brands/${result.data?.id}`);
      route.refresh();
    }
  }

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
