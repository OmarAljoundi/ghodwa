'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { LangTabs } from '@/components/lang-tabs';
import { StatusSwitcher } from '@/components/status-switcher';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { createOne } from '@/lib/generic.server';
import {
  type CreateServiceSchema,
  createServiceSchema,
  type ServiceSchema,
} from '@/schema/service-schema';
import { ServiceForm } from './form';

export function CreateService() {
  const form = useForm({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      ar_content: '',
      ar_title: '',
      en_title: '',
      en_content: '',
      is_published: false,
    },
  });

  const route = useRouter();

  async function onSubmit(body: CreateServiceSchema) {
    const result = await createOne<ServiceSchema>('service', body);
    if (result.success) {
      toast.success('Service created successfully');
      route.replace(`/admin/services/${result.data?.id}`);
      route.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto flex flex-col gap-x-8 gap-y-4">
          <div className=" space-y-4 ">
            <LangTabs extraElement={<FormStatusSwitcher />}>
              <ServiceForm lang="en_" />
              <ServiceForm lang="ar_" />
            </LangTabs>
          </div>

          <div className=" space-y-4 "></div>
        </div>
      </form>
    </Form>
  );
}

function FormStatusSwitcher() {
  const { control } = useFormContext<ServiceSchema>();
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
