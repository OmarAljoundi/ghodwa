"use client";
import React, { ReactNode, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { settingSchema, SettingSchema } from "@/schema/setting-schema";
import {
  addUpdateSettingAsync,
  getSettingBySectionAsync,
} from "@/lib/settings.server";
import { LangTabs } from "@/components/lang-tabs";

interface WithLangProp {
  lang: "ar_" | "en_";
}

interface BaseSettingFormProps {
  children: React.ReactElement<WithLangProp>;
  dataPromise: ReturnType<typeof getSettingBySectionAsync>;
  schemaKey: keyof SettingSchema;
}

export function BaseSettingForm({
  children,
  dataPromise,
  schemaKey,
}: BaseSettingFormProps) {
  const defaultValues = React.use(dataPromise) as SettingSchema;
  const route = useRouter();

  const form = useForm<SettingSchema>({
    resolver: zodResolver(
      z.object({
        [schemaKey]: settingSchema.shape[schemaKey],
      })
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

  console.log("erros", form.formState.errors);
  console.log("erros", form.getValues());
  console.log("schemaKey", schemaKey);

  async function onSubmit(body: SettingSchema) {
    const operation: "add" | "update" = defaultValues ? "update" : "add";

    const response = await addUpdateSettingAsync(
      "CMS",
      { ...defaultValues, ...body },
      operation
    );

    if (response.success) {
      toast.success("Data saved successfully!");
      route.refresh();
      return;
    }
    toast.error("Error while saving the changes");
  }

  const forms = useMemo((): [ReactNode, ReactNode] => {
    const ArabicForm = React.cloneElement(children, {
      lang: "ar_",
      key: "Arabic",
    });
    const EnglishForm = React.cloneElement(children, {
      lang: "en_",
      key: "English",
    });
    return [EnglishForm, ArabicForm];
  }, [children]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LangTabs>{forms}</LangTabs>
      </form>
    </Form>
  );
}
