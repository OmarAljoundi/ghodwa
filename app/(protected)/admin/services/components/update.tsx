"use client";
import React, { use } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { notFound, useRouter } from "next/navigation";
import { getAll, updateOne } from "@/lib/generic.server";
import { ServiceForm } from "./form";
import { LangTabs } from "@/components/lang-tabs";
import {
  ServiceSchema,
  updateServiceSchema,
  UpdateServiceSchema,
} from "@/schema/service-schema";
import { StatusSwitcher } from "@/components/status-switcher";

export function UpdateService({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getAll<ServiceSchema>>;
}) {
  const { data } = use(dataPromise);

  const form = useForm<UpdateServiceSchema>({
    resolver: zodResolver(updateServiceSchema),
    defaultValues: {
      ...data?.[0],
    },
  });

  const route = useRouter();

  async function onSubmit(body: UpdateServiceSchema) {
    const response = await updateOne<ServiceSchema>(
      "service",
      data![0]!.id,
      body
    );

    if (response.success) {
      toast.success("Service update successfully");
      route.replace(`/admin/services`);
      return;
    }

    toast.error("Service couldnt be updated");
  }

  if (!data || data.length == 0) return notFound();

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
