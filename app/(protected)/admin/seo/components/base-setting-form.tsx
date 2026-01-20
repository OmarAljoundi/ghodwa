'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { type ReactNode, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { LangTabs } from '@/components/lang-tabs';
import { Form } from '@/components/ui/form';
import { addUpdateSettingAsync, type getSettingBySectionAsync } from '@/lib/settings.server';
import { type SettingSchema, settingSchema } from '@/schema/setting-schema';

interface WithLangProp {
  lang: 'ar_' | 'en_';
}

interface BaseSettingFormProps {
  children: React.ReactElement<WithLangProp>;
  dataPromise: ReturnType<typeof getSettingBySectionAsync>;
  schemaKey: keyof SettingSchema;
}

export function BaseSettingForm({ children, dataPromise, schemaKey }: BaseSettingFormProps) {
  const defaultValues = React.use(dataPromise) as SettingSchema;
  const route = useRouter();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        [schemaKey]: settingSchema.shape[schemaKey],
      }),
    ),
    defaultValues,
    // defaultValues: {
    //   ...defaultValues,
    //   seoStaticPagesHome: defaultValues?.seoStaticPagesHome ?? seoDefaultValues,
    //   seoStaticPagesBrandListing:
    //     defaultValues?.seoStaticPagesBrandListing ?? seoDefaultValues,
    //   seoStaticPagesContactUs:
    //     defaultValues?.seoStaticPagesContactUs ?? seoDefaultValues,
    //   seoStaticPagesManagementSystems:
    //     defaultValues?.seoStaticPagesManagementSystems ?? seoDefaultValues,
    //   seoStaticPagesNewsListing:
    //     defaultValues?.seoStaticPagesNewsListing ?? seoDefaultValues,
    //   seoStaticPagesManagementTeam:
    //     defaultValues?.seoStaticPagesManagementTeam ?? seoDefaultValues,
    //   seoStaticPagesMission:
    //     defaultValues?.seoStaticPagesMission ?? seoDefaultValues,
    //   seoStaticPagesOverview:
    //     defaultValues?.seoStaticPagesOverview ?? seoDefaultValues,
    //   seoStaticPagesServicesListing:
    //     defaultValues?.seoStaticPagesServicesListing ?? seoDefaultValues,
    // },
  });


  async function onSubmit(body: SettingSchema) {
    const operation: 'add' | 'update' = defaultValues ? 'update' : 'add';

    const response = await addUpdateSettingAsync('CMS', { ...defaultValues, ...body }, operation);

    if (response.success) {
      toast.success('Data saved successfully!');
      route.refresh();
      return;
    }
    toast.error('Error while saving the changes');
  }

  const forms = useMemo((): [ReactNode, ReactNode] => {
    const ArabicForm = React.cloneElement(children, {
      lang: 'ar_',
      key: 'Arabic',
    });
    const EnglishForm = React.cloneElement(children, {
      lang: 'en_',
      key: 'English',
    });
    return [EnglishForm, ArabicForm];
  }, [children]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(e => onSubmit(e as SettingSchema))} className="space-y-4">
        <LangTabs>{forms}</LangTabs>
      </form>
    </Form>
  );
}
