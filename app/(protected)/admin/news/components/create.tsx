"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createOne } from "@/lib/generic.server";
import { LangTabs } from "@/components/lang-tabs";
import { NewsForm } from "./form";
import {
  createNewsSchema,
  CreateNewsSchema,
  NewsSchema,
} from "@/schema/news-schema";
import { StatusSwitcher } from "@/components/status-switcher";

export function CreateNews() {
  const form = useForm<CreateNewsSchema>({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      ar_summary: "",
      ar_title: "",
      en_title: "",
      en_summary: "",
      is_published: false,
      image: [],
    },
  });

  const route = useRouter();

  async function onSubmit(body: CreateNewsSchema) {
    const result = await createOne<NewsSchema>("news", body);
    if (result.success) {
      toast.success("News created successfully");
      route.replace(`/admin/news/${result.data?.id}`);
      route.refresh();
    }
  }

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
