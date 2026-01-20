'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LangTabs } from '@/components/lang-tabs';
import { Form } from '@/components/ui/form';
import { createOne } from '@/lib/generic.server';
import { type CategorySchema, type CreateCategorySchema, createCategorySchema } from '@/schema';
import { CategoryForm } from './form';

export function CreateCategory() {
  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      ar_description: '',
      ar_name: '',
      en_name: '',
      en_description: '',
    },
  });

  const route = useRouter();

  async function onSubmit(body: CreateCategorySchema) {
    const result = await createOne<CategorySchema>('category', body);
    if (result.success) {
      toast.success('Category created successfully');
      route.replace(`/admin/collections/categories/${result.data?.id}`);
      route.refresh();
    }
  }

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
