'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { LangTabs } from '@/components/lang-tabs';
import { StatusSwitcher } from '@/components/status-switcher';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { type getAll, updateOne } from '@/lib/generic.server';
import {
  type CreateNewsSchema,
  type NewsSchema,
  type UpdateNewsSchema,
  updateNewsSchema,
} from '@/schema/news-schema';
import { NewsForm } from './form';

export function UpdateNews({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<NewsSchema>>;
}) {
  const { data } = use(dataPromise);

  const form = useForm({
    resolver: zodResolver(updateNewsSchema),
    defaultValues: {
      ...data?.[0],
    },
  });

  const route = useRouter();

  async function onSubmit(body: UpdateNewsSchema) {
    const response = await updateOne<NewsSchema>('news', data![0]!.id, body);

    if (response.success) {
      toast.success('News update successfully');
      route.replace(`/admin/news`);
      return;
    }

    toast.error('News couldnt be updated');
  }

  if (!data || data.length === 0) return notFound();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto flex flex-col gap-x-8 gap-y-4">
          <div className=" space-y-4 ">
            <LangTabs extraElement={<FormStatusSwitcher />}>
              <NewsForm lang="en_" />
              <NewsForm lang="ar_" />
            </LangTabs>
          </div>

          <div className=" space-y-4 "></div>
        </div>
      </form>
    </Form>
  );
}

function FormStatusSwitcher() {
  const { control } = useFormContext<CreateNewsSchema>();
  return (
    <FormField
      control={control}
      name={`is_published`}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <StatusSwitcher {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
